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

var NO_ORIENTATION_OR_UNKNOWN = 0;
var WITH_LINE_DIRECTION = 1;
var AGAINST_LINE_DIRECTION = 2;
var BOTH = 3;

exports.default = {
  NO_ORIENTATION_OR_UNKNOWN: NO_ORIENTATION_OR_UNKNOWN,
  WITH_LINE_DIRECTION: WITH_LINE_DIRECTION,
  AGAINST_LINE_DIRECTION: AGAINST_LINE_DIRECTION,
  BOTH: BOTH,
  getOrientationValues: function getOrientationValues() {
    return [NO_ORIENTATION_OR_UNKNOWN, WITH_LINE_DIRECTION, AGAINST_LINE_DIRECTION, BOTH];
  },
  getDefault: function getDefault() {
    return NO_ORIENTATION_OR_UNKNOWN;
  },
  getId: function getId(orientation) {
    return orientation;
  }
};