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

import { AbstractCoordinate } from './AbstractCoordinate';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';

export class AbsoluteCoordinates extends AbstractCoordinate {
    /** Number of bits used for coordinate (absolute) */
    protected static _COORD_BITS = 24;

    public put(bitStreamOutput: BitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    }

    public static fromValues(longitude: number, latitude: number) {
        const absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._lon = longitude;
        absoluteCoordinates._lat = latitude;
        return absoluteCoordinates;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._read(bitStreamInput);
        return absoluteCoordinates;
    }
}
