"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var ON_ROAD_OR_UNKNOWN = 0;
var RIGHT = 1;
var LEFT = 2;
var BOTH = 3;

exports.default = {
  ON_ROAD_OR_UNKNOWN: ON_ROAD_OR_UNKNOWN,
  RIGHT: RIGHT,
  LEFT: LEFT,
  BOTH: BOTH,
  getSideOfRoadValues: function getSideOfRoadValues() {
    return [ON_ROAD_OR_UNKNOWN, RIGHT, LEFT, BOTH];
  },
  getDefault: function getDefault() {
    return ON_ROAD_OR_UNKNOWN;
  },
  getId: function getId(sideOfRoad) {
    return sideOfRoad;
  }
};