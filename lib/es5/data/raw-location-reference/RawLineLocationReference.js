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
var LocationType_1 = require("../LocationType");
var RawLineLocationReference = /** @class */ (function (_super) {
    __extends(RawLineLocationReference, _super);
    function RawLineLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawLineLocationReference.prototype.getLocationReferencePoints = function () {
        return this._points;
    };
    RawLineLocationReference.prototype.getOffsets = function () {
        return this._offsets;
    };
    RawLineLocationReference.fromLineValues = function (id, points, offsets) {
        var rawLineLocationReference = new RawLineLocationReference();
        rawLineLocationReference._id = id;
        rawLineLocationReference._locationType = LocationType_1.LocationType.LINE_LOCATION;
        rawLineLocationReference._returnCode = null;
        rawLineLocationReference._points = points;
        rawLineLocationReference._offsets = offsets;
        return rawLineLocationReference;
    };
    return RawLineLocationReference;
}(RawLocationReference_1.RawLocationReference));
exports.RawLineLocationReference = RawLineLocationReference;
//# sourceMappingURL=RawLineLocationReference.js.map