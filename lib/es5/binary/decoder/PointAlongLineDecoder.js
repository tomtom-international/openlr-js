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
var AbstractDecoder_1 = require("./AbstractDecoder");
var FirstLRP_1 = require("../data/FirstLRP");
var LastLRP_1 = require("../data/LastLRP");
var Offset_1 = require("../data/Offset");
var Offsets_1 = require("../../data/Offsets");
var RawPointAlongLineLocationReference_1 = require("../../data/raw-location-reference/RawPointAlongLineLocationReference");
var PointAlongLineDecoder = /** @class */ (function (_super) {
    __extends(PointAlongLineDecoder, _super);
    function PointAlongLineDecoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointAlongLineDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        var firstLRP = FirstLRP_1.FirstLRP.fromBitStreamInput(bitStreamInput);
        var lrp1 = this._createFirstLRP(1, firstLRP);
        var orientation = this._resolveOrientation(firstLRP.attrib1);
        var lastLRP = LastLRP_1.LastLRP.fromBitStreamInput(bitStreamInput);
        var lrp2 = this._createLastLRP(2, lastLRP, lrp1.getLongitudeDeg(), lrp1.getLatitudeDeg());
        var sideOfRoad = this._resolveSideOfRoad(lastLRP.attrib1);
        var offsets = Offsets_1.Offsets.fromValues(0, 0);
        var posOff = null;
        if (lastLRP.attrib4.pOffsetF === 1) {
            posOff = Offset_1.Offset.fromBitStreamInput(bitStreamInput);
            var rawLocRef = this._calculateRelativeDistance(posOff.offset);
            offsets = Offsets_1.Offsets.fromRelativeValues(rawLocRef, 0.0);
        }
        var rawLocationReference = RawPointAlongLineLocationReference_1.RawPointAlongLineLocationReference.fromPointAlongLineValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation);
        if (binaryData !== null) {
            binaryData.firstLRP = firstLRP;
            binaryData.lastLRP = lastLRP;
            binaryData.posOffset = posOff;
        }
        return rawLocationReference;
    };
    return PointAlongLineDecoder;
}(AbstractDecoder_1.AbstractDecoder));
exports.PointAlongLineDecoder = PointAlongLineDecoder;
//# sourceMappingURL=PointAlongLineDecoder.js.map