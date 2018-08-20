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
export declare class Header extends BinaryInformation {
    protected static _RFU_BITS: number;
    protected static _AREA_FLAG_BIT0: number;
    protected static _AREA_FLAG_BIT1: number;
    /** Number of bits used for attributes flag */
    protected static _ATTR_FLAG_BITS: number;
    /** Number of bits used for poflag */
    protected static _POINT_FLAG_BITS: number;
    /** Number of bits used for version */
    protected static _VERSION_BITS: number;
    /** The area flag information. */
    protected _arf: number;
    /** The attribute flag information. */
    protected _af: number;
    /** The poflag information */
    protected _pf: number;
    /** The version information. */
    protected _ver: number;
    put(bitStreamOutput: BitStreamOutput): void;
    static fromValues(arfValue: number, afValue: number, pfValue: number, verValue: number): Header;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Header;
    readonly arf: number;
    readonly af: number;
    readonly pf: number;
    readonly ver: number;
}
