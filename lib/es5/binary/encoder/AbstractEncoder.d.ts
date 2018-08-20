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
import { Offset } from '../data/Offset';
import { Radius } from '../data/Radius';
import { LocationType } from '../../data/LocationType';
import { Header } from '../data/Header';
import { FirstLRP } from '../data/FirstLRP';
import { LastLRP } from '../data/LastLRP';
import { IntermediateLRP } from '../data/IntermediateLRP';
import { LastClosedLineLRP } from '../data/LastClosedLineLRP';
import { Attr1 } from '../data/Attr1';
import { Attr2 } from '../data/Attr2';
import { Attr3 } from '../data/Attr3';
import { Attr4 } from '../data/Attr4';
import { Attr5 } from '../data/Attr5';
import { Attr6 } from '../data/Attr6';
import { SideOfRoad } from '../../data/location/data/SideOfRoad';
import { Orientation } from '../../data/location/data/Orientation';
import { AbsoluteCoordinates } from '../data/AbsoluteCoordinates';
import { RelativeCoordinates } from '../data/RelativeCoordinates';
import { RawLocationReference } from '../../data/raw-location-reference/RawLocationReference';
import { Offsets } from '../../data/Offsets';
import { LocationReferencePoint } from '../../data/LocationReferencePoint';
import { GeoCoordinates } from '../../map/GeoCoordinates';
export declare class AbstractEncoder {
    encodeData(rawLocationReference: RawLocationReference, version: number): void;
    protected _checkOffsets(offsets: Offsets, positiveDirection: boolean, locationReferences: Array<LocationReferencePoint>): boolean;
    protected _generateOffset(offsets: Offsets, positiveDirection: boolean, version: number, locationReferences: Array<LocationReferencePoint>): Offset | null;
    protected _generateRadius(radius: number): Radius;
    protected _calculateRelativeInterval(value: number, length: number): number;
    protected _generateHeader(version: number, locationType: LocationType, hasAttributes: boolean): Header;
    protected _generateFirstLRPFromLRP(locationReferencePoint: LocationReferencePoint): FirstLRP;
    protected _generateFirstLRPFromLRPAndOrientation(locationReferencePoint: LocationReferencePoint, orientation: Orientation): FirstLRP;
    protected _generateLastLrpFromPointsAndOffsets(points: Array<LocationReferencePoint>, pOff: Offset | null, nOff: Offset | null): LastLRP;
    protected _generateLastLrpFromPointsAndOffsetAndSideOfRoad(points: Array<LocationReferencePoint>, pOff: Offset, sideOfRoad: SideOfRoad): LastLRP;
    protected _generateLRPs(pointList: Array<LocationReferencePoint>): IntermediateLRP[];
    protected _generateLastLineLRP(pointList: Array<LocationReferencePoint>): LastClosedLineLRP;
    protected _generateAttribute2(lrp: LocationReferencePoint): Attr2;
    protected _generateAttribute6(lrp: LocationReferencePoint): Attr6;
    protected _generateAttribute1FromLRP(lrp: LocationReferencePoint): Attr1;
    protected _generateAttribute1FromLRPAndSideOfRoad(lrp: LocationReferencePoint, sideOfRoad: SideOfRoad): Attr1;
    protected _generateAttribute1FromLRPAndOrientation(lrp: LocationReferencePoint, orientation: Orientation): Attr1;
    protected _generateAttribute3(lrp: LocationReferencePoint): Attr3;
    protected _generateAttribute4(lrp: LocationReferencePoint, pOff: Offset | null, nOff: Offset | null): Attr4;
    protected _generateAttribute5(lrp: LocationReferencePoint): Attr5;
    protected _calculateBearingInterval(angle: number): number;
    protected _calculateLengthInterval(val: number): number;
    protected _get24BitRepresentation(val: number): number;
    protected _getRelativeRepresentation(prevVal: number, nextVal: number): number;
    protected _generateAbsCoord(coord: GeoCoordinates): AbsoluteCoordinates;
    protected _generateRelativeCoordinates(startLRP: LocationReferencePoint, coord: GeoCoordinates): RelativeCoordinates;
    protected _fitsInto2Bytes(value: number): boolean;
}
