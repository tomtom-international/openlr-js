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

import RawLocationReference from './RawLocationReference';

export default class RawPointLocationReference extends RawLocationReference {
    /** The points. */
    _points;

    /** The offsets. */
    _offsets;

    /** The orientation. */
    _orientation;

    /** The side of road. */
    _sideOfRoad;

    static fromValues(id, locationType, lrp1, lrp2, offsets, sideOfRoad, orientation) {
        const rawPointLocationReference = new RawPointLocationReference();
        rawPointLocationReference._id = id;
        rawPointLocationReference._locationType = locationType;
        rawPointLocationReference._returnCode = null;
        rawPointLocationReference._points = [lrp1, lrp2];
        rawPointLocationReference._offsets = offsets;
        rawPointLocationReference._orientation = orientation;
        rawPointLocationReference._sideOfRoad = sideOfRoad;
        return rawPointLocationReference;
    }

    getLocationReferencePoints() {
        return this._points;
    }

    getOffsets() {
        return this._offsets;
    }

    getOrientation() {
        return this._orientation;
    }

    getSideOfRoad() {
        return this._sideOfRoad;
    }
};
