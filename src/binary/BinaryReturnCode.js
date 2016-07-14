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

const INVALID_VERSION = 0;
const INVALID_OFFSET = 1;
const UNKNOWN_LOCATION_TYPE = 2;
const MISSING_DATA = 3;
const NOT_ENOUGH_BYTES = 4;
const READING_HEADER_FAILURE = 5;
const INVALID_BYTE_SIZE = 6;
const INVALID_HEADER = 7;
const INVALID_RADIUS = 8;
const INVALID_BINARY_DATA = 9;

export default {
    INVALID_VERSION,
    INVALID_OFFSET,
    UNKNOWN_LOCATION_TYPE,
    MISSING_DATA,
    NOT_ENOUGH_BYTES,
    READING_HEADER_FAILURE,
    INVALID_BYTE_SIZE,
    INVALID_HEADER,
    INVALID_RADIUS,
    INVALID_BINARY_DATA,
    getId: returnCode => returnCode
};
