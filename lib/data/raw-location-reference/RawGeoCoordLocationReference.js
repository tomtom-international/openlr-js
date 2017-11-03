import RawPointLocationReference from './RawPointLocationReference';
import LocationType from '../LocationType';
export default class RawGeoCoordLocationReference extends RawPointLocationReference {
    static fromGeoCoordValues(id, geoCoord) {
        const rawGeoCoordLocationReference = new RawGeoCoordLocationReference();
        rawGeoCoordLocationReference._id = id;
        rawGeoCoordLocationReference._locationType = LocationType.GEO_COORDINATES;
        rawGeoCoordLocationReference._returnCode = null;
        rawGeoCoordLocationReference._geoCoord = geoCoord;
        return rawGeoCoordLocationReference;
    }
    getGeoCoordinates() {
        return this._geoCoord;
    }
}
;
//# sourceMappingURL=RawGeoCoordLocationReference.js.map