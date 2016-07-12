"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RawLocationReference = function () {
    function RawLocationReference() {
        _classCallCheck(this, RawLocationReference);
    }

    _createClass(RawLocationReference, [{
        key: "hasId",
        value: function hasId() {
            return !!this._id;
        }
    }, {
        key: "isValid",
        value: function isValid() {
            return !this._returnCode;
        }
    }, {
        key: "getLocationReferencePoints",
        value: function getLocationReferencePoints() {
            return null;
        }
    }, {
        key: "getOffsets",
        value: function getOffsets() {
            return null;
        }
    }, {
        key: "getGeoCoordinates",
        value: function getGeoCoordinates() {
            return null;
        }
    }, {
        key: "getSideOfRoad",
        value: function getSideOfRoad() {
            return null;
        }
    }, {
        key: "getOrientation",
        value: function getOrientation() {
            return null;
        }
    }, {
        key: "getCornerPoints",
        value: function getCornerPoints() {
            return null;
        }
    }, {
        key: "getLowerLeftPoint",
        value: function getLowerLeftPoint() {
            return null;
        }
    }, {
        key: "getUpperRightPoint",
        value: function getUpperRightPoint() {
            return null;
        }
    }, {
        key: "getCenterPoint",
        value: function getCenterPoint() {
            return null;
        }
    }, {
        key: "getRadius",
        value: function getRadius() {
            return -1;
        }
    }, {
        key: "getNumberOfColumns",
        value: function getNumberOfColumns() {
            return -1;
        }
    }, {
        key: "getNumberOfRows",
        value: function getNumberOfRows() {
            return -1;
        }
    }, {
        key: "id",
        get: function get() {
            return this._id;
        }
    }, {
        key: "locationType",
        get: function get() {
            return this._locationType;
        }
    }, {
        key: "returnCode",
        get: function get() {
            return this._returnCode;
        }
    }], [{
        key: "fromValues",
        value: function fromValues(id, locationType, returnCode) {
            var rawLocationReference = new RawLocationReference();
            rawLocationReference._id = id;
            rawLocationReference._locationType = locationType;
            rawLocationReference._returnCode = returnCode;
            return rawLocationReference;
        }
    }, {
        key: "fromIdAndLocationType",
        value: function fromIdAndLocationType(id, locationType) {
            var rawLocationReference = new RawLocationReference();
            rawLocationReference._id = id;
            rawLocationReference._locationType = locationType;
            rawLocationReference._returnCode = null;
            return rawLocationReference;
        }
    }]);

    return RawLocationReference;
}();

exports.default = RawLocationReference;
;