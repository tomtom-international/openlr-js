'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractCoordinate2 = require('./AbstractCoordinate');

var _AbstractCoordinate3 = _interopRequireDefault(_AbstractCoordinate2);

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

var RelativeCoordinates = function (_AbstractCoordinate) {
    _inherits(RelativeCoordinates, _AbstractCoordinate);

    function RelativeCoordinates() {
        _classCallCheck(this, RelativeCoordinates);

        return _possibleConstructorReturn(this, (RelativeCoordinates.__proto__ || Object.getPrototypeOf(RelativeCoordinates)).apply(this, arguments));
    }

    _createClass(RelativeCoordinates, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            this.putCoordinates(bitStreamOutput);
        }
    }], [{
        key: 'fromValues',
        value: function fromValues(longitude, latitude) {
            var relativeCoordinates = new RelativeCoordinates();
            relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
            relativeCoordinates._lon = longitude;
            relativeCoordinates._lat = latitude;
            return relativeCoordinates;
        }
        /** Number of bits used for coordinates (relative) */

    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput) {
            var relativeCoordinates = new RelativeCoordinates();
            relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
            relativeCoordinates._read(bitStreamInput);
            return relativeCoordinates;
        }
    }]);

    return RelativeCoordinates;
}(_AbstractCoordinate3.default);

RelativeCoordinates._COORD_BITS = 16;
exports.default = RelativeCoordinates;
;