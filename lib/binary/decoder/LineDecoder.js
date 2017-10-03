'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractDecoder = require('./AbstractDecoder');

var _AbstractDecoder2 = _interopRequireDefault(_AbstractDecoder);

var _BinaryConstants = require('../BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

var _FirstLRP = require('../data/FirstLRP');

var _FirstLRP2 = _interopRequireDefault(_FirstLRP);

var _IntermediateLRP = require('../data/IntermediateLRP');

var _IntermediateLRP2 = _interopRequireDefault(_IntermediateLRP);

var _LastLRP = require('../data/LastLRP');

var _LastLRP2 = _interopRequireDefault(_LastLRP);

var _Offset = require('../data/Offset');

var _Offset2 = _interopRequireDefault(_Offset);

var _Offsets = require('../../data/Offsets');

var _Offsets2 = _interopRequireDefault(_Offsets);

var _RawLineLocationReference = require('../../data/raw-location-reference/RawLineLocationReference');

var _RawLineLocationReference2 = _interopRequireDefault(_RawLineLocationReference);

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

class LineDecoder extends _AbstractDecoder2.default {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        // Calculate number of intermediates (integer division: get rid of possible offset information)
        const nrIntermediates = Math.floor((totalBytes - _BinaryConstants2.default.MIN_BYTES_LINE_LOCATION) / _BinaryConstants2.default.LRP_SIZE);

        // Read first location reference point
        const firstLRP = _FirstLRP2.default.fromBitStreamInput(bitStreamInput);

        // Read intermediate location reference points
        const intermediates = [];
        for (let i = 0; i < nrIntermediates; i++) {
            const lrp = _IntermediateLRP2.default.fromBitStreamInput(bitStreamInput);
            intermediates.push(lrp);
        }

        const lastLRP = _LastLRP2.default.fromBitStreamInput(bitStreamInput);

        let posOff = null;
        let negOff = null;
        // Check for positive offset and read in
        if (lastLRP.attrib4.pOffsetF === _BinaryConstants2.default.HAS_OFFSET) {
            posOff = _Offset2.default.fromBitStreamInput(bitStreamInput);
        }
        // Check for negative offset and read in
        if (lastLRP.attrib4.nOffsetF === _BinaryConstants2.default.HAS_OFFSET) {
            negOff = _Offset2.default.fromBitStreamInput(bitStreamInput);
        }
        let offsets = _Offsets2.default.fromValues(0, 0);
        if (version === _BinaryConstants2.default.BINARY_VERSION_2) {
            let pOffValue = 0;
            let nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateDistanceEstimate(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateDistanceEstimate(negOff.offset);
            }
            offsets = _Offsets2.default.fromValues(pOffValue, nOffValue);
        } else if (version === _BinaryConstants2.default.BINARY_VERSION_3) {
            let pOffValue = 0;
            let nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateRelativeDistance(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateRelativeDistance(negOff.offset);
            }
            offsets = _Offsets2.default.fromRelativeValues(pOffValue, nOffValue);
        }
        let lrpCount = 1;
        const points = [];
        const p = this._createFirstLRP(lrpCount, firstLRP);
        lrpCount++;
        points.push(p);
        let prevLon = p.getLongitudeDeg();
        let prevLat = p.getLatitudeDeg();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = intermediates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                let intermediate = _step.value;

                const intermediatePoint = this._createIntermediateLRPFromLatitudeLongitude(lrpCount, intermediate, prevLon, prevLat);
                lrpCount++;
                points.push(intermediatePoint);
                prevLon = intermediatePoint.getLongitudeDeg();
                prevLat = intermediatePoint.getLatitudeDeg();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        const lp = this._createLastLRP(lrpCount, lastLRP, prevLon, prevLat);
        points.push(lp);
        const rawLocRef = _RawLineLocationReference2.default.fromValues(id, points, offsets);
        if (binaryData !== null) {
            binaryData.negOffset = negOff;
            binaryData.posOffset = posOff;
            binaryData.lastLRP = lastLRP;
            binaryData.intermediates = intermediates;
            binaryData.firstLRP = firstLRP;
        }
        return rawLocRef;
    }
}exports.default = LineDecoder;
;