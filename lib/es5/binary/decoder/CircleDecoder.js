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
var AbsoluteCoordinates_1 = require("../data/AbsoluteCoordinates");
var AbstractDecoder_1 = require("./AbstractDecoder");
var BinaryConstants = require("../BinaryConstants");
var GeoCoordinates_1 = require("../../map/GeoCoordinates");
var RawCircleLocationReference_1 = require("../../data/raw-location-reference/RawCircleLocationReference");
var Radius_1 = require("../data/Radius");
var CircleDecoder = /** @class */ (function (_super) {
    __extends(CircleDecoder, _super);
    function CircleDecoder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BASE_SIZE = BinaryConstants.HEADER_SIZE + BinaryConstants.ABS_COORD_SIZE;
        return _this;
    }
    CircleDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        var radiusSize = totalBytes - this.BASE_SIZE;
        var rt = Radius_1.resolveRadius(radiusSize);
        var absCoord = AbsoluteCoordinates_1.AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
        var geoCoord = GeoCoordinates_1.GeoCoordinates.fromValues(this._calculate32BitRepresentation(absCoord.lon), this._calculate32BitRepresentation(absCoord.lat));
        var radius = Radius_1.Radius.fromBitStreamInput(bitStreamInput, rt);
        var rawLocRef = RawCircleLocationReference_1.RawCircleLocationReference.fromCircleValues(id, geoCoord, radius.radius);
        if (binaryData !== null) {
            binaryData.absCoord = absCoord;
        }
        return rawLocRef;
    };
    return CircleDecoder;
}(AbstractDecoder_1.AbstractDecoder));
exports.CircleDecoder = CircleDecoder;
//# sourceMappingURL=CircleDecoder.js.map