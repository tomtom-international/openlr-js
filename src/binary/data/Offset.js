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

export default class Offset extends BinaryInformation {
    /** Number of bits used for offset */
    static _OFFSET_BITS = 8;

    /** The offset information. */
    _offset;

    static fromValues(offsetValue) {
        const offset = new Offset();
        offset._offset = offsetValue;
        return offset;
    }

    static fromBitStreamInput(bitStreamInput) {
        const offset = new Offset();
        offset._offset = bitStreamInput.getBits(Offset._OFFSET_BITS);
        return offset;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(this._offset, Offset._OFFSET_BITS);
    }

    get offset() {
        return this._offset;
    }
};
