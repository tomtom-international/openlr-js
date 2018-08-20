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
var LocationType_1 = require("../data/LocationType");
/** The data format IDENTIFIER. */
exports.IDENTIFIER = 'binary';
/** used for rounding */
exports.ROUND_FACTOR = 0.5;
/** The Constant BITS_PER_BYTE. */
exports.BITS_PER_BYTE = 8;
/** The Constant DECA_MICRO_DEG_FACTOR is used to transform degree values into deca-micro degrees. */
exports.DECA_MICRO_DEG_FACTOR = 100000.0;
/** The Constant BIT24FACTOR is used for the conversion of lat/lon coordinates into a 24bit accuracy. */
exports.BIT24FACTOR = 46603.377778;
/** The Constant BIT24FACTOR_REVERSED is used for the conversion of 24bit lat/lon values back into prior accuracy. */
exports.BIT24FACTOR_REVERSED = 1 / exports.BIT24FACTOR;
/** The BEARING_SECTOR defines the length of a bearing interval. */
exports.BEARING_SECTOR = 11.25;
/** The LENGTH_INTERVAL defines the length of a dnp and offset interval. */
exports.LENGTH_INTERVAL = 58.6;
/** The IS_POINT defines a point location reference. */
exports.IS_POINT = 1;
/** The IS_NOT_POINT indicates that the location reference is not a point location. */
exports.IS_NOT_POINT = 0;
// /** The IS_AREA defines an area location reference. */
// const IS_AREA = 1;
/** The AREA_CODE_CIRCLE defines the code for a cirle location reference. */
exports.AREA_CODE_CIRCLE = 0;
/** The AREA_CODE_RECTANGLE defines the code for a rectangle location reference. */
exports.AREA_CODE_RECTANGLE = 2;
/** The AREA_CODE_GRID defines the code for a grid location reference. */
exports.AREA_CODE_GRID = 2; // For BINARY_VERSION_3 the same as for AREA_CODE_RECTANGLE
/** The AREA_CODE_POLYGON defines the code for a polygon location reference. */
exports.AREA_CODE_POLYGON = 1;
/** The AREA_CODE_CLOSEDLINE defines the code for a closed line location reference. */
exports.AREA_CODE_CLOSEDLINE = 3;
/** The AREA_CODE_NOAREA defines the code for a non-area location reference. */
exports.IS_NOT_AREA = 0;
/** The HAS_ATTRIBUTES the existence of attribute information in the stream. */
exports.HAS_ATTRIBUTES = 1;
/** The Constant HAS_NO_ATTRIBUTES. */
exports.HAS_NO_ATTRIBUTES = 0;
/** The HEADER_SIZE defines the size [in bytes] of the header. */
exports.HEADER_SIZE = 1;
/** The FIRST_LRP_SIZE defines the size [in bytes] of the first location reference point. */
exports.FIRST_LRP_SIZE = 9;
/** The LRP_SIZE defines the size [in bytes] of an intermediate location reference point. */
exports.LRP_SIZE = 7;
/** The LAST_LRP_SIZE defines the size [in bytes] of the last location reference point. */
exports.LAST_LRP_SIZE = 6;
/** The Constant ABS_COORD_SIZE. */
exports.ABS_COORD_SIZE = 6;
/** The Constant RELATIVE_OFFSET_LENGTH. */
exports.RELATIVE_OFFSET_LENGTH = 0.390625;
/** The MIN_BYTES defines the minimum size [in bytes] of a binary location reference. */
exports.MIN_BYTES_LINE_LOCATION = exports.HEADER_SIZE + exports.FIRST_LRP_SIZE + exports.LAST_LRP_SIZE;
/** The MIN_BYTES defines the minimum size [in bytes] of a binary closed line location reference. */
exports.MIN_BYTES_CLOSED_LINE_LOCATION = exports.HEADER_SIZE + exports.FIRST_LRP_SIZE + 2;
/** The Constant GEOCOORD_SIZE. */
exports.GEOCOORD_SIZE = exports.HEADER_SIZE + exports.ABS_COORD_SIZE;
/** The Constant MIN_BYTES_POINT_LOCATION. */
exports.MIN_BYTES_POINT_LOCATION = exports.GEOCOORD_SIZE;
/** The Constant BINARY_VERSION_2. */
exports.BINARY_VERSION_2 = 2;
/** The Constant BINARY_VERSION_3. */
exports.BINARY_VERSION_3 = 3;
/** The LATEST_BINARY_VERSION defines the current version of the binary format. */
exports.LATEST_BINARY_VERSION = exports.BINARY_VERSION_3;
/** The HAS_OFFSET defines the existence of offset information. */
exports.HAS_OFFSET = 1;
/** The Constant OFFSET_BUCKETS. */
exports.OFFSET_BUCKETS = 256;
/** The Constant POINT_ALONG_LINE_SIZE. */
exports.POINT_ALONG_LINE_SIZE = exports.HEADER_SIZE + exports.FIRST_LRP_SIZE + exports.LAST_LRP_SIZE;
/** The Constant RELATIVE_COORD_SIZE. */
exports.RELATIVE_COORD_SIZE = 4;
/** number of bits used for a small radius */
exports.SMALL_RADIUS_BITS = 8;
/** number of bits used for a medium radius */
exports.MEDIUM_RADIUS_BITS = 16;
/** number of bits used for a large radius */
exports.LARGE_RADIUS_BITS = 24;
/** number of bits used for a small radius */
exports.EXTRA_LARGE_RADIUS_BITS = 32;
/** The Constant DIMENSION_SIZE. */
exports.DIMENSION_SIZE = 2;
/** The Constant RECTANGLE_SIZE. */
exports.RECTANGLE_SIZE = exports.HEADER_SIZE + exports.ABS_COORD_SIZE + exports.RELATIVE_COORD_SIZE;
/** The Constant LARGE_RECTANGLE_SIZE. */
exports.LARGE_RECTANGLE_SIZE = exports.HEADER_SIZE + exports.ABS_COORD_SIZE + exports.ABS_COORD_SIZE;
/** The Constant GRID_SIZE. */
exports.GRID_SIZE = exports.RECTANGLE_SIZE + 2 * exports.DIMENSION_SIZE;
/** The Constant LARGE_GRID_SIZE. */
exports.LARGE_GRID_SIZE = exports.LARGE_RECTANGLE_SIZE + 2 * exports.DIMENSION_SIZE;
/** The Constant MIN_BYTES_POLYGON. */
exports.MIN_BYTES_POLYGON = exports.HEADER_SIZE + exports.ABS_COORD_SIZE + 2 * exports.RELATIVE_COORD_SIZE;
/** The Constant POINT_OFFSET_SIZE. */
exports.POINT_OFFSET_SIZE = 1;
/** The Constant POINT_WITH_ACCESS_SIZE. */
exports.POINT_WITH_ACCESS_SIZE = exports.HEADER_SIZE + exports.FIRST_LRP_SIZE + exports.LAST_LRP_SIZE + exports.RELATIVE_COORD_SIZE;
/** The Constant POINT_LOCATION_VERSION. */
exports.POINT_LOCATION_VERSION = 3;
/** The Constant POINT_LOCATION_TYPES. */
exports.POINT_LOCATION_TYPES = new Set([LocationType_1.LocationType.GEO_COORDINATES, LocationType_1.LocationType.POI_WITH_ACCESS_POINT, LocationType_1.LocationType.POINT_ALONG_LINE]);
/** The Constant AREA_LOCATION_VERSION. */
exports.AREA_LOCATION_VERSION = 3;
/** The Constant AREA_LOCATION_TYPES. */
exports.AREA_LOCATION_TYPES = new Set([LocationType_1.LocationType.CIRCLE, LocationType_1.LocationType.GRID, LocationType_1.LocationType.CLOSED_LINE, LocationType_1.LocationType.RECTANGLE, LocationType_1.LocationType.POLYGON]);
//# sourceMappingURL=BinaryConstants.js.map