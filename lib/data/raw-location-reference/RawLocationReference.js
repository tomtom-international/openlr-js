"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var RawLocationReference = function () {
    function RawLocationReference() {
        _classCallCheck(this, RawLocationReference);
    }

    _createClass(RawLocationReference, [{
        key: "getId",
        value: function getId() {
            return this._id;
        }
    }, {
        key: "hasId",
        value: function hasId() {
            return !!this._id;
        }
    }, {
        key: "getLocationType",
        value: function getLocationType() {
            return this._locationType;
        }
    }, {
        key: "getReturnCode",
        value: function getReturnCode() {
            return this._returnCode;
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