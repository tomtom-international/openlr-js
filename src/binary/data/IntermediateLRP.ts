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

import AbstractLRP from './AbstractLRP';
import Attr1 from './Attr1';
import Attr2 from './Attr2';
import Attr3 from './Attr3';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';

export default class IntermediateLRP extends AbstractLRP {
    /** Number of bits used for coordinates (relative) */
    protected static _COORD_BITS = 16;

    /** The attrib2. */
    protected _attrib2: Attr2;

    /** The attrib3. */
    protected _attrib3: Attr3;

    public static fromValues(lon: number, lat: number, attrib1: Attr1, attrib2: Attr2, attrib3: Attr3) {
        const intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._lon = lon;
        intermediateLrp._lat = lat;
        intermediateLrp._attrib1 = attrib1;
        intermediateLrp._attrib2 = attrib2;
        intermediateLrp._attrib3 = attrib3;
        return intermediateLrp;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._read(bitStreamInput);
        intermediateLrp._attrib1 = Attr1.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib2 = Attr2.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib3 = Attr3.fromBitStreamInput(bitStreamInput);
        return intermediateLrp;
    }

    public put(bitStreamOutput: BitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    }

    public get attrib2() {
        return this._attrib2;
    }

    public get attrib3() {
        return this._attrib3;
    }
};
