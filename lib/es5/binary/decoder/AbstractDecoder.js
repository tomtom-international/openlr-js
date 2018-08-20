"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var SideOfRoad_1 = require("../../data/location/data/SideOfRoad");
var Orientation_1 = require("../../data/location/data/Orientation");
var BinaryConstants = require("../BinaryConstants");
var FunctionalRoadClass_1 = require("../../map/FunctionalRoadClass");
var FormOfWay_1 = require("../../map/FormOfWay");
var LocationReferencePoint_1 = require("../../data/LocationReferencePoint");
var AbstractDecoder = /** @class */ (function () {
    function AbstractDecoder() {
    }
    AbstractDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        throw new Error('This method is abstract');
    };
    AbstractDecoder.prototype._resolveSideOfRoad = function (attrib1) {
        var value = attrib1.sideOrOrientation;
        return SideOfRoad_1.getSideOfRoadValues()[value];
    };
    AbstractDecoder.prototype._resolveOrientation = function (attrib1) {
        var value = attrib1.sideOrOrientation;
        return Orientation_1.getOrientationValues()[value];
    };
    AbstractDecoder.prototype._calculateRelativeDistance = function (offset) {
        var lower = offset * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        var upper = (offset + 1) * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        return (lower + upper) / 2;
    };
    AbstractDecoder.prototype._createFirstLRP = function (seqNr, firstLRP) {
        var frc = FunctionalRoadClass_1.getFRCValues()[firstLRP.attrib1.frc];
        var fow = FormOfWay_1.getFormOfWayValues()[firstLRP.attrib1.fow];
        var lon = this._calculate32BitRepresentation(firstLRP.lon);
        var lat = this._calculate32BitRepresentation(firstLRP.lat);
        var bearing = this._calculateBearingEstimate(firstLRP.attrib2.bear);
        var dnp = this._calculateDistanceEstimate(firstLRP.attrib3.dnp);
        var lfrc = FunctionalRoadClass_1.getFRCValues()[firstLRP.attrib2.lfrcnp];
        return LocationReferencePoint_1.LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    };
    AbstractDecoder.prototype._createIntermediateLRPFromLatitudeLongitude = function (seqNr, intermediateLRP, prevLon, prevLat) {
        var frc = FunctionalRoadClass_1.getFRCValues()[intermediateLRP.attrib1.frc];
        var fow = FormOfWay_1.getFormOfWayValues()[intermediateLRP.attrib1.fow];
        var lon = prevLon + (intermediateLRP.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        var lat = prevLat + (intermediateLRP.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        var bearing = this._calculateBearingEstimate(intermediateLRP.attrib2.bear);
        var dnp = this._calculateDistanceEstimate(intermediateLRP.attrib3.dnp);
        var lfrc = FunctionalRoadClass_1.getFRCValues()[intermediateLRP.attrib2.lfrcnp];
        return LocationReferencePoint_1.LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    };
    AbstractDecoder.prototype._createIntermediateLRPFromFirstAndLast = function (seqNr, lastClosedLineLRP, firstLRP) {
        var frc = FunctionalRoadClass_1.getFRCValues()[lastClosedLineLRP.attrib5.frc];
        var fow = FormOfWay_1.getFormOfWayValues()[lastClosedLineLRP.attrib5.fow];
        var bearing = this._calculateBearingEstimate(lastClosedLineLRP.attrib6.bear);
        var lon = this._calculate32BitRepresentation(firstLRP.lon);
        var lat = this._calculate32BitRepresentation(firstLRP.lat);
        return LocationReferencePoint_1.LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, 0, null, true);
    };
    AbstractDecoder.prototype._createLastLRP = function (seqNr, lastLRP, prevLon, prevLat) {
        var frc = FunctionalRoadClass_1.getFRCValues()[lastLRP.attrib1.frc];
        var fow = FormOfWay_1.getFormOfWayValues()[lastLRP.attrib1.fow];
        var lon = prevLon + (lastLRP.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        var lat = prevLat + (lastLRP.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        var bearing = this._calculateBearingEstimate(lastLRP.attrib4.bear);
        var dnp = 0;
        var lfrc = FunctionalRoadClass_1.FunctionalRoadClass.FRC_7;
        return LocationReferencePoint_1.LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, true);
    };
    AbstractDecoder.prototype._calculate32BitRepresentation = function (val) {
        var sgn = Math.sign(val);
        return (val - (sgn * BinaryConstants.ROUND_FACTOR)) * BinaryConstants.BIT24FACTOR_REVERSED;
    };
    AbstractDecoder.prototype._calculateBearingEstimate = function (interval) {
        var lower = interval * BinaryConstants.BEARING_SECTOR;
        var upper = (interval + 1) * BinaryConstants.BEARING_SECTOR;
        return (upper + lower) / 2;
    };
    AbstractDecoder.prototype._calculateDistanceEstimate = function (interval) {
        var lower = interval * BinaryConstants.LENGTH_INTERVAL;
        var upper = (interval + 1) * BinaryConstants.LENGTH_INTERVAL;
        return Math.round((upper + lower) / 2);
    };
    AbstractDecoder.prototype._get24BitRepresentation = function (val) {
        var sgn = Math.sign(val);
        return Math.round(Math.fround((sgn * BinaryConstants.ROUND_FACTOR) + (val * BinaryConstants.BIT24FACTOR)));
    };
    return AbstractDecoder;
}());
exports.AbstractDecoder = AbstractDecoder;
//# sourceMappingURL=AbstractDecoder.js.map