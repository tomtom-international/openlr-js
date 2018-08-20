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
var Attr5 = /** @class */ (function (_super) {
    __extends(Attr5, _super);
    function Attr5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr5.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(Attr5._RFU_VALUE, Attr5._NR_RFU);
        bitStreamOutput.putBits(this._frc, Attr5._FRC_BITS);
        bitStreamOutput.putBits(this._fow, Attr5._FOW_BITS);
    };
    Attr5.fromValues = function (frc, fow) {
        var attr5 = new Attr5();
        attr5._frc = frc;
        attr5._fow = fow;
        return attr5;
    };
    Attr5.fromBitStreamInput = function (bitStreamInput) {
        var rfu = bitStreamInput.getBits(Attr5._NR_RFU);
        if (rfu !== Attr5._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        var attr5 = new Attr5();
        attr5._frc = bitStreamInput.getBits(Attr5._FRC_BITS);
        attr5._fow = bitStreamInput.getBits(Attr5._FOW_BITS);
        return attr5;
    };
    Object.defineProperty(Attr5.prototype, "frc", {
        get: function () {
            return this._frc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr5.prototype, "fow", {
        get: function () {
            return this._fow;
        },
        enumerable: true,
        configurable: true
    });
    /** The Constant RFU. */
    Attr5._NR_RFU = 2;
    /** Number of bits used for frc */
    Attr5._FRC_BITS = 3;
    /** Number of bits used for fow */
    Attr5._FOW_BITS = 3;
    return Attr5;
}(BinaryInformation_1.BinaryInformation));
exports.Attr5 = Attr5;
//# sourceMappingURL=Attr5.js.map