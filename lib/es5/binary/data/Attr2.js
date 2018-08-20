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
var Attr2 = /** @class */ (function (_super) {
    __extends(Attr2, _super);
    function Attr2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr2.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(this._lfrcnp, Attr2._LFRCNP_BITS);
        bitStreamOutput.putBits(this._bear, Attr2._BEAR_BITS);
    };
    Attr2.fromValues = function (lfrcnp, bear) {
        var attr2 = new Attr2();
        attr2._lfrcnp = lfrcnp;
        attr2._bear = bear;
        return attr2;
    };
    Attr2.fromBitStreamInput = function (bitStreamInput) {
        var attr2 = new Attr2();
        attr2._lfrcnp = bitStreamInput.getBits(Attr2._LFRCNP_BITS);
        attr2._bear = bitStreamInput.getBits(Attr2._BEAR_BITS);
        return attr2;
    };
    Object.defineProperty(Attr2.prototype, "lfrcnp", {
        get: function () {
            return this._lfrcnp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr2.prototype, "bear", {
        get: function () {
            return this._bear;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of bits used for lfrcnp */
    Attr2._LFRCNP_BITS = 3;
    /** Number of bits used for bear */
    Attr2._BEAR_BITS = 5;
    return Attr2;
}(BinaryInformation_1.BinaryInformation));
exports.Attr2 = Attr2;
//# sourceMappingURL=Attr2.js.map