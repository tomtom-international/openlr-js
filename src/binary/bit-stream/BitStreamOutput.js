import BitStreamAbstract from './BitStreamAbstract';

export default class BitStreamOutput extends BitStreamAbstract {
    static fromLength(length) {
        const bitStreamOutput = new BitStreamOutput();
        bitStreamOutput._createBuffer(length);
        bitStreamOutput._currentBit = 0;
        return bitStreamOutput;
    }

    putBits(value, countBitsToPut) {
        // Sanity check
        if (countBitsToPut == 0) {
            return value;
        }
        if (countBitsToPut > BitStreamAbstract._MAX_BIT_SIZE || countBitsToPut < 1) {
            throw new Error('Invalid bit size');
        }

        // Make sure we have enough room
        if ((this._currentBit + countBitsToPut) > (this._totalBufferLengthBytes << BitStreamAbstract._BIT_BYTE_SHIFT)) {
            this._expandBuffer();
        }

        let endByteIndex = (this._currentBit + countBitsToPut - 1) >>> BitStreamAbstract._BIT_BYTE_SHIFT; // End byte position
        const beginByteIndex = this._currentBit >>> BitStreamAbstract._BIT_BYTE_SHIFT; // Current byte position
        const freeBitsFirstByte = BitStreamAbstract._BYTE_SIZE - (this._currentBit % BitStreamAbstract._BYTE_SIZE); // Room in the first byte of the buffer
        let remainingValue = value;

        if (freeBitsFirstByte >= countBitsToPut) {
            // Value fits into the first byte
            // Reset free bits (remove old data)
            buffer[beginByteIndex] &= BitStreamAbstract._COMPLEMENT_MASK[freeBitsFirstByte];
            // Insert the value into the free bits
            buffer[beginByteIndex] |= BitStreamAbstract._BITMASK[freeBitsFirstByte] & (remainingValue << freeBitsFirstByte - countBitsToPut);
        } else {
            // Value does not fit into the first byte
            const countBitsToPutLastByte = (countBitsToPut - freeBitsFirstByte) % BitStreamAbstract._BYTE_SIZE; // Number of bits to put in the last byte
            if (countBitsToPutLastByte > 0) {
                // There will be a rest to put into an additional byte (complete buffer will not be aligned)
                buffer[endByteIndex] = 0; // Clear byte
                buffer[endByteIndex] |= (remainingValue << BitStreamAbstract._BYTE_SIZE - countBitsToPutLastByte) & BitStreamAbstract._BITMASK[BitStreamAbstract._BYTE_SIZE]; // Put the bits in the head of byte
                remainingValue >>= countBitsToPutLastByte; // Prune remaining data
                endByteIndex--;
            }
            for (; endByteIndex > beginByteIndex; endByteIndex--) {
                // Now put the full bytes into the buffer
                buffer[endByteIndex] = 0; // Clear byte
                buffer[endByteIndex] |= remainingValue & BitStreamAbstract._BITMASK[BitStreamAbstract._BYTE_SIZE]; // Put next byte
                remainingValue >>>= BitStreamAbstract._BYTE_SIZE;
            }
            // endByteIndex is now equal to beginByteIndex
            // Fill up the first byte with the remaining data
            buffer[endByteIndex] &= BitStreamAbstract._COMPLEMENT_MASK[freeBitsFirstByte];
            buffer[endByteIndex] |= remainingValue & BitStreamAbstract._BITMASK[freeBitsFirstByte];
        }

        // Adjust internal pointer
        this._currentBit += countBitsToPut;
        return value;
    }
};