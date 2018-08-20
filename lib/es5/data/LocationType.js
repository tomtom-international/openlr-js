"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var LocationType;
(function (LocationType) {
    /** Location is UNKNOWN. */
    LocationType[LocationType["UNKNOWN"] = 0] = "UNKNOWN";
    /** line location. */
    LocationType[LocationType["LINE_LOCATION"] = 1] = "LINE_LOCATION";
    /** simple geo coordinates */
    LocationType[LocationType["GEO_COORDINATES"] = 2] = "GEO_COORDINATES";
    /** point along a line */
    LocationType[LocationType["POINT_ALONG_LINE"] = 3] = "POINT_ALONG_LINE";
    /** point of interest with an access point along a line */
    LocationType[LocationType["POI_WITH_ACCESS_POINT"] = 4] = "POI_WITH_ACCESS_POINT";
    /** circle area location */
    LocationType[LocationType["CIRCLE"] = 5] = "CIRCLE";
    /** polygon area location */
    LocationType[LocationType["POLYGON"] = 6] = "POLYGON";
    /** closed line area location */
    LocationType[LocationType["CLOSED_LINE"] = 7] = "CLOSED_LINE";
    /** rectangular area location */
    LocationType[LocationType["RECTANGLE"] = 8] = "RECTANGLE";
    /** grid area location */
    LocationType[LocationType["GRID"] = 9] = "GRID";
})(LocationType = exports.LocationType || (exports.LocationType = {}));
exports.AREA_LOCATIONS = new Set([LocationType.CIRCLE, LocationType.POLYGON, LocationType.CLOSED_LINE, LocationType.RECTANGLE, LocationType.GRID]);
exports.POINTS_LOCATIONS = new Set([LocationType.GEO_COORDINATES, LocationType.POINT_ALONG_LINE, LocationType.POI_WITH_ACCESS_POINT]);
//# sourceMappingURL=LocationType.js.map