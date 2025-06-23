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

import { RawLocationReference } from './RawLocationReference';
import { LocationType } from '../LocationType';
import { GeoCoordinates } from '../../map/GeoCoordinates';

export class RawPolygonLocationReference extends RawLocationReference {

    /** The corner list. */
    protected _corners!: Array<GeoCoordinates>;

    public getCornerPoints() {
        return this._corners;
    }

    public static fromPolygonValues(id: string, corners: Array<GeoCoordinates>) {
        const rawPolygonLocationReference = new RawPolygonLocationReference();
        rawPolygonLocationReference._id = id;
        rawPolygonLocationReference._locationType = LocationType.POLYGON;
        rawPolygonLocationReference._returnCode = null;
        rawPolygonLocationReference._corners = corners;
        return rawPolygonLocationReference;
    }
}
