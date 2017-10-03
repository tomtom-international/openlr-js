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

import BitStreamAbstract from './BitStreamAbstract';

export default class BitStreamInput extends BitStreamAbstract {
    _bufferFilledBytes;

    _inBuffer;

    static fromString(string, encoding) {
        const bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = Buffer.from(string, encoding);
        bitStreamInput._createBuffer(bitStreamInput._inBuffer.length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    }

    static fromStringAndLength(string, encoding, length) {
        const bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = Buffer.from(string, encoding);
        bitStreamInput._createBuffer(length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    }

    static fromBuffer(buffer) {
        const bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = buffer;
        bitStreamInput._createBuffer(buffer.length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    }

    static fromBufferAndLength(buffer, length) {
        const bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = buffer;
        bitStreamInput._createBuffer(length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    }

    _getNextBits(count) {
        if (count === 0) {
            return 0;
        }

        if (count > BitStreamAbstract._MAX_BIT_SIZE || count < 1) {
            throw new Error('Invalid bit size');
        }

        if (this.position + count > this._bufferFilledBytes << BitStreamAbstract._BIT_BYTE_SHIFT) {
            // Forward check if we reach the end of the buffer
            this._fillBufferFromInput();
        }

        if ((this._totalBufferLengthBytes << BitStreamAbstract._BIT_BYTE_SHIFT) - this._currentBit < count) {
            // Check if there is enough data in the buffer (after reading from stream)
            throw new Error('Not enough data');
        }

        let returnValue = 0;
        let currentByteIndex = this._currentBit >>> BitStreamAbstract._BIT_BYTE_SHIFT;
        const endByteIndex = (this._currentBit + count - 1) >>> BitStreamAbstract._BIT_BYTE_SHIFT;
        const room = BitStreamAbstract._BYTE_SIZE - (this._currentBit % BitStreamAbstract._BYTE_SIZE); // unread bits in the first byte

        if (room >= count) {
            // The requested value is completely in the first byte so read the data
            returnValue = (this._buffer[currentByteIndex] >> room - count) & BitStreamAbstract._BITMASK[count];
        } else {
            // Leftover bits in the last byte
            const leftover = (this._currentBit + count) % BitStreamAbstract._BYTE_SIZE;
            returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract._BITMASK[room];

            // Now iterate byte-wise, stop before last byte
            for (currentByteIndex++; currentByteIndex < endByteIndex; currentByteIndex++) {
                // Shift return value
                returnValue <<= BitStreamAbstract._BYTE_SIZE;
                // and put the bits read instead (full byte)
                returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract._BITMASK[BitStreamAbstract._BYTE_SIZE];
            }
            // Now deal with the last part
            if (leftover > 0) {
                returnValue <<= leftover; // Make room for remaining bits
                returnValue |= (this._buffer[currentByteIndex] >> (BitStreamAbstract._BYTE_SIZE - leftover)) & BitStreamAbstract._BITMASK[leftover];
            } else {
                // Last byte will be read completely
                returnValue <<= BitStreamAbstract._BYTE_SIZE;
                returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract._BITMASK[BitStreamAbstract._BYTE_SIZE];
            }
        }
        return returnValue;
    }

    _getNextSignedBits(count) {
        // Get the (unsigned) bits
        const x = this._getNextBits(count);
        // Check if the number read is negative?
        if (count > 1 && ((BitStreamAbstract._SIGNED_MASK[count] & x) !== 0)) {
            // Number is negative so transform into an integer including the sign
            return x | BitStreamAbstract._COMPLEMENT_MASK[count];
        } else {
            // Number is positive, no transformation needed
            return x;
        }
    }

    getBits(count) {
        // Get the bits
        const x = this._getNextBits(count);
        // Adjust the bit pointers
        this._currentBit += count;
        return x;
    }

    getSignedBits(count) {
        // Get the (signed) bits
        const x = this._getNextSignedBits(count);
        // Adjust the bit pointers
        this._currentBit += count;
        return x;
    }

    _fillBufferFromInput() {
        const currentByteIndex = this._currentBit >>> BitStreamAbstract._BIT_BYTE_SHIFT; // Current byte offset
        const remainingBytes = this._bufferFilledBytes - currentByteIndex; // Remaining bytes

        // Copy remaining data (not read yet) into the head of the buffer and overwrite already read data
        this._buffer.copy(this._buffer, 0, currentByteIndex, this._bufferFilledBytes);

        const maxSizeInBuffer = this._totalBufferLengthBytes - currentByteIndex;
        const bytesReadFromStream = this._inBuffer.copy(this._buffer, remainingBytes, 0, maxSizeInBuffer);
        if (bytesReadFromStream < maxSizeInBuffer) {
            // No more data available but application should read more, that is an error
            throw new Error('End of Data');
        }
        // Adjust buffer size being used
        // The total buffer size might be larger but this should only happen
        // The last reading data from stream!
        this._bufferFilledBytes = remainingBytes + bytesReadFromStream;
        // Set bit pointer according to the part already being processed
        this._currentBit &= BitStreamAbstract._HIGHEST_BIT;
    }
};
