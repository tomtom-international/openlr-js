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
var Attr1 = /** @class */ (function (_super) {
    __extends(Attr1, _super);
    function Attr1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr1.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(this._sideOrOrientation, Attr1._SIDE_OR_ORIENTATION_BITS);
        bitStreamOutput.putBits(this._frc, Attr1._FRC_BITS);
        bitStreamOutput.putBits(this._fow, Attr1._FOW_BITS);
    };
    Attr1.fromValues = function (frc, fow, sideOrOrientation) {
        var attr1 = new Attr1();
        attr1._frc = frc;
        attr1._fow = fow;
        attr1._sideOrOrientation = sideOrOrientation;
        return attr1;
    };
    Attr1.fromBitStreamInput = function (bitStreamInput) {
        var attr1 = new Attr1();
        attr1._sideOrOrientation = bitStreamInput.getBits(Attr1._SIDE_OR_ORIENTATION_BITS);
        attr1._frc = bitStreamInput.getBits(Attr1._FRC_BITS);
        attr1._fow = bitStreamInput.getBits(Attr1._FOW_BITS);
        return attr1;
    };
    Object.defineProperty(Attr1.prototype, "frc", {
        get: function () {
            return this._frc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr1.prototype, "fow", {
        get: function () {
            return this._fow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr1.prototype, "sideOrOrientation", {
        get: function () {
            return this._sideOrOrientation;
        },
        enumerable: true,
        configurable: true
    });
    /** The Constant SIDE_OR_ORIENTATION_BITS. */
    Attr1._SIDE_OR_ORIENTATION_BITS = 2;
    /** Number of bits used for frc */
    Attr1._FRC_BITS = 3;
    /** Number of bits used for fow */
    Attr1._FOW_BITS = 3;
    return Attr1;
}(BinaryInformation_1.BinaryInformation));
exports.Attr1 = Attr1;
//# sourceMappingURL=Attr1.js.map