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

var _BinaryConstants = require('../BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

var _LocationType = require('../../data/LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

var _BitStreamOutput = require('../bit-stream/BitStreamOutput');

var _BitStreamOutput2 = _interopRequireDefault(_BitStreamOutput);

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

class PointAlongLineEncoder extends _AbstractEncoder2.default {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null || rawLocationReference.getLocationReferencePoints() === null || rawLocationReference.getLocationReferencePoints().length <= 0) {
            return _LocationReference2.default.fromValues("", _BinaryReturnCode2.default.MISSING_DATA, _LocationType2.default.POINT_ALONG_LINE, version);
        }
        const startLRP = rawLocationReference.getLocationReferencePoints()[0];
        const endLRP = rawLocationReference.getLocationReferencePoints()[1];
        const offsets = rawLocationReference.getOffsets();
        const sideOfRoad = rawLocationReference.getSideOfRoad();
        const orientation = rawLocationReference.getOrientation();
        if (startLRP === null || endLRP === null || offsets === null) {
            return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.MISSING_DATA, _LocationType2.default.POINT_ALONG_LINE, version);
        }
        if (version < _BinaryConstants2.default.BINARY_VERSION_3) {
            return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.INVALID_VERSION, _LocationType2.default.POI_WITH_ACCESS_POINT, version);
        }
        const returnCode = this._checkOffsets(offsets, true, rawLocationReference.getLocationReferencePoints());
        if (!returnCode) {
            return _LocationReference2.default.fromValues(rawLocationReference.getId(), _BinaryReturnCode2.default.INVALID_OFFSET, _LocationType2.default.POINT_ALONG_LINE, version);
        }
        return _LocationReference2.default.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version));
    }

    _generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version) {
        const header = this._generateHeader(version, _LocationType2.default.POINT_ALONG_LINE, true);
        const first = this._generateFirstLRPFromLRPAndOrientation(startLRP, orientation);
        const lrps = [startLRP, endLRP];
        const pOff = this._generateOffset(offsets, true, version, lrps);
        const last = this._generateLastLrpFromPointsAndOffsetAndSideOfRoad(lrps, pOff, sideOfRoad);
        const out = _BitStreamOutput2.default.fromValues();
        header.put(out);
        first.put(out);
        last.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        return out.getData();
    }
}exports.default = PointAlongLineEncoder;
;