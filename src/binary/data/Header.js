/**
 * Copyright 2016 TomTom International B.V
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

import BinaryInformation from './BinaryInformation';

export default class Header extends BinaryInformation {
    static _RFU_BITS = 1;

    static _AREA_FLAG_BIT0 = 1;

    static _AREA_FLAG_BIT1 = 1;

    /** Number of bits used for attributes flag */
    static _ATTR_FLAG_BITS = 1;

    /** Number of bits used for poflag */
    static _POINT_FLAG_BITS = 1;

    /** Number of bits used for version */
    static _VERSION_BITS = 3;

    /** The area flag information. */
    _arf;

    /** The attribute flag information. */
    _af;

    /** The poflag information */
    _pf;

    /** The version information. */
    _ver;

    static fromValues(arfValue, afValue, pfValue, verValue) {
        const header = new Header();
        header._arf = arfValue;
        header._af = afValue;
        header._pf = pfValue;
        header._ver = verValue;
        return header;
    }

    static fromBitStreamInput(bitStreamInput) {
        const rfu = bitStreamInput.getBits(Header._RFU_BITS);
        if (rfu !== BinaryInformation._RFU_VALUE) {
            throw new Error('Const value mismatch');
        }
        const header = new Header();
        const arf1 = bitStreamInput.getBits(Header._AREA_FLAG_BIT0);
        header._pf = bitStreamInput.getBits(Header._POINT_FLAG_BITS);
        const arf0 = bitStreamInput.getBits(Header._AREA_FLAG_BIT1);
        header._arf = 2 * arf1 + arf0;
        header._af = bitStreamInput.getBits(Header._ATTR_FLAG_BITS);
        header._ver = bitStreamInput.getBits(Header._VERSION_BITS);
        return header;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(BinaryInformation._RFU_VALUE, Header._RFU_BITS);
        const arf1 = this._arf / 2;
        const arf0 = this._arf % 2;
        bitStreamOutput.putBits(arf1, Header._AREA_FLAG_BIT1);
        bitStreamOutput.putBits(this._pf, Header._POINT_FLAG_BITS);
        bitStreamOutput.putBits(arf0, Header._AREA_FLAG_BIT0);
        bitStreamOutput.putBits(this._af, Header._ATTR_FLAG_BITS);
        bitStreamOutput.putBits(this._ver, Header._VERSION_BITS);
    }

    get arf() {
        return this._arf;
    }

    get af() {
        return this._af;
    }

    get pf() {
        return this._pf;
    }

    get ver() {
        return this._ver;
    }
};
