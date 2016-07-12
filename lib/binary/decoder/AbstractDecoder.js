'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractDecoder = function () {
    function AbstractDecoder() {
        _classCallCheck(this, AbstractDecoder);
    }

    _createClass(AbstractDecoder, [{
        key: 'decodeData',
        value: function decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
            throw new Error('This method is abstract');
        }
    }, {
        key: '_resolveSideOfRoad',
        value: function _resolveSideOfRoad(attrib1) {
            var value = attrib1.sideOrOrientation;
            return _SideOfRoad2.default.getSideOfRoadValues()[value];
        }
    }, {
        key: '_resolveOrientation',
        value: function _resolveOrientation(attrib1) {
            var value = attrib1.sideOrOrientation;
            return _Orientation2.default.getOrientationValues()[value];
        }
    }, {
        key: '_calculateRelativeDistance',
        value: function _calculateRelativeDistance(offset) {
            var lower = offset * _BinaryConstants2.default.RELATIVE_OFFSET_LENGTH;
            var upper = (offset + 1) * _BinaryConstants2.default.RELATIVE_OFFSET_LENGTH;
            return (lower + upper) / 2;
        }
    }, {
        key: '_createFirstLRP',
        value: function _createFirstLRP(seqNr, firstLRP) {
            var frc = _FunctionalRoadClass2.default.getFRCValues()[firstLRP.attrib1.frc];
            var fow = _FormOfWay2.default.getFormOfWayValues()[firstLRP.attrib1.fow];
            var lon = this._calculate32BitRepresentation(firstLRP.lon);
            var lat = this._calculate32BitRepresentation(firstLRP.lat);
            var bearing = this._calculate32BitRepresentation(firstLRP.attrib2.bear);
            var dnp = this._calculateDistanceEstimate(firstLRP.attrib3.dnp);
            var lfrc = _FunctionalRoadClass2.default.getFRCValues()[firstLRP.attrib2.lfrcnp];
            return _LocationReferencePoint2.default.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
        }
    }, {
        key: '_createIntermediateLRPFromLatitudeLongitude',
        value: function _createIntermediateLRPFromLatitudeLongitude(seqNr, intermediateLRP, prevLon, prevLat) {
            var frc = _FunctionalRoadClass2.default.getFRCValues()[intermediateLRP.attrib1.frc];
            var fow = _FormOfWay2.default.getFormOfWayValues()[intermediateLRP.attrib1.fow];
            var lon = prevLon + intermediateLRP.lon / _BinaryConstants2.default.DECA_MICRO_DEG_FACTOR;
            var lat = prevLat + intermediateLRP.lat / _BinaryConstants2.default.DECA_MICRO_DEG_FACTOR;
            var bearing = this._calculateBearingEstimate(intermediateLRP.attrib2.bear);
            var dnp = this._calculateDistanceEstimate(intermediateLRP.attrib3.dnp);
            var lfrc = _FunctionalRoadClass2.default.getFRCValues()[intermediateLRP.attrib2.lfrcnp];
            return _LocationReferencePoint2.default.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
        }
    }, {
        key: '_createIntermediateLRPFromFirstAndLast',
        value: function _createIntermediateLRPFromFirstAndLast(seqNr, lastClosedLineLRP, firstLRP) {
            var frc = _FunctionalRoadClass2.default.getFRCValues()[lastClosedLineLRP.attrib5.frc];
            var fow = _FormOfWay2.default.getFormOfWayValues()[lastClosedLineLRP.attrib5.fow];
            var bearing = this._calculateBearingEstimate(lastClosedLineLRP.attrib6.bear);
            var lon = this._calculate32BitRepresentation(firstLRP.lon);
            var lat = this._calculate32BitRepresentation(firstLRP.lat);
            return _LocationReferencePoint2.default.fromValues(seqNr, frc, fow, lon, lat, bearing, 0, null, true);
        }
    }, {
        key: '_createLastLRP',
        value: function _createLastLRP(seqNr, lastLRP, prevLon, prevLat) {
            var frc = _FunctionalRoadClass2.default.getFRCValues()[lastLRP.attrib1.frc];
            var fow = _FormOfWay2.default.getFormOfWayValues()[lastLRP.attrib1.fow];
            var lon = prevLon + lastLRP.lon / _BinaryConstants2.default.DECA_MICRO_DEG_FACTOR;
            var lat = prevLat + lastLRP.lat / _BinaryConstants2.default.DECA_MICRO_DEG_FACTOR;
            var bearing = this._calculateBearingEstimate(lastLRP.attrib4.bear);
            var dnp = 0;
            var lfrc = _FunctionalRoadClass2.default.FRC_7;
            return _LocationReferencePoint2.default.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, true);
        }
    }, {
        key: '_calculate32BitRepresentation',
        value: function _calculate32BitRepresentation(val) {
            var sgn = Math.sign(val);
            return (val - sgn * _BinaryConstants2.default.ROUND_FACTOR) * _BinaryConstants2.default.BIT24FACTOR_REVERSED;
        }
    }, {
        key: '_calculateBearingEstimate',
        value: function _calculateBearingEstimate(interval) {
            var lower = interval * _BinaryConstants2.default.BEARING_SECTOR;
            var upper = (interval + 1) * _BinaryConstants2.default.BEARING_SECTOR;
            return (upper + lower) / 2;
        }
    }, {
        key: '_calculateDistanceEstimate',
        value: function _calculateDistanceEstimate(interval) {
            var lower = interval * _BinaryConstants2.default.LENGTH_INTERVAL;
            var upper = (interval + 1) * _BinaryConstants2.default.LENGTH_INTERVAL;
            return Math.round((upper + lower) / 2);
        }
    }, {
        key: '_get24BitRepresentation',
        value: function _get24BitRepresentation(val) {
            var sgn = Math.sign(val);
            return Math.round(sgn * _BinaryConstants2.default.ROUND_FACTOR + val * _BinaryConstants2.default.BIT24FACTOR);
        }
    }]);

    return AbstractDecoder;
}();

exports.default = AbstractDecoder;
;