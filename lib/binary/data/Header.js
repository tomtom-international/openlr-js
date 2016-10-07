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

var Header = function (_BinaryInformation) {
    _inherits(Header, _BinaryInformation);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            bitStreamOutput.putBits(_BinaryInformation3.default._RFU_VALUE, Header._RFU_BITS);
            var arf1 = this._arf / 2;
            var arf0 = this._arf % 2;
            bitStreamOutput.putBits(arf1, Header._AREA_FLAG_BIT1);
            bitStreamOutput.putBits(this._pf, Header._POINT_FLAG_BITS);
            bitStreamOutput.putBits(arf0, Header._AREA_FLAG_BIT0);
            bitStreamOutput.putBits(this._af, Header._ATTR_FLAG_BITS);
            bitStreamOutput.putBits(this._ver, Header._VERSION_BITS);
        }
    }, {
        key: 'arf',
        get: function get() {
            return this._arf;
        }
    }, {
        key: 'af',
        get: function get() {
            return this._af;
        }
    }, {
        key: 'pf',
        get: function get() {
            return this._pf;
        }
    }, {
        key: 'ver',
        get: function get() {
            return this._ver;
        }
    }], [{
        key: 'fromValues',


        /** The poflag information */


        /** The area flag information. */


        /** Number of bits used for poflag */
        value: function fromValues(arfValue, afValue, pfValue, verValue) {
            var header = new Header();
            header._arf = arfValue;
            header._af = afValue;
            header._pf = pfValue;
            header._ver = verValue;
            return header;
        }

        /** The version information. */


        /** The attribute flag information. */


        /** Number of bits used for version */


        /** Number of bits used for attributes flag */

    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput) {
            var rfu = bitStreamInput.getBits(Header._RFU_BITS);
            if (rfu != _BinaryInformation3.default._RFU_VALUE) {
                throw new Error('Const value mismatch');
            }
            var header = new Header();
            var arf1 = bitStreamInput.getBits(Header._AREA_FLAG_BIT0);
            header._pf = bitStreamInput.getBits(Header._POINT_FLAG_BITS);
            var arf0 = bitStreamInput.getBits(Header._AREA_FLAG_BIT1);
            header._arf = 2 * arf1 + arf0;
            header._af = bitStreamInput.getBits(Header._ATTR_FLAG_BITS);
            header._ver = bitStreamInput.getBits(Header._VERSION_BITS);
            return header;
        }
    }]);

    return Header;
}(_BinaryInformation3.default);

Header._RFU_BITS = 1;
Header._AREA_FLAG_BIT0 = 1;
Header._AREA_FLAG_BIT1 = 1;
Header._ATTR_FLAG_BITS = 1;
Header._POINT_FLAG_BITS = 1;
Header._VERSION_BITS = 3;
exports.default = Header;
;