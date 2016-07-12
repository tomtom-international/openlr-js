'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BinaryConstants = require('./BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

var _BinaryReturnCode = require('./BinaryReturnCode');

var _BinaryReturnCode2 = _interopRequireDefault(_BinaryReturnCode);

var _BitStreamInput = require('./bit-stream/BitStreamInput');

var _BitStreamInput2 = _interopRequireDefault(_BitStreamInput);

var _RawInvalidLocationReference = require('../data/raw-location-reference/RawInvalidLocationReference');

var _RawInvalidLocationReference2 = _interopRequireDefault(_RawInvalidLocationReference);

var _Header = require('./data/Header');

var _Header2 = _interopRequireDefault(_Header);

var _LineDecoder = require('./decoder/LineDecoder');

var _LineDecoder2 = _interopRequireDefault(_LineDecoder);

var _RawBinaryData = require('./data/RawBinaryData');

var _RawBinaryData2 = _interopRequireDefault(_RawBinaryData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryDecoder = function () {
    function BinaryDecoder() {
        _classCallCheck(this, BinaryDecoder);
    }

    _createClass(BinaryDecoder, [{
        key: '_checkVersion',
        value: function _checkVersion(header) {
            var ver = header.ver;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = BinaryDecoder._VERSIONS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;

                    if (v == ver) {
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
        key: '_parseBinaryData',
        value: function _parseBinaryData(id, data, binaryData) {
            var totalBytes = data.length;

            // Check if enough bytes available
            if (totalBytes < Math.min(_BinaryConstants2.default.MIN_BYTES_LINE_LOCATION, Math.min(Math.min(_BinaryConstants2.default.MIN_BYTES_POINT_LOCATION, _BinaryConstants2.default.MIN_BYTES_POLYGON), _BinaryConstants2.default.MIN_BYTES_CLOSED_LINE_LOCATION))) {
                return _RawInvalidLocationReference2.default.fromIdAndStatusCode(id, _BinaryReturnCode2.default.NOT_ENOUGH_BYTES);
            }

            // Read in data
            var bitStreamInput = _BitStreamInput2.default.fromBufferAndLength(data, totalBytes);
            var header = void 0;
            // Read header information
            try {
                header = _Header2.default.fromBitStreamInput(bitStreamInput);
                if (binaryData != null) {
                    binaryData.header = header;
                }
            } catch (error) {
                return _RawInvalidLocationReference2.default.fromIdAndStatusCode(id, _BinaryReturnCode2.default.READING_HEADER_FAILURE);
            }

            // Check version
            if (!this._checkVersion(header)) {
                return _RawInvalidLocationReference2.default.fromIdAndStatusCode(id, _BinaryReturnCode2.default.INVALID_VERSION);
            }

            var isPointLocation = header.pf == _BinaryConstants2.default.IS_POINT;
            var hasAttributes = header.af == _BinaryConstants2.default.HAS_ATTRIBUTES;
            var areaLocationCode = header.arf;
            var isAreaLocation = areaLocationCode == 0 && !isPointLocation && !hasAttributes || areaLocationCode > 0;
            var rawLocRef = null;
            var decoder = null;
            if (!isPointLocation && !isAreaLocation && hasAttributes) {
                decoder = new _LineDecoder2.default();
            } else if (isPointLocation && !isAreaLocation) {
                if (!hasAttributes) {
                    if (totalBytes == _BinaryConstants2.default.GEOCOORD_SIZE) {
                        //decoder = new GeoCoordDecoder();
                        throw new Error('GeoCoordDecoder not implemented');
                    } else {
                        rawLocRef = _RawInvalidLocationReference2.default.fromIdAndStatusCode(id, _BinaryReturnCode2.default.INVALID_BYTE_SIZE);
                    }
                } else {
                    if (totalBytes == _BinaryConstants2.default.POINT_ALONG_LINE_SIZE || totalBytes == _BinaryConstants2.default.POINT_ALONG_LINE_SIZE + _BinaryConstants2.default.POINT_OFFSET_SIZE) {
                        //decoder = new PointAlongDecoder();
                        throw new Error('PointAlonDecoder not implemented');
                    } else if (totalBytes == _BinaryConstants2.default.POINT_WITH_ACCESS_SIZE || totalBytes == _BinaryConstants2.default.POINT_WITH_ACCESS_SIZE + _BinaryConstants2.default.POINT_OFFSET_SIZE) {
                        //decoder = new PoiAccessDecoder();
                        throw new Error('PoiAccessDecider not implemented');
                    } else {
                        rawLocRef = _RawInvalidLocationReference2.default.fromIdAndStatusCode(id, _BinaryReturnCode2.default.INVALID_BYTE_SIZE);
                    }
                }
            } else if (isAreaLocation && !isPointLocation && hasAttributes) {
                if (totalBytes >= _BinaryConstants2.default.MIN_BYTES_CLOSED_LINE_LOCATION) {
                    //decoder = new ClosedLineDecoder();
                    throw new Error('ClosedLineDecoder not implemented');
                } else {
                    rawLocRef = _RawInvalidLocationReference2.default.fromIdAndStatusCode(id, _BinaryReturnCode2.default.INVALID_BYTE_SIZE);
                }
            } else {
                switch (areaLocationCode) {
                    case _BinaryConstants2.default.AREA_CODE_CIRCLE:
                        //decoder = new CircleDecoder();
                        throw new Error('CircleDecoder not implemented');
                        break;
                    case _BinaryConstants2.default.AREA_CODE_RECTANGLE:
                        /* includes case OpenLRBinaryConstants.AREA_CODE_GRID */
                        if (totalBytes == _BinaryConstants2.default.RECTANGLE_SIZE || totalBytes == _BinaryConstants2.default.LARGE_RECTANGLE_SIZE) {
                            //decoder = new RectangleDecoder();
                            throw new Error('RectangleDecoder not implemented');
                        } else if (totalBytes == _BinaryConstants2.default.GRID_SIZE || totalBytes == _BinaryConstants2.default.LARGE_GRID_SIZE) {
                            //decoder = new GridDecoder();
                            throw new Error('GridDecoder not implemented');
                        } else {
                            rawLocRef = _RawInvalidLocationReference2.default.fromIdAndStatusCode(id, _BinaryReturnCode2.default.INVALID_BYTE_SIZE);
                        }
                        break;
                    case _BinaryConstants2.default.AREA_CODE_POLYGON:
                        if (!hasAttributes && totalBytes >= _BinaryConstants2.default.MIN_BYTES_POLYGON) {
                            //decoder = new PolygonDecoder();
                            throw new Error('PolygonDecoder not implemented');
                        } else {
                            rawLocRef = _RawInvalidLocationReference2.default.fromIdAndStatusCode(id, _BinaryReturnCode2.default.INVALID_BYTE_SIZE);
                        }
                        break;
                    default:
                        rawLocRef = _RawInvalidLocationReference2.default.fromIdAndStatusCode(id, _BinaryReturnCode2.default.INVALID_HEADER);
                }
            }
            if (decoder != null) {
                rawLocRef = decoder.decodeData(id, bitStreamInput, totalBytes, header.ver, binaryData);
            }
            return rawLocRef;
        }
    }, {
        key: 'decodeData',
        value: function decodeData(locationReference) {
            return this._parseBinaryData(locationReference.getId(), locationReference.getLocationReferenceData(), null);
        }
    }, {
        key: 'getDataFormatIdentifier',
        value: function getDataFormatIdentifier() {
            return _BinaryConstants2.default.IDENTIFIER;
        }
    }, {
        key: 'resolveBinaryData',
        value: function resolveBinaryData(id, data) {
            var binaryData = new _RawBinaryData2.default();
            this._parseBinaryData(id, data, binaryData);
            return binaryData;
        }
    }], [{
        key: 'getVersions',
        value: function getVersions() {
            return BinaryDecoder._VERSIONS;
        }
    }]);

    return BinaryDecoder;
}();

BinaryDecoder._VERSIONS = [2, 3];
exports.default = BinaryDecoder;
;