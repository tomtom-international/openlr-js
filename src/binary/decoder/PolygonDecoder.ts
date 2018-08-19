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

import AbstractDecoder from './AbstractDecoder';
import BinaryConstants from '../BinaryConstants';
import BitStreamInput from '../bit-stream/BitStreamInput';
import RawBinaryData from '../data/RawBinaryData';
import AbsoluteCoordinates from '../data/AbsoluteCoordinates';
import GeoCoordinates from '../../map/GeoCoordinates';
import RelativeCoordinates from '../data/RelativeCoordinates';
import RawPolygonLocationReference from '../../data/raw-location-reference/RawPolygonLocationReference';

export default class PolygonDecoder extends AbstractDecoder {
    public decodeData(id: string, bitStreamInput: BitStreamInput, totalBytes: number, version: number, binaryData: RawBinaryData | null) {
        if (version < BinaryConstants.BINARY_VERSION_3) {
            throw new Error('PolygonDecoder invalid version ' + version);
        }

        const remainingBytes = totalBytes - (BinaryConstants.HEADER_SIZE + BinaryConstants.ABS_COORD_SIZE);
		if (remainingBytes % BinaryConstants.RELATIVE_COORD_SIZE != 0) {
            throw new Error('PolygonDecoder invalid binary data');
        }

        const numRemainingCorners = remainingBytes / BinaryConstants.RELATIVE_COORD_SIZE;
		if (numRemainingCorners < 2) {
            throw new Error('PolygonDecoder invalid binary data');
        }

        const cornersCoords: Array<GeoCoordinates> = [];

        try {
            const firstCornerAbsCoord = AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
            const firstCornerCoord = GeoCoordinates.fromValues(this._calculate32BitRepresentation(firstCornerAbsCoord.lon), this._calculate32BitRepresentation(firstCornerAbsCoord.lat));

			cornersCoords.push(firstCornerCoord);
			let prevCornerAbsCoord = firstCornerAbsCoord;

            let counter = numRemainingCorners;
			while (counter > 0) {
                counter--;
				const remainingCoord = RelativeCoordinates.fromBitStreamInput(bitStreamInput);
                const lon = this._calculate32BitRepresentation(prevCornerAbsCoord.lon) + Math.fround(remainingCoord.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
                const lat = this._calculate32BitRepresentation(prevCornerAbsCoord.lat) + Math.fround(remainingCoord.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
				const cornerCoord = GeoCoordinates.fromValues(lon, lat);
                cornersCoords.push(cornerCoord);
                prevCornerAbsCoord = AbsoluteCoordinates.fromValues(this._get24BitRepresentation(cornerCoord.getLongitudeDeg()), this._get24BitRepresentation(cornerCoord.getLatitudeDeg()));
            }
		} catch (error) {
            throw new Error('PolygonDecoder invalid binary data');
        }

        const rawLocRef = RawPolygonLocationReference.fromPolygonValues(id, cornersCoords);
		return rawLocRef;
    }
};
