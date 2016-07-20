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

import AbstractEncoder from './AbstractEncoder';
import LocationReference from '../../data/LocationReference';
import BinaryReturnCode from '../BinaryReturnCode';
import LocationType from '../../data/LocationType';
import BitStreamOutput from '../bit-stream/BitStreamOutput';

export default class LineEncoder extends AbstractEncoder {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference == null) {
            return LocationReference.fromValues('', BinaryReturnCode.MISSING_DATA, LocationType.LINE_LOCATION, version);
        }
        const locationReferences = rawLocationReference.getLocationReferencePoints();
        const offsets = rawLocationReference.getOffsets();
        if (locationReferences == null || offsets == null || locationReferences.length <= 0) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.LINE_LOCATION, version);
        }
        let returnCode = this._checkOffsets(offsets, true, locationReferences);
        if (!returnCode) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.LINE_LOCATION, version);
        }
        returnCode = this._checkOffsets(offsets, false, locationReferences);
        if (!returnCode) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.LINE_LOCATION, version);
        }
        return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryLineLocation(locationReferences, offsets, version));
    }

    _generateBinaryLineLocation(locationReferences, offsets, version) {
        const header = this._generateHeader(version, LocationType.LINE_LOCATION, true);
        const firstLRP = this._generateFirstLRPFromLRP(locationReferences[0]);
        const lrps = this._generateLRPs(locationReferences);
        const pOff = this._generateOffset(offsets, true, version, locationReferences);
        const nOff = this._generateOffset(offsets, false, version, locationReferences);
        const lastLRP = this._generateLastLrpFromPointsAndOffsets(locationReferences, pOff, nOff);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        firstLRP.put(out);
        for (let i = 0; i < lrps.length; i++) {
            lrps[i].put(out);
        }
        lastLRP.put(out);
        if (pOff != null) {
            pOff.put(out);
        }
        if (nOff != null) {
            nOff.put(out);
        }
        return out.getData();
    }
};
