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
import { LocationType } from '../data/LocationType';
/** The data format IDENTIFIER. */
export declare const IDENTIFIER = "binary";
/** used for rounding */
export declare const ROUND_FACTOR = 0.5;
/** The Constant BITS_PER_BYTE. */
export declare const BITS_PER_BYTE = 8;
/** The Constant DECA_MICRO_DEG_FACTOR is used to transform degree values into deca-micro degrees. */
export declare const DECA_MICRO_DEG_FACTOR = 100000;
/** The Constant BIT24FACTOR is used for the conversion of lat/lon coordinates into a 24bit accuracy. */
export declare const BIT24FACTOR = 46603.377778;
/** The Constant BIT24FACTOR_REVERSED is used for the conversion of 24bit lat/lon values back into prior accuracy. */
export declare const BIT24FACTOR_REVERSED: number;
/** The BEARING_SECTOR defines the length of a bearing interval. */
export declare const BEARING_SECTOR = 11.25;
/** The LENGTH_INTERVAL defines the length of a dnp and offset interval. */
export declare const LENGTH_INTERVAL = 58.6;
/** The IS_POINT defines a point location reference. */
export declare const IS_POINT = 1;
/** The IS_NOT_POINT indicates that the location reference is not a point location. */
export declare const IS_NOT_POINT = 0;
/** The AREA_CODE_CIRCLE defines the code for a cirle location reference. */
export declare const AREA_CODE_CIRCLE = 0;
/** The AREA_CODE_RECTANGLE defines the code for a rectangle location reference. */
export declare const AREA_CODE_RECTANGLE = 2;
/** The AREA_CODE_GRID defines the code for a grid location reference. */
export declare const AREA_CODE_GRID = 2;
/** The AREA_CODE_POLYGON defines the code for a polygon location reference. */
export declare const AREA_CODE_POLYGON = 1;
/** The AREA_CODE_CLOSEDLINE defines the code for a closed line location reference. */
export declare const AREA_CODE_CLOSEDLINE = 3;
/** The AREA_CODE_NOAREA defines the code for a non-area location reference. */
export declare const IS_NOT_AREA = 0;
/** The HAS_ATTRIBUTES the existence of attribute information in the stream. */
export declare const HAS_ATTRIBUTES = 1;
/** The Constant HAS_NO_ATTRIBUTES. */
export declare const HAS_NO_ATTRIBUTES = 0;
/** The HEADER_SIZE defines the size [in bytes] of the header. */
export declare const HEADER_SIZE = 1;
/** The FIRST_LRP_SIZE defines the size [in bytes] of the first location reference point. */
export declare const FIRST_LRP_SIZE = 9;
/** The LRP_SIZE defines the size [in bytes] of an intermediate location reference point. */
export declare const LRP_SIZE = 7;
/** The LAST_LRP_SIZE defines the size [in bytes] of the last location reference point. */
export declare const LAST_LRP_SIZE = 6;
/** The Constant ABS_COORD_SIZE. */
export declare const ABS_COORD_SIZE = 6;
/** The Constant RELATIVE_OFFSET_LENGTH. */
export declare const RELATIVE_OFFSET_LENGTH = 0.390625;
/** The MIN_BYTES defines the minimum size [in bytes] of a binary location reference. */
export declare const MIN_BYTES_LINE_LOCATION: number;
/** The MIN_BYTES defines the minimum size [in bytes] of a binary closed line location reference. */
export declare const MIN_BYTES_CLOSED_LINE_LOCATION: number;
/** The Constant GEOCOORD_SIZE. */
export declare const GEOCOORD_SIZE: number;
/** The Constant MIN_BYTES_POINT_LOCATION. */
export declare const MIN_BYTES_POINT_LOCATION: number;
/** The Constant BINARY_VERSION_2. */
export declare const BINARY_VERSION_2 = 2;
/** The Constant BINARY_VERSION_3. */
export declare const BINARY_VERSION_3 = 3;
/** The LATEST_BINARY_VERSION defines the current version of the binary format. */
export declare const LATEST_BINARY_VERSION = 3;
/** The HAS_OFFSET defines the existence of offset information. */
export declare const HAS_OFFSET = 1;
/** The Constant OFFSET_BUCKETS. */
export declare const OFFSET_BUCKETS = 256;
/** The Constant POINT_ALONG_LINE_SIZE. */
export declare const POINT_ALONG_LINE_SIZE: number;
/** The Constant RELATIVE_COORD_SIZE. */
export declare const RELATIVE_COORD_SIZE = 4;
/** number of bits used for a small radius */
export declare const SMALL_RADIUS_BITS = 8;
/** number of bits used for a medium radius */
export declare const MEDIUM_RADIUS_BITS = 16;
/** number of bits used for a large radius */
export declare const LARGE_RADIUS_BITS = 24;
/** number of bits used for a small radius */
export declare const EXTRA_LARGE_RADIUS_BITS = 32;
/** The Constant DIMENSION_SIZE. */
export declare const DIMENSION_SIZE = 2;
/** The Constant RECTANGLE_SIZE. */
export declare const RECTANGLE_SIZE: number;
/** The Constant LARGE_RECTANGLE_SIZE. */
export declare const LARGE_RECTANGLE_SIZE: number;
/** The Constant GRID_SIZE. */
export declare const GRID_SIZE: number;
/** The Constant LARGE_GRID_SIZE. */
export declare const LARGE_GRID_SIZE: number;
/** The Constant MIN_BYTES_POLYGON. */
export declare const MIN_BYTES_POLYGON: number;
/** The Constant POINT_OFFSET_SIZE. */
export declare const POINT_OFFSET_SIZE = 1;
/** The Constant POINT_WITH_ACCESS_SIZE. */
export declare const POINT_WITH_ACCESS_SIZE: number;
/** The Constant POINT_LOCATION_VERSION. */
export declare const POINT_LOCATION_VERSION = 3;
/** The Constant POINT_LOCATION_TYPES. */
export declare const POINT_LOCATION_TYPES: Set<LocationType>;
/** The Constant AREA_LOCATION_VERSION. */
export declare const AREA_LOCATION_VERSION = 3;
/** The Constant AREA_LOCATION_TYPES. */
export declare const AREA_LOCATION_TYPES: Set<LocationType>;
