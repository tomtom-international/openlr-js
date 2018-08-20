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
var BinaryInformation_1 = require("./BinaryInformation");
var Attr3 = /** @class */ (function (_super) {
    __extends(Attr3, _super);
    function Attr3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr3.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(this._dnp, Attr3._DNP_BITS);
    };
    Attr3.fromValues = function (dnp) {
        var attr3 = new Attr3();
        attr3._dnp = dnp;
        return attr3;
    };
    Attr3.fromBitStreamInput = function (bitStreamInput) {
        var attr3 = new Attr3();
        attr3._dnp = bitStreamInput.getBits(Attr3._DNP_BITS);
        return attr3;
    };
    Object.defineProperty(Attr3.prototype, "dnp", {
        get: function () {
            return this._dnp;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of bits used for dnp */
    Attr3._DNP_BITS = 8;
    return Attr3;
}(BinaryInformation_1.BinaryInformation));
exports.Attr3 = Attr3;
//# sourceMappingURL=Attr3.js.map