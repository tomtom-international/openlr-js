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
export declare class Offsets {
    /** The Constant PERCENTAGE. */
    protected static _PERCENTAGE: number;
    /**
     * The positive offset of the binary data (0 if no positive offset available).
     */
    protected _pOffset: number;
    /**
     * The negative offset of the binary data (0 if not negative offset available).
     */
    protected _nOffset: number;
    /** The p off relative. */
    protected _pOffRelative: number;
    /** The n off relative. */
    protected _nOffRelative: number;
    /** The version. */
    protected _version: number;
    hasPositiveOffset(): boolean;
    hasNegativeOffset(): boolean;
    getPositiveOffset(length: number): number;
    getNegativeOffset(length: number): number;
    static fromValues(pOff: number, nOff: number): Offsets;
    static fromRelativeValues(pOff: number, nOff: number): Offsets;
}
