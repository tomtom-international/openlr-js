'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _RawLocationReference = require('./RawLocationReference');

var _RawLocationReference2 = _interopRequireDefault(_RawLocationReference);

var _LocationType = require('../LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

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

class RawLineLocationReference extends _RawLocationReference2.default {
    /** The points. */
    static fromValues(id, points, offsets) {
        const rawLineLocationReference = new RawLineLocationReference();
        rawLineLocationReference._id = id;
        rawLineLocationReference._locationType = _LocationType2.default.LINE_LOCATION;
        rawLineLocationReference._returnCode = null;
        rawLineLocationReference._points = points;
        rawLineLocationReference._offsets = offsets;
        return rawLineLocationReference;
    }

    /** The offsets. */


    getLocationReferencePoints() {
        return this._points;
    }

    getOffsets() {
        return this._offsets;
    }
}exports.default = RawLineLocationReference;
;