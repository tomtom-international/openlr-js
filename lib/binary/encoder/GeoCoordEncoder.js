'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractEncoder = require('./AbstractEncoder');

var _AbstractEncoder2 = _interopRequireDefault(_AbstractEncoder);

var _LocationReference = require('../../data/LocationReference');

var _LocationReference2 = _interopRequireDefault(_LocationReference);

var _BinaryReturnCode = require('../BinaryReturnCode');

var _BinaryReturnCode2 = _interopRequireDefault(_BinaryReturnCode);

var _LocationType = require('../../data/LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

var _BitStreamOutput = require('../bit-stream/BitStreamOutput');

var _BitStreamOutput2 = _interopRequireDefault(_BitStreamOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GeoCoordEncoder extends _AbstractEncoder2.default {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null) {
            return _LocationReference2.default.fromValues('', _BinaryReturnCode2.default.MISSING_DATA, _LocationType2.default.GEO_COORDINATES, version);
        } else {
            const coord = rawLocationReference.getGeoCoordinates();
            if (coord === null) {
                return _LocationReference2.default.fromValues('', _BinaryReturnCode2.default.MISSING_DATA, _LocationType2.default.GEO_COORDINATES, version);
            } else if (version < 3) {
                return _LocationReference2.default.fromValues('', _BinaryReturnCode2.default.INVALID_VERSION, _LocationType2.default.GEO_COORDINATES, version);
            } else {
                return _LocationReference2.default.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryGeoCoordLocation(coord, version));
            }
        }
    }

    _generateBinaryGeoCoordLocation(coord, version) {
        const header = this._generateHeader(version, _LocationType2.default.GEO_COORDINATES, false);
        const absCoord = this._generateAbsCoord(coord);
        const out = _BitStreamOutput2.default.fromValues();
        header.put(out);
        absCoord.put(out);
        return out.getData();
    }
}exports.default = GeoCoordEncoder; /**
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

;