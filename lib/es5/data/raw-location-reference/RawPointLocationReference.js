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
var RawLocationReference_1 = require("./RawLocationReference");
var RawPointLocationReference = /** @class */ (function (_super) {
    __extends(RawPointLocationReference, _super);
    function RawPointLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawPointLocationReference.prototype.getLocationReferencePoints = function () {
        return this._points;
    };
    RawPointLocationReference.prototype.getOffsets = function () {
        return this._offsets;
    };
    RawPointLocationReference.prototype.getOrientation = function () {
        return this._orientation;
    };
    RawPointLocationReference.prototype.getSideOfRoad = function () {
        return this._sideOfRoad;
    };
    RawPointLocationReference.fromPointValues = function (id, locationType, lrp1, lrp2, offsets, sideOfRoad, orientation) {
        var rawPointLocationReference = new RawPointLocationReference();
        rawPointLocationReference._id = id;
        rawPointLocationReference._locationType = locationType;
        rawPointLocationReference._returnCode = null;
        rawPointLocationReference._points = [lrp1, lrp2];
        rawPointLocationReference._offsets = offsets;
        rawPointLocationReference._orientation = orientation;
        rawPointLocationReference._sideOfRoad = sideOfRoad;
        return rawPointLocationReference;
    };
    return RawPointLocationReference;
}(RawLocationReference_1.RawLocationReference));
exports.RawPointLocationReference = RawPointLocationReference;
//# sourceMappingURL=RawPointLocationReference.js.map