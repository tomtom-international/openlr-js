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

import { AbstractEncoder } from './AbstractEncoder';
import { LocationReference } from '../../data/LocationReference';
import { BinaryReturnCode } from '../BinaryReturnCode';
import * as BinaryConstants from '../BinaryConstants';
import { LocationType } from '../../data/LocationType';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';
import { RawLocationReference } from '../../data/raw-location-reference/RawLocationReference';
import { LocationReferencePoint } from '../../data/LocationReferencePoint';
import { Offsets } from '../../data/Offsets';
import { GeoCoordinates } from '../../map/GeoCoordinates';
import { SideOfRoad } from '../../data/location/data/SideOfRoad';
import { Orientation } from '../../data/location/data/Orientation';

export class PoiAccessEncoder extends AbstractEncoder {
    public encodeData(rawLocationReference: RawLocationReference, version: number) {
        const locationReferencePoints = rawLocationReference.getLocationReferencePoints();
        if (locationReferencePoints === null || locationReferencePoints.length < 2) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.POI_WITH_ACCESS_POINT, version);
        } else {
            const startLRP = locationReferencePoints[0];
            const endLRP = locationReferencePoints[1];
            const offsets = rawLocationReference.getOffsets();
            const coord = rawLocationReference.getGeoCoordinates();
            const sideOfRoad = rawLocationReference.getSideOfRoad();
            const orientation = rawLocationReference.getOrientation();
            if (startLRP === null || endLRP === null || offsets === null || coord === null || sideOfRoad === null || orientation === null) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.POI_WITH_ACCESS_POINT, version);
            }
            if (version < BinaryConstants.BINARY_VERSION_3) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_VERSION, LocationType.POI_WITH_ACCESS_POINT, version);
            }
            const returnCode = this._checkOffsets(offsets, true, locationReferencePoints);
            if (!returnCode) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.POI_WITH_ACCESS_POINT, version);
            }
            // The point of interest is stored as a two byte relative coordinate, so it has to be
            // close enough to the first LRP to fit into that range.
            const relCoord = this._generateRelativeCoordinates(startLRP, coord);
            if (!this._fitsInto2Bytes(relCoord.lon) || !this._fitsInto2Bytes(relCoord.lat)) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_BINARY_DATA, LocationType.POI_WITH_ACCESS_POINT, version);
            }
            return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPoiAccessLocation(startLRP, endLRP, offsets, coord, sideOfRoad, orientation, version));
        }
    }

    protected _generateBinaryPoiAccessLocation(startLRP: LocationReferencePoint, endLRP: LocationReferencePoint, offsets: Offsets, coord: GeoCoordinates, sideOfRoad: SideOfRoad, orientation: Orientation, version: number) {
        const header = this._generateHeader(version, LocationType.POI_WITH_ACCESS_POINT, true);
        const first = this._generateFirstLRPFromLRPAndOrientation(startLRP, orientation);
        const lrps = [startLRP, endLRP];
        const pOff = this._generateOffset(offsets, true, version, lrps);
        const last = this._generateLastLrpFromPointsAndOffsetAndSideOfRoad(lrps, pOff, sideOfRoad);
        const relCoord = this._generateRelativeCoordinates(startLRP, coord);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        first.put(out);
        last.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        relCoord.put(out);
        return out.getData();
    }
}
