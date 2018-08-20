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
var AbstractEncoder_1 = require("./AbstractEncoder");
var LocationReference_1 = require("../../data/LocationReference");
var BinaryReturnCode_1 = require("../BinaryReturnCode");
var LocationType_1 = require("../../data/LocationType");
var BitStreamOutput_1 = require("../bit-stream/BitStreamOutput");
var LineEncoder = /** @class */ (function (_super) {
    __extends(LineEncoder, _super);
    function LineEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineEncoder.prototype.encodeData = function (rawLocationReference, version) {
        var locationReferences = rawLocationReference.getLocationReferencePoints();
        if (locationReferences !== null) {
            var offsets = rawLocationReference.getOffsets();
            if (locationReferences === null || offsets === null || locationReferences.length <= 0) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.LINE_LOCATION, version);
            }
            var returnCode = this._checkOffsets(offsets, true, locationReferences);
            if (!returnCode) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_OFFSET, LocationType_1.LocationType.LINE_LOCATION, version);
            }
            returnCode = this._checkOffsets(offsets, false, locationReferences);
            if (!returnCode) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_OFFSET, LocationType_1.LocationType.LINE_LOCATION, version);
            }
            return LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryLineLocation(locationReferences, offsets, version));
        }
        else {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.LINE_LOCATION, version);
        }
    };
    LineEncoder.prototype._generateBinaryLineLocation = function (locationReferences, offsets, version) {
        var header = this._generateHeader(version, LocationType_1.LocationType.LINE_LOCATION, true);
        var firstLRP = this._generateFirstLRPFromLRP(locationReferences[0]);
        var lrps = this._generateLRPs(locationReferences);
        var pOff = this._generateOffset(offsets, true, version, locationReferences);
        var nOff = this._generateOffset(offsets, false, version, locationReferences);
        var lastLRP = this._generateLastLrpFromPointsAndOffsets(locationReferences, pOff, nOff);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        firstLRP.put(out);
        for (var _i = 0, lrps_1 = lrps; _i < lrps_1.length; _i++) {
            var lrp = lrps_1[_i];
            lrp.put(out);
        }
        lastLRP.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        if (nOff !== null) {
            nOff.put(out);
        }
        return out.getData();
    };
    return LineEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.LineEncoder = LineEncoder;
//# sourceMappingURL=LineEncoder.js.map