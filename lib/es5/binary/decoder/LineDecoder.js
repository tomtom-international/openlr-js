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
var BinaryConstants = require("../BinaryConstants");
var FirstLRP_1 = require("../data/FirstLRP");
var IntermediateLRP_1 = require("../data/IntermediateLRP");
var LastLRP_1 = require("../data/LastLRP");
var Offset_1 = require("../data/Offset");
var Offsets_1 = require("../../data/Offsets");
var RawLineLocationReference_1 = require("../../data/raw-location-reference/RawLineLocationReference");
var LineDecoder = /** @class */ (function (_super) {
    __extends(LineDecoder, _super);
    function LineDecoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        // Calculate number of intermediates (integer division: get rid of possible offset information)
        var nrIntermediates = Math.floor((totalBytes - (BinaryConstants.MIN_BYTES_LINE_LOCATION)) / BinaryConstants.LRP_SIZE);
        // Read first location reference point
        var firstLRP = FirstLRP_1.FirstLRP.fromBitStreamInput(bitStreamInput);
        // Read intermediate location reference points
        var intermediates = [];
        for (var i = 0; i < nrIntermediates; i++) {
            var lrp = IntermediateLRP_1.IntermediateLRP.fromBitStreamInput(bitStreamInput);
            intermediates.push(lrp);
        }
        var lastLRP = LastLRP_1.LastLRP.fromBitStreamInput(bitStreamInput);
        var posOff = null;
        var negOff = null;
        // Check for positive offset and read in
        if (lastLRP.attrib4.pOffsetF === BinaryConstants.HAS_OFFSET) {
            posOff = Offset_1.Offset.fromBitStreamInput(bitStreamInput);
        }
        // Check for negative offset and read in
        if (lastLRP.attrib4.nOffsetF === BinaryConstants.HAS_OFFSET) {
            negOff = Offset_1.Offset.fromBitStreamInput(bitStreamInput);
        }
        var offsets = Offsets_1.Offsets.fromValues(0, 0);
        if (version === BinaryConstants.BINARY_VERSION_2) {
            var pOffValue = 0;
            var nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateDistanceEstimate(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateDistanceEstimate(negOff.offset);
            }
            offsets = Offsets_1.Offsets.fromValues(pOffValue, nOffValue);
        }
        else if (version === BinaryConstants.BINARY_VERSION_3) {
            var pOffValue = 0;
            var nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateRelativeDistance(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateRelativeDistance(negOff.offset);
            }
            offsets = Offsets_1.Offsets.fromRelativeValues(pOffValue, nOffValue);
        }
        var lrpCount = 1;
        var points = [];
        var p = this._createFirstLRP(lrpCount, firstLRP);
        lrpCount++;
        points.push(p);
        var prevLon = p.getLongitudeDeg();
        var prevLat = p.getLatitudeDeg();
        for (var _i = 0, intermediates_1 = intermediates; _i < intermediates_1.length; _i++) {
            var intermediate = intermediates_1[_i];
            var intermediatePoint = this._createIntermediateLRPFromLatitudeLongitude(lrpCount, intermediate, prevLon, prevLat);
            lrpCount++;
            points.push(intermediatePoint);
            prevLon = intermediatePoint.getLongitudeDeg();
            prevLat = intermediatePoint.getLatitudeDeg();
        }
        var lp = this._createLastLRP(lrpCount, lastLRP, prevLon, prevLat);
        points.push(lp);
        var rawLocRef = RawLineLocationReference_1.RawLineLocationReference.fromLineValues(id, points, offsets);
        if (binaryData !== null) {
            binaryData.negOffset = negOff;
            binaryData.posOffset = posOff;
            binaryData.lastLRP = lastLRP;
            binaryData.intermediates = intermediates;
            binaryData.firstLRP = firstLRP;
        }
        return rawLocRef;
    };
    return LineDecoder;
}(AbstractDecoder_1.AbstractDecoder));
exports.LineDecoder = LineDecoder;
//# sourceMappingURL=LineDecoder.js.map