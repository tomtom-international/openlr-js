/*
 * Copyright (c) 2020-2025 TomTom International B.V.
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
import { LocationReferencePoint } from '../LocationReferencePoint';
import { Offsets } from '../Offsets';
import { GeoCoordinates } from '../../map/GeoCoordinates';
import { SideOfRoad } from '../location/data/SideOfRoad';
import { Orientation } from '../location/data/Orientation';

export class RawPoiAccessLocationReference extends RawPointLocationReference {
    /** The coordinates of the point of interest. */
    protected _geoCoord!: GeoCoordinates;

    public getGeoCoordinates() {
        return this._geoCoord;
    }

    public static fromPoiAccessValues(id: string, lrp1: LocationReferencePoint, lrp2: LocationReferencePoint, offsets: Offsets, geoCoord: GeoCoordinates, sideOfRoad: SideOfRoad, orientation: Orientation) {
        const rawPoiAccessLocationReference = new RawPoiAccessLocationReference();
        rawPoiAccessLocationReference._id = id;
        rawPoiAccessLocationReference._locationType = LocationType.POI_WITH_ACCESS_POINT;
        rawPoiAccessLocationReference._returnCode = null;
        rawPoiAccessLocationReference._points = [lrp1, lrp2];
        rawPoiAccessLocationReference._offsets = offsets;
        rawPoiAccessLocationReference._geoCoord = geoCoord;
        rawPoiAccessLocationReference._orientation = orientation;
        rawPoiAccessLocationReference._sideOfRoad = sideOfRoad;
        return rawPoiAccessLocationReference;
    }
}
