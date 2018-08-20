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
var BitStreamOutput = /** @class */ (function (_super) {
    __extends(BitStreamOutput, _super);
    function BitStreamOutput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BitStreamOutput.prototype.putBits = function (value, countBitsToPut) {
        // Sanity check
        if (countBitsToPut === 0) {
            return value;
        }
        if (countBitsToPut > BitStreamAbstract_1.BitStreamAbstract._MAX_BIT_SIZE || countBitsToPut < 1) {
            throw new Error('Invalid bit size');
        }
        // Make sure we have enough room
        if ((this._currentBit + countBitsToPut) > (this._totalBufferLengthBytes << BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT)) {
            this._expandBuffer();
        }
        var endByteIndex = (this._currentBit + countBitsToPut - 1) >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT; // End byte position
        var beginByteIndex = this._currentBit >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT; // Current byte position
        var freeBitsFirstByte = BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE - (this._currentBit % BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE); // Room in the first byte of the buffer
        var remainingValue = value;
        if (freeBitsFirstByte >= countBitsToPut) {
            // Value fits into the first byte
            // Reset free bits (remove old data)
            this._buffer[beginByteIndex] &= BitStreamAbstract_1.BitStreamAbstract._COMPLEMENT_MASK[freeBitsFirstByte];
            // Insert the value into the free bits
            this._buffer[beginByteIndex] |= BitStreamAbstract_1.BitStreamAbstract._BITMASK[freeBitsFirstByte] & (remainingValue << freeBitsFirstByte - countBitsToPut);
        }
        else {
            // Value does not fit into the first byte
            var countBitsToPutLastByte = (countBitsToPut - freeBitsFirstByte) % BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE; // Number of bits to put in the last byte
            if (countBitsToPutLastByte > 0) {
                // There will be a rest to put into an additional byte (complete buffer will not be aligned)
                this._buffer[endByteIndex] = 0; // Clear byte
                this._buffer[endByteIndex] |= (remainingValue << BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE - countBitsToPutLastByte) & BitStreamAbstract_1.BitStreamAbstract._BITMASK[BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE]; // Put the bits in the head of byte
                remainingValue >>= countBitsToPutLastByte; // Prune remaining data
                endByteIndex--;
            }
            for (; endByteIndex > beginByteIndex; endByteIndex--) {
                // Now put the full bytes into the buffer
                this._buffer[endByteIndex] = 0; // Clear byte
                this._buffer[endByteIndex] |= remainingValue & BitStreamAbstract_1.BitStreamAbstract._BITMASK[BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE]; // Put next byte
                remainingValue >>>= BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE;
            }
            // endByteIndex is now equal to beginByteIndex
            // Fill up the first byte with the remaining data
            this._buffer[endByteIndex] &= BitStreamAbstract_1.BitStreamAbstract._COMPLEMENT_MASK[freeBitsFirstByte];
            this._buffer[endByteIndex] |= remainingValue & BitStreamAbstract_1.BitStreamAbstract._BITMASK[freeBitsFirstByte];
        }
        // Adjust internal pointer
        this._currentBit += countBitsToPut;
        return value;
    };
    BitStreamOutput.prototype.getData = function () {
        return this._getData();
    };
    BitStreamOutput.fromValues = function () {
        var bitStreamOutput = new BitStreamOutput();
        bitStreamOutput._createBuffer(BitStreamOutput._DEFAULT_BUFFER_LENGTH);
        bitStreamOutput._currentBit = 0;
        return bitStreamOutput;
    };
    BitStreamOutput.fromLength = function (length) {
        var bitStreamOutput = new BitStreamOutput();
        bitStreamOutput._createBuffer(length);
        bitStreamOutput._currentBit = 0;
        return bitStreamOutput;
    };
    return BitStreamOutput;
}(BitStreamAbstract_1.BitStreamAbstract));
exports.BitStreamOutput = BitStreamOutput;
//# sourceMappingURL=BitStreamOutput.js.map