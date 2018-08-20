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
var BinaryConstants = require("../BinaryConstants");
var AbstractEncoder_1 = require("./AbstractEncoder");
var LocationReference_1 = require("../../data/LocationReference");
var BinaryReturnCode_1 = require("../BinaryReturnCode");
var LocationType_1 = require("../../data/LocationType");
var BitStreamOutput_1 = require("../bit-stream/BitStreamOutput");
var RelativeCoordinates_1 = require("../data/RelativeCoordinates");
var PolygonEncoder = /** @class */ (function (_super) {
    __extends(PolygonEncoder, _super);
    function PolygonEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PolygonEncoder.prototype.encodeData = function (rawLocationReference, version) {
        var id = rawLocationReference.getId();
        var cornerPoints = rawLocationReference.getCornerPoints();
        if (cornerPoints === null) {
            return LocationReference_1.LocationReference.fromValues(id, BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.POLYGON, version);
        }
        if (version < BinaryConstants.BINARY_VERSION_3) {
            return LocationReference_1.LocationReference.fromValues(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, LocationType_1.LocationType.POLYGON, version);
        }
        var lr = null;
        try {
            lr = LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPolygonLocation(cornerPoints, version));
        }
        catch (error) {
            lr = LocationReference_1.LocationReference.fromValues(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BINARY_DATA, LocationType_1.LocationType.POLYGON, version);
        }
        return lr;
    };
    PolygonEncoder.prototype._generateBinaryPolygonLocation = function (cornerPoints, version) {
        var prevCoord = cornerPoints[0];
        var firstCornerPoint = this._generateAbsCoord(prevCoord);
        var relCornerCoords = [];
        for (var i = 1; i < cornerPoints.length; i++) {
            var geoCoord = cornerPoints[i];
            var relRepValLon = this._getRelativeRepresentation(prevCoord.getLongitudeDeg(), geoCoord.getLongitudeDeg());
            var relRepValLat = this._getRelativeRepresentation(prevCoord.getLatitudeDeg(), geoCoord.getLatitudeDeg());
            if (this._fitsInto2Bytes(relRepValLon) && this._fitsInto2Bytes(relRepValLat)) {
                var relCornerCoord = RelativeCoordinates_1.RelativeCoordinates.fromValues(relRepValLon, relRepValLat);
                relCornerCoords.push(relCornerCoord);
                prevCoord = geoCoord;
            }
        }
        var header = this._generateHeader(version, LocationType_1.LocationType.POLYGON, false);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        firstCornerPoint.put(out);
        relCornerCoords.forEach(function (relCoord) { return relCoord.put(out); });
        return out.getData();
    };
    return PolygonEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.PolygonEncoder = PolygonEncoder;
//# sourceMappingURL=PolygonEncoder.js.map