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

import { RawPointLocationReference } from './RawPointLocationReference';
import { LocationType } from '../LocationType';
import { GeoCoordinates } from '../../map/GeoCoordinates';

export class RawGeoCoordLocationReference extends RawPointLocationReference {
    protected _geoCoord!: GeoCoordinates;

    public getGeoCoordinates() {
        return this._geoCoord;
    }

    public static fromGeoCoordValues(id: string, geoCoord: GeoCoordinates) {
        const rawGeoCoordLocationReference = new RawGeoCoordLocationReference();
        rawGeoCoordLocationReference._id = id;
        rawGeoCoordLocationReference._locationType = LocationType.GEO_COORDINATES;
        rawGeoCoordLocationReference._returnCode = null;
        rawGeoCoordLocationReference._geoCoord = geoCoord;
        return rawGeoCoordLocationReference;
    }
}
