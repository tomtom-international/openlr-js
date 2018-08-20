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
var RelativeCoordinates = /** @class */ (function (_super) {
    __extends(RelativeCoordinates, _super);
    function RelativeCoordinates() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelativeCoordinates.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    };
    RelativeCoordinates.fromValues = function (longitude, latitude) {
        var relativeCoordinates = new RelativeCoordinates();
        relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
        relativeCoordinates._lon = longitude;
        relativeCoordinates._lat = latitude;
        return relativeCoordinates;
    };
    RelativeCoordinates.fromBitStreamInput = function (bitStreamInput) {
        var relativeCoordinates = new RelativeCoordinates();
        relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
        relativeCoordinates._read(bitStreamInput);
        return relativeCoordinates;
    };
    /** Number of bits used for coordinates (relative) */
    RelativeCoordinates._COORD_BITS = 16;
    return RelativeCoordinates;
}(AbstractCoordinate_1.AbstractCoordinate));
exports.RelativeCoordinates = RelativeCoordinates;
//# sourceMappingURL=RelativeCoordinates.js.map