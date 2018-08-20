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
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';
export declare enum RadiusType {
    /** Small radius (BINARY_VERSION_3: up to 255m) */
    SMALL = 1,
    /** Medium radius (BINARY_VERSION_3: up to 65536m) */
    MEDIUM = 2,
    /** Large radius (BINARY_VERSION_3: up to 16777216m) */
    LARGE = 3,
    /** Extra large radius (BINARY_VERSION_3: up to 4294967296m) */
    EXTRA_LARGE = 4,
    /** Unknown radius type */
    UNKNOWN = 0
}
export declare const resolveRadius: (bytes: number) => RadiusType;
export declare class Radius {
    /** The Constant MAX_RADIUS_SMALL. */
    protected static _MAX_RADIUS_SMALL: number;
    /** The Constant MAX_RADIUS_MEDIUM. */
    protected static _MAX_RADIUS_MEDIUM: number;
    /** The Constant MAX_RADIUS_LARGE. */
    protected static _MAX_RADIUS_LARGE: number;
    /** The Constant MAX_RADIUS_EXTRA_LARGE. */
    protected static _MAX_RADIUS_EXTRA_LARGE: number;
    protected _radius: number;
    put(bitStreamOutput: BitStreamOutput): void;
    static fromValues(radiusValue: number): Radius;
    static fromBitStreamInput(bitStreamInput: BitStreamInput, type: RadiusType): Radius;
    readonly radius: number;
    protected static _intToLong(integer: number): number;
}
