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
var AbstractDecoder_1 = require("./AbstractDecoder");
var BinaryConstants = require("../BinaryConstants");
var AbsoluteCoordinates_1 = require("../data/AbsoluteCoordinates");
var GeoCoordinates_1 = require("../../map/GeoCoordinates");
var RelativeCoordinates_1 = require("../data/RelativeCoordinates");
var RawPolygonLocationReference_1 = require("../../data/raw-location-reference/RawPolygonLocationReference");
var PolygonDecoder = /** @class */ (function (_super) {
    __extends(PolygonDecoder, _super);
    function PolygonDecoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PolygonDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        var remainingBytes = totalBytes - (BinaryConstants.HEADER_SIZE + BinaryConstants.ABS_COORD_SIZE);
        var numRemainingCorners = remainingBytes / BinaryConstants.RELATIVE_COORD_SIZE;
        var cornersCoords = [];
        var firstCornerAbsCoord = AbsoluteCoordinates_1.AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
        var firstCornerCoord = GeoCoordinates_1.GeoCoordinates.fromValues(this._calculate32BitRepresentation(firstCornerAbsCoord.lon), this._calculate32BitRepresentation(firstCornerAbsCoord.lat));
        cornersCoords.push(firstCornerCoord);
        var prevCornerAbsCoord = firstCornerAbsCoord;
        for (var i = 0; i < numRemainingCorners; i++) {
            var remainingCoord = RelativeCoordinates_1.RelativeCoordinates.fromBitStreamInput(bitStreamInput);
            var lon = this._calculate32BitRepresentation(prevCornerAbsCoord.lon) + Math.fround(remainingCoord.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
            var lat = this._calculate32BitRepresentation(prevCornerAbsCoord.lat) + Math.fround(remainingCoord.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
            var cornerCoord = GeoCoordinates_1.GeoCoordinates.fromValues(lon, lat);
            cornersCoords.push(cornerCoord);
            prevCornerAbsCoord = AbsoluteCoordinates_1.AbsoluteCoordinates.fromValues(this._get24BitRepresentation(cornerCoord.getLongitudeDeg()), this._get24BitRepresentation(cornerCoord.getLatitudeDeg()));
        }
        var rawLocRef = RawPolygonLocationReference_1.RawPolygonLocationReference.fromPolygonValues(id, cornersCoords);
        return rawLocRef;
    };
    return PolygonDecoder;
}(AbstractDecoder_1.AbstractDecoder));
exports.PolygonDecoder = PolygonDecoder;
//# sourceMappingURL=PolygonDecoder.js.map