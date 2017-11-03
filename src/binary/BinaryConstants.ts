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

import LocationType from '../data/LocationType';

/** The data format IDENTIFIER. */
const IDENTIFIER = "binary";

/** used for rounding */
const ROUND_FACTOR = 0.5;

/** The Constant BITS_PER_BYTE. */
const BITS_PER_BYTE = 8;

/** The Constant DECA_MICRO_DEG_FACTOR is used to transform degree values into deca-micro degrees. */
const DECA_MICRO_DEG_FACTOR = 100000.0;

/** The Constant BIT24FACTOR is used for the conversion of lat/lon coordinates into a 24bit accuracy. */
const BIT24FACTOR = 46603.377778;

/** The Constant BIT24FACTOR_REVERSED is used for the conversion of 24bit lat/lon values back into prior accuracy. */
const BIT24FACTOR_REVERSED = 1 / BIT24FACTOR;

/** The BEARING_SECTOR defines the length of a bearing interval. */
const BEARING_SECTOR = 11.25;

/** The LENGTH_INTERVAL defines the length of a dnp and offset interval. */
const LENGTH_INTERVAL = 58.6;

/** The IS_POINT defines a point location reference. */
const IS_POINT = 1;

/** The IS_NOT_POINT indicates that the location reference is not a point location. */
const IS_NOT_POINT = 0;

///** The IS_AREA defines an area location reference. */
//const IS_AREA = 1;

/** The AREA_CODE_CIRCLE defines the code for a cirle location reference. */
const AREA_CODE_CIRCLE = 0;

/** The AREA_CODE_RECTANGLE defines the code for a rectangle location reference. */
const AREA_CODE_RECTANGLE = 2;

/** The AREA_CODE_GRID defines the code for a grid location reference. */
const AREA_CODE_GRID = 2; // For BINARY_VERSION_3 the same as for AREA_CODE_RECTANGLE

/** The AREA_CODE_POLYGON defines the code for a polygon location reference. */
const AREA_CODE_POLYGON = 1;

/** The AREA_CODE_CLOSEDLINE defines the code for a closed line location reference. */
const AREA_CODE_CLOSEDLINE = 3;

/** The AREA_CODE_NOAREA defines the code for a non-area location reference. */
const IS_NOT_AREA = 0;

/** The HAS_ATTRIBUTES the existence of attribute information in the stream. */
const HAS_ATTRIBUTES = 1;

/** The Constant HAS_NO_ATTRIBUTES. */
const HAS_NO_ATTRIBUTES = 0;

/** The HEADER_SIZE defines the size [in bytes] of the header. */
const HEADER_SIZE = 1;

/** The FIRST_LRP_SIZE defines the size [in bytes] of the first location reference point. */
const FIRST_LRP_SIZE = 9;

/** The LRP_SIZE defines the size [in bytes] of an intermediate location reference point. */
const LRP_SIZE = 7;

/** The LAST_LRP_SIZE defines the size [in bytes] of the last location reference point. */
const LAST_LRP_SIZE = 6;

/** The Constant ABS_COORD_SIZE. */
const ABS_COORD_SIZE = 6;

/** The Constant RELATIVE_OFFSET_LENGTH. */
const RELATIVE_OFFSET_LENGTH = 0.390625;

/** The MIN_BYTES defines the minimum size [in bytes] of a binary location reference. */
const MIN_BYTES_LINE_LOCATION = HEADER_SIZE + FIRST_LRP_SIZE + LAST_LRP_SIZE;

/** The MIN_BYTES defines the minimum size [in bytes] of a binary closed line location reference. */
const MIN_BYTES_CLOSED_LINE_LOCATION = HEADER_SIZE + FIRST_LRP_SIZE + 2;

/** The Constant GEOCOORD_SIZE. */
const GEOCOORD_SIZE = HEADER_SIZE + ABS_COORD_SIZE;

/** The Constant MIN_BYTES_POINT_LOCATION. */
const MIN_BYTES_POINT_LOCATION = GEOCOORD_SIZE;

/** The Constant BINARY_VERSION_2. */
const BINARY_VERSION_2 = 2;

/** The Constant BINARY_VERSION_3. */
const BINARY_VERSION_3 = 3;

/** The LATEST_BINARY_VERSION defines the current version of the binary format. */
const LATEST_BINARY_VERSION = BINARY_VERSION_3;

/** The HAS_OFFSET defines the existence of offset information. */
const HAS_OFFSET = 1;

/** The Constant OFFSET_BUCKETS. */
const OFFSET_BUCKETS = 256;

/** The Constant POINT_ALONG_LINE_SIZE. */
const POINT_ALONG_LINE_SIZE = HEADER_SIZE + FIRST_LRP_SIZE + LAST_LRP_SIZE;

/** The Constant RELATIVE_COORD_SIZE. */
const RELATIVE_COORD_SIZE = 4;

/** number of bits used for a small radius */
const SMALL_RADIUS_BITS = 8;

/** number of bits used for a medium radius */
const MEDIUM_RADIUS_BITS = 16;

/** number of bits used for a large radius */
const LARGE_RADIUS_BITS = 24;

/** number of bits used for a small radius */
const EXTRA_LARGE_RADIUS_BITS = 32;

/** The Constant DIMENSION_SIZE. */
const DIMENSION_SIZE = 2;

/** The Constant RECTANGLE_SIZE. */
const RECTANGLE_SIZE = HEADER_SIZE + ABS_COORD_SIZE + RELATIVE_COORD_SIZE;

/** The Constant LARGE_RECTANGLE_SIZE. */
const LARGE_RECTANGLE_SIZE = HEADER_SIZE + ABS_COORD_SIZE + ABS_COORD_SIZE;

/** The Constant GRID_SIZE. */
const GRID_SIZE = RECTANGLE_SIZE + 2 * DIMENSION_SIZE;

/** The Constant LARGE_GRID_SIZE. */
const LARGE_GRID_SIZE = LARGE_RECTANGLE_SIZE + 2 * DIMENSION_SIZE;

/** The Constant MIN_BYTES_POLYGON. */
const MIN_BYTES_POLYGON = HEADER_SIZE + ABS_COORD_SIZE + 2 * RELATIVE_COORD_SIZE;

/** The Constant POINT_OFFSET_SIZE. */
const POINT_OFFSET_SIZE = 1;

/** The Constant POINT_WITH_ACCESS_SIZE. */
const POINT_WITH_ACCESS_SIZE = HEADER_SIZE + FIRST_LRP_SIZE + LAST_LRP_SIZE + RELATIVE_COORD_SIZE;

/** The Constant POINT_LOCATION_VERSION. */
const POINT_LOCATION_VERSION = 3;

/** The Constant POINT_LOCATION_TYPES. */
const POINT_LOCATION_TYPES = new Set([LocationType.GEO_COORDINATES, LocationType.POI_WITH_ACCESS_POINT, LocationType.POINT_ALONG_LINE]);

/** The Constant AREA_LOCATION_VERSION. */
const AREA_LOCATION_VERSION = 3;

/** The Constant AREA_LOCATION_TYPES. */
const AREA_LOCATION_TYPES = new Set([LocationType.CIRCLE, LocationType.GRID, LocationType.CLOSED_LINE, LocationType.RECTANGLE, LocationType.POLYGON]);

export default {
    IDENTIFIER,
    ROUND_FACTOR,
    BITS_PER_BYTE,
    DECA_MICRO_DEG_FACTOR,
    BIT24FACTOR,
    BIT24FACTOR_REVERSED,
    BEARING_SECTOR,
    LENGTH_INTERVAL,
    IS_POINT,
    IS_NOT_POINT,
    AREA_CODE_CIRCLE,
    AREA_CODE_RECTANGLE,
    AREA_CODE_GRID,
    AREA_CODE_POLYGON,
    AREA_CODE_CLOSEDLINE,
    IS_NOT_AREA,
    HAS_ATTRIBUTES,
    HAS_NO_ATTRIBUTES,
    HEADER_SIZE,
    FIRST_LRP_SIZE,
    LRP_SIZE,
    LAST_LRP_SIZE,
    ABS_COORD_SIZE,
    RELATIVE_OFFSET_LENGTH,
    MIN_BYTES_LINE_LOCATION,
    MIN_BYTES_CLOSED_LINE_LOCATION,
    GEOCOORD_SIZE,
    MIN_BYTES_POINT_LOCATION,
    BINARY_VERSION_2,
    BINARY_VERSION_3,
    LATEST_BINARY_VERSION,
    HAS_OFFSET,
    OFFSET_BUCKETS,
    POINT_ALONG_LINE_SIZE,
    RELATIVE_COORD_SIZE,
    SMALL_RADIUS_BITS,
    MEDIUM_RADIUS_BITS,
    LARGE_RADIUS_BITS,
    EXTRA_LARGE_RADIUS_BITS,
    DIMENSION_SIZE,
    RECTANGLE_SIZE,
    LARGE_RECTANGLE_SIZE,
    GRID_SIZE,
    LARGE_GRID_SIZE,
    MIN_BYTES_POLYGON,
    POINT_OFFSET_SIZE,
    POINT_WITH_ACCESS_SIZE,
    POINT_LOCATION_VERSION,
    POINT_LOCATION_TYPES,
    AREA_LOCATION_VERSION,
    AREA_LOCATION_TYPES
};
