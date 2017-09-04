'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _RawPointLocationReference = require('./RawPointLocationReference');

var _RawPointLocationReference2 = _interopRequireDefault(_RawPointLocationReference);

var _LocationType = require('../LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

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

class RawPointAlongLineLocationReference extends _RawPointLocationReference2.default {
    static fromValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation) {
        const rawPointAlongLineLocationReference = new RawPointAlongLineLocationReference();
        rawPointAlongLineLocationReference._id = id;
        rawPointAlongLineLocationReference._locationType = _LocationType2.default.POINT_ALONG_LINE;
        rawPointAlongLineLocationReference._returnCode = null;
        rawPointAlongLineLocationReference._points = [lrp1, lrp2];
        rawPointAlongLineLocationReference._offsets = offsets;
        rawPointAlongLineLocationReference._orientation = orientation;
        rawPointAlongLineLocationReference._sideOfRoad = sideOfRoad;
        return rawPointAlongLineLocationReference;
    }
}exports.default = RawPointAlongLineLocationReference;
;