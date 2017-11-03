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

import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';

export default class Attr5 extends BinaryInformation {
    /** The Constant RFU. */
    protected static _NR_RFU = 2;

    /** Number of bits used for frc */
    protected static _FRC_BITS = 3;

    /** Number of bits used for fow */
    protected static _FOW_BITS = 3;

    /** The functional road class information. */
    protected _frc: number;

    /** The form of way information. */
    protected _fow: number;

    public static fromValues(frc: number, fow: number) {
        const attr5 = new Attr5();
        attr5._frc = frc;
        attr5._fow = fow;
        return attr5;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const rfu = bitStreamInput.getBits(Attr5._NR_RFU);
        if (rfu !== Attr5._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        const attr5 = new Attr5();
        attr5._frc = bitStreamInput.getBits(Attr5._FRC_BITS);
        attr5._fow = bitStreamInput.getBits(Attr5._FOW_BITS);
        return attr5;
    }

    public put(bitStreamOutput: BitStreamOutput) {
        bitStreamOutput.putBits(Attr5._RFU_VALUE, Attr5._NR_RFU);
        bitStreamOutput.putBits(this._frc, Attr5._FRC_BITS);
        bitStreamOutput.putBits(this._fow, Attr5._FOW_BITS);
    }

    public get frc() {
        return this._frc;
    }

    public get fow() {
        return this._fow;
    }
};
