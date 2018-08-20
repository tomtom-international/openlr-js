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
import { AbstractEncoder } from './AbstractEncoder';
import { LocationReference } from '../../data/LocationReference';
import { BinaryReturnCode } from '../BinaryReturnCode';
import * as BinaryConstants from '../BinaryConstants';
import { LocationType } from '../../data/LocationType';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';
export class PointAlongLineEncoder extends AbstractEncoder {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference.getLocationReferencePoints() === null) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.POINT_ALONG_LINE, version);
        }
        const locationReferencePoints = rawLocationReference.getLocationReferencePoints();
        if (locationReferencePoints === null || locationReferencePoints.length <= 0) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.POINT_ALONG_LINE, version);
        }
        else {
            const startLRP = locationReferencePoints[0];
            const endLRP = locationReferencePoints[1];
            const offsets = rawLocationReference.getOffsets();
            const sideOfRoad = rawLocationReference.getSideOfRoad();
            const orientation = rawLocationReference.getOrientation();
            if (startLRP === null || endLRP === null || offsets === null || sideOfRoad === null || orientation === null) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.POINT_ALONG_LINE, version);
            }
            if (version < BinaryConstants.BINARY_VERSION_3) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_VERSION, LocationType.POI_WITH_ACCESS_POINT, version);
            }
            const returnCode = this._checkOffsets(offsets, true, locationReferencePoints);
            if (!returnCode) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.POINT_ALONG_LINE, version);
            }
            return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version));
        }
    }
    _generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version) {
        const header = this._generateHeader(version, LocationType.POINT_ALONG_LINE, true);
        const first = this._generateFirstLRPFromLRPAndOrientation(startLRP, orientation);
        const lrps = [startLRP, endLRP];
        const pOff = this._generateOffset(offsets, true, version, lrps);
        if (pOff === null) {
            throw new Error('Positive offset cannot be null');
        }
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
}
//# sourceMappingURL=PointAlongLineEncoder.js.map