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
import * as BinaryConstants from '../BinaryConstants';
import { Offset } from '../data/Offset';
import { Radius } from '../data/Radius';
import { LocationType, AREA_LOCATIONS, POINTS_LOCATIONS } from '../../data/LocationType';
import { Header } from '../data/Header';
import { FirstLRP } from '../data/FirstLRP';
import { LastLRP } from '../data/LastLRP';
import { IntermediateLRP } from '../data/IntermediateLRP';
import { LastClosedLineLRP } from '../data/LastClosedLineLRP';
import { Attr1 } from '../data/Attr1';
import { Attr2 } from '../data/Attr2';
import { Attr3 } from '../data/Attr3';
import { Attr4 } from '../data/Attr4';
import { Attr5 } from '../data/Attr5';
import { Attr6 } from '../data/Attr6';
import { getId as functionalRoadClassGetId } from '../../map/FunctionalRoadClass';
import { getId as formOfWayGetId } from '../../map/FormOfWay';
import { getId as sideOfRoadGetId } from '../../data/location/data/SideOfRoad';
import { getId as orientationGetId } from '../../data/location/data/Orientation';
import { AbsoluteCoordinates } from '../data/AbsoluteCoordinates';
import { RelativeCoordinates } from '../data/RelativeCoordinates';
export class AbstractEncoder {
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
            if (version === BinaryConstants.BINARY_VERSION_2) {
                offValue = this._calculateLengthInterval(value);
            }
            else if (version === BinaryConstants.BINARY_VERSION_3) {
                offValue = this._calculateRelativeInterval(value, length);
            }
            else {
                throw new Error('Invalid version');
            }
            offset = Offset.fromValues(offValue);
        }
        return offset;
    }
    _generateRadius(radius) {
        return Radius.fromValues(radius);
    }
    _calculateRelativeInterval(value, length) {
        if (value === length) {
            return BinaryConstants.OFFSET_BUCKETS - 1;
        }
        return Math.floor((BinaryConstants.OFFSET_BUCKETS * value) / length);
    }
    _generateHeader(version, locationType, hasAttributes) {
        let pF = BinaryConstants.IS_NOT_POINT;
        let arF = BinaryConstants.IS_NOT_AREA;
        if (POINTS_LOCATIONS.has(locationType)) {
            pF = BinaryConstants.IS_POINT;
        }
        else if (AREA_LOCATIONS.has(locationType)) {
            if (locationType === LocationType.CIRCLE) {
                arF = BinaryConstants.AREA_CODE_CIRCLE;
            }
            else if (locationType === LocationType.RECTANGLE) {
                arF = BinaryConstants.AREA_CODE_RECTANGLE;
            }
            else if (locationType === LocationType.GRID) {
                arF = BinaryConstants.AREA_CODE_GRID;
            }
            else if (locationType === LocationType.POLYGON) {
                arF = BinaryConstants.AREA_CODE_POLYGON;
            }
            else if (locationType === LocationType.CLOSED_LINE) {
                arF = BinaryConstants.AREA_CODE_CLOSEDLINE;
            }
        }
        let aF = BinaryConstants.HAS_NO_ATTRIBUTES;
        if (hasAttributes) {
            aF = BinaryConstants.HAS_ATTRIBUTES;
        }
        return Header.fromValues(arF, aF, pF, version);
    }
    _generateFirstLRPFromLRP(locationReferencePoint) {
        return FirstLRP.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRP(locationReferencePoint), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    }
    _generateFirstLRPFromLRPAndOrientation(locationReferencePoint, orientation) {
        return FirstLRP.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRPAndOrientation(locationReferencePoint, orientation), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    }
    _generateLastLrpFromPointsAndOffsets(points, pOff, nOff) {
        const pSize = points.length;
        const lrp = points[pSize - 1];
        const prev = points[pSize - 2];
        return LastLRP.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute4(lrp, pOff, nOff));
    }
    _generateLastLrpFromPointsAndOffsetAndSideOfRoad(points, pOff, sideOfRoad) {
        const pSize = points.length;
        const lrp = points[pSize - 1];
        const prev = points[pSize - 2];
        return LastLRP.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRPAndSideOfRoad(lrp, sideOfRoad), this._generateAttribute4(lrp, pOff, null));
    }
    _generateLRPs(pointList) {
        const data = [];
        const nrPoints = pointList.length;
        for (let i = 1; i < nrPoints - 1; i++) {
            const lrp = pointList[i];
            const prev = pointList[i - 1];
            const newLRP = IntermediateLRP.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute2(lrp), this._generateAttribute3(lrp));
            data.push(newLRP);
        }
        return data;
    }
    _generateLastLineLRP(pointList) {
        // Last "intermediate" LRP
        const pSize = pointList.length;
        const lrp = pointList[pSize - 1];
        return LastClosedLineLRP.fromValues(this._generateAttribute5(lrp), this._generateAttribute6(lrp));
    }
    _generateAttribute2(lrp) {
        const lastFrc = lrp.getLfrc();
        if (lastFrc === null) {
            throw new Error('Last FRC cannot be null');
        }
        else {
            return Attr2.fromValues(functionalRoadClassGetId(lastFrc), this._calculateBearingInterval(lrp.getBearing()));
        }
    }
    _generateAttribute6(lrp) {
        return Attr6.fromValues(this._calculateBearingInterval(lrp.getBearing()));
    }
    _generateAttribute1FromLRP(lrp) {
        const frc = lrp.getFRC();
        const fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1.fromValues(functionalRoadClassGetId(frc), formOfWayGetId(fow), 0);
        }
    }
    _generateAttribute1FromLRPAndSideOfRoad(lrp, sideOfRoad) {
        const frc = lrp.getFRC();
        const fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1.fromValues(functionalRoadClassGetId(frc), formOfWayGetId(fow), sideOfRoadGetId(sideOfRoad));
        }
    }
    _generateAttribute1FromLRPAndOrientation(lrp, orientation) {
        const frc = lrp.getFRC();
        const fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1.fromValues(functionalRoadClassGetId(frc), formOfWayGetId(fow), orientationGetId(orientation));
        }
    }
    _generateAttribute3(lrp) {
        return Attr3.fromValues(this._calculateLengthInterval(lrp.getDistanceToNext()));
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
        return Attr4.fromValues(pF, nF, this._calculateBearingInterval(lrp.getBearing()));
    }
    _generateAttribute5(lrp) {
        const frc = lrp.getFRC();
        const fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr5.fromValues(functionalRoadClassGetId(frc), formOfWayGetId(fow));
        }
    }
    _calculateBearingInterval(angle) {
        return Math.floor(angle / BinaryConstants.BEARING_SECTOR);
    }
    _calculateLengthInterval(val) {
        return Math.floor(val / BinaryConstants.LENGTH_INTERVAL);
    }
    _get24BitRepresentation(val) {
        const sgn = Math.sign(val);
        return Math.round((sgn * BinaryConstants.ROUND_FACTOR) + (val * BinaryConstants.BIT24FACTOR));
    }
    _getRelativeRepresentation(prevVal, nextVal) {
        return Math.round(BinaryConstants.DECA_MICRO_DEG_FACTOR * (nextVal - prevVal));
    }
    _generateAbsCoord(coord) {
        return AbsoluteCoordinates.fromValues(this._get24BitRepresentation(coord.getLongitudeDeg()), this._get24BitRepresentation(coord.getLatitudeDeg()));
    }
    _generateRelativeCoordinates(startLRP, coord) {
        return RelativeCoordinates.fromValues(this._getRelativeRepresentation(startLRP.getLongitudeDeg(), coord.getLongitudeDeg()), this._getRelativeRepresentation(startLRP.getLatitudeDeg(), coord.getLatitudeDeg()));
    }
    _fitsInto2Bytes(value) {
        return (value >= -Math.pow(2, 15) && value <= Math.pow(2, 15) - 1);
    }
}
//# sourceMappingURL=AbstractEncoder.js.map