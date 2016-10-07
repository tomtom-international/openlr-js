'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RawLocationReference2 = require('./RawLocationReference');

var _RawLocationReference3 = _interopRequireDefault(_RawLocationReference2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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

var RawPointLocationReference = function (_RawLocationReference) {
    _inherits(RawPointLocationReference, _RawLocationReference);

    function RawPointLocationReference() {
        _classCallCheck(this, RawPointLocationReference);

        return _possibleConstructorReturn(this, (RawPointLocationReference.__proto__ || Object.getPrototypeOf(RawPointLocationReference)).apply(this, arguments));
    }

    _createClass(RawPointLocationReference, [{
        key: 'getLocationReferencePoints',
        value: function getLocationReferencePoints() {
            return this._points;
        }
    }, {
        key: 'getOffsets',
        value: function getOffsets() {
            return this._offsets;
        }
    }, {
        key: 'getOrientation',
        value: function getOrientation() {
            return this._orientation;
        }
    }, {
        key: 'getSideOfRoad',
        value: function getSideOfRoad() {
            return this._sideOfRoad;
        }
    }], [{
        key: 'fromValues',


        /** The orientation. */

        /** The points. */
        value: function fromValues(id, locationType, lrp1, lrp2, offsets, sideOfRoad, orientation) {
            var rawPointLocationReference = new RawPointLocationReference();
            rawPointLocationReference._id = id;
            rawPointLocationReference._locationType = locationType;
            rawPointLocationReference._returnCode = null;
            rawPointLocationReference._points = [lrp1, lrp2];
            rawPointLocationReference._offsets = offsets;
            rawPointLocationReference._orientation = orientation;
            rawPointLocationReference._sideOfRoad = sideOfRoad;
            return rawPointLocationReference;
        }

        /** The side of road. */


        /** The offsets. */

    }]);

    return RawPointLocationReference;
}(_RawLocationReference3.default);

exports.default = RawPointLocationReference;
;