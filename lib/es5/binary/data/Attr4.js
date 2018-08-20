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
var Attr4 = /** @class */ (function (_super) {
    __extends(Attr4, _super);
    function Attr4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr4.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(Attr4._RFU_VALUE, Attr4._RFU_BITS);
        bitStreamOutput.putBits(this._pOffsetF, Attr4._POFFF_BITS);
        bitStreamOutput.putBits(this._nOffsetF, Attr4._NOFFF_BITS);
        bitStreamOutput.putBits(this._bear, Attr4._BEAR_BITS);
    };
    Attr4.fromValues = function (pOffsetF, nOffsetF, bear) {
        var attr4 = new Attr4();
        attr4._pOffsetF = pOffsetF;
        attr4._nOffsetF = nOffsetF;
        attr4._bear = bear;
        return attr4;
    };
    Attr4.fromBitStreamInput = function (bitStreamInput) {
        var rfu = bitStreamInput.getBits(Attr4._RFU_BITS);
        if (rfu !== Attr4._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        var attr4 = new Attr4();
        attr4._pOffsetF = bitStreamInput.getBits(Attr4._POFFF_BITS);
        attr4._nOffsetF = bitStreamInput.getBits(Attr4._NOFFF_BITS);
        attr4._bear = bitStreamInput.getBits(Attr4._BEAR_BITS);
        return attr4;
    };
    Object.defineProperty(Attr4.prototype, "pOffsetF", {
        get: function () {
            return this._pOffsetF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr4.prototype, "nOffsetF", {
        get: function () {
            return this._nOffsetF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr4.prototype, "bear", {
        get: function () {
            return this._bear;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of unused bits */
    Attr4._RFU_BITS = 1;
    /** Number of bits used for positive offset flag */
    Attr4._POFFF_BITS = 1;
    /** Number of bits used for negative offset flag */
    Attr4._NOFFF_BITS = 1;
    /** Number of bits used for bearing */
    Attr4._BEAR_BITS = 5;
    return Attr4;
}(BinaryInformation_1.BinaryInformation));
exports.Attr4 = Attr4;
//# sourceMappingURL=Attr4.js.map