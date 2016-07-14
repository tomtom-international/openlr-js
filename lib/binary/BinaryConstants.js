"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _LocationType = require("../data/LocationType");

var _LocationType2 = _interopRequireDefault(_LocationType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** The data format IDENTIFIER. */
var IDENTIFIER = "binary";

/** used for rounding */
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

var ROUND_FACTOR = 0.5;

/** The Constant BITS_PER_BYTE. */
var BITS_PER_BYTE = 8;

/** The Constant DECA_MICRO_DEG_FACTOR is used to transform degree values into deca-micro degrees. */
var DECA_MICRO_DEG_FACTOR = 100000.0;

/** The Constant BIT24FACTOR is used for the conversion of lat/lon coordinates into a 24bit accuracy. */
var BIT24FACTOR = 46603.377778;

/** The Constant BIT24FACTOR_REVERSED is used for the conversion of 24bit lat/lon values back into prior accuracy. */
var BIT24FACTOR_REVERSED = 1 / BIT24FACTOR;

/** The BEARING_SECTOR defines the length of a bearing interval. */
var BEARING_SECTOR = 11.25;

/** The LENGTH_INTERVAL defines the length of a dnp and offset interval. */
var LENGTH_INTERVAL = 58.6;

/** The IS_POINT defines a point location reference. */
var IS_POINT = 1;

/** The IS_NOT_POINT indicates that the location reference is not a point location. */
var IS_NOT_POINT = 0;

///** The IS_AREA defines an area location reference. */
//const IS_AREA = 1;

/** The AREA_CODE_CIRCLE defines the code for a cirle location reference. */
var AREA_CODE_CIRCLE = 0;

/** The AREA_CODE_RECTANGLE defines the code for a rectangle location reference. */
var AREA_CODE_RECTANGLE = 2;

/** The AREA_CODE_GRID defines the code for a grid location reference. */
var AREA_CODE_GRID = 2; // For BINARY_VERSION_3 the same as for AREA_CODE_RECTANGLE

/** The AREA_CODE_POLYGON defines the code for a polygon location reference. */
var AREA_CODE_POLYGON = 1;

/** The AREA_CODE_CLOSEDLINE defines the code for a closed line location reference. */
var AREA_CODE_CLOSEDLINE = 3;

/** The AREA_CODE_NOAREA defines the code for a non-area location reference. */
var IS_NOT_AREA = 0;

/** The HAS_ATTRIBUTES the existence of attribute information in the stream. */
var HAS_ATTRIBUTES = 1;

/** The Constant HAS_NO_ATTRIBUTES. */
var HAS_NO_ATTRIBUTES = 0;

/** The HEADER_SIZE defines the size [in bytes] of the header. */
var HEADER_SIZE = 1;

/** The FIRST_LRP_SIZE defines the size [in bytes] of the first location reference point. */
var FIRST_LRP_SIZE = 9;

/** The LRP_SIZE defines the size [in bytes] of an intermediate location reference point. */
var LRP_SIZE = 7;

/** The LAST_LRP_SIZE defines the size [in bytes] of the last location reference point. */
var LAST_LRP_SIZE = 6;

/** The Constant ABS_COORD_SIZE. */
var ABS_COORD_SIZE = 6;

/** The Constant RELATIVE_OFFSET_LENGTH. */
var RELATIVE_OFFSET_LENGTH = 0.390625;

/** The MIN_BYTES defines the minimum size [in bytes] of a binary location reference. */
var MIN_BYTES_LINE_LOCATION = HEADER_SIZE + FIRST_LRP_SIZE + LAST_LRP_SIZE;

/** The MIN_BYTES defines the minimum size [in bytes] of a binary closed line location reference. */
var MIN_BYTES_CLOSED_LINE_LOCATION = HEADER_SIZE + FIRST_LRP_SIZE + 2;

/** The Constant GEOCOORD_SIZE. */
var GEOCOORD_SIZE = HEADER_SIZE + ABS_COORD_SIZE;

/** The Constant MIN_BYTES_POINT_LOCATION. */
var MIN_BYTES_POINT_LOCATION = GEOCOORD_SIZE;

/** The Constant BINARY_VERSION_2. */
var BINARY_VERSION_2 = 2;

/** The Constant BINARY_VERSION_3. */
var BINARY_VERSION_3 = 3;

/** The LATEST_BINARY_VERSION defines the current version of the binary format. */
var LATEST_BINARY_VERSION = BINARY_VERSION_3;

/** The HAS_OFFSET defines the existence of offset information. */
var HAS_OFFSET = 1;

/** The Constant OFFSET_BUCKETS. */
var OFFSET_BUCKETS = 256;

/** The Constant POINT_ALONG_LINE_SIZE. */
var POINT_ALONG_LINE_SIZE = HEADER_SIZE + FIRST_LRP_SIZE + LAST_LRP_SIZE;

/** The Constant RELATIVE_COORD_SIZE. */
var RELATIVE_COORD_SIZE = 4;

/** number of bits used for a small radius */
var SMALL_RADIUS_BITS = 8;

/** number of bits used for a medium radius */
var MEDIUM_RADIUS_BITS = 16;

/** number of bits used for a large radius */
var LARGE_RADIUS_BITS = 24;

/** number of bits used for a small radius */
var EXTRA_LARGE_RADIUS_BITS = 32;

/** The Constant DIMENSION_SIZE. */
var DIMENSION_SIZE = 2;

/** The Constant RECTANGLE_SIZE. */
var RECTANGLE_SIZE = HEADER_SIZE + ABS_COORD_SIZE + RELATIVE_COORD_SIZE;

/** The Constant LARGE_RECTANGLE_SIZE. */
var LARGE_RECTANGLE_SIZE = HEADER_SIZE + ABS_COORD_SIZE + ABS_COORD_SIZE;

/** The Constant GRID_SIZE. */
var GRID_SIZE = RECTANGLE_SIZE + 2 * DIMENSION_SIZE;

/** The Constant LARGE_GRID_SIZE. */
var LARGE_GRID_SIZE = LARGE_RECTANGLE_SIZE + 2 * DIMENSION_SIZE;

/** The Constant MIN_BYTES_POLYGON. */
var MIN_BYTES_POLYGON = HEADER_SIZE + ABS_COORD_SIZE + 2 * RELATIVE_COORD_SIZE;

/** The Constant POINT_OFFSET_SIZE. */
var POINT_OFFSET_SIZE = 1;

/** The Constant POINT_WITH_ACCESS_SIZE. */
var POINT_WITH_ACCESS_SIZE = HEADER_SIZE + FIRST_LRP_SIZE + LAST_LRP_SIZE + RELATIVE_COORD_SIZE;

/** The Constant POINT_LOCATION_VERSION. */
var POINT_LOCATION_VERSION = 3;

/** The Constant POINT_LOCATION_TYPES. */
var POINT_LOCATION_TYPES = new Set([_LocationType2.default.GEO_COORDINATES, _LocationType2.default.POI_WITH_ACCESS_POINT, _LocationType2.default.POINT_ALONG_LINE]);

/** The Constant AREA_LOCATION_VERSION. */
var AREA_LOCATION_VERSION = 3;

/** The Constant AREA_LOCATION_TYPES. */
var AREA_LOCATION_TYPES = new Set([_LocationType2.default.CIRCLE, _LocationType2.default.GRID, _LocationType2.default.CLOSED_LINE, _LocationType2.default.RECTANGLE, _LocationType2.default.POLYGON]);

exports.default = {
    IDENTIFIER: IDENTIFIER,
    ROUND_FACTOR: ROUND_FACTOR,
    BITS_PER_BYTE: BITS_PER_BYTE,
    DECA_MICRO_DEG_FACTOR: DECA_MICRO_DEG_FACTOR,
    BIT24FACTOR: BIT24FACTOR,
    BIT24FACTOR_REVERSED: BIT24FACTOR_REVERSED,
    BEARING_SECTOR: BEARING_SECTOR,
    LENGTH_INTERVAL: LENGTH_INTERVAL,
    IS_POINT: IS_POINT,
    IS_NOT_POINT: IS_NOT_POINT,
    AREA_CODE_CIRCLE: AREA_CODE_CIRCLE,
    AREA_CODE_RECTANGLE: AREA_CODE_RECTANGLE,
    AREA_CODE_GRID: AREA_CODE_GRID,
    AREA_CODE_POLYGON: AREA_CODE_POLYGON,
    AREA_CODE_CLOSEDLINE: AREA_CODE_CLOSEDLINE,
    IS_NOT_AREA: IS_NOT_AREA,
    HAS_ATTRIBUTES: HAS_ATTRIBUTES,
    HAS_NO_ATTRIBUTES: HAS_NO_ATTRIBUTES,
    HEADER_SIZE: HEADER_SIZE,
    FIRST_LRP_SIZE: FIRST_LRP_SIZE,
    LRP_SIZE: LRP_SIZE,
    LAST_LRP_SIZE: LAST_LRP_SIZE,
    ABS_COORD_SIZE: ABS_COORD_SIZE,
    RELATIVE_OFFSET_LENGTH: RELATIVE_OFFSET_LENGTH,
    MIN_BYTES_LINE_LOCATION: MIN_BYTES_LINE_LOCATION,
    MIN_BYTES_CLOSED_LINE_LOCATION: MIN_BYTES_CLOSED_LINE_LOCATION,
    GEOCOORD_SIZE: GEOCOORD_SIZE,
    MIN_BYTES_POINT_LOCATION: MIN_BYTES_POINT_LOCATION,
    BINARY_VERSION_2: BINARY_VERSION_2,
    BINARY_VERSION_3: BINARY_VERSION_3,
    LATEST_BINARY_VERSION: LATEST_BINARY_VERSION,
    HAS_OFFSET: HAS_OFFSET,
    OFFSET_BUCKETS: OFFSET_BUCKETS,
    POINT_ALONG_LINE_SIZE: POINT_ALONG_LINE_SIZE,
    RELATIVE_COORD_SIZE: RELATIVE_COORD_SIZE,
    SMALL_RADIUS_BITS: SMALL_RADIUS_BITS,
    MEDIUM_RADIUS_BITS: MEDIUM_RADIUS_BITS,
    LARGE_RADIUS_BITS: LARGE_RADIUS_BITS,
    EXTRA_LARGE_RADIUS_BITS: EXTRA_LARGE_RADIUS_BITS,
    DIMENSION_SIZE: DIMENSION_SIZE,
    RECTANGLE_SIZE: RECTANGLE_SIZE,
    LARGE_RECTANGLE_SIZE: LARGE_RECTANGLE_SIZE,
    GRID_SIZE: GRID_SIZE,
    LARGE_GRID_SIZE: LARGE_GRID_SIZE,
    MIN_BYTES_POLYGON: MIN_BYTES_POLYGON,
    POINT_OFFSET_SIZE: POINT_OFFSET_SIZE,
    POINT_WITH_ACCESS_SIZE: POINT_WITH_ACCESS_SIZE,
    POINT_LOCATION_VERSION: POINT_LOCATION_VERSION,
    POINT_LOCATION_TYPES: POINT_LOCATION_TYPES,
    AREA_LOCATION_VERSION: AREA_LOCATION_VERSION,
    AREA_LOCATION_TYPES: AREA_LOCATION_TYPES
};