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
var BinaryConstants = require("../BinaryConstants");
var Offset_1 = require("../data/Offset");
var Radius_1 = require("../data/Radius");
var LocationType_1 = require("../../data/LocationType");
var Header_1 = require("../data/Header");
var FirstLRP_1 = require("../data/FirstLRP");
var LastLRP_1 = require("../data/LastLRP");
var IntermediateLRP_1 = require("../data/IntermediateLRP");
var LastClosedLineLRP_1 = require("../data/LastClosedLineLRP");
var Attr1_1 = require("../data/Attr1");
var Attr2_1 = require("../data/Attr2");
var Attr3_1 = require("../data/Attr3");
var Attr4_1 = require("../data/Attr4");
var Attr5_1 = require("../data/Attr5");
var Attr6_1 = require("../data/Attr6");
var FunctionalRoadClass_1 = require("../../map/FunctionalRoadClass");
var FormOfWay_1 = require("../../map/FormOfWay");
var SideOfRoad_1 = require("../../data/location/data/SideOfRoad");
var Orientation_1 = require("../../data/location/data/Orientation");
var AbsoluteCoordinates_1 = require("../data/AbsoluteCoordinates");
var RelativeCoordinates_1 = require("../data/RelativeCoordinates");
var AbstractEncoder = /** @class */ (function () {
    function AbstractEncoder() {
    }
    AbstractEncoder.prototype.encodeData = function (rawLocationReference, version) {
        throw new Error('This method is abstract');
    };
    AbstractEncoder.prototype._checkOffsets = function (offsets, positiveDirection, locationReferences) {
        var length = 0;
        var value = -1;
        if (positiveDirection) {
            length = locationReferences[0].getDistanceToNext();
            value = offsets.getPositiveOffset(length);
        }
        else {
            length = locationReferences[locationReferences.length - 2].getDistanceToNext();
            value = offsets.getNegativeOffset(length);
        }
        return value <= length;
    };
    AbstractEncoder.prototype._generateOffset = function (offsets, positiveDirection, version, locationReferences) {
        var length = 0;
        var value = -1;
        if (positiveDirection) {
            length = locationReferences[0].getDistanceToNext();
            value = offsets.getPositiveOffset(length);
        }
        else {
            length = locationReferences[locationReferences.length - 2].getDistanceToNext();
            value = offsets.getNegativeOffset(length);
        }
        var offset = null;
        if (value > 0) {
            var offValue = -1;
            if (version === BinaryConstants.BINARY_VERSION_2) {
                offValue = this._calculateLengthInterval(value);
            }
            else if (version === BinaryConstants.BINARY_VERSION_3) {
                offValue = this._calculateRelativeInterval(value, length);
            }
            else {
                throw new Error('Invalid version');
            }
            offset = Offset_1.Offset.fromValues(offValue);
        }
        return offset;
    };
    AbstractEncoder.prototype._generateRadius = function (radius) {
        return Radius_1.Radius.fromValues(radius);
    };
    AbstractEncoder.prototype._calculateRelativeInterval = function (value, length) {
        if (value === length) {
            return BinaryConstants.OFFSET_BUCKETS - 1;
        }
        return Math.floor((BinaryConstants.OFFSET_BUCKETS * value) / length);
    };
    AbstractEncoder.prototype._generateHeader = function (version, locationType, hasAttributes) {
        var pF = BinaryConstants.IS_NOT_POINT;
        var arF = BinaryConstants.IS_NOT_AREA;
        if (LocationType_1.POINTS_LOCATIONS.has(locationType)) {
            pF = BinaryConstants.IS_POINT;
        }
        else if (LocationType_1.AREA_LOCATIONS.has(locationType)) {
            if (locationType === LocationType_1.LocationType.CIRCLE) {
                arF = BinaryConstants.AREA_CODE_CIRCLE;
            }
            else if (locationType === LocationType_1.LocationType.RECTANGLE) {
                arF = BinaryConstants.AREA_CODE_RECTANGLE;
            }
            else if (locationType === LocationType_1.LocationType.GRID) {
                arF = BinaryConstants.AREA_CODE_GRID;
            }
            else if (locationType === LocationType_1.LocationType.POLYGON) {
                arF = BinaryConstants.AREA_CODE_POLYGON;
            }
            else if (locationType === LocationType_1.LocationType.CLOSED_LINE) {
                arF = BinaryConstants.AREA_CODE_CLOSEDLINE;
            }
        }
        var aF = BinaryConstants.HAS_NO_ATTRIBUTES;
        if (hasAttributes) {
            aF = BinaryConstants.HAS_ATTRIBUTES;
        }
        return Header_1.Header.fromValues(arF, aF, pF, version);
    };
    AbstractEncoder.prototype._generateFirstLRPFromLRP = function (locationReferencePoint) {
        return FirstLRP_1.FirstLRP.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRP(locationReferencePoint), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    };
    AbstractEncoder.prototype._generateFirstLRPFromLRPAndOrientation = function (locationReferencePoint, orientation) {
        return FirstLRP_1.FirstLRP.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRPAndOrientation(locationReferencePoint, orientation), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    };
    AbstractEncoder.prototype._generateLastLrpFromPointsAndOffsets = function (points, pOff, nOff) {
        var pSize = points.length;
        var lrp = points[pSize - 1];
        var prev = points[pSize - 2];
        return LastLRP_1.LastLRP.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute4(lrp, pOff, nOff));
    };
    AbstractEncoder.prototype._generateLastLrpFromPointsAndOffsetAndSideOfRoad = function (points, pOff, sideOfRoad) {
        var pSize = points.length;
        var lrp = points[pSize - 1];
        var prev = points[pSize - 2];
        return LastLRP_1.LastLRP.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRPAndSideOfRoad(lrp, sideOfRoad), this._generateAttribute4(lrp, pOff, null));
    };
    AbstractEncoder.prototype._generateLRPs = function (pointList) {
        var data = [];
        var nrPoints = pointList.length;
        for (var i = 1; i < nrPoints - 1; i++) {
            var lrp = pointList[i];
            var prev = pointList[i - 1];
            var newLRP = IntermediateLRP_1.IntermediateLRP.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute2(lrp), this._generateAttribute3(lrp));
            data.push(newLRP);
        }
        return data;
    };
    AbstractEncoder.prototype._generateLastLineLRP = function (pointList) {
        // Last "intermediate" LRP
        var pSize = pointList.length;
        var lrp = pointList[pSize - 1];
        return LastClosedLineLRP_1.LastClosedLineLRP.fromValues(this._generateAttribute5(lrp), this._generateAttribute6(lrp));
    };
    AbstractEncoder.prototype._generateAttribute2 = function (lrp) {
        var lastFrc = lrp.getLfrc();
        if (lastFrc === null) {
            throw new Error('Last FRC cannot be null');
        }
        else {
            return Attr2_1.Attr2.fromValues(FunctionalRoadClass_1.getId(lastFrc), this._calculateBearingInterval(lrp.getBearing()));
        }
    };
    AbstractEncoder.prototype._generateAttribute6 = function (lrp) {
        return Attr6_1.Attr6.fromValues(this._calculateBearingInterval(lrp.getBearing()));
    };
    AbstractEncoder.prototype._generateAttribute1FromLRP = function (lrp) {
        var frc = lrp.getFRC();
        var fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1_1.Attr1.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow), 0);
        }
    };
    AbstractEncoder.prototype._generateAttribute1FromLRPAndSideOfRoad = function (lrp, sideOfRoad) {
        var frc = lrp.getFRC();
        var fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1_1.Attr1.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow), SideOfRoad_1.getId(sideOfRoad));
        }
    };
    AbstractEncoder.prototype._generateAttribute1FromLRPAndOrientation = function (lrp, orientation) {
        var frc = lrp.getFRC();
        var fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1_1.Attr1.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow), Orientation_1.getId(orientation));
        }
    };
    AbstractEncoder.prototype._generateAttribute3 = function (lrp) {
        return Attr3_1.Attr3.fromValues(this._calculateLengthInterval(lrp.getDistanceToNext()));
    };
    AbstractEncoder.prototype._generateAttribute4 = function (lrp, pOff, nOff) {
        var pF = 0;
        if (pOff !== null) {
            pF = 1;
        }
        var nF = 0;
        if (nOff !== null) {
            nF = 1;
        }
        return Attr4_1.Attr4.fromValues(pF, nF, this._calculateBearingInterval(lrp.getBearing()));
    };
    AbstractEncoder.prototype._generateAttribute5 = function (lrp) {
        var frc = lrp.getFRC();
        var fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr5_1.Attr5.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow));
        }
    };
    AbstractEncoder.prototype._calculateBearingInterval = function (angle) {
        return Math.floor(angle / BinaryConstants.BEARING_SECTOR);
    };
    AbstractEncoder.prototype._calculateLengthInterval = function (val) {
        return Math.floor(val / BinaryConstants.LENGTH_INTERVAL);
    };
    AbstractEncoder.prototype._get24BitRepresentation = function (val) {
        var sgn = Math.sign(val);
        return Math.round((sgn * BinaryConstants.ROUND_FACTOR) + (val * BinaryConstants.BIT24FACTOR));
    };
    AbstractEncoder.prototype._getRelativeRepresentation = function (prevVal, nextVal) {
        return Math.round(BinaryConstants.DECA_MICRO_DEG_FACTOR * (nextVal - prevVal));
    };
    AbstractEncoder.prototype._generateAbsCoord = function (coord) {
        return AbsoluteCoordinates_1.AbsoluteCoordinates.fromValues(this._get24BitRepresentation(coord.getLongitudeDeg()), this._get24BitRepresentation(coord.getLatitudeDeg()));
    };
    AbstractEncoder.prototype._generateRelativeCoordinates = function (startLRP, coord) {
        return RelativeCoordinates_1.RelativeCoordinates.fromValues(this._getRelativeRepresentation(startLRP.getLongitudeDeg(), coord.getLongitudeDeg()), this._getRelativeRepresentation(startLRP.getLatitudeDeg(), coord.getLatitudeDeg()));
    };
    AbstractEncoder.prototype._fitsInto2Bytes = function (value) {
        return (value >= -Math.pow(2, 15) && value <= Math.pow(2, 15) - 1);
    };
    return AbstractEncoder;
}());
exports.AbstractEncoder = AbstractEncoder;
//# sourceMappingURL=AbstractEncoder.js.map