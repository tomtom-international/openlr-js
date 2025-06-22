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

import { AbstractLRP } from './AbstractLRP';
import { Attr1 } from './Attr1';
import { Attr4 } from './Attr4';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';

export class LastLRP extends AbstractLRP {
    /** Number of bits used for coordinates (relative) */
    protected static _COORD_BITS = 16;

    /** The attrib4 information. */
    protected _attrib4!: Attr4;

    public get attrib4() {
        return this._attrib4;
    }

    public put(bitStreamOutput: BitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib4.put(bitStreamOutput);
    }

    public static fromValues(lon: number, lat: number, attrib1: Attr1, attrib4: Attr4) {
        const lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._lon = lon;
        lastLrp._lat = lat;
        lastLrp._attrib1 = attrib1;
        lastLrp._attrib4 = attrib4;
        return lastLrp;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._read(bitStreamInput);
        lastLrp._attrib1 = Attr1.fromBitStreamInput(bitStreamInput);
        lastLrp._attrib4 = Attr4.fromBitStreamInput(bitStreamInput);
        return lastLrp;
    }
}
