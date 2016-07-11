import BinaryConstants from './BinaryConstants';
import BinaryReturnCode from './BinaryReturnCode';
import BitStreamInput from './bit-stream/BitStreamInput';
import RawInvalidLocationReference from '../data/raw-location-reference/RawInvalidLocationReference';
import Header from './data/Header';

export default class BinaryDecoder {
    static VERSIONS = [2, 3];

    _checkVersion(header) {
        const ver = header.ver;
        for (let v of Decoder.VERSIONS) {
            if (v == ver) {
                return true;
            }
        }
        return false;
    }

    _parseBinaryData(id, data, binaryData) {
    const totalBytes = data.length;

    // Check if enough bytes available
    if (totalBytes < Math.min(        BinaryConstants.MIN_BYTES_LINE_LOCATION, Math.min(Math.min(BinaryConstants.MIN_BYTES_POINT_LOCATION,    BinaryConstants.MIN_BYTES_POLYGON),    BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION))) {
    return RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.NOT_ENOUGH_BYTES);
}

// read in data
const bitStreamInput = BitStreamInput.fromBufferAndLength(data, totalBytes);

let header = null;
// Read header information
try {
    header = Header.fromBitStreamInput(bitStreamInput);
    if (binaryData != null) {
        binaryData.header = header;
    }
} catch (error) {
    return RawInvalidLocationReference.fromIdAndStatusCode(id,        BinaryReturnCode.READING_HEADER_FAILURE);
}

// Check version
if (!this._checkVersion(header)) {
    return RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_VERSION);
}

const isPointLocation = header.pf == BinaryConstants.IS_POINT;
const hasAttributes = header.af == BinaryConstants.HAS_ATTRIBUTES;
const areaLocationCode = header.arf;
const isAreaLocation = ((areaLocationCode == 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
let rawLocRef = null;
let decoder = null;
if (!isPointLocation && !isAreaLocation && hasAttributes) {
    decoder = new LineDecoder();
} else if (isPointLocation && !isAreaLocation) {
    if (!hasAttributes) {
        if (totalBytes == OpenLRBinaryConstants.GEOCOORD_SIZE) {
            decoder = new GeoCoordDecoder();
        } else {
            rawLocRef = new RawInvalidLocRef(id,
                BinaryReturnCode.INVALID_BYTE_SIZE);
        }
    } else {
        if (totalBytes == OpenLRBinaryConstants.POINT_ALONG_LINE_SIZE
            || totalBytes == OpenLRBinaryConstants.POINT_ALONG_LINE_SIZE
            + OpenLRBinaryConstants.POINT_OFFSET_SIZE) {
            decoder = new PointAlongDecoder();
        } else if (totalBytes == OpenLRBinaryConstants.POINT_WITH_ACCESS_SIZE
            || totalBytes == OpenLRBinaryConstants.POINT_WITH_ACCESS_SIZE
            + OpenLRBinaryConstants.POINT_OFFSET_SIZE) {
            decoder = new PoiAccessDecoder();
        } else {
            rawLocRef = new RawInvalidLocRef(id,
                BinaryReturnCode.INVALID_BYTE_SIZE);
        }
    }
} else if (isAreaLocation && !isPointLocation && hasAttributes) {
    // Added by DLR e.V. (RE)
    // CLOSED_LINE
    if (totalBytes >= OpenLRBinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION) {
        decoder = new ClosedLineDecoder();
    } else {
        rawLocRef = new RawInvalidLocRef(id,
            BinaryReturnCode.INVALID_BYTE_SIZE);
    }
} else { // DLR e.V. (RE)
    switch (areaLocationCode) {
        case OpenLRBinaryConstants.AREA_CODE_CIRCLE:
            decoder = new CircleDecoder();
            break;
        case OpenLRBinaryConstants.AREA_CODE_RECTANGLE:
            /* includes case OpenLRBinaryConstants.AREA_CODE_GRID */
            if (totalBytes == OpenLRBinaryConstants.RECTANGLE_SIZE
                || totalBytes == OpenLRBinaryConstants.LARGE_RECTANGLE_SIZE) {
                decoder = new RectangleDecoder();
            } else if (totalBytes == OpenLRBinaryConstants.GRID_SIZE
                || totalBytes == OpenLRBinaryConstants.LARGE_GRID_SIZE) {
                decoder = new GridDecoder();
            } else {
                rawLocRef = new RawInvalidLocRef(id,
                    BinaryReturnCode.INVALID_BYTE_SIZE);
            }
            break;
        case OpenLRBinaryConstants.AREA_CODE_POLYGON:
            if (!hasAttributes
                && totalBytes >= OpenLRBinaryConstants.MIN_BYTES_POLYGON) {
                decoder = new PolygonDecoder();
            } else {
                rawLocRef = new RawInvalidLocRef(id,
                    BinaryReturnCode.INVALID_BYTE_SIZE);
            }
            break;
        default:
            rawLocRef = new RawInvalidLocRef(id,
                BinaryReturnCode.INVALID_HEADER);
    }
}
try {
    if (decoder != null) {
        rawLocRef = decoder.decodeData(id, ibs, totalBytes,
            header.getVer(), binData);
    }
} catch (OpenLRBinaryException e) {
    throw e;
} finally {
    ibs.close();
}
return rawLocRef;
}

};
