import BinaryConstants from './BinaryConstants';
import LocationReference from '../data/LocationReference';
import BinaryReturnCode from './BinaryReturnCode';
import LocationType from '../data/LocationType';
import LineEncoder from './encoder/LineEncoder';
import PointAlongLineEncoder from './encoder/PointAlongLineEncoder';
import GeoCoordEncoder from './encoder/GeoCoordEncoder';
export default class BinaryEncoder {
    _checkVersion(version, locationType) {
        let valid = false;
        for (let ver of BinaryEncoder._VERSIONS) {
            if (version === ver) {
                valid = true;
            }
        }
        if (BinaryConstants.POINT_LOCATION_TYPES.has(locationType) && version < BinaryConstants.POINT_LOCATION_VERSION) {
            valid = false;
        }
        if (BinaryConstants.AREA_LOCATION_TYPES.has(locationType) && version < BinaryConstants.AREA_LOCATION_VERSION) {
            valid = false;
        }
        return valid;
    }
    getDataFormatIdentifier() {
        return BinaryConstants.IDENTIFIER;
    }
    getSupportedVersions() {
        return BinaryEncoder._VERSIONS;
    }
    encodeDataFromRLR(rawLocationReference) {
        return this.encodeDataFromRLRAndVersion(rawLocationReference, BinaryEncoder._VERSIONS[BinaryEncoder._VERSIONS.length - 1]);
    }
    encodeDataFromRLRAndVersion(rawLocationReference, version) {
        const locationType = rawLocationReference.getLocationType();
        if (!this._checkVersion(version, locationType)) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_VERSION, locationType, version);
        }
        let encoder = null;
        switch (locationType) {
            case LocationType.GEO_COORDINATES:
                encoder = new GeoCoordEncoder();
                break;
            case LocationType.LINE_LOCATION:
                encoder = new LineEncoder();
                break;
            case LocationType.POI_WITH_ACCESS_POINT:
                throw new Error('PoiAccessEncoder not implemented');
            case LocationType.POINT_ALONG_LINE:
                encoder = new PointAlongLineEncoder();
                break;
            case LocationType.CIRCLE:
                throw new Error('CircleEncoder not implemented');
            case LocationType.RECTANGLE:
                throw new Error('RectangleEncoder not implemented');
            case LocationType.GRID:
                throw new Error('GridEncoder not implemented');
            case LocationType.POLYGON:
                throw new Error('PolygonEncoder not implemented');
            case LocationType.CLOSED_LINE:
                throw new Error('ClosedLineEncoder not implemented');
            case LocationType.UNKNOWN:
            default:
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.UNKNOWN_LOCATION_TYPE, locationType, version);
        }
        return encoder.encodeData(rawLocationReference, version);
    }
}
BinaryEncoder._VERSIONS = [2, 3];
;
//# sourceMappingURL=BinaryEncoder.js.map