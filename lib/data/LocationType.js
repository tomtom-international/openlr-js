'use strict';

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

/** Location is UNKNOWN. */
var UNKNOWN = Symbol('UNKNOWN');

/** line location. */
var LINE_LOCATION = Symbol('LINE_LOCATION');

/** simple geo coordinates */
var GEO_COORDINATES = Symbol('GEO_COORDINATES');

/** point along a line */
var POINT_ALONG_LINE = Symbol('POINT_ALONG_LINE');

/** point of interest with an access point along a line */
var POI_WITH_ACCESS_POINT = Symbol('POI_WITH_ACCESS_POINT');

/** circle area location */
var CIRCLE = Symbol('CIRCLE');

/** polygon area location */
var POLYGON = Symbol('POLYGON');

/** closed line area location */
var CLOSED_LINE = Symbol('CLOSED_LINE');

/** rectangular area location */
var RECTANGLE = Symbol('RECTANGLE');

/** grid area location */
var GRID = Symbol('GRID');

exports.default = {
  UNKNOWN: UNKNOWN,
  LINE_LOCATION: LINE_LOCATION,
  GEO_COORDINATES: GEO_COORDINATES,
  POINT_ALONG_LINE: POINT_ALONG_LINE,
  POI_WITH_ACCESS_POINT: POI_WITH_ACCESS_POINT,
  CIRCLE: CIRCLE,
  POLYGON: POLYGON,
  CLOSED_LINE: CLOSED_LINE,
  RECTANGLE: RECTANGLE,
  GRID: GRID,
  AREA_LOCATIONS: new Set([CIRCLE, GRID]),
  POINTS_LOCATIONS: new Set([GEO_COORDINATES, POI_WITH_ACCESS_POINT])
};