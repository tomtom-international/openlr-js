import RawPointLocationReference from './RawPointLocationReference';
import GeoCoordinates from '../../map/GeoCoordinates';
export default class RawGeoCoordLocationReference extends RawPointLocationReference {
    protected _geoCoord: GeoCoordinates;
    static fromGeoCoordValues(id: string, geoCoord: GeoCoordinates): RawGeoCoordLocationReference;
    getGeoCoordinates(): GeoCoordinates;
}
