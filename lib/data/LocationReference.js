"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryDecoder_1 = require("../binary/BinaryDecoder");
const BitStreamInput_1 = require("../binary/bit-stream/BitStreamInput");
const Header_1 = require("../binary/data/Header");
const BinaryConstants_1 = require("../binary/BinaryConstants");
const LocationType_1 = require("./LocationType");
class LocationReference {
    static fromIdAndBuffer(id, data) {
        const locationReference = new LocationReference();
        locationReference._id = id;
        locationReference._data = data;
        locationReference._returnCode = null;
        locationReference._locationType = LocationReference._resolveLocationType(data);
        const version = LocationReference._resolveVersion(data);
        if (!LocationReference._checkVersion(version)) {
            throw new Error('Invalid version');
        }
        locationReference._version = version;
        return locationReference;
    }
    static fromValues(id, returnCode, locationType, version) {
        const locationReference = new LocationReference();
        locationReference._id = id;
        locationReference._data = null;
        locationReference._returnCode = returnCode;
        locationReference._locationType = locationType;
        locationReference._version = version;
        return locationReference;
    }
    static _checkVersion(ver) {
        for (let v of BinaryDecoder_1.default.getVersions()) {
            if (ver === v) {
                return true;
            }
        }
        return false;
    }
    static _resolveVersion(data) {
        if (data === null || data.length === 0) {
            throw new Error('Invalid binary data');
        }
        return data[0] & LocationReference._VERSION_MASK;
    }
    static _resolveLocationType(data) {
        let locationType = null;
        const totalBytes = data.length;
        const bitStreamInput = BitStreamInput_1.default.fromBufferAndLength(data, totalBytes);
        const header = Header_1.default.fromBitStreamInput(bitStreamInput);
        const hasAttributes = header.af === BinaryConstants_1.default.HAS_ATTRIBUTES;
        const isPointLocation = header.pf === BinaryConstants_1.default.IS_POINT;
        const areaLocationCode = header.arf;
        const isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            locationType = LocationType_1.default.LINE_LOCATION;
        }
        else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants_1.default.GEOCOORD_SIZE) {
                    locationType = LocationType_1.default.GEO_COORDINATES;
                }
                else {
                    throw new Error('Byte size does not match geo coordinate location');
                }
            }
            else {
                if (totalBytes === BinaryConstants_1.default.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants_1.default.POINT_ALONG_LINE_SIZE + BinaryConstants_1.default.POINT_OFFSET_SIZE) {
                    locationType = LocationType_1.default.POINT_ALONG_LINE;
                }
                else if (totalBytes === BinaryConstants_1.default.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants_1.default.POINT_WITH_ACCESS_SIZE + BinaryConstants_1.default.POINT_OFFSET_SIZE) {
                    locationType = LocationType_1.default.POI_WITH_ACCESS_POINT;
                }
                else {
                    throw new Error('Bye size does not match point location');
                }
            }
        }
        else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants_1.default.MIN_BYTES_CLOSED_LINE_LOCATION) {
                locationType = LocationType_1.default.CLOSED_LINE;
            }
            else {
                throw new Error('Byte size does not match closed line location');
            }
        }
        else {
            switch (areaLocationCode) {
                case BinaryConstants_1.default.AREA_CODE_CIRCLE:
                    locationType = LocationType_1.default.CIRCLE;
                    break;
                case BinaryConstants_1.default.AREA_CODE_RECTANGLE:
                    if (totalBytes === BinaryConstants_1.default.RECTANGLE_SIZE || totalBytes === BinaryConstants_1.default.LARGE_RECTANGLE_SIZE) {
                        locationType = LocationType_1.default.RECTANGLE;
                    }
                    else if (totalBytes === BinaryConstants_1.default.GRID_SIZE || totalBytes === BinaryConstants_1.default.LARGE_GRID_SIZE) {
                        locationType = LocationType_1.default.GRID;
                    }
                    else {
                        throw new Error('Byte size does not match area rectangle location');
                    }
                    break;
                case BinaryConstants_1.default.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants_1.default.MIN_BYTES_POLYGON) {
                        locationType = LocationType_1.default.POLYGON;
                    }
                    else {
                        throw new Error('Byte size does not match polygon location');
                    }
                    break;
                default:
                    throw new Error('Byte size does not match area location');
            }
        }
        return locationType;
    }
    getReturnCode() {
        return this._returnCode;
    }
    getId() {
        return this._id;
    }
    isValid() {
        return this._returnCode === null;
    }
    getDataIdentifier() {
        return BinaryConstants_1.default.IDENTIFIER;
    }
    getLocationReferenceData() {
        if (this.isValid()) {
            return this._data;
        }
        else {
            return null;
        }
    }
    getLocationType() {
        return this._locationType;
    }
    getVersion() {
        return this._version;
    }
}
LocationReference._VERSION_MASK = 7;
exports.default = LocationReference;
;
//# sourceMappingURL=LocationReference.js.map