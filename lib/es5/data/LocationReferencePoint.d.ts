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
import { GeoCoordinates } from '../map/GeoCoordinates';
import { FormOfWay } from '../map/FormOfWay';
import { FunctionalRoadClass } from '../map/FunctionalRoadClass';
export declare class LocationReferencePoint {
    /** The bearing of the line referenced by the LRP. */
    protected _bearing: number;
    /** The distance to the next LRP along the shortest-path. */
    protected _distanceToNext: number;
    /** The functional road class of the line referenced by the LRP. */
    protected _frc: FunctionalRoadClass | null;
    /** The form of way of the line referenced by the LRP. */
    protected _fow: FormOfWay | null;
    /** The lowest functional road class to the next LRP. */
    protected _lfrcnp: FunctionalRoadClass | null;
    /** indicate that this is the last LRP */
    protected _isLast: boolean;
    /** The longitude coordinate. */
    protected _longitude: number;
    /** The latitude coordinate. */
    protected _latitude: number;
    /** The sequence number. */
    protected _sequenceNumber: number;
    getLongitudeDeg(): number;
    getLatitudeDeg(): number;
    getBearing(): number;
    getDistanceToNext(): number;
    getFRC(): FunctionalRoadClass | null;
    getFOW(): FormOfWay | null;
    getLfrc(): FunctionalRoadClass | null;
    isLastLRP(): boolean;
    static fromValues(sequenceNumber: number, frc: FunctionalRoadClass, fow: FormOfWay, longitude: number, latitude: number, bearing: number, distanceToNext: number, lfrcnp: FunctionalRoadClass | null, isLast: boolean): LocationReferencePoint;
    static fromGeoCoordinate(coord: GeoCoordinates): LocationReferencePoint;
}
