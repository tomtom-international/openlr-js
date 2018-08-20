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
import { LocationReferencePoint } from '../../data/LocationReferencePoint';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { RawBinaryData } from '../data/RawBinaryData';
import { Attr1 } from '../data/Attr1';
import { FirstLRP } from '../data/FirstLRP';
import { IntermediateLRP } from '../data/IntermediateLRP';
import { LastClosedLineLRP } from '../data/LastClosedLineLRP';
import { LastLRP } from '../data/LastLRP';
import { RawLocationReference } from '../../data/raw-location-reference/RawLocationReference';
export declare class AbstractDecoder {
    decodeData(id: string, bitStreamInput: BitStreamInput, totalBytes: number, version: number, binaryData: RawBinaryData | null): RawLocationReference;
    protected _resolveSideOfRoad(attrib1: Attr1): SideOfRoad;
    protected _resolveOrientation(attrib1: Attr1): Orientation;
    protected _calculateRelativeDistance(offset: number): number;
    protected _createFirstLRP(seqNr: number, firstLRP: FirstLRP): LocationReferencePoint;
    protected _createIntermediateLRPFromLatitudeLongitude(seqNr: number, intermediateLRP: IntermediateLRP, prevLon: number, prevLat: number): LocationReferencePoint;
    protected _createIntermediateLRPFromFirstAndLast(seqNr: number, lastClosedLineLRP: LastClosedLineLRP, firstLRP: FirstLRP): LocationReferencePoint;
    protected _createLastLRP(seqNr: number, lastLRP: LastLRP, prevLon: number, prevLat: number): LocationReferencePoint;
    protected _calculate32BitRepresentation(val: number): number;
    protected _calculateBearingEstimate(interval: number): number;
    protected _calculateDistanceEstimate(interval: number): number;
    protected _get24BitRepresentation(val: number): number;
}
