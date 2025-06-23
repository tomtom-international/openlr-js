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
import { Attr2 } from './Attr2';
import { Attr3 } from './Attr3';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';

export class FirstLRP extends AbstractLRP {
    protected static _COORD_BITS = 24;

    protected _attrib2!: Attr2;

    protected _attrib3!: Attr3;

    public get attrib2() {
        return this._attrib2;
    }

    public get attrib3() {
        return this._attrib3;
    }

    public put(bitStreamOutput: BitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    }

    public static fromValues(lon: number, lat: number, attrib1: Attr1, attrib2: Attr2, attrib3: Attr3) {
        const firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._lon = lon;
        firstLrp._lat = lat;
        firstLrp._attrib1 = attrib1;
        firstLrp._attrib2 = attrib2;
        firstLrp._attrib3 = attrib3;
        return firstLrp;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._read(bitStreamInput);
        firstLrp._attrib1 = Attr1.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib2 = Attr2.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib3 = Attr3.fromBitStreamInput(bitStreamInput);
        return firstLrp;
    }
}
