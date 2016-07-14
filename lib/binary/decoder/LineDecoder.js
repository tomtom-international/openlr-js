'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractDecoder2 = require('./AbstractDecoder');

var _AbstractDecoder3 = _interopRequireDefault(_AbstractDecoder2);

var _BinaryConstants = require('../BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

var _FirstLRP = require('../data/FirstLRP');

var _FirstLRP2 = _interopRequireDefault(_FirstLRP);

var _IntermediateLRP = require('../data/IntermediateLRP');

var _IntermediateLRP2 = _interopRequireDefault(_IntermediateLRP);

var _LastLRP = require('../data/LastLRP');

var _LastLRP2 = _interopRequireDefault(_LastLRP);

var _Offset = require('../data/Offset');

var _Offset2 = _interopRequireDefault(_Offset);

var _Offsets = require('../../data/Offsets');

var _Offsets2 = _interopRequireDefault(_Offsets);

var _RawLineLocationReference = require('../../data/raw-location-reference/RawLineLocationReference');

var _RawLineLocationReference2 = _interopRequireDefault(_RawLineLocationReference);

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

var LineDecoder = function (_AbstractDecoder) {
    _inherits(LineDecoder, _AbstractDecoder);

    function LineDecoder() {
        _classCallCheck(this, LineDecoder);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LineDecoder).apply(this, arguments));
    }

    _createClass(LineDecoder, [{
        key: 'decodeData',
        value: function decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
            // Calculate number of intermediates (integer division: get rid of possible offset information)
            var nrIntermediates = (totalBytes - _BinaryConstants2.default.MIN_BYTES_LINE_LOCATION) / _BinaryConstants2.default.LRP_SIZE;

            // Read first location reference point
            var firstLRP = _FirstLRP2.default.fromBitStreamInput(bitStreamInput);

            // Read intermediate location reference points
            var intermediates = [];
            for (var i = 0; i < nrIntermediates; i++) {
                var lrp = _IntermediateLRP2.default.fromBitStreamInput(bitStreamInput);
                intermediates.push(lrp);
            }

            var lastLRP = _LastLRP2.default.fromBitStreamInput(bitStreamInput);

            var posOff = null;
            var negOff = null;
            // Check for positive offset and read in
            if (lastLRP.attrib4.pOffsetF == _BinaryConstants2.default.HAS_OFFSET) {
                posOff = _Offset2.default.fromBitStreamInput(bitStreamInput);
            }
            // Check for negative offset and read in
            if (lastLRP.attrib4.nOffsetF == _BinaryConstants2.default.HAS_OFFSET) {
                negOff = _Offset2.default.fromBitStreamInput(bitStreamInput);
            }
            var offsets = _Offsets2.default.fromValues(0, 0);
            if (version == _BinaryConstants2.default.BINARY_VERSION_2) {
                var pOffValue = 0;
                var nOffValue = 0;
                if (posOff != null) {
                    pOffValue = this._calculateDistanceEstimate(posOff.offset);
                }
                if (negOff != null) {
                    nOffValue = this._calculateDistanceEstimate(negOff.offset);
                }
                offsets = _Offsets2.default.fromValues(pOffValue, nOffValue);
            } else if (version == _BinaryConstants2.default.BINARY_VERSION_3) {
                var _pOffValue = 0;
                var _nOffValue = 0;
                if (posOff != null) {
                    _pOffValue = this._calculateRelativeDistance(posOff.offset);
                }
                if (negOff != null) {
                    _nOffValue = this._calculateRelativeDistance(negOff.offset);
                }
                offsets = new _Offsets2.default.fromRelativeValues(_pOffValue, _nOffValue);
            }
            var lrpCount = 1;
            var points = [];
            var p = this._createFirstLRP(lrpCount, firstLRP);
            lrpCount++;
            points.push(p);
            var prevLon = p.getLongitudeDeg();
            var prevLat = p.getLatitudeDeg();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = intermediates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var intermediate = _step.value;

                    var intermediatePoint = this._createIntermediateLRPFromLatitudeLongitude(lrpCount, intermediate, prevLon, prevLat);
                    lrpCount++;
                    points.push(intermediatePoint);
                    prevLon = intermediatePoint.getLongitudeDeg();
                    prevLat = intermediatePoint.getLatitudeDeg();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var lp = this._createLastLRP(lrpCount, lastLRP, prevLon, prevLat);
            points.push(lp);
            var rawLocRef = _RawLineLocationReference2.default.fromValues(id, points, offsets);
            if (binaryData != null) {
                binaryData.negOffset = negOff;
                binaryData.posOffset = posOff;
                binaryData.lastLRP = lastLRP;
                binaryData.intermediates = intermediates;
                binaryData.firstLRP = firstLRP;
            }
            return rawLocRef;
        }
    }]);

    return LineDecoder;
}(_AbstractDecoder3.default);

exports.default = LineDecoder;
;