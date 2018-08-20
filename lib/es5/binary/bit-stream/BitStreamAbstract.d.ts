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
export declare abstract class BitStreamAbstract {
    /** Factor to shift between bit and byte */
    protected static _BIT_BYTE_SHIFT: number;
    /** Number of bits in a byte */
    protected static _BYTE_SIZE: number;
    /** position of the highest bit in a byte (count starts at 0) */
    protected static _HIGHEST_BIT: number;
    /**
     * Bit mask to mask the lowest bits of a byte
     */
    protected static _BITMASK: number[];
    /**
     * Complementary bit mask for negative integer values
     */
    protected static _COMPLEMENT_MASK: number[];
    /**
     * Bit mask to mask one single bit of a byte (needed for the detection of negative numbers)
     */
    protected static _SIGNED_MASK: number[];
    /** the default buffer size */
    protected static _DEFAULT_BUFFER_LENGTH: number;
    /** maximum number of bits which can be read/put at a time */
    protected static _MAX_BIT_SIZE: number;
    /** The internal data buffer */
    protected _buffer: Buffer;
    /** The buffer size in bytes */
    protected _totalBufferLengthBytes: number;
    /** the current bit position in the internal data buffer */
    protected _currentBit: number;
    /** Expand buffer the size of the internal data buffer to size new_length. If new_length is smaller than the current size, then nothing will be done. */
    protected _expandBuffer(newLength?: number): void;
    /** Creates the internal data buffer of size length. */
    protected _createBuffer(length: number): void;
    protected _getData(): Buffer;
}
