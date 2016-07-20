'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
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

var _BinaryConstants = require('./BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

var _LocationReference = require('../data/LocationReference');

var _LocationReference2 = _interopRequireDefault(_LocationReference);

var _BinaryReturnCode = require('./BinaryReturnCode');

var _BinaryReturnCode2 = _interopRequireDefault(_BinaryReturnCode);

var _LocationType = require('../data/LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

var _LineEncoder = require('./encoder/LineEncoder');

var _LineEncoder2 = _interopRequireDefault(_LineEncoder);

var _PointAlongLineEncoder = require('./encoder/PointAlongLineEncoder');

var _PointAlongLineEncoder2 = _interopRequireDefault(_PointAlongLineEncoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryEncoder = function () {
    function BinaryEncoder() {
        _classCallCheck(this, BinaryEncoder);
    }

    _createClass(BinaryEncoder, [{
        key: '_checkVersion',
        value: function _checkVersion(version, locationType) {
            var valid = false;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = BinaryEncoder._VERSIONS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var ver = _step.value;

                    if (version == ver) {
                        valid = true;
                    }
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

            if (_BinaryConstants2.default.POINT_LOCATION_TYPES.has(locationType) && version < _BinaryConstants2.default.POINT_LOCATION_VERSION) {
                valid = false;
            }
            if (_BinaryConstants2.default.AREA_LOCATION_TYPES.has(locationType) && version < _BinaryConstants2.default.AREA_LOCATION_VERSION) {
                valid = false;
            }
            return valid;
        }
        /** The Constant VERSIONS. */

    }, {
        key: 'getDataFormatIdentifier',
        value: function getDataFormatIdentifier() {
            return _BinaryConstants2.default.IDENTIFIER;
        }
    }, {
        key: 'getSupportedVersions',
        value: function getSupportedVersions() {
            return BinaryEncoder._VERSIONS;
        }
    }, {
        key: 'encodeDataFromRLR',
        value: function encodeDataFromRLR(rawLocationReference) {
            return this.encodeDataFromRLRAndVersion(rawLocationReference, BinaryEncoder._VERSIONS[BinaryEncoder._VERSIONS.length - 1]);
        }
    }, {
        key: 'encodeDataFromRLRAndVersion',
        value: function encodeDataFromRLRAndVersion(rawLocationReference, version) {
            var locationType = rawLocationReference.getLocationType();
            if (!this._checkVersion(version, locationType)) {
                return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.INVALID_VERSION, locationType, version);
            }
            var encoder = null;
            switch (locationType) {
                case _LocationType2.default.GEO_COORDINATES:
                    //encoder = new GeoCoordEncoder();
                    throw new Error('GeoCoordEncoder not implemented');
                    break;
                case _LocationType2.default.LINE_LOCATION:
                    encoder = new _LineEncoder2.default();
                    break;
                case _LocationType2.default.POI_WITH_ACCESS_POINT:
                    //encoder = new PoiAccessEncoder();
                    throw new Error('PoiAccessEncoder not implemented');
                    break;
                case _LocationType2.default.POINT_ALONG_LINE:
                    encoder = new _PointAlongLineEncoder2.default();
                    break;
                case _LocationType2.default.CIRCLE:
                    //encoder = new CircleEncoder();
                    throw new Error('CircleEncoder not implemented');
                    break;
                case _LocationType2.default.RECTANGLE:
                    //encoder = new RectangleEncoder();
                    throw new Error('RectangleEncoder not implemented');
                    break;
                case _LocationType2.default.GRID:
                    //encoder = new GridEncoder();
                    throw new Error('GridEncoder not implemented');
                    break;
                case _LocationType2.default.POLYGON:
                    //encoder = new PolygonEncoder();
                    throw new Error('PolygonEncoder not implemented');
                    break;
                case _LocationType2.default.CLOSED_LINE:
                    //encoder = new ClosedLineEncoder();
                    throw new Error('ClosedLineEncoder not implemented');
                    break;
                case _LocationType2.default.UNKNOWN:
                default:
                    return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.UNKNOWN_LOCATION_TYPE, locationType, version);
            }
            return encoder.encodeData(rawLocationReference, version);
        }
    }]);

    return BinaryEncoder;
}();

BinaryEncoder._VERSIONS = [2, 3];
exports.default = BinaryEncoder;
;