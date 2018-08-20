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

export class Attr3 extends BinaryInformation {
    /** Number of bits used for dnp */
    protected static _DNP_BITS = 8;

    /** The distance to next point information. */
    protected _dnp!: number;

    public put(bitStreamOutput: BitStreamOutput) {
        bitStreamOutput.putBits(this._dnp, Attr3._DNP_BITS);
    }

    public static fromValues(dnp: number) {
        const attr3 = new Attr3();
        attr3._dnp = dnp;
        return attr3;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const attr3 = new Attr3();
        attr3._dnp = bitStreamInput.getBits(Attr3._DNP_BITS);
        return attr3;
    }

    public get dnp() {
        return this._dnp;
    }
}
