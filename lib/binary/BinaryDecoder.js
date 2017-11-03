import BinaryConstants from './BinaryConstants';
import BinaryReturnCode from './BinaryReturnCode';
import BitStreamInput from './bit-stream/BitStreamInput';
import RawInvalidLocationReference from '../data/raw-location-reference/RawInvalidLocationReference';
import Header from './data/Header';
import LineDecoder from './decoder/LineDecoder';
import PointAlongLineDecoder from './decoder/PointAlongLineDecoder';
import GeoCoordDecoder from './decoder/GeoCoordDecoder';
import RawBinaryData from './data/RawBinaryData';
export default class BinaryDecoder {
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
        if (totalBytes < Math.min(BinaryConstants.MIN_BYTES_LINE_LOCATION, Math.min(Math.min(BinaryConstants.MIN_BYTES_POINT_LOCATION, BinaryConstants.MIN_BYTES_POLYGON), BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION))) {
            return RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.NOT_ENOUGH_BYTES);
        }
        const bitStreamInput = BitStreamInput.fromBufferAndLength(data, totalBytes);
        let header;
        try {
            header = Header.fromBitStreamInput(bitStreamInput);
            if (binaryData !== null) {
                binaryData.header = header;
            }
        }
        catch (error) {
            return RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.READING_HEADER_FAILURE);
        }
        if (!this._checkVersion(header)) {
            return RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_VERSION);
        }
        const isPointLocation = header.pf === BinaryConstants.IS_POINT;
        const hasAttributes = header.af === BinaryConstants.HAS_ATTRIBUTES;
        const areaLocationCode = header.arf;
        const isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
        let rawLocRef = null;
        let decoder = null;
        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            decoder = new LineDecoder();
        }
        else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants.GEOCOORD_SIZE) {
                    decoder = new GeoCoordDecoder();
                }
                else {
                    rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
                }
            }
            else {
                if (totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    decoder = new PointAlongLineDecoder();
                }
                else if (totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    throw new Error('PoiAccessDecider not implemented');
                }
                else {
                    rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
                }
            }
        }
        else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION) {
                throw new Error('ClosedLineDecoder not implemented');
            }
            else {
                rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
            }
        }
        else {
            switch (areaLocationCode) {
                case BinaryConstants.AREA_CODE_CIRCLE:
                    throw new Error('CircleDecoder not implemented');
                case BinaryConstants.AREA_CODE_RECTANGLE:
                    if (totalBytes === BinaryConstants.RECTANGLE_SIZE || totalBytes === BinaryConstants.LARGE_RECTANGLE_SIZE) {
                        throw new Error('RectangleDecoder not implemented');
                    }
                    else if (totalBytes === BinaryConstants.GRID_SIZE || totalBytes === BinaryConstants.LARGE_GRID_SIZE) {
                        throw new Error('GridDecoder not implemented');
                    }
                    else {
                        rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
                    }
                    break;
                case BinaryConstants.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants.MIN_BYTES_POLYGON) {
                        throw new Error('PolygonDecoder not implemented');
                    }
                    else {
                        rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
                    }
                    break;
                default:
                    rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_HEADER);
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
            return RawInvalidLocationReference.fromIdAndStatusCode(locationReference.getId(), BinaryReturnCode.NOT_ENOUGH_BYTES);
        }
        else {
            return this._parseBinaryData(locationReference.getId(), data, null);
        }
    }
    getDataFormatIdentifier() {
        return BinaryConstants.IDENTIFIER;
    }
    resolveBinaryData(id, data) {
        const binaryData = new RawBinaryData();
        this._parseBinaryData(id, data, binaryData);
        return binaryData;
    }
    static getVersions() {
        return BinaryDecoder._VERSIONS;
    }
}
BinaryDecoder._VERSIONS = [2, 3];
;
//# sourceMappingURL=BinaryDecoder.js.map