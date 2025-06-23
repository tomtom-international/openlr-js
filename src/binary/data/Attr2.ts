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

import { BinaryInformation } from './BinaryInformation';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';

export class Attr2 extends BinaryInformation {
    /** Number of bits used for lfrcnp */
    protected static _LFRCNP_BITS = 3;

    /** Number of bits used for bear */
    protected static _BEAR_BITS = 5;

    /** The lowest functional road class information. */
    protected _lfrcnp!: number;

    /** The bearing information. */
    protected _bear!: number;

    public get lfrcnp() {
        return this._lfrcnp;
    }

    public get bear() {
        return this._bear;
    }

    public put(bitStreamOutput: BitStreamOutput) {
        bitStreamOutput.putBits(this._lfrcnp, Attr2._LFRCNP_BITS);
        bitStreamOutput.putBits(this._bear, Attr2._BEAR_BITS);
    }

    public static fromValues(lfrcnp: number, bear: number) {
        const attr2 = new Attr2();
        attr2._lfrcnp = lfrcnp;
        attr2._bear = bear;
        return attr2;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const attr2 = new Attr2();
        attr2._lfrcnp = bitStreamInput.getBits(Attr2._LFRCNP_BITS);
        attr2._bear = bitStreamInput.getBits(Attr2._BEAR_BITS);
        return attr2;
    }
}
