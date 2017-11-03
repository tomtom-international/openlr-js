"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryConstants_1 = require("../BinaryConstants");
const Offset_1 = require("../data/Offset");
const Radius_1 = require("../data/Radius");
const LocationType_1 = require("../../data/LocationType");
const Header_1 = require("../data/Header");
const FirstLRP_1 = require("../data/FirstLRP");
const LastLRP_1 = require("../data/LastLRP");
const IntermediateLRP_1 = require("../data/IntermediateLRP");
const LastClosedLineLRP_1 = require("../data/LastClosedLineLRP");
const Attr1_1 = require("../data/Attr1");
const Attr2_1 = require("../data/Attr2");
const Attr3_1 = require("../data/Attr3");
const Attr4_1 = require("../data/Attr4");
const Attr5_1 = require("../data/Attr5");
const Attr6_1 = require("../data/Attr6");
const FunctionalRoadClass_1 = require("../../map/FunctionalRoadClass");
const FormOfWay_1 = require("../../map/FormOfWay");
const SideOfRoad_1 = require("../../data/location/data/SideOfRoad");
const Orientation_1 = require("../../data/location/data/Orientation");
const AbsoluteCoordinates_1 = require("../data/AbsoluteCoordinates");
const AbsoluteCoordinates_2 = require("../data/AbsoluteCoordinates");
class AbstractEncoder {
    encodeData(rawLocationReference, version) {
        throw new Error('This method is abstract');
    }
    _checkOffsets(offsets, positiveDirection, locationReferences) {
        let length = 0;
        let value = -1;
        if (positiveDirection) {
            length = locationReferences[0].getDistanceToNext();
            value = offsets.getPositiveOffset(length);
        }
        else {
            length = locationReferences[locationReferences.length - 2].getDistanceToNext();
            value = offsets.getNegativeOffset(length);
        }
        return value <= length;
    }
    _generateOffset(offsets, positiveDirection, version, locationReferences) {
        let length = 0;
        let value = -1;
        if (positiveDirection) {
            length = locationReferences[0].getDistanceToNext();
            value = offsets.getPositiveOffset(length);
        }
        else {
            length = locationReferences[locationReferences.length - 2].getDistanceToNext();
            value = offsets.getNegativeOffset(length);
        }
        let offset = null;
        if (value > 0) {
            let offValue = -1;
            if (version === BinaryConstants_1.default.BINARY_VERSION_2) {
                offValue = this._calculateLengthInterval(value);
            }
            else if (version === BinaryConstants_1.default.BINARY_VERSION_3) {
                offValue = this._calculateRelativeInterval(value, length);
            }
            else {
                throw new Error('Invalid version');
            }
            offset = Offset_1.default.fromValues(offValue);
        }
        return offset;
    }
    _generateRadius(radius) {
        return Radius_1.default.fromValues(radius);
    }
    _calculateRelativeInterval(value, length) {
        if (value === length) {
            return BinaryConstants_1.default.OFFSET_BUCKETS - 1;
        }
        return Math.floor((BinaryConstants_1.default.OFFSET_BUCKETS * value) / length);
    }
    _generateHeader(version, locationType, hasAttributes) {
        let pF = BinaryConstants_1.default.IS_NOT_POINT;
        let arF = BinaryConstants_1.default.IS_NOT_AREA;
        if (LocationType_1.POINTS_LOCATIONS.has(locationType)) {
            pF = BinaryConstants_1.default.IS_POINT;
        }
        else if (LocationType_1.AREA_LOCATIONS.has(locationType)) {
            if (locationType === LocationType_1.default.CIRCLE) {
                arF = BinaryConstants_1.default.AREA_CODE_CIRCLE;
            }
            else if (locationType === LocationType_1.default.RECTANGLE) {
                arF = BinaryConstants_1.default.AREA_CODE_RECTANGLE;
            }
            else if (locationType === LocationType_1.default.GRID) {
                arF = BinaryConstants_1.default.AREA_CODE_GRID;
            }
            else if (locationType === LocationType_1.default.POLYGON) {
                arF = BinaryConstants_1.default.AREA_CODE_POLYGON;
            }
            else if (locationType === LocationType_1.default.CLOSED_LINE) {
                arF = BinaryConstants_1.default.AREA_CODE_CLOSEDLINE;
            }
        }
        let aF = BinaryConstants_1.default.HAS_NO_ATTRIBUTES;
        if (hasAttributes) {
            aF = BinaryConstants_1.default.HAS_ATTRIBUTES;
        }
        return Header_1.default.fromValues(arF, aF, pF, version);
    }
    _generateFirstLRPFromLRP(locationReferencePoint) {
        return FirstLRP_1.default.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRP(locationReferencePoint), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    }
    _generateFirstLRPFromLRPAndOrientation(locationReferencePoint, orientation) {
        return FirstLRP_1.default.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRPAndOrientation(locationReferencePoint, orientation), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    }
    _generateLastLrpFromPointsAndOffsets(points, pOff, nOff) {
        const pSize = points.length;
        const lrp = points[pSize - 1];
        const prev = points[pSize - 2];
        return LastLRP_1.default.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute4(lrp, pOff, nOff));
    }
    _generateLastLrpFromPointsAndOffsetAndSideOfRoad(points, pOff, sideOfRoad) {
        const pSize = points.length;
        const lrp = points[pSize - 1];
        const prev = points[pSize - 2];
        return LastLRP_1.default.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRPAndSideOfRoad(lrp, sideOfRoad), this._generateAttribute4(lrp, pOff, null));
    }
    _generateLRPs(pointList) {
        const data = [];
        const nrPoints = pointList.length;
        for (let i = 1; i < nrPoints - 1; i++) {
            const lrp = pointList[i];
            const prev = pointList[i - 1];
            const newLRP = IntermediateLRP_1.default.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute2(lrp), this._generateAttribute3(lrp));
            data.push(newLRP);
        }
        return data;
    }
    _generateLastLineLRP(pointList) {
        const pSize = pointList.length;
        const lrp = pointList[pSize - 1];
        return LastClosedLineLRP_1.default.fromValues(this._generateAttribute5(lrp), this._generateAttribute6(lrp));
    }
    _generateAttribute2(lrp) {
        const lastFrc = lrp.getLfrc();
        if (lastFrc === null) {
            throw new Error('Last FRC cannot be null');
        }
        else {
            return Attr2_1.default.fromValues(FunctionalRoadClass_1.getId(lastFrc), this._calculateBearingInterval(lrp.getBearing()));
        }
    }
    _generateAttribute6(lrp) {
        return Attr6_1.default.fromValues(this._calculateBearingInterval(lrp.getBearing()));
    }
    _generateAttribute1FromLRP(lrp) {
        const frc = lrp.getFRC();
        const fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1_1.default.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow), 0);
        }
    }
    _generateAttribute1FromLRPAndSideOfRoad(lrp, sideOfRoad) {
        const frc = lrp.getFRC();
        const fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1_1.default.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow), SideOfRoad_1.getId(sideOfRoad));
        }
    }
    _generateAttribute1FromLRPAndOrientation(lrp, orientation) {
        const frc = lrp.getFRC();
        const fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1_1.default.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow), Orientation_1.getId(orientation));
        }
    }
    _generateAttribute3(lrp) {
        return Attr3_1.default.fromValues(this._calculateLengthInterval(lrp.getDistanceToNext()));
    }
    _generateAttribute4(lrp, pOff, nOff) {
        let pF = 0;
        if (pOff !== null) {
            pF = 1;
        }
        let nF = 0;
        if (nOff !== null) {
            nF = 1;
        }
        return Attr4_1.default.fromValues(pF, nF, this._calculateBearingInterval(lrp.getBearing()));
    }
    _generateAttribute5(lrp) {
        const frc = lrp.getFRC();
        const fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr5_1.default.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow));
        }
    }
    _calculateBearingInterval(angle) {
        return Math.floor(angle / BinaryConstants_1.default.BEARING_SECTOR);
    }
    _calculateLengthInterval(val) {
        return Math.floor(val / BinaryConstants_1.default.LENGTH_INTERVAL);
    }
    _get24BitRepresentation(val) {
        const sgn = Math.sign(val);
        return Math.round((sgn * BinaryConstants_1.default.ROUND_FACTOR) + (val * BinaryConstants_1.default.BIT24FACTOR));
    }
    _getRelativeRepresentation(prevVal, nextVal) {
        return Math.round(BinaryConstants_1.default.DECA_MICRO_DEG_FACTOR * (nextVal - prevVal));
    }
    _generateAbsCoord(coord) {
        return AbsoluteCoordinates_1.default.fromValues(this._get24BitRepresentation(coord.getLongitudeDeg()), this._get24BitRepresentation(coord.getLatitudeDeg()));
    }
    _generateRelativeCoordinates(startLRP, coord) {
        return AbsoluteCoordinates_2.default.fromValues(this._getRelativeRepresentation(startLRP.getLongitudeDeg(), coord.getLongitudeDeg()), this._getRelativeRepresentation(startLRP.getLatitudeDeg(), coord.getLatitudeDeg()));
    }
    _fitsInto2Bytes(value) {
        return (value >= -Math.pow(2, 15) && value <= Math.pow(2, 15) - 1);
    }
}
exports.default = AbstractEncoder;
;
//# sourceMappingURL=AbstractEncoder.js.map