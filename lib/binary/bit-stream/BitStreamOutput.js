"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BitStreamAbstract_1 = require("./BitStreamAbstract");
class BitStreamOutput extends BitStreamAbstract_1.default {
    static fromValues() {
        const bitStreamOutput = new BitStreamOutput();
        bitStreamOutput._createBuffer(BitStreamOutput._DEFAULT_BUFFER_LENGTH);
        bitStreamOutput._currentBit = 0;
        return bitStreamOutput;
    }
    static fromLength(length) {
        const bitStreamOutput = new BitStreamOutput();
        bitStreamOutput._createBuffer(length);
        bitStreamOutput._currentBit = 0;
        return bitStreamOutput;
    }
    putBits(value, countBitsToPut) {
        if (countBitsToPut === 0) {
            return value;
        }
        if (countBitsToPut > BitStreamAbstract_1.default._MAX_BIT_SIZE || countBitsToPut < 1) {
            throw new Error('Invalid bit size');
        }
        if ((this._currentBit + countBitsToPut) > (this._totalBufferLengthBytes << BitStreamAbstract_1.default._BIT_BYTE_SHIFT)) {
            this._expandBuffer();
        }
        let endByteIndex = (this._currentBit + countBitsToPut - 1) >>> BitStreamAbstract_1.default._BIT_BYTE_SHIFT;
        const beginByteIndex = this._currentBit >>> BitStreamAbstract_1.default._BIT_BYTE_SHIFT;
        const freeBitsFirstByte = BitStreamAbstract_1.default._BYTE_SIZE - (this._currentBit % BitStreamAbstract_1.default._BYTE_SIZE);
        let remainingValue = value;
        if (freeBitsFirstByte >= countBitsToPut) {
            this._buffer[beginByteIndex] &= BitStreamAbstract_1.default._COMPLEMENT_MASK[freeBitsFirstByte];
            this._buffer[beginByteIndex] |= BitStreamAbstract_1.default._BITMASK[freeBitsFirstByte] & (remainingValue << freeBitsFirstByte - countBitsToPut);
        }
        else {
            const countBitsToPutLastByte = (countBitsToPut - freeBitsFirstByte) % BitStreamAbstract_1.default._BYTE_SIZE;
            if (countBitsToPutLastByte > 0) {
                this._buffer[endByteIndex] = 0;
                this._buffer[endByteIndex] |= (remainingValue << BitStreamAbstract_1.default._BYTE_SIZE - countBitsToPutLastByte) & BitStreamAbstract_1.default._BITMASK[BitStreamAbstract_1.default._BYTE_SIZE];
                remainingValue >>= countBitsToPutLastByte;
                endByteIndex--;
            }
            for (; endByteIndex > beginByteIndex; endByteIndex--) {
                this._buffer[endByteIndex] = 0;
                this._buffer[endByteIndex] |= remainingValue & BitStreamAbstract_1.default._BITMASK[BitStreamAbstract_1.default._BYTE_SIZE];
                remainingValue >>>= BitStreamAbstract_1.default._BYTE_SIZE;
            }
            this._buffer[endByteIndex] &= BitStreamAbstract_1.default._COMPLEMENT_MASK[freeBitsFirstByte];
            this._buffer[endByteIndex] |= remainingValue & BitStreamAbstract_1.default._BITMASK[freeBitsFirstByte];
        }
        this._currentBit += countBitsToPut;
        return value;
    }
    getData() {
        return this._getData();
    }
}
exports.default = BitStreamOutput;
;
//# sourceMappingURL=BitStreamOutput.js.map