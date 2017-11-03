import AbsoluteCoordinates from '../data/AbsoluteCoordinates';
import AbstractDecoder from './AbstractDecoder';
import GeoCoordinates from '../../map/GeoCoordinates';
import RawGeoCoordLocationReference from '../../data/raw-location-reference/RawGeoCoordLocationReference';
export default class GeoCoordDecoder extends AbstractDecoder {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        const absCoord = AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
        const geoCoord = GeoCoordinates.fromValues(this._calculate32BitRepresentation(absCoord.lon), this._calculate32BitRepresentation(absCoord.lat));
        const rawLocRef = RawGeoCoordLocationReference.fromGeoCoordValues(id, geoCoord);
        if (binaryData !== null) {
            binaryData.absCoord = absCoord;
        }
        return rawLocRef;
    }
}
;
//# sourceMappingURL=GeoCoordDecoder.js.map