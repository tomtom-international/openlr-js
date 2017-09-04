'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SideOfRoad = require('../../data/location/data/SideOfRoad');

var _SideOfRoad2 = _interopRequireDefault(_SideOfRoad);

var _Orientation = require('../../data/location/data/Orientation');

var _Orientation2 = _interopRequireDefault(_Orientation);

var _BinaryConstants = require('../BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

var _FunctionalRoadClass = require('../../map/FunctionalRoadClass');

var _FunctionalRoadClass2 = _interopRequireDefault(_FunctionalRoadClass);

var _FormOfWay = require('../../map/FormOfWay');

var _FormOfWay2 = _interopRequireDefault(_FormOfWay);

var _LocationReferencePoint = require('../../data/LocationReferencePoint');

var _LocationReferencePoint2 = _interopRequireDefault(_LocationReferencePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2016 TomTom International B.V
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

class AbstractDecoder {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        throw new Error('This method is abstract');
    }

    _resolveSideOfRoad(attrib1) {
        const value = attrib1.sideOrOrientation;
        return _SideOfRoad2.default.getSideOfRoadValues()[value];
    }

    _resolveOrientation(attrib1) {
        const value = attrib1.sideOrOrientation;
        return _Orientation2.default.getOrientationValues()[value];
    }

    _calculateRelativeDistance(offset) {
        const lower = offset * _BinaryConstants2.default.RELATIVE_OFFSET_LENGTH;
        const upper = (offset + 1) * _BinaryConstants2.default.RELATIVE_OFFSET_LENGTH;
        return (lower + upper) / 2;
    }

    _createFirstLRP(seqNr, firstLRP) {
        const frc = _FunctionalRoadClass2.default.getFRCValues()[firstLRP.attrib1.frc];
        const fow = _FormOfWay2.default.getFormOfWayValues()[firstLRP.attrib1.fow];
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        const bearing = this._calculateBearingEstimate(firstLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(firstLRP.attrib3.dnp);
        const lfrc = _FunctionalRoadClass2.default.getFRCValues()[firstLRP.attrib2.lfrcnp];
        return _LocationReferencePoint2.default.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }

    _createIntermediateLRPFromLatitudeLongitude(seqNr, intermediateLRP, prevLon, prevLat) {
        const frc = _FunctionalRoadClass2.default.getFRCValues()[intermediateLRP.attrib1.frc];
        const fow = _FormOfWay2.default.getFormOfWayValues()[intermediateLRP.attrib1.fow];
        const lon = prevLon + intermediateLRP.lon / _BinaryConstants2.default.DECA_MICRO_DEG_FACTOR;
        const lat = prevLat + intermediateLRP.lat / _BinaryConstants2.default.DECA_MICRO_DEG_FACTOR;
        const bearing = this._calculateBearingEstimate(intermediateLRP.attrib2.bear);
        const dnp = this._calculateDistanceEstimate(intermediateLRP.attrib3.dnp);
        const lfrc = _FunctionalRoadClass2.default.getFRCValues()[intermediateLRP.attrib2.lfrcnp];
        return _LocationReferencePoint2.default.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    }

    _createIntermediateLRPFromFirstAndLast(seqNr, lastClosedLineLRP, firstLRP) {
        const frc = _FunctionalRoadClass2.default.getFRCValues()[lastClosedLineLRP.attrib5.frc];
        const fow = _FormOfWay2.default.getFormOfWayValues()[lastClosedLineLRP.attrib5.fow];
        const bearing = this._calculateBearingEstimate(lastClosedLineLRP.attrib6.bear);
        const lon = this._calculate32BitRepresentation(firstLRP.lon);
        const lat = this._calculate32BitRepresentation(firstLRP.lat);
        return _LocationReferencePoint2.default.fromValues(seqNr, frc, fow, lon, lat, bearing, 0, null, true);
    }

    _createLastLRP(seqNr, lastLRP, prevLon, prevLat) {
        const frc = _FunctionalRoadClass2.default.getFRCValues()[lastLRP.attrib1.frc];
        const fow = _FormOfWay2.default.getFormOfWayValues()[lastLRP.attrib1.fow];
        const lon = prevLon + lastLRP.lon / _BinaryConstants2.default.DECA_MICRO_DEG_FACTOR;
        const lat = prevLat + lastLRP.lat / _BinaryConstants2.default.DECA_MICRO_DEG_FACTOR;
        const bearing = this._calculateBearingEstimate(lastLRP.attrib4.bear);
        const dnp = 0;
        const lfrc = _FunctionalRoadClass2.default.FRC_7;
        return _LocationReferencePoint2.default.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, true);
    }

    _calculate32BitRepresentation(val) {
        const sgn = Math.sign(val);
        return (val - sgn * _BinaryConstants2.default.ROUND_FACTOR) * _BinaryConstants2.default.BIT24FACTOR_REVERSED;
    }

    _calculateBearingEstimate(interval) {
        const lower = interval * _BinaryConstants2.default.BEARING_SECTOR;
        const upper = (interval + 1) * _BinaryConstants2.default.BEARING_SECTOR;
        return (upper + lower) / 2;
    }

    _calculateDistanceEstimate(interval) {
        const lower = interval * _BinaryConstants2.default.LENGTH_INTERVAL;
        const upper = (interval + 1) * _BinaryConstants2.default.LENGTH_INTERVAL;
        return Math.round((upper + lower) / 2);
    }

    _get24BitRepresentation(val) {
        const sgn = Math.sign(val);
        return Math.round(sgn * _BinaryConstants2.default.ROUND_FACTOR + val * _BinaryConstants2.default.BIT24FACTOR);
    }
}exports.default = AbstractDecoder;
;