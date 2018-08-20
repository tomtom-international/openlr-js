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
var Attr2_1 = require("./Attr2");
var Attr3_1 = require("./Attr3");
var FirstLRP = /** @class */ (function (_super) {
    __extends(FirstLRP, _super);
    function FirstLRP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstLRP.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    };
    FirstLRP.fromValues = function (lon, lat, attrib1, attrib2, attrib3) {
        var firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._lon = lon;
        firstLrp._lat = lat;
        firstLrp._attrib1 = attrib1;
        firstLrp._attrib2 = attrib2;
        firstLrp._attrib3 = attrib3;
        return firstLrp;
    };
    FirstLRP.fromBitStreamInput = function (bitStreamInput) {
        var firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._read(bitStreamInput);
        firstLrp._attrib1 = Attr1_1.Attr1.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib2 = Attr2_1.Attr2.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib3 = Attr3_1.Attr3.fromBitStreamInput(bitStreamInput);
        return firstLrp;
    };
    Object.defineProperty(FirstLRP.prototype, "attrib2", {
        get: function () {
            return this._attrib2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirstLRP.prototype, "attrib3", {
        get: function () {
            return this._attrib3;
        },
        enumerable: true,
        configurable: true
    });
    FirstLRP._COORD_BITS = 24;
    return FirstLRP;
}(AbstractLRP_1.AbstractLRP));
exports.FirstLRP = FirstLRP;
//# sourceMappingURL=FirstLRP.js.map