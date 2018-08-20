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
export declare enum LocationType {
    /** Location is UNKNOWN. */
    UNKNOWN = 0,
    /** line location. */
    LINE_LOCATION = 1,
    /** simple geo coordinates */
    GEO_COORDINATES = 2,
    /** point along a line */
    POINT_ALONG_LINE = 3,
    /** point of interest with an access point along a line */
    POI_WITH_ACCESS_POINT = 4,
    /** circle area location */
    CIRCLE = 5,
    /** polygon area location */
    POLYGON = 6,
    /** closed line area location */
    CLOSED_LINE = 7,
    /** rectangular area location */
    RECTANGLE = 8,
    /** grid area location */
    GRID = 9
}
export declare const AREA_LOCATIONS: Set<LocationType>;
export declare const POINTS_LOCATIONS: Set<LocationType>;
