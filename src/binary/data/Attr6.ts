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

export class Attr6 extends BinaryInformation {
    /** number of bits used for lfrcnp */
    protected static _NR_RFU = 3;

    /** number of bits used for bear */
    protected static _BEAR_BITS = 5;

    /** The bearing information. */
    protected _bear!: number;

    public put(bitStreamOutput: BitStreamOutput) {
        bitStreamOutput.putBits(Attr6._RFU_VALUE, Attr6._NR_RFU);
        bitStreamOutput.putBits(this._bear, Attr6._BEAR_BITS);
    }

    public static fromValues(bear: number) {
        const attr6 = new Attr6();
        attr6._bear = bear;
        return attr6;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const rfu = bitStreamInput.getBits(Attr6._NR_RFU);
        if (rfu !== Attr6._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        const attr6 = new Attr6();
        attr6._bear = bitStreamInput.getBits(Attr6._BEAR_BITS);
        return attr6;
    }

    public get bear() {
        return this._bear;
    }
}
