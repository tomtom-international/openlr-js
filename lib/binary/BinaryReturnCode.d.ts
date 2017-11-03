export declare enum BinaryReturnCode {
    INVALID_VERSION = 0,
    INVALID_OFFSET = 1,
    UNKNOWN_LOCATION_TYPE = 2,
    MISSING_DATA = 3,
    NOT_ENOUGH_BYTES = 4,
    READING_HEADER_FAILURE = 5,
    INVALID_BYTE_SIZE = 6,
    INVALID_HEADER = 7,
    INVALID_RADIUS = 8,
    INVALID_BINARY_DATA = 9,
}
export declare const getId: (returnCode: BinaryReturnCode) => number;
export default BinaryReturnCode;
