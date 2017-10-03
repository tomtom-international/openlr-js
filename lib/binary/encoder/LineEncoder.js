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

class LineEncoder extends _AbstractEncoder2.default {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null) {
            return _LocationReference2.default.fromValues('', _BinaryReturnCode2.default.MISSING_DATA, _LocationType2.default.LINE_LOCATION, version);
        }
        const locationReferences = rawLocationReference.getLocationReferencePoints();
        const offsets = rawLocationReference.getOffsets();
        if (locationReferences === null || offsets === null || locationReferences.length <= 0) {
            return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.MISSING_DATA, _LocationType2.default.LINE_LOCATION, version);
        }
        let returnCode = this._checkOffsets(offsets, true, locationReferences);
        if (!returnCode) {
            return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.INVALID_OFFSET, _LocationType2.default.LINE_LOCATION, version);
        }
        returnCode = this._checkOffsets(offsets, false, locationReferences);
        if (!returnCode) {
            return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.INVALID_OFFSET, _LocationType2.default.LINE_LOCATION, version);
        }
        return _LocationReference2.default.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryLineLocation(locationReferences, offsets, version));
    }

    _generateBinaryLineLocation(locationReferences, offsets, version) {
        const header = this._generateHeader(version, _LocationType2.default.LINE_LOCATION, true);
        const firstLRP = this._generateFirstLRPFromLRP(locationReferences[0]);
        const lrps = this._generateLRPs(locationReferences);
        const pOff = this._generateOffset(offsets, true, version, locationReferences);
        const nOff = this._generateOffset(offsets, false, version, locationReferences);
        const lastLRP = this._generateLastLrpFromPointsAndOffsets(locationReferences, pOff, nOff);
        const out = _BitStreamOutput2.default.fromValues();
        header.put(out);
        firstLRP.put(out);
        for (let i = 0; i < lrps.length; i++) {
            lrps[i].put(out);
        }
        lastLRP.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        if (nOff !== null) {
            nOff.put(out);
        }
        return out.getData();
    }
}exports.default = LineEncoder; /**
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