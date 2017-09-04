'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractCoordinate = require('./AbstractCoordinate');

var _AbstractCoordinate2 = _interopRequireDefault(_AbstractCoordinate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AbsoluteCoordinates extends _AbstractCoordinate2.default {

    static fromValues(longitude, latitude) {
        const absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._lon = longitude;
        absoluteCoordinates._lat = latitude;
        return absoluteCoordinates;
    }
    /** Number of bits used for coordinate (absolute) */


    static fromBitStreamInput(bitStreamInput) {
        const absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._read(bitStreamInput);
        return absoluteCoordinates;
    }

    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    }
}exports.default = AbsoluteCoordinates; /**
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

AbsoluteCoordinates._COORD_BITS = 24;
;