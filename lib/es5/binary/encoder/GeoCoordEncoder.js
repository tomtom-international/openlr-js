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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractEncoder_1 = require("./AbstractEncoder");
var LocationReference_1 = require("../../data/LocationReference");
var BinaryReturnCode_1 = require("../BinaryReturnCode");
var LocationType_1 = require("../../data/LocationType");
var BitStreamOutput_1 = require("../bit-stream/BitStreamOutput");
var GeoCoordEncoder = /** @class */ (function (_super) {
    __extends(GeoCoordEncoder, _super);
    function GeoCoordEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoCoordEncoder.prototype.encodeData = function (rawLocationReference, version) {
        var coord = rawLocationReference.getGeoCoordinates();
        if (coord === null) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.GEO_COORDINATES, version);
        }
        else if (version < 3) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, LocationType_1.LocationType.GEO_COORDINATES, version);
        }
        else {
            return LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryGeoCoordLocation(coord, version));
        }
    };
    GeoCoordEncoder.prototype._generateBinaryGeoCoordLocation = function (coord, version) {
        var header = this._generateHeader(version, LocationType_1.LocationType.GEO_COORDINATES, false);
        var absCoord = this._generateAbsCoord(coord);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        absCoord.put(out);
        return out.getData();
    };
    return GeoCoordEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.GeoCoordEncoder = GeoCoordEncoder;
//# sourceMappingURL=GeoCoordEncoder.js.map