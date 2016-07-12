import SideOfRoad from '../../data/location/data/SideOfRoad';
import Orientation from '../../data/location/data/Orientation';
import BinaryConstants from '../BinaryConstants';
import FunctionalRoadClass from '../../map/FunctionalRoadClass';
import FormOfWay from '../../map/FormOfWay';
import LocationReferencePoint from '../../data/LocationReferencePoint';

export default class AbstractDecoder {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        throw new Error('This method is abstract');
    }

    _resolveSideOfRoad(attrib1) {
        const value = attrib1.sideOrOrientation;
        return SideOfRoad.getSideOfRoadValues()[value];
    }

    _resolveOrientation(attrib1) {
        const value = attrib1.sideOrOrientation;
        return Orientation.getOrientationValues()[value];
    }

    _calculateRelativeDistance(offset) {
        const lower = offset * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        const upper = (offset + 1) * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        return (lower + upper) / 2;
    }

    _createFirstLRP(seqNr, firstLRP) {
        const frc = FunctionalRoadClass.getFRCValues()[firstLRP.attrib1.frc];
        const fow = FormOfWay.getFormOfWayValues()[firstLRP.attrib1.fow];
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        const bearing = this._calculate32BitRepresentation(firstLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(firstLRP.attrib3.dnp);
        const lfrc = FunctionalRoadClass.getFRCValues()[firstLRP.attrib2.lfrcnp];
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }

    _createIntermediateLRPFromLatitudeLongitude(seqNr, intermediateLRP, prevLon, prevLat) {
        const frc = FunctionalRoadClass.getFRCValues()[intermediateLRP.attrib1.frc];
        const fow = FormOfWay.getFormOfWayValues()[intermediateLRP.attrib1.fow];
        const lon = prevLon + (intermediateLRP.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const lat = prevLat + (intermediateLRP.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        const bearing = this._calculateBearingEstimate(intermediateLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(intermediateLRP.attrib3.dnp);
        const lfrc = FunctionalRoadClass.getFRCValues()[intermediateLRP.attrib2.lfrcnp];
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }

    _createIntermediateLRPFromFirstAndLast(seqNr, lastClosedLineLRP, firstLRP) {
        const frc = FunctionalRoadClass.getFRCValues()[lastClosedLineLRP.attrib5.frc];
        const fow = FormOfWay.getFormOfWayValues()[lastClosedLineLRP.attrib5.fow];
        const bearing = this._calculateBearingEstimate(lastClosedLineLRP.attrib6.bear);
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        return LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, 0, null, true);
    }

    _createLastLRP(seqNr, lastLRP, prevLon, prevLat) {
        const frc = FunctionalRoadClass.getFRCValues()[lastLRP.attrib1.frc];
        const fow = FormOfWay.getFormOfWayValues()[lastLRP.attrib1.fow];
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
        return Math.round((sgn * BinaryConstants.ROUND_FACTOR) + (val * BinaryConstants.BIT24FACTOR));
    }
};
