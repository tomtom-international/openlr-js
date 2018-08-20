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
var RawPointLocationReference_1 = require("./RawPointLocationReference");
var LocationType_1 = require("../LocationType");
var RawGeoCoordLocationReference = /** @class */ (function (_super) {
    __extends(RawGeoCoordLocationReference, _super);
    function RawGeoCoordLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawGeoCoordLocationReference.prototype.getGeoCoordinates = function () {
        return this._geoCoord;
    };
    RawGeoCoordLocationReference.fromGeoCoordValues = function (id, geoCoord) {
        var rawGeoCoordLocationReference = new RawGeoCoordLocationReference();
        rawGeoCoordLocationReference._id = id;
        rawGeoCoordLocationReference._locationType = LocationType_1.LocationType.GEO_COORDINATES;
        rawGeoCoordLocationReference._returnCode = null;
        rawGeoCoordLocationReference._geoCoord = geoCoord;
        return rawGeoCoordLocationReference;
    };
    return RawGeoCoordLocationReference;
}(RawPointLocationReference_1.RawPointLocationReference));
exports.RawGeoCoordLocationReference = RawGeoCoordLocationReference;
//# sourceMappingURL=RawGeoCoordLocationReference.js.map