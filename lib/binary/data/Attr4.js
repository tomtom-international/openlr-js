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

var Attr4 = function (_BinaryInformation) {
    _inherits(Attr4, _BinaryInformation);

    function Attr4() {
        _classCallCheck(this, Attr4);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Attr4).apply(this, arguments));
    }

    _createClass(Attr4, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            bitStreamOutput.putBits(Attr4._RFU_VALUE, Attr4._RFU_BITS);
            bitStreamOutput.putBits(this._pOffsetF, Attr4._POFFF_BITS);
            bitStreamOutput.putBits(this._nOffsetF, Attr4._NOFFF_BITS);
            bitStreamOutput.putBits(this._bear, Attr4._BEAR_BITS);
        }
    }, {
        key: 'pOffsetF',
        get: function get() {
            return this._pOffsetF;
        }
    }, {
        key: 'nOffsetF',
        get: function get() {
            return this._nOffsetF;
        }
    }, {
        key: 'bear',
        get: function get() {
            return this._bear;
        }
    }], [{
        key: 'fromValues',


        /** The negative offset flag information. */


        /** Number of bits used for bearing */


        /** Number of bits used for positive offset flag */
        value: function fromValues(pOffsetF, nOffsetF, bear) {
            var attr4 = new Attr4();
            attr4._pOffsetF = pOffsetF;
            attr4._nOffsetF = nOffsetF;
            attr4._bear = bear;
            return attr4;
        }

        /** The bearing information. */


        /** The positive offset flag information. */


        /** Number of bits used for negative offset flag */

        /** Number of unused bits */

    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput) {
            var rfu = bitStreamInput.getBits(Attr4._RFU_BITS);
            if (rfu != Attr4._RFU_VALUE) {
                throw new Error('RFU in use');
            }
            var attr4 = new Attr4();
            attr4._pOffsetF = bitStreamInput.getBits(Attr4._POFFF_BITS);
            attr4._nOffsetF = bitStreamInput.getBits(Attr4._NOFFF_BITS);
            attr4._bear = bitStreamInput.getBits(Attr4._BEAR_BITS);
            return attr4;
        }
    }]);

    return Attr4;
}(_BinaryInformation3.default);

Attr4._RFU_BITS = 1;
Attr4._POFFF_BITS = 1;
Attr4._NOFFF_BITS = 1;
Attr4._BEAR_BITS = 5;
exports.default = Attr4;
;