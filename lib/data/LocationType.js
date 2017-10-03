"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

/** Location is UNKNOWN. */
const UNKNOWN = 0;

/** line location. */
const LINE_LOCATION = 1;

/** simple geo coordinates */
const GEO_COORDINATES = 2;

/** point along a line */
const POINT_ALONG_LINE = 3;

/** point of interest with an access point along a line */
const POI_WITH_ACCESS_POINT = 4;

/** circle area location */
const CIRCLE = 5;

/** polygon area location */
const POLYGON = 6;

/** closed line area location */
const CLOSED_LINE = 7;

/** rectangular area location */
const RECTANGLE = 8;

/** grid area location */
const GRID = 9;

exports.default = {
  UNKNOWN,
  LINE_LOCATION,
  GEO_COORDINATES,
  POINT_ALONG_LINE,
  POI_WITH_ACCESS_POINT,
  CIRCLE,
  POLYGON,
  CLOSED_LINE,
  RECTANGLE,
  GRID,
  AREA_LOCATIONS: new Set([CIRCLE, POLYGON, CLOSED_LINE, RECTANGLE, GRID]),
  POINTS_LOCATIONS: new Set([GEO_COORDINATES, POINT_ALONG_LINE, POI_WITH_ACCESS_POINT])
};