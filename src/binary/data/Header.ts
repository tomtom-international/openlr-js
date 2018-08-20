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

import { BinaryInformation } from './BinaryInformation';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';

export class Header extends BinaryInformation {
    protected static _RFU_BITS = 1;

    protected static _AREA_FLAG_BIT0 = 1;

    protected static _AREA_FLAG_BIT1 = 1;

    /** Number of bits used for attributes flag */
    protected static _ATTR_FLAG_BITS = 1;

    /** Number of bits used for poflag */
    protected static _POINT_FLAG_BITS = 1;

    /** Number of bits used for version */
    protected static _VERSION_BITS = 3;

    /** The area flag information. */
    protected _arf!: number;

    /** The attribute flag information. */
    protected _af!: number;

    /** The poflag information */
    protected _pf!: number;

    /** The version information. */
    protected _ver!: number;

    public put(bitStreamOutput: BitStreamOutput) {
        bitStreamOutput.putBits(BinaryInformation._RFU_VALUE, Header._RFU_BITS);
        const arf1 = this._arf / 2;
        const arf0 = this._arf % 2;
        bitStreamOutput.putBits(arf1, Header._AREA_FLAG_BIT1);
        bitStreamOutput.putBits(this._pf, Header._POINT_FLAG_BITS);
        bitStreamOutput.putBits(arf0, Header._AREA_FLAG_BIT0);
        bitStreamOutput.putBits(this._af, Header._ATTR_FLAG_BITS);
        bitStreamOutput.putBits(this._ver, Header._VERSION_BITS);
    }

    public static fromValues(arfValue: number, afValue: number, pfValue: number, verValue: number) {
        const header = new Header();
        header._arf = arfValue;
        header._af = afValue;
        header._pf = pfValue;
        header._ver = verValue;
        return header;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
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

    public get arf() {
        return this._arf;
    }

    public get af() {
        return this._af;
    }

    public get pf() {
        return this._pf;
    }

    public get ver() {
        return this._ver;
    }
}
