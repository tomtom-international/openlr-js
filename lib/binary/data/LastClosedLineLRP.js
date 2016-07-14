'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BinaryInformation2 = require('./BinaryInformation');

var _BinaryInformation3 = _interopRequireDefault(_BinaryInformation2);

var _Attr = require('./Attr5');

var _Attr2 = _interopRequireDefault(_Attr);

var _Attr3 = require('./Attr6');

var _Attr4 = _interopRequireDefault(_Attr3);

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

var LastClosedLineLRP = function (_BinaryInformation) {
    _inherits(LastClosedLineLRP, _BinaryInformation);

    function LastClosedLineLRP() {
        _classCallCheck(this, LastClosedLineLRP);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LastClosedLineLRP).apply(this, arguments));
    }

    _createClass(LastClosedLineLRP, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            this._attrib5.put(bitStreamOutput);
            this._attrib6.put(bitStreamOutput);
        }
    }, {
        key: 'attrib5',
        get: function get() {
            return this._attrib5;
        }
    }, {
        key: 'attrib6',
        get: function get() {
            return this._attrib6;
        }
    }], [{
        key: 'fromValues',
        value: function fromValues(attrib5, attrib6) {
            var lastClosedLineLrp = new LastClosedLineLRP();
            lastClosedLineLrp._attrib5 = attrib5;
            lastClosedLineLrp._attrib6 = attrib6;
            return lastClosedLineLrp;
        }
    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput) {
            var lastClosedLineLrp = new LastClosedLineLRP();
            lastClosedLineLrp._attrib5 = _Attr2.default.fromBitStreamInput(bitStreamInput);
            lastClosedLineLrp._attrib6 = _Attr4.default.fromBitStreamInput(bitStreamInput);
            return lastClosedLineLrp;
        }
    }]);

    return LastClosedLineLRP;
}(_BinaryInformation3.default);

exports.default = LastClosedLineLRP;
;