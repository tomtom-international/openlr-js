'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BinaryConstants = require('../BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

var _Offset = require('../data/Offset');

var _Offset2 = _interopRequireDefault(_Offset);

var _Radius = require('../data/Radius');

var _Radius2 = _interopRequireDefault(_Radius);

var _LocationType = require('../../data/LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

var _Header = require('../data/Header');

var _Header2 = _interopRequireDefault(_Header);

var _FirstLRP = require('../data/FirstLRP');

var _FirstLRP2 = _interopRequireDefault(_FirstLRP);

var _LastLRP = require('../data/LastLRP');

var _LastLRP2 = _interopRequireDefault(_LastLRP);

var _IntermediateLRP = require('../data/IntermediateLRP');

var _IntermediateLRP2 = _interopRequireDefault(_IntermediateLRP);

var _LastClosedLineLRP = require('../data/LastClosedLineLRP');

var _LastClosedLineLRP2 = _interopRequireDefault(_LastClosedLineLRP);

var _Attr = require('../data/Attr1');

var _Attr2 = _interopRequireDefault(_Attr);

var _Attr3 = require('../data/Attr2');

var _Attr4 = _interopRequireDefault(_Attr3);

var _Attr5 = require('../data/Attr3');

var _Attr6 = _interopRequireDefault(_Attr5);

var _Attr7 = require('../data/Attr4');

var _Attr8 = _interopRequireDefault(_Attr7);

var _Attr9 = require('../data/Attr5');

var _Attr10 = _interopRequireDefault(_Attr9);

var _Attr11 = require('../data/Attr6');

var _Attr12 = _interopRequireDefault(_Attr11);

var _FunctionalRoadClass = require('../../map/FunctionalRoadClass');

var _FunctionalRoadClass2 = _interopRequireDefault(_FunctionalRoadClass);

var _FormOfWay = require('../../map/FormOfWay');

var _FormOfWay2 = _interopRequireDefault(_FormOfWay);

var _SideOfRoad = require('../../data/location/data/SideOfRoad');

var _SideOfRoad2 = _interopRequireDefault(_SideOfRoad);

var _Orientation = require('../../data/location/data/Orientation');

var _Orientation2 = _interopRequireDefault(_Orientation);

var _AbsoluteCoordinates = require('../data/AbsoluteCoordinates');

var _AbsoluteCoordinates2 = _interopRequireDefault(_AbsoluteCoordinates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        } else {
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
        } else {
            length = locationReferences[locationReferences.length - 2].getDistanceToNext();
            value = offsets.getNegativeOffset(length);
        }
        let offset = null;
        if (value > 0) {
            let offValue = -1;
            if (version === _BinaryConstants2.default.BINARY_VERSION_2) {
                offValue = this._calculateLengthInterval(value);
            } else if (version === _BinaryConstants2.default.BINARY_VERSION_3) {
                offValue = this._calculateRelativeInterval(value, length);
            } else {
                throw new Error('Invalid version');
            }
            offset = _Offset2.default.fromValues(offValue);
        }
        return offset;
    }

    _generateRadius(radius) {
        return _Radius2.default.fromValues(radius);
    }

    _calculateRelativeInterval(value, length) {
        if (value === length) {
            return _BinaryConstants2.default.OFFSET_BUCKETS - 1;
        }
        return Math.floor(_BinaryConstants2.default.OFFSET_BUCKETS * value / length);
    }

    _generateHeader(version, locationType, hasAttributes) {
        let pF = _BinaryConstants2.default.IS_NOT_POINT;
        let arF = _BinaryConstants2.default.IS_NOT_AREA;

        if (_LocationType2.default.POINTS_LOCATIONS.has(locationType)) {
            pF = _BinaryConstants2.default.IS_POINT;
        } else if (_LocationType2.default.AREA_LOCATIONS.has(locationType)) {
            if (locationType === _LocationType2.default.CIRCLE) {
                arF = _BinaryConstants2.default.AREA_CODE_CIRCLE;
            } else if (locationType === _LocationType2.default.RECTANGLE) {
                arF = _BinaryConstants2.default.AREA_CODE_RECTANGLE;
            } else if (locationType === _LocationType2.default.GRID) {
                arF = _BinaryConstants2.default.AREA_CODE_GRID;
            } else if (locationType === _LocationType2.default.POLYGON) {
                arF = _BinaryConstants2.default.AREA_CODE_POLYGON;
            } else if (locationType === _LocationType2.default.CLOSED_LINE) {
                arF = _BinaryConstants2.default.AREA_CODE_CLOSEDLINE;
            }
        }
        let aF = _BinaryConstants2.default.HAS_NO_ATTRIBUTES;
        if (hasAttributes) {
            aF = _BinaryConstants2.default.HAS_ATTRIBUTES;
        }
        return _Header2.default.fromValues(arF, aF, pF, version);
    }

    _generateFirstLRPFromLRP(locationReferencePoint) {
        return _FirstLRP2.default.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRP(locationReferencePoint), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    }

    _generateFirstLRPFromLRPAndOrientation(locationReferencePoint, orientation) {
        return _FirstLRP2.default.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRPAndOrientation(locationReferencePoint, orientation), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    }

    _generateLastLrpFromPointsAndOffsets(points, pOff, nOff) {
        const pSize = points.length;
        const lrp = points[pSize - 1];
        const prev = points[pSize - 2];
        return _LastLRP2.default.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute4(lrp, pOff, nOff));
    }

    _generateLastLrpFromPointsAndOffsetAndSideOfRoad(points, pOff, sideOfRoad) {
        const pSize = points.length;
        const lrp = points[pSize - 1];
        const prev = points[pSize - 2];
        return _LastLRP2.default.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRPAndSideOfRoad(lrp, sideOfRoad), this._generateAttribute4(lrp, pOff, null));
    }

    _generateLRPs(pointList) {
        const data = [];
        const nrPoints = pointList.length;
        for (let i = 1; i < nrPoints - 1; i++) {
            const lrp = pointList[i];
            const prev = pointList[i - 1];
            const newLRP = _IntermediateLRP2.default.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute2(lrp), this._generateAttribute3(lrp));
            data.push(newLRP);
        }
        return data;
    }

    _generateLastLineLRP(pointList) {
        // Last "intermediate" LRP
        const pSize = pointList.length;
        const lrp = pointList[pSize - 1];
        return _LastClosedLineLRP2.default.fromValues(this._generateAttribute5(lrp), this._generateAttribute6(lrp));
    }

    _generateAttribute2(lrp) {
        return _Attr4.default.fromValues(_FunctionalRoadClass2.default.getId(lrp.getLfrc()), this._calculateBearingInterval(lrp.getBearing()));
    }

    _generateAttribute6(lrp) {
        return _Attr12.default.fromValues(this._calculateBearingInterval(lrp.getBearing()));
    }

    _generateAttribute1FromLRP(lrp) {
        return _Attr2.default.fromValues(_FunctionalRoadClass2.default.getId(lrp.getFRC()), _FormOfWay2.default.getId(lrp.getFOW()), 0);
    }

    _generateAttribute1FromLRPAndSideOfRoad(lrp, sideOfRoad) {
        return _Attr2.default.fromValues(_FunctionalRoadClass2.default.getId(lrp.getFRC()), _FormOfWay2.default.getId(lrp.getFOW()), _SideOfRoad2.default.getId(sideOfRoad));
    }

    _generateAttribute1FromLRPAndOrientation(lrp, orientation) {
        return _Attr2.default.fromValues(_FunctionalRoadClass2.default.getId(lrp.getFRC()), _FormOfWay2.default.getId(lrp.getFOW()), _Orientation2.default.getId(orientation));
    }

    _generateAttribute3(lrp) {
        return _Attr6.default.fromValues(this._calculateLengthInterval(lrp.getDistanceToNext()));
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
        return _Attr8.default.fromValues(pF, nF, this._calculateBearingInterval(lrp.getBearing()));
    }

    _generateAttribute5(lrp) {
        return _Attr10.default.fromValues(_FunctionalRoadClass2.default.getId(lrp.getFRC()), _FormOfWay2.default.getId(lrp.getFOW()));
    }

    _calculateBearingInterval(angle) {
        return Math.floor(angle / _BinaryConstants2.default.BEARING_SECTOR);
    }

    _calculateLengthInterval(val) {
        return Math.floor(val / _BinaryConstants2.default.LENGTH_INTERVAL);
    }

    _get24BitRepresentation(val) {
        const sgn = Math.sign(val);
        return Math.round(sgn * _BinaryConstants2.default.ROUND_FACTOR + val * _BinaryConstants2.default.BIT24FACTOR);
    }

    _getRelativeRepresentation(prevVal, nextVal) {
        return Math.round(_BinaryConstants2.default.DECA_MICRO_DEG_FACTOR * (nextVal - prevVal));
    }

    _generateAbsCoord(coord) {
        return _AbsoluteCoordinates2.default.fromValues(this._get24BitRepresentation(coord.getLongitudeDeg()), this._get24BitRepresentation(coord.getLatitudeDeg()));
    }

    _generateRelativeCoordinates(startLRP, coord) {
        return _AbsoluteCoordinates2.default.fromValues(this._getRelativeRepresentation(startLRP.getLongitudeDeg(), coord.getLongitudeDeg()), this._getRelativeRepresentation(startLRP.getLatitudeDeg(), coord.getLatitudeDeg()));
    }

    _fitsInto2Bytes(value) {
        return value >= -Math.pow(2, 15) && value <= Math.pow(2, 15) - 1;
    }
}exports.default = AbstractEncoder; /**
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

;