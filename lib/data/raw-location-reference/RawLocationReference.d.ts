import LocationType from '../LocationType';
import GeoCoordinates from '../../map/GeoCoordinates';
import LocationReferencePoint from '../LocationReferencePoint';
import Offsets from '../Offsets';
import SideOfRoad from '../location/data/SideOfRoad';
import Orientation from '../location/data/Orientation';
export default class RawLocationReference {
    protected _locationType: LocationType;
    protected _id: string;
    protected _returnCode: number | null;
    getId(): string;
    hasId(): boolean;
    getLocationType(): LocationType;
    getReturnCode(): number | null;
    isValid(): boolean;
    getLocationReferencePoints(): Array<LocationReferencePoint> | null;
    getOffsets(): Offsets | null;
    getGeoCoordinates(): GeoCoordinates | null;
    getSideOfRoad(): SideOfRoad | null;
    getOrientation(): Orientation | null;
    getCornerPoints(): Array<GeoCoordinates> | null;
    getLowerLeftPoint(): GeoCoordinates | null;
    getUpperRightPoint(): GeoCoordinates | null;
    getCenterPoint(): GeoCoordinates | null;
    getRadius(): number;
    getNumberOfColumns(): number;
    getNumberOfRows(): number;
}
