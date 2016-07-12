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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BitStreamOutput = function (_BitStreamAbstract) {
    _inherits(BitStreamOutput, _BitStreamAbstract);

    function BitStreamOutput() {
        _classCallCheck(this, BitStreamOutput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BitStreamOutput).apply(this, arguments));
    }

    _createClass(BitStreamOutput, [{
        key: 'putBits',
        value: function putBits(value, countBitsToPut) {
            // Sanity check
            if (countBitsToPut == 0) {
                return value;
            }
            if (countBitsToPut > _BitStreamAbstract3.default._MAX_BIT_SIZE || countBitsToPut < 1) {
                throw new Error('Invalid bit size');
            }

            // Make sure we have enough room
            if (this._currentBit + countBitsToPut > this._totalBufferLengthBytes << _BitStreamAbstract3.default._BIT_BYTE_SHIFT) {
                this._expandBuffer();
            }

            var endByteIndex = this._currentBit + countBitsToPut - 1 >>> _BitStreamAbstract3.default._BIT_BYTE_SHIFT; // End byte position
            var beginByteIndex = this._currentBit >>> _BitStreamAbstract3.default._BIT_BYTE_SHIFT; // Current byte position
            var freeBitsFirstByte = _BitStreamAbstract3.default._BYTE_SIZE - this._currentBit % _BitStreamAbstract3.default._BYTE_SIZE; // Room in the first byte of the buffer
            var remainingValue = value;

            if (freeBitsFirstByte >= countBitsToPut) {
                // Value fits into the first byte
                // Reset free bits (remove old data)
                buffer[beginByteIndex] &= _BitStreamAbstract3.default._COMPLEMENT_MASK[freeBitsFirstByte];
                // Insert the value into the free bits
                buffer[beginByteIndex] |= _BitStreamAbstract3.default._BITMASK[freeBitsFirstByte] & remainingValue << freeBitsFirstByte - countBitsToPut;
            } else {
                // Value does not fit into the first byte
                var countBitsToPutLastByte = (countBitsToPut - freeBitsFirstByte) % _BitStreamAbstract3.default._BYTE_SIZE; // Number of bits to put in the last byte
                if (countBitsToPutLastByte > 0) {
                    // There will be a rest to put into an additional byte (complete buffer will not be aligned)
                    buffer[endByteIndex] = 0; // Clear byte
                    buffer[endByteIndex] |= remainingValue << _BitStreamAbstract3.default._BYTE_SIZE - countBitsToPutLastByte & _BitStreamAbstract3.default._BITMASK[_BitStreamAbstract3.default._BYTE_SIZE]; // Put the bits in the head of byte
                    remainingValue >>= countBitsToPutLastByte; // Prune remaining data
                    endByteIndex--;
                }
                for (; endByteIndex > beginByteIndex; endByteIndex--) {
                    // Now put the full bytes into the buffer
                    buffer[endByteIndex] = 0; // Clear byte
                    buffer[endByteIndex] |= remainingValue & _BitStreamAbstract3.default._BITMASK[_BitStreamAbstract3.default._BYTE_SIZE]; // Put next byte
                    remainingValue >>>= _BitStreamAbstract3.default._BYTE_SIZE;
                }
                // endByteIndex is now equal to beginByteIndex
                // Fill up the first byte with the remaining data
                buffer[endByteIndex] &= _BitStreamAbstract3.default._COMPLEMENT_MASK[freeBitsFirstByte];
                buffer[endByteIndex] |= remainingValue & _BitStreamAbstract3.default._BITMASK[freeBitsFirstByte];
            }

            // Adjust internal pointer
            this._currentBit += countBitsToPut;
            return value;
        }
    }], [{
        key: 'fromLength',
        value: function fromLength(length) {
            var bitStreamOutput = new BitStreamOutput();
            bitStreamOutput._createBuffer(length);
            bitStreamOutput._currentBit = 0;
            return bitStreamOutput;
        }
    }]);

    return BitStreamOutput;
}(_BitStreamAbstract3.default);

exports.default = BitStreamOutput;
;