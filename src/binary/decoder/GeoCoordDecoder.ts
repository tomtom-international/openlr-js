/*
 * Copyright (c) 2020-2025 TomTom International B.V.
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

import { AbsoluteCoordinates } from '../data/AbsoluteCoordinates';
import { AbstractDecoder } from './AbstractDecoder';
import { GeoCoordinates } from '../../map/GeoCoordinates';
import { RawGeoCoordLocationReference } from '../../data/raw-location-reference/RawGeoCoordLocationReference';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { RawBinaryData } from '../data/RawBinaryData';

export class GeoCoordDecoder extends AbstractDecoder {
    public decodeData(id: string, bitStreamInput: BitStreamInput, totalBytes: number, version: number, binaryData: RawBinaryData | null) {
        const absCoord = AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
        const geoCoord = GeoCoordinates.fromValues(this._calculate32BitRepresentation(absCoord.lon), this._calculate32BitRepresentation(absCoord.lat));
        const rawLocRef = RawGeoCoordLocationReference.fromGeoCoordValues(id, geoCoord);
        if (binaryData !== null) {
            binaryData.absCoord = absCoord;
        }
        return rawLocRef;
    }
}
