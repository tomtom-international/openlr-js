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

var Attr1 = function (_BinaryInformation) {
    _inherits(Attr1, _BinaryInformation);

    function Attr1() {
        _classCallCheck(this, Attr1);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Attr1).apply(this, arguments));
    }

    _createClass(Attr1, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            bitStreamOutput.putBits(this._sideOrOrientation, Attr1._SIDE_OR_ORIENTATION_BITS);
            bitStreamOutput.putBits(this._frc, Attr1._FRC_BITS);
            bitStreamOutput.putBits(this._fow, Attr1._FOW_BITS);
        }
    }, {
        key: 'frc',
        get: function get() {
            return this._frc;
        }
    }, {
        key: 'fow',
        get: function get() {
            return this._fow;
        }
    }, {
        key: 'sideOrOrientation',
        get: function get() {
            return this._sideOrOrientation;
        }
    }], [{
        key: 'fromValues',


        /** The form of way information. */


        /** Number of bits used for fow */

        /** The Constant SIDE_OR_ORIENTATION_BITS. */
        value: function fromValues(frc, fow, sideOrOrientation) {
            var attr1 = new Attr1();
            attr1._frc = frc;
            attr1._fow = fow;
            attr1._sideOrOrientation = sideOrOrientation;
            return attr1;
        }

        /** The side or orientation. */


        /** The functional road class information. */


        /** Number of bits used for frc */

    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput) {
            var attr1 = new Attr1();
            attr1._sideOrOrientation = bitStreamInput.getBits(Attr1._SIDE_OR_ORIENTATION_BITS);
            attr1._frc = bitStreamInput.getBits(Attr1._FRC_BITS);
            attr1._fow = bitStreamInput.getBits(Attr1._FOW_BITS);
            return attr1;
        }
    }]);

    return Attr1;
}(_BinaryInformation3.default);

Attr1._SIDE_OR_ORIENTATION_BITS = 2;
Attr1._FRC_BITS = 3;
Attr1._FOW_BITS = 3;
exports.default = Attr1;
;