/**
 * Copyright 2017 TomTom International B.V
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
import BinaryConstants from '../BinaryConstants';
import LocationType from '../../data/LocationType';
import BitStreamOutput from '../bit-stream/BitStreamOutput';

export default class PointAlongLineEncoder extends AbstractEncoder {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null || rawLocationReference.getLocationReferencePoints() === null || rawLocationReference.getLocationReferencePoints().length <= 0) {
            return LocationReference.fromValues("", BinaryReturnCode.MISSING_DATA, LocationType.POINT_ALONG_LINE, version);
        }
        const startLRP = rawLocationReference.getLocationReferencePoints()[0];
        const endLRP = rawLocationReference.getLocationReferencePoints()[1];
        const offsets = rawLocationReference.getOffsets();
        const sideOfRoad = rawLocationReference.getSideOfRoad();
        const orientation = rawLocationReference.getOrientation();
        if (startLRP === null || endLRP === null || offsets === null) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.POINT_ALONG_LINE, version);
        }
        if (version < BinaryConstants.BINARY_VERSION_3) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_VERSION, LocationType.POI_WITH_ACCESS_POINT, version);
        }
        const returnCode = this._checkOffsets(offsets, true, rawLocationReference.getLocationReferencePoints());
        if (!returnCode) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.POINT_ALONG_LINE, version);
        }
        return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version));
    }


    _generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version) {
        const header = this._generateHeader(version, LocationType.POINT_ALONG_LINE, true);
        const first = this._generateFirstLRPFromLRPAndOrientation(startLRP, orientation);
        const lrps = [startLRP, endLRP];
        const pOff = this._generateOffset(offsets, true, version, lrps);
        const last = this._generateLastLrpFromPointsAndOffsetAndSideOfRoad(lrps, pOff, sideOfRoad);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        first.put(out);
        last.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        return out.getData();
    }
};
