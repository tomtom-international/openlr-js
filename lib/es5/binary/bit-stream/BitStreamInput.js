"use strict";
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BitStreamAbstract_1 = require("./BitStreamAbstract");
var BitStreamInput = /** @class */ (function (_super) {
    __extends(BitStreamInput, _super);
    function BitStreamInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BitStreamInput.prototype.getBits = function (count) {
        // Get the bits
        var x = this._getNextBits(count);
        // Adjust the bit pointers
        this._currentBit += count;
        return x;
    };
    BitStreamInput.prototype.getSignedBits = function (count) {
        // Get the (signed) bits
        var x = this._getNextSignedBits(count);
        // Adjust the bit pointers
        this._currentBit += count;
        return x;
    };
    BitStreamInput.prototype._getNextBits = function (count) {
        if (count === 0) {
            return 0;
        }
        if (count > BitStreamAbstract_1.BitStreamAbstract._MAX_BIT_SIZE || count < 1) {
            throw new Error('Invalid bit size');
        }
        if (this._currentBit + count > this._bufferFilledBytes << BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT) {
            // Forward check if we reach the end of the buffer
            this._fillBufferFromInput();
        }
        if ((this._totalBufferLengthBytes << BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT) - this._currentBit < count) {
            // Check if there is enough data in the buffer (after reading from stream)
            throw new Error('Not enough data');
        }
        var returnValue = 0;
        var currentByteIndex = this._currentBit >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT;
        var endByteIndex = (this._currentBit + count - 1) >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT;
        var room = BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE - (this._currentBit % BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE); // unread bits in the first byte
        if (room >= count) {
            // The requested value is completely in the first byte so read the data
            returnValue = (this._buffer[currentByteIndex] >> room - count) & BitStreamAbstract_1.BitStreamAbstract._BITMASK[count];
        }
        else {
            // Leftover bits in the last byte
            var leftover = (this._currentBit + count) % BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE;
            returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract_1.BitStreamAbstract._BITMASK[room];
            // Now iterate byte-wise, stop before last byte
            for (currentByteIndex++; currentByteIndex < endByteIndex; currentByteIndex++) {
                // Shift return value
                returnValue <<= BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE;
                // and put the bits read instead (full byte)
                returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract_1.BitStreamAbstract._BITMASK[BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE];
            }
            // Now deal with the last part
            if (leftover > 0) {
                returnValue <<= leftover; // Make room for remaining bits
                returnValue |= (this._buffer[currentByteIndex] >> (BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE - leftover)) & BitStreamAbstract_1.BitStreamAbstract._BITMASK[leftover];
            }
            else {
                // Last byte will be read completely
                returnValue <<= BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE;
                returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract_1.BitStreamAbstract._BITMASK[BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE];
            }
        }
        return returnValue;
    };
    BitStreamInput.prototype._getNextSignedBits = function (count) {
        // Get the (unsigned) bits
        var x = this._getNextBits(count);
        // Check if the number read is negative?
        if (count > 1 && ((BitStreamAbstract_1.BitStreamAbstract._SIGNED_MASK[count] & x) !== 0)) {
            // Number is negative so transform into an integer including the sign
            return x | BitStreamAbstract_1.BitStreamAbstract._COMPLEMENT_MASK[count];
        }
        else {
            // Number is positive, no transformation needed
            return x;
        }
    };
    BitStreamInput.prototype._fillBufferFromInput = function () {
        var currentByteIndex = this._currentBit >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT; // Current byte offset
        var remainingBytes = this._bufferFilledBytes - currentByteIndex; // Remaining bytes
        // Copy remaining data (not read yet) into the head of the buffer and overwrite already read data
        this._buffer.copy(this._buffer, 0, currentByteIndex, this._bufferFilledBytes);
        var maxSizeInBuffer = this._totalBufferLengthBytes - currentByteIndex;
        var bytesReadFromStream = this._inBuffer.copy(this._buffer, remainingBytes, 0, maxSizeInBuffer);
        if (bytesReadFromStream < maxSizeInBuffer) {
            // No more data available but application should read more, that is an error
            throw new Error('End of Data');
        }
        // Adjust buffer size being used
        // The total buffer size might be larger but this should only happen
        // The last reading data from stream!
        this._bufferFilledBytes = remainingBytes + bytesReadFromStream;
        // Set bit pointer according to the part already being processed
        this._currentBit &= BitStreamAbstract_1.BitStreamAbstract._HIGHEST_BIT;
    };
    BitStreamInput.fromString = function (value, encoding) {
        var bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = Buffer.from(value, encoding);
        bitStreamInput._createBuffer(bitStreamInput._inBuffer.length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    };
    BitStreamInput.fromStringAndLength = function (value, encoding, length) {
        var bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = Buffer.from(value, encoding);
        bitStreamInput._createBuffer(length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    };
    BitStreamInput.fromBuffer = function (buffer) {
        var bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = buffer;
        bitStreamInput._createBuffer(buffer.length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    };
    BitStreamInput.fromBufferAndLength = function (buffer, length) {
        var bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = buffer;
        bitStreamInput._createBuffer(length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    };
    return BitStreamInput;
}(BitStreamAbstract_1.BitStreamAbstract));
exports.BitStreamInput = BitStreamInput;
//# sourceMappingURL=BitStreamInput.js.map