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
Object.defineProperty(exports, "__esModule", { value: true });
var BinaryConstants = require("../BinaryConstants");
var RadiusType;
(function (RadiusType) {
    /** Small radius (BINARY_VERSION_3: up to 255m) */
    RadiusType[RadiusType["SMALL"] = 1] = "SMALL";
    /** Medium radius (BINARY_VERSION_3: up to 65536m) */
    RadiusType[RadiusType["MEDIUM"] = 2] = "MEDIUM";
    /** Large radius (BINARY_VERSION_3: up to 16777216m) */
    RadiusType[RadiusType["LARGE"] = 3] = "LARGE";
    /** Extra large radius (BINARY_VERSION_3: up to 4294967296m) */
    RadiusType[RadiusType["EXTRA_LARGE"] = 4] = "EXTRA_LARGE";
    /** Unknown radius type */
    RadiusType[RadiusType["UNKNOWN"] = 0] = "UNKNOWN";
})(RadiusType = exports.RadiusType || (exports.RadiusType = {}));
exports.resolveRadius = function (bytes) {
    return bytes >= RadiusType.UNKNOWN && bytes <= RadiusType.EXTRA_LARGE ? bytes : RadiusType.UNKNOWN;
};
var Radius = /** @class */ (function () {
    function Radius() {
    }
    Radius.prototype.put = function (bitStreamOutput) {
        if (this._radius <= Radius._MAX_RADIUS_SMALL) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.SMALL_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_MEDIUM) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.MEDIUM_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.LARGE_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_EXTRA_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.EXTRA_LARGE_RADIUS_BITS);
        }
        else {
            throw new Error('Invalid range');
        }
    };
    Radius.fromValues = function (radiusValue) {
        var radius = new Radius();
        radius._radius = radiusValue;
        return radius;
    };
    Radius.fromBitStreamInput = function (bitStreamInput, type) {
        var radius = new Radius();
        switch (type) {
            case RadiusType.SMALL:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.SMALL_RADIUS_BITS));
                break;
            case RadiusType.MEDIUM:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.MEDIUM_RADIUS_BITS));
                break;
            case RadiusType.LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.LARGE_RADIUS_BITS));
                break;
            case RadiusType.EXTRA_LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.EXTRA_LARGE_RADIUS_BITS));
                break;
            default:
                throw new Error('Invalid value range');
        }
        return radius;
    };
    Object.defineProperty(Radius.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        enumerable: true,
        configurable: true
    });
    Radius._intToLong = function (integer) {
        if (integer < 0) {
            return integer & (Radius._MAX_RADIUS_EXTRA_LARGE - 1);
        }
        else {
            return integer;
        }
    };
    /** The Constant MAX_RADIUS_SMALL. */
    Radius._MAX_RADIUS_SMALL = Math.pow(2, BinaryConstants.SMALL_RADIUS_BITS);
    /** The Constant MAX_RADIUS_MEDIUM. */
    Radius._MAX_RADIUS_MEDIUM = Math.pow(2, BinaryConstants.MEDIUM_RADIUS_BITS);
    /** The Constant MAX_RADIUS_LARGE. */
    Radius._MAX_RADIUS_LARGE = Math.pow(2, BinaryConstants.LARGE_RADIUS_BITS);
    /** The Constant MAX_RADIUS_EXTRA_LARGE. */
    Radius._MAX_RADIUS_EXTRA_LARGE = Math.pow(2, BinaryConstants.EXTRA_LARGE_RADIUS_BITS);
    return Radius;
}());
exports.Radius = Radius;
//# sourceMappingURL=Radius.js.map