"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BitStreamAbstract_1 = require("./BitStreamAbstract");
class BitStreamInput extends BitStreamAbstract_1.default {
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
        if (count > BitStreamAbstract_1.default._MAX_BIT_SIZE || count < 1) {
            throw new Error('Invalid bit size');
        }
        if (this._currentBit + count > this._bufferFilledBytes << BitStreamAbstract_1.default._BIT_BYTE_SHIFT) {
            this._fillBufferFromInput();
        }
        if ((this._totalBufferLengthBytes << BitStreamAbstract_1.default._BIT_BYTE_SHIFT) - this._currentBit < count) {
            throw new Error('Not enough data');
        }
        let returnValue = 0;
        let currentByteIndex = this._currentBit >>> BitStreamAbstract_1.default._BIT_BYTE_SHIFT;
        const endByteIndex = (this._currentBit + count - 1) >>> BitStreamAbstract_1.default._BIT_BYTE_SHIFT;
        const room = BitStreamAbstract_1.default._BYTE_SIZE - (this._currentBit % BitStreamAbstract_1.default._BYTE_SIZE);
        if (room >= count) {
            returnValue = (this._buffer[currentByteIndex] >> room - count) & BitStreamAbstract_1.default._BITMASK[count];
        }
        else {
            const leftover = (this._currentBit + count) % BitStreamAbstract_1.default._BYTE_SIZE;
            returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract_1.default._BITMASK[room];
            for (currentByteIndex++; currentByteIndex < endByteIndex; currentByteIndex++) {
                returnValue <<= BitStreamAbstract_1.default._BYTE_SIZE;
                returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract_1.default._BITMASK[BitStreamAbstract_1.default._BYTE_SIZE];
            }
            if (leftover > 0) {
                returnValue <<= leftover;
                returnValue |= (this._buffer[currentByteIndex] >> (BitStreamAbstract_1.default._BYTE_SIZE - leftover)) & BitStreamAbstract_1.default._BITMASK[leftover];
            }
            else {
                returnValue <<= BitStreamAbstract_1.default._BYTE_SIZE;
                returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract_1.default._BITMASK[BitStreamAbstract_1.default._BYTE_SIZE];
            }
        }
        return returnValue;
    }
    _getNextSignedBits(count) {
        const x = this._getNextBits(count);
        if (count > 1 && ((BitStreamAbstract_1.default._SIGNED_MASK[count] & x) !== 0)) {
            return x | BitStreamAbstract_1.default._COMPLEMENT_MASK[count];
        }
        else {
            return x;
        }
    }
    getBits(count) {
        const x = this._getNextBits(count);
        this._currentBit += count;
        return x;
    }
    getSignedBits(count) {
        const x = this._getNextSignedBits(count);
        this._currentBit += count;
        return x;
    }
    _fillBufferFromInput() {
        const currentByteIndex = this._currentBit >>> BitStreamAbstract_1.default._BIT_BYTE_SHIFT;
        const remainingBytes = this._bufferFilledBytes - currentByteIndex;
        this._buffer.copy(this._buffer, 0, currentByteIndex, this._bufferFilledBytes);
        const maxSizeInBuffer = this._totalBufferLengthBytes - currentByteIndex;
        const bytesReadFromStream = this._inBuffer.copy(this._buffer, remainingBytes, 0, maxSizeInBuffer);
        if (bytesReadFromStream < maxSizeInBuffer) {
            throw new Error('End of Data');
        }
        this._bufferFilledBytes = remainingBytes + bytesReadFromStream;
        this._currentBit &= BitStreamAbstract_1.default._HIGHEST_BIT;
    }
}
exports.default = BitStreamInput;
;
//# sourceMappingURL=BitStreamInput.js.map