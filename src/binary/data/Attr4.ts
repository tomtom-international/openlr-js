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

export class Attr4 extends BinaryInformation {
    /** Number of unused bits */
    protected static _RFU_BITS = 1;

    /** Number of bits used for positive offset flag */
    protected static _POFFF_BITS = 1;

    /** Number of bits used for negative offset flag */
    protected static _NOFFF_BITS = 1;

    /** Number of bits used for bearing */
    protected static _BEAR_BITS = 5;

    /** The positive offset flag information. */
    protected _pOffsetF!: number;

    /** The negative offset flag information. */
    protected _nOffsetF!: number;

    /** The bearing information. */
    protected _bear!: number;

    public put(bitStreamOutput: BitStreamOutput) {
        bitStreamOutput.putBits(Attr4._RFU_VALUE, Attr4._RFU_BITS);
        bitStreamOutput.putBits(this._pOffsetF, Attr4._POFFF_BITS);
        bitStreamOutput.putBits(this._nOffsetF, Attr4._NOFFF_BITS);
        bitStreamOutput.putBits(this._bear, Attr4._BEAR_BITS);
    }

    public static fromValues(pOffsetF: number, nOffsetF: number, bear: number) {
        const attr4 = new Attr4();
        attr4._pOffsetF = pOffsetF;
        attr4._nOffsetF = nOffsetF;
        attr4._bear = bear;
        return attr4;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const rfu = bitStreamInput.getBits(Attr4._RFU_BITS);
        if (rfu !== Attr4._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        const attr4 = new Attr4();
        attr4._pOffsetF = bitStreamInput.getBits(Attr4._POFFF_BITS);
        attr4._nOffsetF = bitStreamInput.getBits(Attr4._NOFFF_BITS);
        attr4._bear = bitStreamInput.getBits(Attr4._BEAR_BITS);
        return attr4;
    }

    public get pOffsetF() {
        return this._pOffsetF;
    }

    public get nOffsetF() {
        return this._nOffsetF;
    }

    public get bear() {
        return this._bear;
    }
}
