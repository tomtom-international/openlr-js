"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryConstants_1 = require("./BinaryConstants");
const BinaryReturnCode_1 = require("./BinaryReturnCode");
const BitStreamInput_1 = require("./bit-stream/BitStreamInput");
const RawInvalidLocationReference_1 = require("../data/raw-location-reference/RawInvalidLocationReference");
const Header_1 = require("./data/Header");
const LineDecoder_1 = require("./decoder/LineDecoder");
const PointAlongLineDecoder_1 = require("./decoder/PointAlongLineDecoder");
const GeoCoordDecoder_1 = require("./decoder/GeoCoordDecoder");
const RawBinaryData_1 = require("./data/RawBinaryData");
class BinaryDecoder {
    _checkVersion(header) {
        const ver = header.ver;
        for (let v of BinaryDecoder._VERSIONS) {
            if (v === ver) {
                return true;
            }
        }
        return false;
    }
    _parseBinaryData(id, data, binaryData) {
        const totalBytes = data.length;
        if (totalBytes < Math.min(BinaryConstants_1.default.MIN_BYTES_LINE_LOCATION, Math.min(Math.min(BinaryConstants_1.default.MIN_BYTES_POINT_LOCATION, BinaryConstants_1.default.MIN_BYTES_POLYGON), BinaryConstants_1.default.MIN_BYTES_CLOSED_LINE_LOCATION))) {
            return RawInvalidLocationReference_1.default.fromIdAndStatusCode(id, BinaryReturnCode_1.default.NOT_ENOUGH_BYTES);
        }
        const bitStreamInput = BitStreamInput_1.default.fromBufferAndLength(data, totalBytes);
        let header;
        try {
            header = Header_1.default.fromBitStreamInput(bitStreamInput);
            if (binaryData !== null) {
                binaryData.header = header;
            }
        }
        catch (error) {
            return RawInvalidLocationReference_1.default.fromIdAndStatusCode(id, BinaryReturnCode_1.default.READING_HEADER_FAILURE);
        }
        if (!this._checkVersion(header)) {
            return RawInvalidLocationReference_1.default.fromIdAndStatusCode(id, BinaryReturnCode_1.default.INVALID_VERSION);
        }
        const isPointLocation = header.pf === BinaryConstants_1.default.IS_POINT;
        const hasAttributes = header.af === BinaryConstants_1.default.HAS_ATTRIBUTES;
        const areaLocationCode = header.arf;
        const isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
        let rawLocRef = null;
        let decoder = null;
        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            decoder = new LineDecoder_1.default();
        }
        else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants_1.default.GEOCOORD_SIZE) {
                    decoder = new GeoCoordDecoder_1.default();
                }
                else {
                    rawLocRef = RawInvalidLocationReference_1.default.fromIdAndStatusCode(id, BinaryReturnCode_1.default.INVALID_BYTE_SIZE);
                }
            }
            else {
                if (totalBytes === BinaryConstants_1.default.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants_1.default.POINT_ALONG_LINE_SIZE + BinaryConstants_1.default.POINT_OFFSET_SIZE) {
                    decoder = new PointAlongLineDecoder_1.default();
                }
                else if (totalBytes === BinaryConstants_1.default.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants_1.default.POINT_WITH_ACCESS_SIZE + BinaryConstants_1.default.POINT_OFFSET_SIZE) {
                    throw new Error('PoiAccessDecider not implemented');
                }
                else {
                    rawLocRef = RawInvalidLocationReference_1.default.fromIdAndStatusCode(id, BinaryReturnCode_1.default.INVALID_BYTE_SIZE);
                }
            }
        }
        else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants_1.default.MIN_BYTES_CLOSED_LINE_LOCATION) {
                throw new Error('ClosedLineDecoder not implemented');
            }
            else {
                rawLocRef = RawInvalidLocationReference_1.default.fromIdAndStatusCode(id, BinaryReturnCode_1.default.INVALID_BYTE_SIZE);
            }
        }
        else {
            switch (areaLocationCode) {
                case BinaryConstants_1.default.AREA_CODE_CIRCLE:
                    throw new Error('CircleDecoder not implemented');
                case BinaryConstants_1.default.AREA_CODE_RECTANGLE:
                    if (totalBytes === BinaryConstants_1.default.RECTANGLE_SIZE || totalBytes === BinaryConstants_1.default.LARGE_RECTANGLE_SIZE) {
                        throw new Error('RectangleDecoder not implemented');
                    }
                    else if (totalBytes === BinaryConstants_1.default.GRID_SIZE || totalBytes === BinaryConstants_1.default.LARGE_GRID_SIZE) {
                        throw new Error('GridDecoder not implemented');
                    }
                    else {
                        rawLocRef = RawInvalidLocationReference_1.default.fromIdAndStatusCode(id, BinaryReturnCode_1.default.INVALID_BYTE_SIZE);
                    }
                    break;
                case BinaryConstants_1.default.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants_1.default.MIN_BYTES_POLYGON) {
                        throw new Error('PolygonDecoder not implemented');
                    }
                    else {
                        rawLocRef = RawInvalidLocationReference_1.default.fromIdAndStatusCode(id, BinaryReturnCode_1.default.INVALID_BYTE_SIZE);
                    }
                    break;
                default:
                    rawLocRef = RawInvalidLocationReference_1.default.fromIdAndStatusCode(id, BinaryReturnCode_1.default.INVALID_HEADER);
            }
        }
        if (decoder !== null) {
            rawLocRef = decoder.decodeData(id, bitStreamInput, totalBytes, header.ver, binaryData);
        }
        return rawLocRef;
    }
    decodeData(locationReference) {
        const data = locationReference.getLocationReferenceData();
        if (data === null) {
            return RawInvalidLocationReference_1.default.fromIdAndStatusCode(locationReference.getId(), BinaryReturnCode_1.default.NOT_ENOUGH_BYTES);
        }
        else {
            return this._parseBinaryData(locationReference.getId(), data, null);
        }
    }
    getDataFormatIdentifier() {
        return BinaryConstants_1.default.IDENTIFIER;
    }
    resolveBinaryData(id, data) {
        const binaryData = new RawBinaryData_1.default();
        this._parseBinaryData(id, data, binaryData);
        return binaryData;
    }
    static getVersions() {
        return BinaryDecoder._VERSIONS;
    }
}
BinaryDecoder._VERSIONS = [2, 3];
exports.default = BinaryDecoder;
;
//# sourceMappingURL=BinaryDecoder.js.map