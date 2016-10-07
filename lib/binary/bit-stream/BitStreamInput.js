'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BitStreamAbstract2 = require('./BitStreamAbstract');

var _BitStreamAbstract3 = _interopRequireDefault(_BitStreamAbstract2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 TomTom International B.V
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

var BitStreamInput = function (_BitStreamAbstract) {
    _inherits(BitStreamInput, _BitStreamAbstract);

    function BitStreamInput() {
        _classCallCheck(this, BitStreamInput);

        return _possibleConstructorReturn(this, (BitStreamInput.__proto__ || Object.getPrototypeOf(BitStreamInput)).apply(this, arguments));
    }

    _createClass(BitStreamInput, [{
        key: '_getNextBits',
        value: function _getNextBits(count) {
            if (count == 0) {
                return 0;
            }

            if (count > _BitStreamAbstract3.default._MAX_BIT_SIZE || count < 1) {
                throw new Error('Invalid bit size');
            }

            if (this.position + count > this._bufferFilledBytes << _BitStreamAbstract3.default._BIT_BYTE_SHIFT) {
                // Forward check if we reach the end of the buffer
                this._fillBufferFromInput();
            }

            if ((this._totalBufferLengthBytes << _BitStreamAbstract3.default._BIT_BYTE_SHIFT) - this._currentBit < count) {
                // Check if there is enough data in the buffer (after reading from stream)
                throw new Error('Not enough data');
            }

            var returnValue = 0;
            var currentByteIndex = this._currentBit >>> _BitStreamAbstract3.default._BIT_BYTE_SHIFT;
            var endByteIndex = this._currentBit + count - 1 >>> _BitStreamAbstract3.default._BIT_BYTE_SHIFT;
            var room = _BitStreamAbstract3.default._BYTE_SIZE - this._currentBit % _BitStreamAbstract3.default._BYTE_SIZE; // unread bits in the first byte

            if (room >= count) {
                // The requested value is completely in the first byte so read the data
                returnValue = this._buffer[currentByteIndex] >> room - count & _BitStreamAbstract3.default._BITMASK[count];
            } else {
                // Leftover bits in the last byte
                var leftover = (this._currentBit + count) % _BitStreamAbstract3.default._BYTE_SIZE;
                returnValue |= this._buffer[currentByteIndex] & _BitStreamAbstract3.default._BITMASK[room];

                // Now iterate byte-wise, stop before last byte
                for (currentByteIndex++; currentByteIndex < endByteIndex; currentByteIndex++) {
                    // Shift return value
                    returnValue <<= _BitStreamAbstract3.default._BYTE_SIZE;
                    // and put the bits read instead (full byte)
                    returnValue |= this._buffer[currentByteIndex] & _BitStreamAbstract3.default._BITMASK[_BitStreamAbstract3.default._BYTE_SIZE];
                }
                // Now deal with the last part
                if (leftover > 0) {
                    returnValue <<= leftover; // Make room for remaining bits
                    returnValue |= this._buffer[currentByteIndex] >> _BitStreamAbstract3.default._BYTE_SIZE - leftover & _BitStreamAbstract3.default._BITMASK[leftover];
                } else {
                    // Last byte will be read completely
                    returnValue <<= _BitStreamAbstract3.default._BYTE_SIZE;
                    returnValue |= this._buffer[currentByteIndex] & _BitStreamAbstract3.default._BITMASK[_BitStreamAbstract3.default._BYTE_SIZE];
                }
            }
            return returnValue;
        }
    }, {
        key: '_getNextSignedBits',
        value: function _getNextSignedBits(count) {
            // Get the (unsigned) bits
            var x = this._getNextBits(count);
            // Check if the number read is negative?
            if (count > 1 && (_BitStreamAbstract3.default._SIGNED_MASK[count] & x) != 0) {
                // Number is negative so transform into an integer including the sign
                return x | _BitStreamAbstract3.default._COMPLEMENT_MASK[count];
            } else {
                // Number is positive, no transformation needed
                return x;
            }
        }
    }, {
        key: 'getBits',
        value: function getBits(count) {
            // Get the bits
            var x = this._getNextBits(count);
            // Adjust the bit pointers
            this._currentBit += count;
            return x;
        }
    }, {
        key: 'getSignedBits',
        value: function getSignedBits(count) {
            // Get the (signed) bits
            var x = this._getNextSignedBits(count);
            // Adjust the bit pointers
            this._currentBit += count;
            return x;
        }
    }, {
        key: '_fillBufferFromInput',
        value: function _fillBufferFromInput() {
            var currentByteIndex = this._currentBit >>> _BitStreamAbstract3.default._BIT_BYTE_SHIFT; // Current byte offset
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
            this._currentBit &= _BitStreamAbstract3.default._HIGHEST_BIT;
        }
    }], [{
        key: 'fromString',
        value: function fromString(string, encoding) {
            var bitStreamInput = new BitStreamInput();
            bitStreamInput._inBuffer = Buffer.from(string, encoding);
            bitStreamInput._createBuffer(bitStreamInput._inBuffer.length);
            bitStreamInput._currentBit = 0;
            bitStreamInput._bufferFilledBytes = 0;
            bitStreamInput._fillBufferFromInput();
            return bitStreamInput;
        }
    }, {
        key: 'fromStringAndLength',
        value: function fromStringAndLength(string, encoding, length) {
            var bitStreamInput = new BitStreamInput();
            bitStreamInput._inBuffer = Buffer.from(string, encoding);
            bitStreamInput._createBuffer(length);
            bitStreamInput._currentBit = 0;
            bitStreamInput._bufferFilledBytes = 0;
            bitStreamInput._fillBufferFromInput();
            return bitStreamInput;
        }
    }, {
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            var bitStreamInput = new BitStreamInput();
            bitStreamInput._inBuffer = buffer;
            bitStreamInput._createBuffer(buffer.length);
            bitStreamInput._currentBit = 0;
            bitStreamInput._bufferFilledBytes = 0;
            bitStreamInput._fillBufferFromInput();
            return bitStreamInput;
        }
    }, {
        key: 'fromBufferAndLength',
        value: function fromBufferAndLength(buffer, length) {
            var bitStreamInput = new BitStreamInput();
            bitStreamInput._inBuffer = buffer;
            bitStreamInput._createBuffer(length);
            bitStreamInput._currentBit = 0;
            bitStreamInput._bufferFilledBytes = 0;
            bitStreamInput._fillBufferFromInput();
            return bitStreamInput;
        }
    }]);

    return BitStreamInput;
}(_BitStreamAbstract3.default);

exports.default = BitStreamInput;
;