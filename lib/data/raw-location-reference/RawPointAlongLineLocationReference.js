'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RawPointLocationReference = require('./RawPointLocationReference');

var _RawPointLocationReference2 = _interopRequireDefault(_RawPointLocationReference);

var _LocationType = require('../LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

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

var RawPointAlongLineLocationReference = function (_RawPointLocationRefe) {
    _inherits(RawPointAlongLineLocationReference, _RawPointLocationRefe);

    function RawPointAlongLineLocationReference() {
        _classCallCheck(this, RawPointAlongLineLocationReference);

        return _possibleConstructorReturn(this, (RawPointAlongLineLocationReference.__proto__ || Object.getPrototypeOf(RawPointAlongLineLocationReference)).apply(this, arguments));
    }

    _createClass(RawPointAlongLineLocationReference, null, [{
        key: 'fromValues',
        value: function fromValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation) {
            var rawPointAlongLineLocationReference = new RawPointAlongLineLocationReference();
            rawPointAlongLineLocationReference._id = id;
            rawPointAlongLineLocationReference._locationType = _LocationType2.default.POINT_ALONG_LINE;
            rawPointAlongLineLocationReference._returnCode = null;
            rawPointAlongLineLocationReference._points = [lrp1, lrp2];
            rawPointAlongLineLocationReference._offsets = offsets;
            rawPointAlongLineLocationReference._orientation = orientation;
            rawPointAlongLineLocationReference._sideOfRoad = sideOfRoad;
            return rawPointAlongLineLocationReference;
        }
    }]);

    return RawPointAlongLineLocationReference;
}(_RawPointLocationReference2.default);

exports.default = RawPointAlongLineLocationReference;
;