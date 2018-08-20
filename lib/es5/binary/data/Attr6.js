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
var Attr6 = /** @class */ (function (_super) {
    __extends(Attr6, _super);
    function Attr6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr6.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(Attr6._RFU_VALUE, Attr6._NR_RFU);
        bitStreamOutput.putBits(this._bear, Attr6._BEAR_BITS);
    };
    Attr6.fromValues = function (bear) {
        var attr6 = new Attr6();
        attr6._bear = bear;
        return attr6;
    };
    Attr6.fromBitStreamInput = function (bitStreamInput) {
        var rfu = bitStreamInput.getBits(Attr6._NR_RFU);
        if (rfu !== Attr6._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        var attr6 = new Attr6();
        attr6._bear = bitStreamInput.getBits(Attr6._BEAR_BITS);
        return attr6;
    };
    Object.defineProperty(Attr6.prototype, "bear", {
        get: function () {
            return this._bear;
        },
        enumerable: true,
        configurable: true
    });
    /** number of bits used for lfrcnp */
    Attr6._NR_RFU = 3;
    /** number of bits used for bear */
    Attr6._BEAR_BITS = 5;
    return Attr6;
}(BinaryInformation_1.BinaryInformation));
exports.Attr6 = Attr6;
//# sourceMappingURL=Attr6.js.map