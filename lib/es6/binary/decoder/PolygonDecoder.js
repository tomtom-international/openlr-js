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
import { AbstractDecoder } from './AbstractDecoder';
import * as BinaryConstants from '../BinaryConstants';
import { AbsoluteCoordinates } from '../data/AbsoluteCoordinates';
import { GeoCoordinates } from '../../map/GeoCoordinates';
import { RelativeCoordinates } from '../data/RelativeCoordinates';
import { RawPolygonLocationReference } from '../../data/raw-location-reference/RawPolygonLocationReference';
export class PolygonDecoder extends AbstractDecoder {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        const remainingBytes = totalBytes - (BinaryConstants.HEADER_SIZE + BinaryConstants.ABS_COORD_SIZE);
        const numRemainingCorners = remainingBytes / BinaryConstants.RELATIVE_COORD_SIZE;
        const cornersCoords = [];
        const firstCornerAbsCoord = AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
        const firstCornerCoord = GeoCoordinates.fromValues(this._calculate32BitRepresentation(firstCornerAbsCoord.lon), this._calculate32BitRepresentation(firstCornerAbsCoord.lat));
        cornersCoords.push(firstCornerCoord);
        let prevCornerAbsCoord = firstCornerAbsCoord;
        for (let i = 0; i < numRemainingCorners; i++) {
            const remainingCoord = RelativeCoordinates.fromBitStreamInput(bitStreamInput);
            const lon = this._calculate32BitRepresentation(prevCornerAbsCoord.lon) + Math.fround(remainingCoord.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
            const lat = this._calculate32BitRepresentation(prevCornerAbsCoord.lat) + Math.fround(remainingCoord.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
            const cornerCoord = GeoCoordinates.fromValues(lon, lat);
            cornersCoords.push(cornerCoord);
            prevCornerAbsCoord = AbsoluteCoordinates.fromValues(this._get24BitRepresentation(cornerCoord.getLongitudeDeg()), this._get24BitRepresentation(cornerCoord.getLatitudeDeg()));
        }
        const rawLocRef = RawPolygonLocationReference.fromPolygonValues(id, cornersCoords);
        return rawLocRef;
    }
}
//# sourceMappingURL=PolygonDecoder.js.map