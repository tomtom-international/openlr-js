'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbsoluteCoordinates = require('../data/AbsoluteCoordinates');

var _AbsoluteCoordinates2 = _interopRequireDefault(_AbsoluteCoordinates);

var _AbstractDecoder = require('./AbstractDecoder');

var _AbstractDecoder2 = _interopRequireDefault(_AbstractDecoder);

var _GeoCoordinates = require('../../map/GeoCoordinates');

var _GeoCoordinates2 = _interopRequireDefault(_GeoCoordinates);

var _RawGeoCoordLocationReference = require('../../data/raw-location-reference/RawGeoCoordLocationReference');

var _RawGeoCoordLocationReference2 = _interopRequireDefault(_RawGeoCoordLocationReference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
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

class GeoCoordDecoder extends _AbstractDecoder2.default {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        const absCoord = _AbsoluteCoordinates2.default.fromBitStreamInput(bitStreamInput);
        const geoCoord = _GeoCoordinates2.default.fromValues(this._calculate32BitRepresentation(absCoord.lon), this._calculate32BitRepresentation(absCoord.lat));
        const rawLocRef = _RawGeoCoordLocationReference2.default.fromValues(id, geoCoord);
        if (binaryData !== null) {
            binaryData.absCoord = absCoord;
        }
        return rawLocRef;
    }
}exports.default = GeoCoordDecoder;
;