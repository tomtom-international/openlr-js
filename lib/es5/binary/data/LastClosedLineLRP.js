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
var Attr5_1 = require("./Attr5");
var Attr6_1 = require("./Attr6");
var LastClosedLineLRP = /** @class */ (function (_super) {
    __extends(LastClosedLineLRP, _super);
    function LastClosedLineLRP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LastClosedLineLRP.prototype.put = function (bitStreamOutput) {
        this._attrib5.put(bitStreamOutput);
        this._attrib6.put(bitStreamOutput);
    };
    LastClosedLineLRP.fromValues = function (attrib5, attrib6) {
        var lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = attrib5;
        lastClosedLineLrp._attrib6 = attrib6;
        return lastClosedLineLrp;
    };
    LastClosedLineLRP.fromBitStreamInput = function (bitStreamInput) {
        var lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = Attr5_1.Attr5.fromBitStreamInput(bitStreamInput);
        lastClosedLineLrp._attrib6 = Attr6_1.Attr6.fromBitStreamInput(bitStreamInput);
        return lastClosedLineLrp;
    };
    Object.defineProperty(LastClosedLineLRP.prototype, "attrib5", {
        get: function () {
            return this._attrib5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LastClosedLineLRP.prototype, "attrib6", {
        get: function () {
            return this._attrib6;
        },
        enumerable: true,
        configurable: true
    });
    return LastClosedLineLRP;
}(BinaryInformation_1.BinaryInformation));
exports.LastClosedLineLRP = LastClosedLineLRP;
//# sourceMappingURL=LastClosedLineLRP.js.map