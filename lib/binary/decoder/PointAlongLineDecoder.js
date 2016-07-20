'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractDecoder2 = require('./AbstractDecoder');

var _AbstractDecoder3 = _interopRequireDefault(_AbstractDecoder2);

var _FirstLRP = require('../data/FirstLRP');

var _FirstLRP2 = _interopRequireDefault(_FirstLRP);

var _LastLRP = require('../data/LastLRP');

var _LastLRP2 = _interopRequireDefault(_LastLRP);

var _Offset = require('../data/Offset');

var _Offset2 = _interopRequireDefault(_Offset);

var _Offsets = require('../../data/Offsets');

var _Offsets2 = _interopRequireDefault(_Offsets);

var _RawPointAlongLineLocationReference = require('../../data/raw-location-reference/RawPointAlongLineLocationReference');

var _RawPointAlongLineLocationReference2 = _interopRequireDefault(_RawPointAlongLineLocationReference);

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

var PointAlongLineDecoder = function (_AbstractDecoder) {
    _inherits(PointAlongLineDecoder, _AbstractDecoder);

    function PointAlongLineDecoder() {
        _classCallCheck(this, PointAlongLineDecoder);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PointAlongLineDecoder).apply(this, arguments));
    }

    _createClass(PointAlongLineDecoder, [{
        key: 'decodeData',
        value: function decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
            var firstLRP = _FirstLRP2.default.fromBitStreamInput(bitStreamInput);
            var lrp1 = this._createFirstLRP(1, firstLRP);
            var orientation = this._resolveOrientation(firstLRP.attrib1);
            var lastLRP = _LastLRP2.default.fromBitStreamInput(bitStreamInput);
            var lrp2 = this._createLastLRP(2, lastLRP, lrp1.getLongitudeDeg(), lrp1.getLatitudeDeg());
            var sideOfRoad = this._resolveSideOfRoad(lastLRP.attrib1);
            var offsets = _Offsets2.default.fromValues(0, 0);
            var posOff = void 0;
            if (lastLRP.attrib4.pOffsetF == 1) {
                posOff = _Offset2.default.fromBitStreamInput(bitStreamInput);
                var rawLocRef = this._calculateRelativeDistance(posOff.offset);
                offsets = _Offsets2.default.fromRelativeValues(rawLocRef, 0.0);
            }

            var rawLocationReference = _RawPointAlongLineLocationReference2.default.fromValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation);
            if (binaryData != null) {
                binaryData.firstLRP = firstLRP;
                binaryData.lastLRP = lastLRP;
                binaryData.posOffset = posOff;
            }

            return rawLocationReference;
        }
    }]);

    return PointAlongLineDecoder;
}(_AbstractDecoder3.default);

exports.default = PointAlongLineDecoder;
;