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
var RawLocationReference = /** @class */ (function () {
    function RawLocationReference() {
    }
    // static fromValues(id: string, locationType: LocationType, returnCode: number) {
    //     const rawLocationReference = new RawLocationReference();
    //     rawLocationReference._id = id;
    //     rawLocationReference._locationType = locationType;
    //     rawLocationReference._returnCode = returnCode;
    //     return rawLocationReference;
    // }
    // static fromIdAndLocationType(id: string, locationType: LocationType) {
    //     const rawLocationReference = new RawLocationReference();
    //     rawLocationReference._id = id;
    //     rawLocationReference._locationType = locationType;
    //     rawLocationReference._returnCode = null;
    //     return rawLocationReference;
    // }
    RawLocationReference.prototype.getId = function () {
        return this._id;
    };
    RawLocationReference.prototype.hasId = function () {
        return this._id !== null;
    };
    RawLocationReference.prototype.getLocationType = function () {
        return this._locationType;
    };
    RawLocationReference.prototype.getReturnCode = function () {
        return this._returnCode;
    };
    RawLocationReference.prototype.isValid = function () {
        return this._returnCode === null;
    };
    RawLocationReference.prototype.getLocationReferencePoints = function () {
        return null;
    };
    RawLocationReference.prototype.getOffsets = function () {
        return null;
    };
    RawLocationReference.prototype.getGeoCoordinates = function () {
        return null;
    };
    RawLocationReference.prototype.getSideOfRoad = function () {
        return null;
    };
    RawLocationReference.prototype.getOrientation = function () {
        return null;
    };
    RawLocationReference.prototype.getCornerPoints = function () {
        return null;
    };
    RawLocationReference.prototype.getLowerLeftPoint = function () {
        return null;
    };
    RawLocationReference.prototype.getUpperRightPoint = function () {
        return null;
    };
    RawLocationReference.prototype.getCenterPoint = function () {
        return null;
    };
    RawLocationReference.prototype.getRadius = function () {
        return -1;
    };
    RawLocationReference.prototype.getNumberOfColumns = function () {
        return -1;
    };
    RawLocationReference.prototype.getNumberOfRows = function () {
        return -1;
    };
    return RawLocationReference;
}());
exports.RawLocationReference = RawLocationReference;
//# sourceMappingURL=RawLocationReference.js.map