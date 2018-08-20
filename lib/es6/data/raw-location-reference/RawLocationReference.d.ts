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
import { LocationType } from '../LocationType';
import { GeoCoordinates } from '../../map/GeoCoordinates';
import { LocationReferencePoint } from '../LocationReferencePoint';
import { Offsets } from '../Offsets';
import { SideOfRoad } from '../location/data/SideOfRoad';
import { Orientation } from '../location/data/Orientation';
export declare class RawLocationReference {
    protected _locationType: LocationType;
    protected _id: string;
    protected _returnCode: number | null;
    getId(): string;
    hasId(): boolean;
    getLocationType(): LocationType;
    getReturnCode(): number | null;
    isValid(): boolean;
    getLocationReferencePoints(): Array<LocationReferencePoint> | null;
    getOffsets(): Offsets | null;
    getGeoCoordinates(): GeoCoordinates | null;
    getSideOfRoad(): SideOfRoad | null;
    getOrientation(): Orientation | null;
    getCornerPoints(): Array<GeoCoordinates> | null;
    getLowerLeftPoint(): GeoCoordinates | null;
    getUpperRightPoint(): GeoCoordinates | null;
    getCenterPoint(): GeoCoordinates | null;
    getRadius(): number;
    getNumberOfColumns(): number;
    getNumberOfRows(): number;
}
