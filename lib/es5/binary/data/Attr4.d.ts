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
export declare class Attr4 extends BinaryInformation {
    /** Number of unused bits */
    protected static _RFU_BITS: number;
    /** Number of bits used for positive offset flag */
    protected static _POFFF_BITS: number;
    /** Number of bits used for negative offset flag */
    protected static _NOFFF_BITS: number;
    /** Number of bits used for bearing */
    protected static _BEAR_BITS: number;
    /** The positive offset flag information. */
    protected _pOffsetF: number;
    /** The negative offset flag information. */
    protected _nOffsetF: number;
    /** The bearing information. */
    protected _bear: number;
    put(bitStreamOutput: BitStreamOutput): void;
    static fromValues(pOffsetF: number, nOffsetF: number, bear: number): Attr4;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Attr4;
    readonly pOffsetF: number;
    readonly nOffsetF: number;
    readonly bear: number;
}
