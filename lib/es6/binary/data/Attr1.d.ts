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
export declare class Attr1 extends BinaryInformation {
    /** The Constant SIDE_OR_ORIENTATION_BITS. */
    protected static _SIDE_OR_ORIENTATION_BITS: number;
    /** Number of bits used for frc */
    protected static _FRC_BITS: number;
    /** Number of bits used for fow */
    protected static _FOW_BITS: number;
    /** The functional road class information. */
    protected _frc: number;
    /** The form of way information. */
    protected _fow: number;
    /** The side or orientation. */
    protected _sideOrOrientation: number;
    put(bitStreamOutput: BitStreamOutput): void;
    static fromValues(frc: number, fow: number, sideOrOrientation: number): Attr1;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Attr1;
    readonly frc: number;
    readonly fow: number;
    readonly sideOrOrientation: number;
}
