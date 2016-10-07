'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractEncoder2 = require('./AbstractEncoder');

var _AbstractEncoder3 = _interopRequireDefault(_AbstractEncoder2);

var _LocationReference = require('../../data/LocationReference');

var _LocationReference2 = _interopRequireDefault(_LocationReference);

var _BinaryReturnCode = require('../BinaryReturnCode');

var _BinaryReturnCode2 = _interopRequireDefault(_BinaryReturnCode);

var _BinaryConstants = require('../BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

var _LocationType = require('../../data/LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

var _BitStreamOutput = require('../bit-stream/BitStreamOutput');

var _BitStreamOutput2 = _interopRequireDefault(_BitStreamOutput);

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

var PointAlongLineEncoder = function (_AbstractEncoder) {
    _inherits(PointAlongLineEncoder, _AbstractEncoder);

    function PointAlongLineEncoder() {
        _classCallCheck(this, PointAlongLineEncoder);

        return _possibleConstructorReturn(this, (PointAlongLineEncoder.__proto__ || Object.getPrototypeOf(PointAlongLineEncoder)).apply(this, arguments));
    }

    _createClass(PointAlongLineEncoder, [{
        key: 'encodeData',
        value: function encodeData(rawLocationReference, version) {
            if (rawLocationReference == null || rawLocationReference.getLocationReferencePoints() == null || rawLocationReference.getLocationReferencePoints().length <= 0) {
                return _LocationReference2.default.fromValues("", _BinaryReturnCode2.default.MISSING_DATA, _LocationType2.default.POINT_ALONG_LINE, version);
            }
            var startLRP = rawLocationReference.getLocationReferencePoints()[0];
            var endLRP = rawLocationReference.getLocationReferencePoints()[1];
            var offsets = rawLocationReference.getOffsets();
            var sideOfRoad = rawLocationReference.getSideOfRoad();
            var orientation = rawLocationReference.getOrientation();
            if (startLRP == null || endLRP == null || offsets == null) {
                return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.MISSING_DATA, _LocationType2.default.POINT_ALONG_LINE, version);
            }
            if (version < _BinaryConstants2.default.BINARY_VERSION_3) {
                return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.INVALID_VERSION, _LocationType2.default.POI_WITH_ACCESS_POINT, version);
            }
            var returnCode = this._checkOffsets(offsets, true, rawLocationReference.getLocationReferencePoints());
            if (!returnCode) {
                return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.INVALID_OFFSET, _LocationType2.default.POINT_ALONG_LINE, version);
            }
            return _LocationReference2.default.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version));
        }
    }, {
        key: '_generateBinaryPointAlongLineLocation',
        value: function _generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version) {
            var header = this._generateHeader(version, _LocationType2.default.POINT_ALONG_LINE, true);
            var first = this._generateFirstLRPFromLRPAndOrientation(startLRP, orientation);
            var lrps = [startLRP, endLRP];
            var pOff = this._generateOffset(offsets, true, version, lrps);
            var last = this._generateLastLrpFromPointsAndOffsetAndSideOfRoad(lrps, pOff, sideOfRoad);
            var out = _BitStreamOutput2.default.fromValues();
            header.put(out);
            first.put(out);
            last.put(out);
            if (pOff != null) {
                pOff.put(out);
            }
            return out.getData();
        }
    }]);

    return PointAlongLineEncoder;
}(_AbstractEncoder3.default);

exports.default = PointAlongLineEncoder;
;