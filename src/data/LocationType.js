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
const UNKNOWN = Symbol('UNKNOWN');

/** line location. */
const LINE_LOCATION = Symbol('LINE_LOCATION');

/** simple geo coordinates */
const GEO_COORDINATES = Symbol('GEO_COORDINATES');

/** point along a line */
const POINT_ALONG_LINE = Symbol('POINT_ALONG_LINE');

/** point of interest with an access point along a line */
const POI_WITH_ACCESS_POINT = Symbol('POI_WITH_ACCESS_POINT');

/** circle area location */
const CIRCLE = Symbol('CIRCLE');

/** polygon area location */
const POLYGON = Symbol('POLYGON');

/** closed line area location */
const CLOSED_LINE = Symbol('CLOSED_LINE');

/** rectangular area location */
const RECTANGLE = Symbol('RECTANGLE');

/** grid area location */
const GRID = Symbol('GRID');

export default {
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
    AREA_LOCATIONS: new Set([CIRCLE, GRID]),
    POINTS_LOCATIONS: new Set([GEO_COORDINATES, POI_WITH_ACCESS_POINT])
};
