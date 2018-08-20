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
var BinaryConstants = require("../BinaryConstants");
var LocationType_1 = require("../../data/LocationType");
var BitStreamOutput_1 = require("../bit-stream/BitStreamOutput");
var PointAlongLineEncoder = /** @class */ (function (_super) {
    __extends(PointAlongLineEncoder, _super);
    function PointAlongLineEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointAlongLineEncoder.prototype.encodeData = function (rawLocationReference, version) {
        if (rawLocationReference.getLocationReferencePoints() === null) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.POINT_ALONG_LINE, version);
        }
        var locationReferencePoints = rawLocationReference.getLocationReferencePoints();
        if (locationReferencePoints === null || locationReferencePoints.length <= 0) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.POINT_ALONG_LINE, version);
        }
        else {
            var startLRP = locationReferencePoints[0];
            var endLRP = locationReferencePoints[1];
            var offsets = rawLocationReference.getOffsets();
            var sideOfRoad = rawLocationReference.getSideOfRoad();
            var orientation = rawLocationReference.getOrientation();
            if (startLRP === null || endLRP === null || offsets === null || sideOfRoad === null || orientation === null) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.POINT_ALONG_LINE, version);
            }
            if (version < BinaryConstants.BINARY_VERSION_3) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, LocationType_1.LocationType.POI_WITH_ACCESS_POINT, version);
            }
            var returnCode = this._checkOffsets(offsets, true, locationReferencePoints);
            if (!returnCode) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_OFFSET, LocationType_1.LocationType.POINT_ALONG_LINE, version);
            }
            return LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version));
        }
    };
    PointAlongLineEncoder.prototype._generateBinaryPointAlongLineLocation = function (startLRP, endLRP, offsets, sideOfRoad, orientation, version) {
        var header = this._generateHeader(version, LocationType_1.LocationType.POINT_ALONG_LINE, true);
        var first = this._generateFirstLRPFromLRPAndOrientation(startLRP, orientation);
        var lrps = [startLRP, endLRP];
        var pOff = this._generateOffset(offsets, true, version, lrps);
        if (pOff === null) {
            throw new Error('Positive offset cannot be null');
        }
        var last = this._generateLastLrpFromPointsAndOffsetAndSideOfRoad(lrps, pOff, sideOfRoad);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        first.put(out);
        last.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        return out.getData();
    };
    return PointAlongLineEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.PointAlongLineEncoder = PointAlongLineEncoder;
//# sourceMappingURL=PointAlongLineEncoder.js.map