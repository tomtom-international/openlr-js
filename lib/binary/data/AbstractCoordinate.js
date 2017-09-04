'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BinaryInformation = require('./BinaryInformation');

var _BinaryInformation2 = _interopRequireDefault(_BinaryInformation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AbstractCoordinate extends _BinaryInformation2.default {

    static fromBitCount(countBits) {
        const abstractCoordinate = new AbstractCoordinate();
        abstractCoordinate._coordBits = countBits;
        return abstractCoordinate;
    }

    get lon() {
        return this._lon;
    }

    get lat() {
        return this._lat;
    }

    _read(bitStreamInput) {
        this._lon = bitStreamInput.getSignedBits(this._coordBits);
        this._lat = bitStreamInput.getSignedBits(this._coordBits);
    }

    putCoordinates(bitStreamOutput) {
        bitStreamOutput.putBits(this._lon, this._coordBits);
        bitStreamOutput.putBits(this._lat, this._coordBits);
    }
}exports.default = AbstractCoordinate; /**
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