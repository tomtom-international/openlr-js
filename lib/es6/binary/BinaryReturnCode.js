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
export var BinaryReturnCode;
(function (BinaryReturnCode) {
    BinaryReturnCode[BinaryReturnCode["INVALID_VERSION"] = 0] = "INVALID_VERSION";
    BinaryReturnCode[BinaryReturnCode["INVALID_OFFSET"] = 1] = "INVALID_OFFSET";
    BinaryReturnCode[BinaryReturnCode["UNKNOWN_LOCATION_TYPE"] = 2] = "UNKNOWN_LOCATION_TYPE";
    BinaryReturnCode[BinaryReturnCode["MISSING_DATA"] = 3] = "MISSING_DATA";
    BinaryReturnCode[BinaryReturnCode["NOT_ENOUGH_BYTES"] = 4] = "NOT_ENOUGH_BYTES";
    BinaryReturnCode[BinaryReturnCode["READING_HEADER_FAILURE"] = 5] = "READING_HEADER_FAILURE";
    BinaryReturnCode[BinaryReturnCode["INVALID_BYTE_SIZE"] = 6] = "INVALID_BYTE_SIZE";
    BinaryReturnCode[BinaryReturnCode["INVALID_HEADER"] = 7] = "INVALID_HEADER";
    BinaryReturnCode[BinaryReturnCode["INVALID_RADIUS"] = 8] = "INVALID_RADIUS";
    BinaryReturnCode[BinaryReturnCode["INVALID_BINARY_DATA"] = 9] = "INVALID_BINARY_DATA";
})(BinaryReturnCode || (BinaryReturnCode = {}));
export const getId = (returnCode) => returnCode;
//# sourceMappingURL=BinaryReturnCode.js.map