'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractDecoder = require('./AbstractDecoder');

var _AbstractDecoder2 = _interopRequireDefault(_AbstractDecoder);

var _FirstLRP = require('../data/FirstLRP');

var _FirstLRP2 = _interopRequireDefault(_FirstLRP);

var _LastLRP = require('../data/LastLRP');

var _LastLRP2 = _interopRequireDefault(_LastLRP);

var _Offset = require('../data/Offset');

var _Offset2 = _interopRequireDefault(_Offset);

var _Offsets = require('../../data/Offsets');

var _Offsets2 = _interopRequireDefault(_Offsets);

var _RawPointAlongLineLocationReference = require('../../data/raw-location-reference/RawPointAlongLineLocationReference');

var _RawPointAlongLineLocationReference2 = _interopRequireDefault(_RawPointAlongLineLocationReference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

class PointAlongLineDecoder extends _AbstractDecoder2.default {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        const firstLRP = _FirstLRP2.default.fromBitStreamInput(bitStreamInput);
        const lrp1 = this._createFirstLRP(1, firstLRP);
        const orientation = this._resolveOrientation(firstLRP.attrib1);
        const lastLRP = _LastLRP2.default.fromBitStreamInput(bitStreamInput);
        const lrp2 = this._createLastLRP(2, lastLRP, lrp1.getLongitudeDeg(), lrp1.getLatitudeDeg());
        const sideOfRoad = this._resolveSideOfRoad(lastLRP.attrib1);
        let offsets = _Offsets2.default.fromValues(0, 0);
        let posOff;
        if (lastLRP.attrib4.pOffsetF === 1) {
            posOff = _Offset2.default.fromBitStreamInput(bitStreamInput);
            const rawLocRef = this._calculateRelativeDistance(posOff.offset);
            offsets = _Offsets2.default.fromRelativeValues(rawLocRef, 0.0);
        }

        const rawLocationReference = _RawPointAlongLineLocationReference2.default.fromValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation);
        if (binaryData !== null) {
            binaryData.firstLRP = firstLRP;
            binaryData.lastLRP = lastLRP;
            binaryData.posOffset = posOff;
        }

        return rawLocationReference;
    }
}exports.default = PointAlongLineDecoder;
;