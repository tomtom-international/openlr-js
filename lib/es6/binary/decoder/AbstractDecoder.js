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
import { getSideOfRoadValues } from '../../data/location/data/SideOfRoad';
import { getOrientationValues } from '../../data/location/data/Orientation';
import * as BinaryConstants from '../BinaryConstants';
import { FunctionalRoadClass, getFRCValues } from '../../map/FunctionalRoadClass';
import { getFormOfWayValues } from '../../map/FormOfWay';
import { LocationReferencePoint } from '../../data/LocationReferencePoint';
export class AbstractDecoder {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        throw new Error('This method is abstract');
    }
    _resolveSideOfRoad(attrib1) {
        const value = attrib1.sideOrOrientation;
        return getSideOfRoadValues()[value];
    }
    _resolveOrientation(attrib1) {
        const value = attrib1.sideOrOrientation;
        return getOrientationValues()[value];
    }
    _calculateRelativeDistance(offset) {
        const lower = offset * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        const upper = (offset + 1) * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        return (lower + upper) / 2;
    }
    _createFirstLRP(seqNr, firstLRP) {
        const frc = getFRCValues()[firstLRP.attrib1.frc];
        const fow = getFormOfWayValues()[firstLRP.attrib1.fow];
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        const bearing = this._calculateBearingEstimate(firstLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(firstLRP.attrib3.dnp);
        const lfrc = getFRCValues()[firstLRP.attrib2.lfrcnp];
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }
    _createIntermediateLRPFromLatitudeLongitude(seqNr, intermediateLRP, prevLon, prevLat) {
        const frc = getFRCValues()[intermediateLRP.attrib1.frc];
        const fow = getFormOfWayValues()[intermediateLRP.attrib1.fow];
        const lon = prevLon + (intermediateLRP.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const lat = prevLat + (intermediateLRP.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const bearing = this._calculateBearingEstimate(intermediateLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(intermediateLRP.attrib3.dnp);
        const lfrc = getFRCValues()[intermediateLRP.attrib2.lfrcnp];
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }
    _createIntermediateLRPFromFirstAndLast(seqNr, lastClosedLineLRP, firstLRP) {
        const frc = getFRCValues()[lastClosedLineLRP.attrib5.frc];
        const fow = getFormOfWayValues()[lastClosedLineLRP.attrib5.fow];
        const bearing = this._calculateBearingEstimate(lastClosedLineLRP.attrib6.bear);
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, 0, null, true);
    }
    _createLastLRP(seqNr, lastLRP, prevLon, prevLat) {
        const frc = getFRCValues()[lastLRP.attrib1.frc];
        const fow = getFormOfWayValues()[lastLRP.attrib1.fow];
        const lon = prevLon + (lastLRP.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const lat = prevLat + (lastLRP.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const bearing = this._calculateBearingEstimate(lastLRP.attrib4.bear);
        const dnp = 0;
        const lfrc = FunctionalRoadClass.FRC_7;
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, true);
    }
    _calculate32BitRepresentation(val) {
        const sgn = Math.sign(val);
        return (val - (sgn * BinaryConstants.ROUND_FACTOR)) * BinaryConstants.BIT24FACTOR_REVERSED;
    }
    _calculateBearingEstimate(interval) {
        const lower = interval * BinaryConstants.BEARING_SECTOR;
        const upper = (interval + 1) * BinaryConstants.BEARING_SECTOR;
        return (upper + lower) / 2;
    }
    _calculateDistanceEstimate(interval) {
        const lower = interval * BinaryConstants.LENGTH_INTERVAL;
        const upper = (interval + 1) * BinaryConstants.LENGTH_INTERVAL;
        return Math.round((upper + lower) / 2);
    }
    _get24BitRepresentation(val) {
        const sgn = Math.sign(val);
        return Math.round(Math.fround((sgn * BinaryConstants.ROUND_FACTOR) + (val * BinaryConstants.BIT24FACTOR)));
    }
}
//# sourceMappingURL=AbstractDecoder.js.map