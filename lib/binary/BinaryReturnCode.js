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
export default BinaryReturnCode;
//# sourceMappingURL=BinaryReturnCode.js.map