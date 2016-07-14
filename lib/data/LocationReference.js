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

var _BinaryDecoder = require('../binary/BinaryDecoder');

var _BinaryDecoder2 = _interopRequireDefault(_BinaryDecoder);

var _BitStreamInput = require('../binary/bit-stream/BitStreamInput');

var _BitStreamInput2 = _interopRequireDefault(_BitStreamInput);

var _Header = require('../binary/data/Header');

var _Header2 = _interopRequireDefault(_Header);

var _BinaryConstants = require('../binary/BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

var _LocationType = require('./LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocationReference = function () {
    function LocationReference() {
        _classCallCheck(this, LocationReference);
    }

    _createClass(LocationReference, [{
        key: 'getReturnCode',
        value: function getReturnCode() {
            return this._returnCode;
        }
    }, {
        key: 'getId',
        value: function getId() {
            return this._id;
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return this._returnCode == null;
        }
    }, {
        key: 'getDataIdentifier',
        value: function getDataIdentifier() {
            return _BinaryConstants2.default.IDENTIFIER;
        }
    }, {
        key: 'getLocationReferenceData',
        value: function getLocationReferenceData() {
            if (this.isValid()) {
                return this._data;
            } else {
                return null;
            }
        }
    }, {
        key: 'getLocationType',
        value: function getLocationType() {
            return this._locationType;
        }
    }, {
        key: 'getVersion',
        value: function getVersion() {
            return this._version;
        }
    }], [{
        key: 'fromIdAndBuffer',


        /** The version. */


        /** The error. */

        /** The unique id. */
        value: function fromIdAndBuffer(id, data) {
            var locationReference = new LocationReference();
            locationReference._id = id;
            locationReference._data = data;
            locationReference._returnCode = null;
            locationReference._locationType = LocationReference._resolveLocationType(data);
            var version = LocationReference._resolveVersion(data);
            if (!LocationReference._checkVersion(version)) {
                throw new Error('Invalid version');
            }
            locationReference._version = version;
            return locationReference;
        }

        /** The Constant VERSION_MASK. */


        /** The binary location reference data. Implemented as a Node JS buffer. */


        /** The loc type. */

    }, {
        key: 'fromValues',
        value: function fromValues(id, returnCode, locationType, version) {
            var locationReference = new LocationReference();
            locationReference._id = id;
            locationReference._data = null;
            locationReference._returnCode = returnCode;
            locationReference._locationType = locationType;
            locationReference._version = version;
            return locationReference;
        }
    }, {
        key: '_checkVersion',
        value: function _checkVersion(ver) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _BinaryDecoder2.default.getVersions()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;

                    if (ver == v) {
                        return true;
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

            return false;
        }
    }, {
        key: '_resolveVersion',
        value: function _resolveVersion(data) {
            if (data == null || data.length == 0) {
                throw new Error('Invalid binary data');
            }
            return data[0] & LocationReference._VERSION_MASK;
        }
    }, {
        key: '_resolveLocationType',
        value: function _resolveLocationType(data) {
            var locationType = null;
            var totalBytes = data.length;
            var bitStreamInput = _BitStreamInput2.default.fromBufferAndLength(data, totalBytes);
            var header = _Header2.default.fromBitStreamInput(bitStreamInput);
            var hasAttributes = header.af == _BinaryConstants2.default.HAS_ATTRIBUTES;
            var isPointLocation = header.pf == _BinaryConstants2.default.IS_POINT;
            var areaLocationCode = header.arf;
            var isAreaLocation = areaLocationCode == 0 && !isPointLocation && !hasAttributes || areaLocationCode > 0;

            if (!isPointLocation && !isAreaLocation && hasAttributes) {
                locationType = _LocationType2.default.LINE_LOCATION;
            } else if (isPointLocation && !isAreaLocation) {
                if (!hasAttributes) {
                    if (totalBytes == _BinaryConstants2.default.GEOCOORD_SIZE) {
                        locationType = _LocationType2.default.GEO_COORDINATES;
                    } else {
                        throw new Error('Byte size does not match geo coordinate location');
                    }
                } else {
                    if (totalBytes == _BinaryConstants2.default.POINT_ALONG_LINE_SIZE || totalBytes == _BinaryConstants2.default.POINT_ALONG_LINE_SIZE + _BinaryConstants2.default.POINT_OFFSET_SIZE) {
                        locationType = _LocationType2.default.POINT_ALONG_LINE;
                    } else if (totalBytes == _BinaryConstants2.default.POINT_WITH_ACCESS_SIZE || totalBytes == _BinaryConstants2.default.POINT_WITH_ACCESS_SIZE + _BinaryConstants2.default.POINT_OFFSET_SIZE) {
                        locationType = _LocationType2.default.POI_WITH_ACCESS_POINT;
                    } else {
                        throw new Error('Bye size does not match point location');
                    }
                }
            } else if (isAreaLocation && !isPointLocation && hasAttributes) {
                if (totalBytes >= _BinaryConstants2.default.MIN_BYTES_CLOSED_LINE_LOCATION) {
                    locationType = _LocationType2.default.CLOSED_LINE;
                } else {
                    throw new Error('Byte size does not match closed line location');
                }
            } else {
                switch (areaLocationCode) {
                    case _BinaryConstants2.default.AREA_CODE_CIRCLE:
                        locationType = _LocationType2.default.CIRCLE;
                        break;
                    case _BinaryConstants2.default.AREA_CODE_RECTANGLE:
                        /* Includes case BinaryConstants.AREA_CODE_GRID */
                        if (totalBytes == _BinaryConstants2.default.RECTANGLE_SIZE || totalBytes == _BinaryConstants2.default.LARGE_RECTANGLE_SIZE) {
                            locationType = _LocationType2.default.RECTANGLE;
                        } else if (totalBytes == _BinaryConstants2.default.GRID_SIZE || totalBytes == _BinaryConstants2.default.LARGE_GRID_SIZE) {
                            locationType = _LocationType2.default.GRID;
                        } else {
                            throw new Error('Byte size does not match area rectangle location');
                        }
                        break;
                    case _BinaryConstants2.default.AREA_CODE_POLYGON:
                        if (!hasAttributes && totalBytes >= _BinaryConstants2.default.MIN_BYTES_POLYGON) {
                            locationType = _LocationType2.default.POLYGON;
                        } else {
                            throw new Error('Byte size does not match polygon location');
                        }
                        break;
                    default:
                        throw new Error('Byte size does not match area location');
                }
            }
            return locationType;
        }
    }]);

    return LocationReference;
}();

LocationReference._VERSION_MASK = 7;
exports.default = LocationReference;
;