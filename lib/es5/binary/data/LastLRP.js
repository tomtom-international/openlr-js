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
var AbstractLRP_1 = require("./AbstractLRP");
var Attr1_1 = require("./Attr1");
var Attr4_1 = require("./Attr4");
var LastLRP = /** @class */ (function (_super) {
    __extends(LastLRP, _super);
    function LastLRP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LastLRP.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib4.put(bitStreamOutput);
    };
    LastLRP.fromValues = function (lon, lat, attrib1, attrib4) {
        var lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._lon = lon;
        lastLrp._lat = lat;
        lastLrp._attrib1 = attrib1;
        lastLrp._attrib4 = attrib4;
        return lastLrp;
    };
    LastLRP.fromBitStreamInput = function (bitStreamInput) {
        var lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._read(bitStreamInput);
        lastLrp._attrib1 = Attr1_1.Attr1.fromBitStreamInput(bitStreamInput);
        lastLrp._attrib4 = Attr4_1.Attr4.fromBitStreamInput(bitStreamInput);
        return lastLrp;
    };
    Object.defineProperty(LastLRP.prototype, "attrib4", {
        get: function () {
            return this._attrib4;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of bits used for coordinates (relative) */
    LastLRP._COORD_BITS = 16;
    return LastLRP;
}(AbstractLRP_1.AbstractLRP));
exports.LastLRP = LastLRP;
//# sourceMappingURL=LastLRP.js.map