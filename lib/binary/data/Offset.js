'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BinaryInformation2 = require('./BinaryInformation');

var _BinaryInformation3 = _interopRequireDefault(_BinaryInformation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Offset = function (_BinaryInformation) {
    _inherits(Offset, _BinaryInformation);

    function Offset() {
        _classCallCheck(this, Offset);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Offset).apply(this, arguments));
    }

    _createClass(Offset, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            bitStreamOutput.putBits(this._offset, Offset._OFFSET_BITS);
        }
    }, {
        key: 'equals',
        value: function equals(otherOffset) {
            return this._offset == otherOffset._offset;
        }
    }, {
        key: 'offset',
        get: function get() {
            return this._offset;
        }
    }], [{
        key: 'fromValues',

        /** Number of bits used for offset */
        value: function fromValues(offsetValue) {
            var offset = new Offset();
            offset._offset = offsetValue;
            return offset;
        }

        /** The offset information. */

    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput) {
            var offset = new Offset();
            offset._offset = bitStreamInput.getBits(Offset._OFFSET_BITS);
            return offset;
        }
    }]);

    return Offset;
}(_BinaryInformation3.default);

Offset._OFFSET_BITS = 8;
exports.default = Offset;
;