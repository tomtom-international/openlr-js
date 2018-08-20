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
import { Attr5 } from './Attr5';
import { Attr6 } from './Attr6';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';

export class LastClosedLineLRP extends BinaryInformation {
    protected _attrib5!: Attr5;

    protected _attrib6!: Attr6;

    public put(bitStreamOutput: BitStreamOutput) {
        this._attrib5.put(bitStreamOutput);
        this._attrib6.put(bitStreamOutput);
    }

    public static fromValues(attrib5: Attr5, attrib6: Attr6) {
        const lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = attrib5;
        lastClosedLineLrp._attrib6 = attrib6;
        return lastClosedLineLrp;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput) {
        const lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = Attr5.fromBitStreamInput(bitStreamInput);
        lastClosedLineLrp._attrib6 = Attr6.fromBitStreamInput(bitStreamInput);
        return lastClosedLineLrp;
    }

    public get attrib5() {
        return this._attrib5;
    }

    public get attrib6() {
        return this._attrib6;
    }
}
