"use strict";
/**
 * Copyright 2017 TomTom International B.V
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
Object.defineProperty(exports, "__esModule", { value: true });
var BinaryConstants = require("./BinaryConstants");
var BinaryReturnCode_1 = require("./BinaryReturnCode");
var BitStreamInput_1 = require("./bit-stream/BitStreamInput");
var RawInvalidLocationReference_1 = require("../data/raw-location-reference/RawInvalidLocationReference");
var Header_1 = require("./data/Header");
var LineDecoder_1 = require("./decoder/LineDecoder");
var PointAlongLineDecoder_1 = require("./decoder/PointAlongLineDecoder");
var GeoCoordDecoder_1 = require("./decoder/GeoCoordDecoder");
var PolygonDecoder_1 = require("./decoder/PolygonDecoder");
var CircleDecoder_1 = require("./decoder/CircleDecoder");
var RawBinaryData_1 = require("./data/RawBinaryData");
var BinaryDecoder = /** @class */ (function () {
    function BinaryDecoder() {
    }
    BinaryDecoder.prototype.decodeData = function (locationReference) {
        var data = locationReference.getLocationReferenceData();
        if (data === null) {
            return RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(locationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.NOT_ENOUGH_BYTES);
        }
        else {
            return this._parseBinaryData(locationReference.getId(), data, null);
        }
    };
    BinaryDecoder.prototype.getDataFormatIdentifier = function () {
        return BinaryConstants.IDENTIFIER;
    };
    BinaryDecoder.prototype.resolveBinaryData = function (id, data) {
        var binaryData = new RawBinaryData_1.RawBinaryData();
        this._parseBinaryData(id, data, binaryData);
        return binaryData;
    };
    BinaryDecoder.prototype._checkVersion = function (header) {
        var ver = header.ver;
        for (var _i = 0, _a = BinaryDecoder._VERSIONS; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v === ver) {
                return true;
            }
        }
        return false;
    };
    BinaryDecoder.prototype._parseBinaryData = function (id, data, binaryData) {
        var totalBytes = data.length;
        // Check if enough bytes available
        if (totalBytes < Math.min(BinaryConstants.MIN_BYTES_LINE_LOCATION, Math.min(Math.min(BinaryConstants.MIN_BYTES_POINT_LOCATION, BinaryConstants.MIN_BYTES_POLYGON), BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION))) {
            return RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.NOT_ENOUGH_BYTES);
        }
        // Read in data
        var bitStreamInput = BitStreamInput_1.BitStreamInput.fromBufferAndLength(data, totalBytes);
        var header;
        // Read header information
        try {
            header = Header_1.Header.fromBitStreamInput(bitStreamInput);
            if (binaryData !== null) {
                binaryData.header = header;
            }
        }
        catch (error) {
            return RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.READING_HEADER_FAILURE);
        }
        // Check version
        if (!this._checkVersion(header)) {
            return RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION);
        }
        var isPointLocation = header.pf === BinaryConstants.IS_POINT;
        var hasAttributes = header.af === BinaryConstants.HAS_ATTRIBUTES;
        var areaLocationCode = header.arf;
        var isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
        var rawLocRef = null;
        var decoder = null;
        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            decoder = new LineDecoder_1.LineDecoder();
        }
        else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants.GEOCOORD_SIZE) {
                    decoder = new GeoCoordDecoder_1.GeoCoordDecoder();
                }
                else {
                    rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
                }
            }
            else {
                if (totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    decoder = new PointAlongLineDecoder_1.PointAlongLineDecoder();
                }
                else if (totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    // decoder = new PoiAccessDecoder();
                    throw new Error('PoiAccessDecider not implemented');
                }
                else {
                    rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
                }
            }
        }
        else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION) {
                // decoder = new ClosedLineDecoder();
                throw new Error('ClosedLineDecoder not implemented');
            }
            else {
                rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
            }
        }
        else {
            switch (areaLocationCode) {
                case BinaryConstants.AREA_CODE_CIRCLE:
                    decoder = new CircleDecoder_1.CircleDecoder();
                    break;
                case BinaryConstants.AREA_CODE_RECTANGLE:
                    /* includes case OpenLRBinaryConstants.AREA_CODE_GRID */
                    if (totalBytes === BinaryConstants.RECTANGLE_SIZE || totalBytes === BinaryConstants.LARGE_RECTANGLE_SIZE) {
                        // decoder = new RectangleDecoder();
                        throw new Error('RectangleDecoder not implemented');
                    }
                    else if (totalBytes === BinaryConstants.GRID_SIZE || totalBytes === BinaryConstants.LARGE_GRID_SIZE) {
                        // decoder = new GridDecoder();
                        throw new Error('GridDecoder not implemented');
                    }
                    else {
                        rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
                    }
                    break;
                case BinaryConstants.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants.MIN_BYTES_POLYGON) {
                        decoder = new PolygonDecoder_1.PolygonDecoder();
                    }
                    else {
                        rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
                    }
                    break;
                default:
                    rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_HEADER);
            }
        }
        if (decoder !== null) {
            rawLocRef = decoder.decodeData(id, bitStreamInput, totalBytes, header.ver, binaryData);
        }
        return rawLocRef;
    };
    BinaryDecoder.getVersions = function () {
        return BinaryDecoder._VERSIONS;
    };
    BinaryDecoder._VERSIONS = [2, 3];
    return BinaryDecoder;
}());
exports.BinaryDecoder = BinaryDecoder;
//# sourceMappingURL=BinaryDecoder.js.map