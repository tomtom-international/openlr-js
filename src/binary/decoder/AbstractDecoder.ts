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

import SideOfRoad, {getSideOfRoadValues} from '../../data/location/data/SideOfRoad';
import Orientation, {getOrientationValues} from '../../data/location/data/Orientation';
import BinaryConstants from '../BinaryConstants';
import FunctionalRoadClass, {getFRCValues} from '../../map/FunctionalRoadClass';
import FormOfWay, {getFormOfWayValues} from '../../map/FormOfWay';
import LocationReferencePoint from '../../data/LocationReferencePoint';
import BitStreamInput from '../bit-stream/BitStreamInput';
import RawBinaryData from '../data/RawBinaryData';
import Attr1 from '../data/Attr1';
import FirstLRP from '../data/FirstLRP';
import IntermediateLRP from '../data/IntermediateLRP';
import LastClosedLineLRP from '../data/LastClosedLineLRP';
import LastLRP from '../data/LastLRP';

export default class AbstractDecoder {
    public decodeData(id: string, bitStreamInput: BitStreamInput, totalBytes: number, version: number, binaryData: RawBinaryData | null) {
        throw new Error('This method is abstract');
    }

    protected _resolveSideOfRoad(attrib1: Attr1) {
        const value = attrib1.sideOrOrientation;
        return getSideOfRoadValues()[value];
    }

    protected _resolveOrientation(attrib1: Attr1) {
        const value = attrib1.sideOrOrientation;
        return getOrientationValues()[value];
    }

    protected _calculateRelativeDistance(offset: number) {
        const lower = offset * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        const upper = (offset + 1) * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        return (lower + upper) / 2;
    }

    protected _createFirstLRP(seqNr: number, firstLRP: FirstLRP) {
        const frc = getFRCValues()[firstLRP.attrib1.frc];
        const fow = getFormOfWayValues()[firstLRP.attrib1.fow];
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        const bearing = this._calculateBearingEstimate(firstLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(firstLRP.attrib3.dnp);
        const lfrc = getFRCValues()[firstLRP.attrib2.lfrcnp];
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }

    protected _createIntermediateLRPFromLatitudeLongitude(seqNr: number, intermediateLRP: IntermediateLRP, prevLon: number, prevLat: number) {
        const frc = getFRCValues()[intermediateLRP.attrib1.frc];
        const fow = getFormOfWayValues()[intermediateLRP.attrib1.fow];
        const lon = prevLon + (intermediateLRP.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const lat = prevLat + (intermediateLRP.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const bearing = this._calculateBearingEstimate(intermediateLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(intermediateLRP.attrib3.dnp);
        const lfrc = getFRCValues()[intermediateLRP.attrib2.lfrcnp];
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }

    protected _createIntermediateLRPFromFirstAndLast(seqNr: number, lastClosedLineLRP: LastClosedLineLRP, firstLRP: FirstLRP) {
        const frc = getFRCValues()[lastClosedLineLRP.attrib5.frc];
        const fow = getFormOfWayValues()[lastClosedLineLRP.attrib5.fow];
        const bearing = this._calculateBearingEstimate(lastClosedLineLRP.attrib6.bear);
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, 0, null, true);
    }

    protected _createLastLRP(seqNr: number, lastLRP: LastLRP, prevLon: number, prevLat: number) {
        const frc = getFRCValues()[lastLRP.attrib1.frc];
        const fow = getFormOfWayValues()[lastLRP.attrib1.fow];
        const lon = prevLon + (lastLRP.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const lat = prevLat + (lastLRP.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const bearing = this._calculateBearingEstimate(lastLRP.attrib4.bear);
        const dnp = 0;
        const lfrc = FunctionalRoadClass.FRC_7;
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, true);
    }

    protected _calculate32BitRepresentation(val: number) {
        const sgn = Math.sign(val);
        return (val - (sgn * BinaryConstants.ROUND_FACTOR)) * BinaryConstants.BIT24FACTOR_REVERSED;
    }

    protected _calculateBearingEstimate(interval: number) {
        const lower = interval * BinaryConstants.BEARING_SECTOR;
        const upper = (interval + 1) * BinaryConstants.BEARING_SECTOR;
        return (upper + lower) / 2;
    }

    protected _calculateDistanceEstimate(interval: number) {
        const lower = interval * BinaryConstants.LENGTH_INTERVAL;
        const upper = (interval + 1) * BinaryConstants.LENGTH_INTERVAL;
        return Math.round((upper + lower) / 2);
    }

    protected _get24BitRepresentation(val: number) {
        const sgn = Math.sign(val);
        return Math.round(Math.fround((sgn * BinaryConstants.ROUND_FACTOR) + (val * BinaryConstants.BIT24FACTOR)));
    }
};
