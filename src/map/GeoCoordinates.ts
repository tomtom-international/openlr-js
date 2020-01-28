/**
 * Copyright 2020 TomTom International B.V
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

export class GeoCoordinates {
    /** The Constant MAX_LAT. */
    public static MAX_LAT = 90;

    /** The Constant MIN_LAT. */
    public static MIN_LAT = -90;

    /** The Constant MAX_LON. */
    public static MAX_LON = 180;

    /** The Constant MIN_LON. */
    public static MIN_LON = -180;

    /** The longitude. */
    protected _longitude!: number;

    /** The latitude. */
    protected _latitude!: number;

    public getLatitudeDeg() {
        return this._latitude;
    }

    public getLongitudeDeg() {
        return this._longitude;
    }

    public static checkCoordinateBounds(lon: number, lat: number) {
        return (lon >= GeoCoordinates.MIN_LON && lon <= GeoCoordinates.MAX_LON && lat >= GeoCoordinates.MIN_LAT && lat <= GeoCoordinates.MAX_LAT);
    }

    public static fromValues(longitude: number, latitude: number) {
        if (!GeoCoordinates.checkCoordinateBounds(longitude, latitude)) {
            throw new Error('Coordinates out of bounds');
        }
        const geoCoordinates = new GeoCoordinates();
        geoCoordinates._longitude = longitude;
        geoCoordinates._latitude = latitude;
        return geoCoordinates;
    }
}
