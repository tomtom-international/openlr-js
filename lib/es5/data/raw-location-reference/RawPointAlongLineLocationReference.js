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
var RawPointAlongLineLocationReference = /** @class */ (function (_super) {
    __extends(RawPointAlongLineLocationReference, _super);
    function RawPointAlongLineLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawPointAlongLineLocationReference.fromPointAlongLineValues = function (id, lrp1, lrp2, offsets, sideOfRoad, orientation) {
        var rawPointAlongLineLocationReference = new RawPointAlongLineLocationReference();
        rawPointAlongLineLocationReference._id = id;
        rawPointAlongLineLocationReference._locationType = LocationType_1.LocationType.POINT_ALONG_LINE;
        rawPointAlongLineLocationReference._returnCode = null;
        rawPointAlongLineLocationReference._points = [lrp1, lrp2];
        rawPointAlongLineLocationReference._offsets = offsets;
        rawPointAlongLineLocationReference._orientation = orientation;
        rawPointAlongLineLocationReference._sideOfRoad = sideOfRoad;
        return rawPointAlongLineLocationReference;
    };
    return RawPointAlongLineLocationReference;
}(RawPointLocationReference_1.RawPointLocationReference));
exports.RawPointAlongLineLocationReference = RawPointAlongLineLocationReference;
//# sourceMappingURL=RawPointAlongLineLocationReference.js.map