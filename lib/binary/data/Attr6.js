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

var Attr6 = function (_BinaryInformation) {
    _inherits(Attr6, _BinaryInformation);

    function Attr6() {
        _classCallCheck(this, Attr6);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Attr6).apply(this, arguments));
    }

    _createClass(Attr6, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            bitStreamOutput.putBits(Attr6._RFU_VALUE, Attr6._NR_RFU);
            bitStreamOutput.putBits(this._bear, Attr6._BEAR_BITS);
        }
    }, {
        key: 'equals',
        value: function equals(otherAttr6) {
            return this._bear == otherAttr6._bear;
        }
    }, {
        key: 'bear',
        get: function get() {
            return this._bear;
        }
    }], [{
        key: 'fromValues',


        /** number of bits used for bear */
        value: function fromValues(bear) {
            var attr6 = new Attr6();
            attr6._bear = bear;
            return attr6;
        }

        /** The bearing information. */

        /** number of bits used for lfrcnp */

    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput) {
            var rfu = bitStreamInput.getBits(Attr6._NR_RFU);
            if (rfu != Attr6._RFU_VALUE) {
                throw new Error('RFU in use');
            }
            var attr6 = new Attr6();
            attr6._bear = bitStreamInput.getBits(Attr6._BEAR_BITS);
            return attr6;
        }
    }]);

    return Attr6;
}(_BinaryInformation3.default);

Attr6._NR_RFU = 3;
Attr6._BEAR_BITS = 5;
exports.default = Attr6;
;