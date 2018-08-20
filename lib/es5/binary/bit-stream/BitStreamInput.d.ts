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
/// <reference types="node" />
import { BitStreamAbstract } from './BitStreamAbstract';
export declare class BitStreamInput extends BitStreamAbstract {
    protected _bufferFilledBytes: number;
    protected _inBuffer: Buffer;
    getBits(count: number): number;
    getSignedBits(count: number): number;
    protected _getNextBits(count: number): number;
    protected _getNextSignedBits(count: number): number;
    protected _fillBufferFromInput(): void;
    static fromString(value: string, encoding: string): BitStreamInput;
    static fromStringAndLength(value: string, encoding: string, length: number): BitStreamInput;
    static fromBuffer(buffer: Buffer): BitStreamInput;
    static fromBufferAndLength(buffer: Buffer, length: number): BitStreamInput;
}
