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
var AbstractCoordinate_1 = require("./AbstractCoordinate");
var AbsoluteCoordinates = /** @class */ (function (_super) {
    __extends(AbsoluteCoordinates, _super);
    function AbsoluteCoordinates() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbsoluteCoordinates.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    };
    AbsoluteCoordinates.fromValues = function (longitude, latitude) {
        var absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._lon = longitude;
        absoluteCoordinates._lat = latitude;
        return absoluteCoordinates;
    };
    AbsoluteCoordinates.fromBitStreamInput = function (bitStreamInput) {
        var absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._read(bitStreamInput);
        return absoluteCoordinates;
    };
    /** Number of bits used for coordinate (absolute) */
    AbsoluteCoordinates._COORD_BITS = 24;
    return AbsoluteCoordinates;
}(AbstractCoordinate_1.AbstractCoordinate));
exports.AbsoluteCoordinates = AbsoluteCoordinates;
//# sourceMappingURL=AbsoluteCoordinates.js.map