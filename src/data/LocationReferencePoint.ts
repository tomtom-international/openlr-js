/**
 * Copyright 2018 TomTom International B.V
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

import { GeoCoordinates } from '../map/GeoCoordinates';
import { FormOfWay } from '../map/FormOfWay';
import { FunctionalRoadClass } from '../map/FunctionalRoadClass';

export class LocationReferencePoint {
    /** The bearing of the line referenced by the LRP. */
    protected _bearing!: number;

    /** The distance to the next LRP along the shortest-path. */
    protected _distanceToNext!: number;

    /** The functional road class of the line referenced by the LRP. */
    protected _frc!: FunctionalRoadClass | null;

    /** The form of way of the line referenced by the LRP. */
    protected _fow!: FormOfWay | null;

    /** The lowest functional road class to the next LRP. */
    protected _lfrcnp!: FunctionalRoadClass | null;

    /** indicate that this is the last LRP */
    protected _isLast!: boolean;

    /** The longitude coordinate. */
    protected _longitude!: number;

    /** The latitude coordinate. */
    protected _latitude!: number;

    /** The sequence number. */
    protected _sequenceNumber!: number;

    public getLongitudeDeg() {
        return this._longitude;
    }

    public getLatitudeDeg() {
        return this._latitude;
    }

    public getBearing() {
        return this._bearing;
    }

    public getDistanceToNext() {
        return this._distanceToNext;
    }

    public getFRC() {
        return this._frc;
    }

    public getFOW() {
        return this._fow;
    }

    public getLfrc() {
        return this._lfrcnp;
    }

    public isLastLRP() {
        return this._isLast;
    }

    public static fromValues(sequenceNumber: number, frc: FunctionalRoadClass, fow: FormOfWay, longitude: number, latitude: number, bearing: number, distanceToNext: number, lfrcnp: FunctionalRoadClass | null, isLast: boolean) {
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

    public static fromGeoCoordinate(coord: GeoCoordinates) {
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
}
