"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SideOfRoad_1 = require("../../data/location/data/SideOfRoad");
const Orientation_1 = require("../../data/location/data/Orientation");
const BinaryConstants_1 = require("../BinaryConstants");
const FunctionalRoadClass_1 = require("../../map/FunctionalRoadClass");
const FormOfWay_1 = require("../../map/FormOfWay");
const LocationReferencePoint_1 = require("../../data/LocationReferencePoint");
class AbstractDecoder {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        throw new Error('This method is abstract');
    }
    _resolveSideOfRoad(attrib1) {
        const value = attrib1.sideOrOrientation;
        return SideOfRoad_1.getSideOfRoadValues()[value];
    }
    _resolveOrientation(attrib1) {
        const value = attrib1.sideOrOrientation;
        return Orientation_1.getOrientationValues()[value];
    }
    _calculateRelativeDistance(offset) {
        const lower = offset * BinaryConstants_1.default.RELATIVE_OFFSET_LENGTH;
        const upper = (offset + 1) * BinaryConstants_1.default.RELATIVE_OFFSET_LENGTH;
        return (lower + upper) / 2;
    }
    _createFirstLRP(seqNr, firstLRP) {
        const frc = FunctionalRoadClass_1.getFRCValues()[firstLRP.attrib1.frc];
        const fow = FormOfWay_1.getFormOfWayValues()[firstLRP.attrib1.fow];
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        const bearing = this._calculateBearingEstimate(firstLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(firstLRP.attrib3.dnp);
        const lfrc = FunctionalRoadClass_1.getFRCValues()[firstLRP.attrib2.lfrcnp];
        return LocationReferencePoint_1.default.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }
    _createIntermediateLRPFromLatitudeLongitude(seqNr, intermediateLRP, prevLon, prevLat) {
        const frc = FunctionalRoadClass_1.getFRCValues()[intermediateLRP.attrib1.frc];
        const fow = FormOfWay_1.getFormOfWayValues()[intermediateLRP.attrib1.fow];
        const lon = prevLon + (intermediateLRP.lon / BinaryConstants_1.default.DECA_MICRO_DEG_FACTOR);
        const lat = prevLat + (intermediateLRP.lat / BinaryConstants_1.default.DECA_MICRO_DEG_FACTOR);
        const bearing = this._calculateBearingEstimate(intermediateLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(intermediateLRP.attrib3.dnp);
        const lfrc = FunctionalRoadClass_1.getFRCValues()[intermediateLRP.attrib2.lfrcnp];
        return LocationReferencePoint_1.default.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }
    _createIntermediateLRPFromFirstAndLast(seqNr, lastClosedLineLRP, firstLRP) {
        const frc = FunctionalRoadClass_1.getFRCValues()[lastClosedLineLRP.attrib5.frc];
        const fow = FormOfWay_1.getFormOfWayValues()[lastClosedLineLRP.attrib5.fow];
        const bearing = this._calculateBearingEstimate(lastClosedLineLRP.attrib6.bear);
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        return LocationReferencePoint_1.default.fromValues(seqNr, frc, fow, lon, lat, bearing, 0, null, true);
    }
    _createLastLRP(seqNr, lastLRP, prevLon, prevLat) {
        const frc = FunctionalRoadClass_1.getFRCValues()[lastLRP.attrib1.frc];
        const fow = FormOfWay_1.getFormOfWayValues()[lastLRP.attrib1.fow];
        const lon = prevLon + (lastLRP.lon / BinaryConstants_1.default.DECA_MICRO_DEG_FACTOR);
        const lat = prevLat + (lastLRP.lat / BinaryConstants_1.default.DECA_MICRO_DEG_FACTOR);
        const bearing = this._calculateBearingEstimate(lastLRP.attrib4.bear);
        const dnp = 0;
        const lfrc = FunctionalRoadClass_1.default.FRC_7;
        return LocationReferencePoint_1.default.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, true);
    }
    _calculate32BitRepresentation(val) {
        const sgn = Math.sign(val);
        return (val - (sgn * BinaryConstants_1.default.ROUND_FACTOR)) * BinaryConstants_1.default.BIT24FACTOR_REVERSED;
    }
    _calculateBearingEstimate(interval) {
        const lower = interval * BinaryConstants_1.default.BEARING_SECTOR;
        const upper = (interval + 1) * BinaryConstants_1.default.BEARING_SECTOR;
        return (upper + lower) / 2;
    }
    _calculateDistanceEstimate(interval) {
        const lower = interval * BinaryConstants_1.default.LENGTH_INTERVAL;
        const upper = (interval + 1) * BinaryConstants_1.default.LENGTH_INTERVAL;
        return Math.round((upper + lower) / 2);
    }
    _get24BitRepresentation(val) {
        const sgn = Math.sign(val);
        return Math.round((sgn * BinaryConstants_1.default.ROUND_FACTOR) + (val * BinaryConstants_1.default.BIT24FACTOR));
    }
}
exports.default = AbstractDecoder;
;
//# sourceMappingURL=AbstractDecoder.js.map