/**
 * Copyright 2018 TomTom International B.V
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
import * as BinaryConstants from '../BinaryConstants';
import { GeoCoordinates } from '../../map/GeoCoordinates';
import { RawCircleLocationReference } from '../../data/raw-location-reference/RawCircleLocationReference';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { RawBinaryData } from '../data/RawBinaryData';
import { Radius, resolveRadius } from '../data/Radius';

export class CircleDecoder extends AbstractDecoder {
    protected BASE_SIZE: number = BinaryConstants.HEADER_SIZE + BinaryConstants.ABS_COORD_SIZE;

    public decodeData(id: string, bitStreamInput: BitStreamInput, totalBytes: number, version: number, binaryData: RawBinaryData | null) {
        const radiusSize: number = totalBytes - this.BASE_SIZE;
        const rt = resolveRadius(radiusSize);
        const absCoord = AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
        const geoCoord = GeoCoordinates.fromValues(this._calculate32BitRepresentation(absCoord.lon), this._calculate32BitRepresentation(absCoord.lat));
        const radius: Radius = Radius.fromBitStreamInput(bitStreamInput, rt);
        const rawLocRef = RawCircleLocationReference.fromCircleValues(id, geoCoord, radius.radius);
        if (binaryData !== null) {
            binaryData.absCoord = absCoord;
        }
        return rawLocRef;
    }
}
