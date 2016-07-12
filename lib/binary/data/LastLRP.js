'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractLRP2 = require('./AbstractLRP');

var _AbstractLRP3 = _interopRequireDefault(_AbstractLRP2);

var _Attr = require('./Attr1');

var _Attr2 = _interopRequireDefault(_Attr);

var _Attr3 = require('./Attr4');

var _Attr4 = _interopRequireDefault(_Attr3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LastLRP = function (_AbstractLRP) {
    _inherits(LastLRP, _AbstractLRP);

    function LastLRP() {
        _classCallCheck(this, LastLRP);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LastLRP).apply(this, arguments));
    }

    _createClass(LastLRP, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            this.putCoordinates(bitStreamOutput);
            this._attrib1.put(bitStreamOutput);
            this._attrib4.put(bitStreamOutput);
        }
    }, {
        key: 'equals',
        value: function equals(otherFirstLRP) {
            return this._lon == otherFirstLRP._lon && this._lat == otherFirstLRP._lat && this._attrib1.equals(otherFirstLRP._attrib1) && this._attrib4.equals(otherFirstLRP._attrib4);
        }
    }, {
        key: 'attrib4',
        get: function get() {
            return this._attrib4;
        }
    }], [{
        key: 'fromValues',

        /** Number of bits used for coordinates (relative) */
        value: function fromValues(lon, lat, attrib1, attrib4) {
            var lastLrp = new LastLRP();
            lastLrp._coordBits = LastLRP._COORD_BITS;
            lastLrp._lon = lon;
            lastLrp._lat = lat;
            lastLrp._attrib1 = attrib1;
            lastLrp._attrib4 = attrib4;
            return lastLrp;
        }

        /** The attrib4 information. */

    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput) {
            var lastLrp = new LastLRP();
            lastLrp._coordBits = LastLRP._COORD_BITS;
            lastLrp._read(bitStreamInput);
            lastLrp._attrib1 = _Attr2.default.fromBitStreamInput(bitStreamInput);
            lastLrp._attrib4 = _Attr4.default.fromBitStreamInput(bitStreamInput);
            return lastLrp;
        }
    }]);

    return LastLRP;
}(_AbstractLRP3.default);

LastLRP._COORD_BITS = 16;
exports.default = LastLRP;
;