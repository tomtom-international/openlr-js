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
var BinaryConstants = require("../BinaryConstants");
var AbstractEncoder_1 = require("./AbstractEncoder");
var LocationReference_1 = require("../../data/LocationReference");
var BinaryReturnCode_1 = require("../BinaryReturnCode");
var LocationType_1 = require("../../data/LocationType");
var BitStreamOutput_1 = require("../bit-stream/BitStreamOutput");
var CircleEncoder = /** @class */ (function (_super) {
    __extends(CircleEncoder, _super);
    function CircleEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircleEncoder.prototype.encodeData = function (rawLocationReference, version) {
        var center = rawLocationReference.getCenterPoint();
        var radius = rawLocationReference.getRadius();
        if (center === null) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.CIRCLE, version);
        }
        if (radius < 0) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_RADIUS, LocationType_1.LocationType.CIRCLE, version);
        }
        if (version < BinaryConstants.BINARY_VERSION_3) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, LocationType_1.LocationType.CIRCLE, version);
        }
        return LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryCircleLocation(center, radius, version));
    };
    CircleEncoder.prototype._generateBinaryCircleLocation = function (center, r, version) {
        var radius = this._generateRadius(r); // r represents radius in meters
        var absCoord = this._generateAbsCoord(center);
        var header = this._generateHeader(version, LocationType_1.LocationType.CIRCLE, false);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        absCoord.put(out);
        if (radius != null) {
            radius.put(out);
        }
        return out.getData();
    };
    return CircleEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.CircleEncoder = CircleEncoder;
//# sourceMappingURL=CircleEncoder.js.map