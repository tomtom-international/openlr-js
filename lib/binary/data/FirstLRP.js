'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractLRP2 = require('./AbstractLRP');

var _AbstractLRP3 = _interopRequireDefault(_AbstractLRP2);

var _Attr = require('./Attr1');

var _Attr2 = _interopRequireDefault(_Attr);

var _Attr3 = require('./Attr2');

var _Attr4 = _interopRequireDefault(_Attr3);

var _Attr5 = require('./Attr3');

var _Attr6 = _interopRequireDefault(_Attr5);

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

var FirstLRP = function (_AbstractLRP) {
    _inherits(FirstLRP, _AbstractLRP);

    function FirstLRP() {
        _classCallCheck(this, FirstLRP);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FirstLRP).apply(this, arguments));
    }

    _createClass(FirstLRP, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            this.putCoordinates(bitStreamOutput);
            this._attrib1.put(bitStreamOutput);
            this._attrib2.put(bitStreamOutput);
            this._attrib3.put(bitStreamOutput);
        }
    }, {
        key: 'attrib2',
        get: function get() {
            return this._attrib2;
        }
    }, {
        key: 'attrib3',
        get: function get() {
            return this._attrib3;
        }
    }], [{
        key: 'fromValues',
        value: function fromValues(lon, lat, attrib1, attrib2, attrib3) {
            var firstLrp = new FirstLRP();
            firstLrp._coordBits = FirstLRP._COORD_BITS;
            firstLrp._lon = lon;
            firstLrp._lat = lat;
            firstLrp._attrib1 = attrib1;
            firstLrp._attrib2 = attrib2;
            firstLrp._attrib3 = attrib3;
            return firstLrp;
        }
    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput) {
            var firstLrp = new FirstLRP();
            firstLrp._coordBits = FirstLRP._COORD_BITS;
            firstLrp._read(bitStreamInput);
            firstLrp._attrib1 = _Attr2.default.fromBitStreamInput(bitStreamInput);
            firstLrp._attrib2 = _Attr4.default.fromBitStreamInput(bitStreamInput);
            firstLrp._attrib3 = _Attr6.default.fromBitStreamInput(bitStreamInput);
            return firstLrp;
        }
    }]);

    return FirstLRP;
}(_AbstractLRP3.default);

FirstLRP._COORD_BITS = 24;
exports.default = FirstLRP;
;