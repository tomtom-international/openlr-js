import RawLocationReference from './RawLocationReference';
import LocationReferencePoint from '../LocationReferencePoint';
import Offsets from '../Offsets';
import SideOfRoad from '../location/data/SideOfRoad';
import Orientation from '../location/data/Orientation';
import LocationType from '../LocationType';
import GeoCoordinates from '../../map/GeoCoordinates';

export default class RawPolygonLocationReference extends RawLocationReference {

    /** The corner list. */
    protected _corners: Array<GeoCoordinates>;

    public static fromPolygonValues(id: string, corners: Array<GeoCoordinates>) {
        const rawPolygonLocationReference = new RawPolygonLocationReference();
        rawPolygonLocationReference._id = id;
        rawPolygonLocationReference._locationType = LocationType.POLYGON;
        rawPolygonLocationReference._returnCode = null;
        rawPolygonLocationReference._corners = corners;
        return rawPolygonLocationReference;
    }

	public getCornerPoints() {
		return this._corners;
	}
}
