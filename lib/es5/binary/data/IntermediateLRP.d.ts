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
import { AbstractLRP } from './AbstractLRP';
import { Attr1 } from './Attr1';
import { Attr2 } from './Attr2';
import { Attr3 } from './Attr3';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';
export declare class IntermediateLRP extends AbstractLRP {
    /** Number of bits used for coordinates (relative) */
    protected static _COORD_BITS: number;
    /** The attrib2. */
    protected _attrib2: Attr2;
    /** The attrib3. */
    protected _attrib3: Attr3;
    put(bitStreamOutput: BitStreamOutput): void;
    static fromValues(lon: number, lat: number, attrib1: Attr1, attrib2: Attr2, attrib3: Attr3): IntermediateLRP;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): IntermediateLRP;
    readonly attrib2: Attr2;
    readonly attrib3: Attr3;
}
