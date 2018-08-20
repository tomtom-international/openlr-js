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
var IntermediateLRP = /** @class */ (function (_super) {
    __extends(IntermediateLRP, _super);
    function IntermediateLRP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntermediateLRP.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    };
    IntermediateLRP.fromValues = function (lon, lat, attrib1, attrib2, attrib3) {
        var intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._lon = lon;
        intermediateLrp._lat = lat;
        intermediateLrp._attrib1 = attrib1;
        intermediateLrp._attrib2 = attrib2;
        intermediateLrp._attrib3 = attrib3;
        return intermediateLrp;
    };
    IntermediateLRP.fromBitStreamInput = function (bitStreamInput) {
        var intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._read(bitStreamInput);
        intermediateLrp._attrib1 = Attr1_1.Attr1.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib2 = Attr2_1.Attr2.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib3 = Attr3_1.Attr3.fromBitStreamInput(bitStreamInput);
        return intermediateLrp;
    };
    Object.defineProperty(IntermediateLRP.prototype, "attrib2", {
        get: function () {
            return this._attrib2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntermediateLRP.prototype, "attrib3", {
        get: function () {
            return this._attrib3;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of bits used for coordinates (relative) */
    IntermediateLRP._COORD_BITS = 16;
    return IntermediateLRP;
}(AbstractLRP_1.AbstractLRP));
exports.IntermediateLRP = IntermediateLRP;
//# sourceMappingURL=IntermediateLRP.js.map