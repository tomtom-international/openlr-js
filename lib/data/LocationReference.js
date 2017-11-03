import BinaryDecoder from '../binary/BinaryDecoder';
import BitStreamInput from '../binary/bit-stream/BitStreamInput';
import Header from '../binary/data/Header';
import BinaryConstants from '../binary/BinaryConstants';
import LocationType from './LocationType';
export default class LocationReference {
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
        for (let v of BinaryDecoder.getVersions()) {
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
        const bitStreamInput = BitStreamInput.fromBufferAndLength(data, totalBytes);
        const header = Header.fromBitStreamInput(bitStreamInput);
        const hasAttributes = header.af === BinaryConstants.HAS_ATTRIBUTES;
        const isPointLocation = header.pf === BinaryConstants.IS_POINT;
        const areaLocationCode = header.arf;
        const isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            locationType = LocationType.LINE_LOCATION;
        }
        else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants.GEOCOORD_SIZE) {
                    locationType = LocationType.GEO_COORDINATES;
                }
                else {
                    throw new Error('Byte size does not match geo coordinate location');
                }
            }
            else {
                if (totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    locationType = LocationType.POINT_ALONG_LINE;
                }
                else if (totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    locationType = LocationType.POI_WITH_ACCESS_POINT;
                }
                else {
                    throw new Error('Bye size does not match point location');
                }
            }
        }
        else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION) {
                locationType = LocationType.CLOSED_LINE;
            }
            else {
                throw new Error('Byte size does not match closed line location');
            }
        }
        else {
            switch (areaLocationCode) {
                case BinaryConstants.AREA_CODE_CIRCLE:
                    locationType = LocationType.CIRCLE;
                    break;
                case BinaryConstants.AREA_CODE_RECTANGLE:
                    if (totalBytes === BinaryConstants.RECTANGLE_SIZE || totalBytes === BinaryConstants.LARGE_RECTANGLE_SIZE) {
                        locationType = LocationType.RECTANGLE;
                    }
                    else if (totalBytes === BinaryConstants.GRID_SIZE || totalBytes === BinaryConstants.LARGE_GRID_SIZE) {
                        locationType = LocationType.GRID;
                    }
                    else {
                        throw new Error('Byte size does not match area rectangle location');
                    }
                    break;
                case BinaryConstants.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants.MIN_BYTES_POLYGON) {
                        locationType = LocationType.POLYGON;
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
        return BinaryConstants.IDENTIFIER;
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
;
//# sourceMappingURL=LocationReference.js.map