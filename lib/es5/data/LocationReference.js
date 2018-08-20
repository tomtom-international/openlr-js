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
var BinaryDecoder_1 = require("../binary/BinaryDecoder");
var BitStreamInput_1 = require("../binary/bit-stream/BitStreamInput");
var Header_1 = require("../binary/data/Header");
var BinaryConstants = require("../binary/BinaryConstants");
var LocationType_1 = require("./LocationType");
var LocationReference = /** @class */ (function () {
    function LocationReference() {
    }
    LocationReference.prototype.getReturnCode = function () {
        return this._returnCode;
    };
    LocationReference.prototype.getId = function () {
        return this._id;
    };
    LocationReference.prototype.isValid = function () {
        return this._returnCode === null;
    };
    LocationReference.prototype.getDataIdentifier = function () {
        return BinaryConstants.IDENTIFIER;
    };
    LocationReference.prototype.getLocationReferenceData = function () {
        if (this.isValid()) {
            return this._data;
        }
        else {
            return null;
        }
    };
    LocationReference.prototype.getLocationType = function () {
        return this._locationType;
    };
    LocationReference.prototype.getVersion = function () {
        return this._version;
    };
    LocationReference.fromIdAndBuffer = function (id, data) {
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
    };
    LocationReference.fromValues = function (id, returnCode, locationType, version) {
        var locationReference = new LocationReference();
        locationReference._id = id;
        locationReference._data = null;
        locationReference._returnCode = returnCode;
        locationReference._locationType = locationType;
        locationReference._version = version;
        return locationReference;
    };
    LocationReference._checkVersion = function (ver) {
        for (var _i = 0, _a = BinaryDecoder_1.BinaryDecoder.getVersions(); _i < _a.length; _i++) {
            var v = _a[_i];
            if (ver === v) {
                return true;
            }
        }
        return false;
    };
    LocationReference._resolveVersion = function (data) {
        if (data === null || data.length === 0) {
            throw new Error('Invalid binary data');
        }
        return data[0] & LocationReference._VERSION_MASK;
    };
    LocationReference._resolveLocationType = function (data) {
        var locationType = null;
        var totalBytes = data.length;
        var bitStreamInput = BitStreamInput_1.BitStreamInput.fromBufferAndLength(data, totalBytes);
        var header = Header_1.Header.fromBitStreamInput(bitStreamInput);
        var hasAttributes = header.af === BinaryConstants.HAS_ATTRIBUTES;
        var isPointLocation = header.pf === BinaryConstants.IS_POINT;
        var areaLocationCode = header.arf;
        var isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            locationType = LocationType_1.LocationType.LINE_LOCATION;
        }
        else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants.GEOCOORD_SIZE) {
                    locationType = LocationType_1.LocationType.GEO_COORDINATES;
                }
                else {
                    throw new Error('Byte size does not match geo coordinate location');
                }
            }
            else {
                if (totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    locationType = LocationType_1.LocationType.POINT_ALONG_LINE;
                }
                else if (totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    locationType = LocationType_1.LocationType.POI_WITH_ACCESS_POINT;
                }
                else {
                    throw new Error('Bye size does not match point location');
                }
            }
        }
        else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION) {
                locationType = LocationType_1.LocationType.CLOSED_LINE;
            }
            else {
                throw new Error('Byte size does not match closed line location');
            }
        }
        else {
            switch (areaLocationCode) {
                case BinaryConstants.AREA_CODE_CIRCLE:
                    locationType = LocationType_1.LocationType.CIRCLE;
                    break;
                case BinaryConstants.AREA_CODE_RECTANGLE:
                    /* Includes case BinaryConstants.AREA_CODE_GRID */
                    if (totalBytes === BinaryConstants.RECTANGLE_SIZE || totalBytes === BinaryConstants.LARGE_RECTANGLE_SIZE) {
                        locationType = LocationType_1.LocationType.RECTANGLE;
                    }
                    else if (totalBytes === BinaryConstants.GRID_SIZE || totalBytes === BinaryConstants.LARGE_GRID_SIZE) {
                        locationType = LocationType_1.LocationType.GRID;
                    }
                    else {
                        throw new Error('Byte size does not match area rectangle location');
                    }
                    break;
                case BinaryConstants.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants.MIN_BYTES_POLYGON) {
                        locationType = LocationType_1.LocationType.POLYGON;
                    }
                    else {
                        throw new Error('Byte size does not match polygon location');
                    }
                    break;
                default:
                    throw new Error('Byte size does not match area location');
            }
        }
        return locationType;
    };
    /** The Constant VERSION_MASK. */
    LocationReference._VERSION_MASK = 7;
    return LocationReference;
}());
exports.LocationReference = LocationReference;
//# sourceMappingURL=LocationReference.js.map