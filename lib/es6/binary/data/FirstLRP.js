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
import { AbstractLRP } from './AbstractLRP';
import { Attr1 } from './Attr1';
import { Attr2 } from './Attr2';
import { Attr3 } from './Attr3';
export class FirstLRP extends AbstractLRP {
    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    }
    static fromValues(lon, lat, attrib1, attrib2, attrib3) {
        const firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._lon = lon;
        firstLrp._lat = lat;
        firstLrp._attrib1 = attrib1;
        firstLrp._attrib2 = attrib2;
        firstLrp._attrib3 = attrib3;
        return firstLrp;
    }
    static fromBitStreamInput(bitStreamInput) {
        const firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._read(bitStreamInput);
        firstLrp._attrib1 = Attr1.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib2 = Attr2.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib3 = Attr3.fromBitStreamInput(bitStreamInput);
        return firstLrp;
    }
    get attrib2() {
        return this._attrib2;
    }
    get attrib3() {
        return this._attrib3;
    }
}
FirstLRP._COORD_BITS = 24;
//# sourceMappingURL=FirstLRP.js.map