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

export default class LocationReferencePoint {
    /** The bearing of the line referenced by the LRP. */
    _bearing;

    /** The distance to the next LRP along the shortest-path. */
    _distanceToNext;

    /** The functional road class of the line referenced by the LRP. */
    _frc;

    /** The form of way of the line referenced by the LRP. */
    _fow;

    /** The lowest functional road class to the next LRP. */
    _lfrcnp;

    /** indicate that this is the last LRP */
    _isLast;

    /** The longitude coordinate. */
    _longitude;

    /** The latitude coordinate. */
    _latitude;

    /** The sequence number. */
    _sequenceNumber;

    static fromValues(sequenceNumber, frc, fow, longitude, latitude, bearing, distanceToNext, lfrcnp, isLast) {
        const lrp = new LocationReferencePoint();
        lrp._bearing = bearing;
        lrp._distanceToNext = distanceToNext;
        lrp._frc = frc;
        lrp._fow = fow;
        lrp._lfrcnp = lfrcnp;
        lrp._isLast = isLast;
        lrp._longitude = longitude;
        lrp._latitude = latitude;
        lrp._sequenceNumber = sequenceNumber;
        return lrp;
    }

    static fromGeoCoordinate(coord) {
        const lrp = new LocationReferencePoint();
        lrp._longitude = coord.getLongitudeDeg();
        lrp._latitude = coord.getLatitudeDeg();
        lrp._frc = null;
        lrp._fow = null;
        lrp._bearing = 0;
        lrp._lfrcnp = null;
        lrp._isLast = false;
        lrp._distanceToNext = 0;
        lrp._sequenceNumber = 1;
        return lrp;
    }

    getLongitudeDeg() {
        return this._longitude;
    }

    getLatitudeDeg() {
        return this._latitude;
    }

    getBearing() {
        return this._bearing;
    }

    getDistanceToNext() {
        return this._distanceToNext;
    }

    getFRC() {
        return this._frc;
    }

    getFOW() {
        return this._fow;
    }

    getLfrc() {
        return this._lfrcnp;
    }

    isLastLRP() {
        return this._isLast;
    }
};
