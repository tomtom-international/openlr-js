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

import LocationType from '../LocationType';
import GeoCoordinates from '../../map/GeoCoordinates';
import LocationReferencePoint from '../LocationReferencePoint';
import Offsets from '../Offsets';
import SideOfRoad from '../location/data/SideOfRoad';
import Orientation from '../location/data/Orientation';

export default class RawLocationReference {
    protected _locationType: LocationType;

    protected _id: string;

    protected _returnCode: number | null;

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

    public getId() {
        return this._id;
    }

    public hasId() {
        return this._id !== null;
    }

    public getLocationType() {
        return this._locationType;
    }

    public getReturnCode() {
        return this._returnCode;
    }

    public isValid() {
        return this._returnCode === null;
    }

    public getLocationReferencePoints(): Array<LocationReferencePoint> | null {
        return null;
    }

    public getOffsets(): Offsets | null {
        return null;
    }

    public getGeoCoordinates(): GeoCoordinates | null {
        return null;
    }

    public getSideOfRoad(): SideOfRoad | null {
        return null;
    }

    public getOrientation(): Orientation | null {
        return null;
    }

    public getCornerPoints(): Array<GeoCoordinates> | null {
        return null;
    }

    public getLowerLeftPoint(): GeoCoordinates | null {
        return null;
    }

    public getUpperRightPoint(): GeoCoordinates | null {
        return null;
    }

    public getCenterPoint(): GeoCoordinates | null {
        return null;
    }

    public getRadius() {
        return -1;
    }

    public getNumberOfColumns() {
        return -1;
    }

    public getNumberOfRows() {
        return -1;
    }
};
