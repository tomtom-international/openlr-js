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

export default class RawLocationReference {
    _locationType;

    _id;

    _returnCode;

    static fromValues(id, locationType, returnCode) {
        const rawLocationReference = new RawLocationReference();
        rawLocationReference._id = id;
        rawLocationReference._locationType = locationType;
        rawLocationReference._returnCode = returnCode;
        return rawLocationReference;
    }

    static fromIdAndLocationType(id, locationType) {
        const rawLocationReference = new RawLocationReference();
        rawLocationReference._id = id;
        rawLocationReference._locationType = locationType;
        rawLocationReference._returnCode = null;
        return rawLocationReference;
    }

    getId() {
        return this._id;
    }

    hasId() {
        return !!this._id;
    }

    getLocationType() {
        return this._locationType;
    }

    getReturnCode() {
        return this._returnCode;
    }

    isValid() {
        return !this._returnCode;
    }

    getLocationReferencePoints() {
        return null;
    }

    getOffsets() {
        return null;
    }

    getGeoCoordinates() {
        return null;
    }

    getSideOfRoad() {
        return null;
    }

    getOrientation() {
        return null;
    }

    getCornerPoints() {
        return null;
    }

    getLowerLeftPoint() {
        return null;
    }

    getUpperRightPoint() {
        return null;
    }

    getCenterPoint() {
        return null;
    }

    getRadius() {
        return -1;
    }

    getNumberOfColumns() {
        return -1;
    }

    getNumberOfRows() {
        return -1;
    }
};
