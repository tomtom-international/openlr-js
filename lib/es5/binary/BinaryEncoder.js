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
var LocationReference_1 = require("../data/LocationReference");
var BinaryReturnCode_1 = require("./BinaryReturnCode");
var LocationType_1 = require("../data/LocationType");
var LineEncoder_1 = require("./encoder/LineEncoder");
var PointAlongLineEncoder_1 = require("./encoder/PointAlongLineEncoder");
var GeoCoordEncoder_1 = require("./encoder/GeoCoordEncoder");
var PolygonEncoder_1 = require("./encoder/PolygonEncoder");
var CircleEncoder_1 = require("./encoder/CircleEncoder");
var BinaryEncoder = /** @class */ (function () {
    function BinaryEncoder() {
    }
    BinaryEncoder.prototype.getDataFormatIdentifier = function () {
        return BinaryConstants.IDENTIFIER;
    };
    BinaryEncoder.prototype.getSupportedVersions = function () {
        return BinaryEncoder._VERSIONS;
    };
    BinaryEncoder.prototype.encodeDataFromRLR = function (rawLocationReference) {
        return this.encodeDataFromRLRAndVersion(rawLocationReference, BinaryEncoder._VERSIONS[BinaryEncoder._VERSIONS.length - 1]);
    };
    BinaryEncoder.prototype.encodeDataFromRLRAndVersion = function (rawLocationReference, version) {
        var locationType = rawLocationReference.getLocationType();
        if (!this._checkVersion(version, locationType)) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, locationType, version);
        }
        var encoder = null;
        switch (locationType) {
            case LocationType_1.LocationType.GEO_COORDINATES:
                encoder = new GeoCoordEncoder_1.GeoCoordEncoder();
                break;
            case LocationType_1.LocationType.LINE_LOCATION:
                encoder = new LineEncoder_1.LineEncoder();
                break;
            case LocationType_1.LocationType.POI_WITH_ACCESS_POINT:
                // encoder = new PoiAccessEncoder();
                throw new Error('PoiAccessEncoder not implemented');
            case LocationType_1.LocationType.POINT_ALONG_LINE:
                encoder = new PointAlongLineEncoder_1.PointAlongLineEncoder();
                break;
            case LocationType_1.LocationType.CIRCLE:
                encoder = new CircleEncoder_1.CircleEncoder();
                break;
            case LocationType_1.LocationType.RECTANGLE:
                // encoder = new RectangleEncoder();
                throw new Error('RectangleEncoder not implemented');
            case LocationType_1.LocationType.GRID:
                // encoder = new GridEncoder();
                throw new Error('GridEncoder not implemented');
            case LocationType_1.LocationType.POLYGON:
                encoder = new PolygonEncoder_1.PolygonEncoder();
                break;
            case LocationType_1.LocationType.CLOSED_LINE:
                // encoder = new ClosedLineEncoder();
                throw new Error('ClosedLineEncoder not implemented');
            case LocationType_1.LocationType.UNKNOWN:
            default:
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.UNKNOWN_LOCATION_TYPE, locationType, version);
        }
        return encoder.encodeData(rawLocationReference, version);
    };
    BinaryEncoder.prototype._checkVersion = function (version, locationType) {
        var valid = false;
        for (var _i = 0, _a = BinaryEncoder._VERSIONS; _i < _a.length; _i++) {
            var ver = _a[_i];
            if (version === ver) {
                valid = true;
            }
        }
        if (BinaryConstants.POINT_LOCATION_TYPES.has(locationType) && version < BinaryConstants.POINT_LOCATION_VERSION) {
            valid = false;
        }
        if (BinaryConstants.AREA_LOCATION_TYPES.has(locationType) && version < BinaryConstants.AREA_LOCATION_VERSION) {
            valid = false;
        }
        return valid;
    };
    /** The Constant VERSIONS. */
    BinaryEncoder._VERSIONS = [2, 3];
    return BinaryEncoder;
}());
exports.BinaryEncoder = BinaryEncoder;
//# sourceMappingURL=BinaryEncoder.js.map