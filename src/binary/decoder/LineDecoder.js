/**
 * Copyright 2016 TomTom International B.V
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import AbstractDecoder from './AbstractDecoder';
import BinaryConstants from '../BinaryConstants';
import FirstLRP from '../data/FirstLRP';
import IntermediateLRP from '../data/IntermediateLRP';
import LastLRP from '../data/LastLRP';
import Offset from '../data/Offset';
import Offsets from '../../data/Offsets';
import RawLineLocationReference from '../../data/raw-location-reference/RawLineLocationReference';

export default class LineDecoder extends AbstractDecoder {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        // Calculate number of intermediates (integer division: get rid of possible offset information)
        const nrIntermediates = Math.floor((totalBytes - (BinaryConstants.MIN_BYTES_LINE_LOCATION)) / BinaryConstants.LRP_SIZE);

        // Read first location reference point
        const firstLRP = FirstLRP.fromBitStreamInput(bitStreamInput);

        // Read intermediate location reference points
        const intermediates = [];
        for (let i = 0; i < nrIntermediates; i++) {
            const lrp = IntermediateLRP.fromBitStreamInput(bitStreamInput);
            intermediates.push(lrp);
        }

        const lastLRP = LastLRP.fromBitStreamInput(bitStreamInput);

        let posOff = null;
        let negOff = null;
        // Check for positive offset and read in
        if (lastLRP.attrib4.pOffsetF === BinaryConstants.HAS_OFFSET) {
            posOff = Offset.fromBitStreamInput(bitStreamInput);
        }
        // Check for negative offset and read in
        if (lastLRP.attrib4.nOffsetF === BinaryConstants.HAS_OFFSET) {
            negOff = Offset.fromBitStreamInput(bitStreamInput);
        }
        let offsets = Offsets.fromValues(0, 0);
        if (version === BinaryConstants.BINARY_VERSION_2) {
            let pOffValue = 0;
            let nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateDistanceEstimate(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateDistanceEstimate(negOff.offset);
            }
            offsets = Offsets.fromValues(pOffValue, nOffValue);
        } else if (version === BinaryConstants.BINARY_VERSION_3) {
            let pOffValue = 0;
            let nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateRelativeDistance(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateRelativeDistance(negOff.offset);
            }
            offsets = Offsets.fromRelativeValues(pOffValue, nOffValue);
        }
        let lrpCount = 1;
        const points = [];
        const p = this._createFirstLRP(lrpCount, firstLRP);
        lrpCount++;
        points.push(p);
        let prevLon = p.getLongitudeDeg();
        let prevLat = p.getLatitudeDeg();
        for (let intermediate of intermediates) {
            const intermediatePoint = this._createIntermediateLRPFromLatitudeLongitude(lrpCount, intermediate, prevLon, prevLat);
            lrpCount++;
            points.push(intermediatePoint);
            prevLon = intermediatePoint.getLongitudeDeg();
            prevLat = intermediatePoint.getLatitudeDeg();
        }
        const lp = this._createLastLRP(lrpCount, lastLRP, prevLon, prevLat);
        points.push(lp);
        const rawLocRef = RawLineLocationReference.fromValues(id, points, offsets);
        if (binaryData !== null) {
            binaryData.negOffset = negOff;
            binaryData.posOffset = posOff;
            binaryData.lastLRP = lastLRP;
            binaryData.intermediates = intermediates;
            binaryData.firstLRP = firstLRP;
        }
        return rawLocRef;
    }
};
