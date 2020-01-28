/**
 * Copyright 2020 TomTom International B.V
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

export class Attr1 extends BinaryInformation {
    /** The Constant SIDE_OR_ORIENTATION_BITS. */
    protected static _SIDE_OR_ORIENTATION_BITS = 2;

    /** Number of bits used for frc */
    protected static _FRC_BITS = 3;

    /** Number of bits used for fow */
    protected static _FOW_BITS = 3;

    /** The functional road class information. */
    protected _frc!: number;

    /** The form of way information. */
    protected _fow!: number;

    /** The side or orientation. */
    protected _sideOrOrientation!: number;

    public put(bitStreamOutput: BitStreamOutput) {
        bitStreamOutput.putBits(this._sideOrOrientation, Attr1._SIDE_OR_ORIENTATION_BITS);
        bitStreamOutput.putBits(this._frc, Attr1._FRC_BITS);
        bitStreamOutput.putBits(this._fow, Attr1._FOW_BITS);
    }

    public static fromValues(frc: number, fow: number, sideOrOrientation: number) {
        const attr1 = new Attr1();
        attr1._frc = frc;
        attr1._fow = fow;
        attr1._sideOrOrientation = sideOrOrientation;
        return attr1;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const attr1 = new Attr1();
        attr1._sideOrOrientation = bitStreamInput.getBits(Attr1._SIDE_OR_ORIENTATION_BITS);
        attr1._frc = bitStreamInput.getBits(Attr1._FRC_BITS);
        attr1._fow = bitStreamInput.getBits(Attr1._FOW_BITS);
        return attr1;
    }

    public get frc() {
        return this._frc;
    }

    public get fow() {
        return this._fow;
    }

    public get sideOrOrientation() {
        return this._sideOrOrientation;
    }
}
