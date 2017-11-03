import AbstractEncoder from './AbstractEncoder';
import LocationReference from '../../data/LocationReference';
import BinaryReturnCode from '../BinaryReturnCode';
import LocationType from '../../data/LocationType';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class GeoCoordEncoder extends AbstractEncoder {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null) {
            return LocationReference.fromValues('', BinaryReturnCode.MISSING_DATA, LocationType.GEO_COORDINATES, version);
        }
        else {
            const coord = rawLocationReference.getGeoCoordinates();
            if (coord === null) {
                return LocationReference.fromValues('', BinaryReturnCode.MISSING_DATA, LocationType.GEO_COORDINATES, version);
            }
            else if (version < 3) {
                return LocationReference.fromValues('', BinaryReturnCode.INVALID_VERSION, LocationType.GEO_COORDINATES, version);
            }
            else {
                return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryGeoCoordLocation(coord, version));
            }
        }
    }
    _generateBinaryGeoCoordLocation(coord, version) {
        const header = this._generateHeader(version, LocationType.GEO_COORDINATES, false);
        const absCoord = this._generateAbsCoord(coord);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        absCoord.put(out);
        return out.getData();
    }
}
;
//# sourceMappingURL=GeoCoordEncoder.js.map