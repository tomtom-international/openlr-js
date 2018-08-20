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
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(BinaryInformation_1.BinaryInformation._RFU_VALUE, Header._RFU_BITS);
        var arf1 = this._arf / 2;
        var arf0 = this._arf % 2;
        bitStreamOutput.putBits(arf1, Header._AREA_FLAG_BIT1);
        bitStreamOutput.putBits(this._pf, Header._POINT_FLAG_BITS);
        bitStreamOutput.putBits(arf0, Header._AREA_FLAG_BIT0);
        bitStreamOutput.putBits(this._af, Header._ATTR_FLAG_BITS);
        bitStreamOutput.putBits(this._ver, Header._VERSION_BITS);
    };
    Header.fromValues = function (arfValue, afValue, pfValue, verValue) {
        var header = new Header();
        header._arf = arfValue;
        header._af = afValue;
        header._pf = pfValue;
        header._ver = verValue;
        return header;
    };
    Header.fromBitStreamInput = function (bitStreamInput) {
        var rfu = bitStreamInput.getBits(Header._RFU_BITS);
        if (rfu !== BinaryInformation_1.BinaryInformation._RFU_VALUE) {
            throw new Error('Const value mismatch');
        }
        var header = new Header();
        var arf1 = bitStreamInput.getBits(Header._AREA_FLAG_BIT0);
        header._pf = bitStreamInput.getBits(Header._POINT_FLAG_BITS);
        var arf0 = bitStreamInput.getBits(Header._AREA_FLAG_BIT1);
        header._arf = 2 * arf1 + arf0;
        header._af = bitStreamInput.getBits(Header._ATTR_FLAG_BITS);
        header._ver = bitStreamInput.getBits(Header._VERSION_BITS);
        return header;
    };
    Object.defineProperty(Header.prototype, "arf", {
        get: function () {
            return this._arf;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "af", {
        get: function () {
            return this._af;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "pf", {
        get: function () {
            return this._pf;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "ver", {
        get: function () {
            return this._ver;
        },
        enumerable: true,
        configurable: true
    });
    Header._RFU_BITS = 1;
    Header._AREA_FLAG_BIT0 = 1;
    Header._AREA_FLAG_BIT1 = 1;
    /** Number of bits used for attributes flag */
    Header._ATTR_FLAG_BITS = 1;
    /** Number of bits used for poflag */
    Header._POINT_FLAG_BITS = 1;
    /** Number of bits used for version */
    Header._VERSION_BITS = 3;
    return Header;
}(BinaryInformation_1.BinaryInformation));
exports.Header = Header;
//# sourceMappingURL=Header.js.map