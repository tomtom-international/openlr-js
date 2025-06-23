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
import { GeoCoordinates } from '../../map/GeoCoordinates';

export class RawCircleLocationReference extends RawPointLocationReference {
    protected _center!: GeoCoordinates;
    protected _radius!: number;

    public getCenterPoint() {
        return this._center;
    }

    public getRadius() {
        return this._radius;
    }

    public static fromCircleValues(id: string, center: GeoCoordinates, radius: number) {
        const rawCircleLocationReference = new RawCircleLocationReference();
        rawCircleLocationReference._id = id;
        rawCircleLocationReference._locationType = LocationType.CIRCLE;
        rawCircleLocationReference._center = center;
        rawCircleLocationReference._radius = radius;
        return rawCircleLocationReference;
    }
}
