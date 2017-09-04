'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GeometryUtils = require('./utils/GeometryUtils');

var _GeometryUtils2 = _interopRequireDefault(_GeometryUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GeoCoordinates {
    /** The longitude. */
    static fromValues(longitude, latitude) {
        if (!_GeometryUtils2.default.checkCoordinateBounds(longitude, latitude)) {
            throw new Error('Coordinates out of bounds');
        }
        const geoCoordinates = new GeoCoordinates();
        geoCoordinates._longitude = longitude;
        geoCoordinates._latitude = latitude;
        return geoCoordinates;
    }

    /** The latitude. */


    getLatitudeDeg() {
        return this._latitude;
    }

    getLongitudeDeg() {
        return this._longitude;
    }
}exports.default = GeoCoordinates; /**
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