import RawLocationReference from './RawLocationReference';
import LocationReferencePoint from '../LocationReferencePoint';
import Offsets from '../Offsets';
import SideOfRoad from '../location/data/SideOfRoad';
import Orientation from '../location/data/Orientation';
import LocationType from '../LocationType';
export default class RawPointLocationReference extends RawLocationReference {
    protected _points: Array<LocationReferencePoint>;
    protected _offsets: Offsets;
    protected _orientation: Orientation;
    protected _sideOfRoad: SideOfRoad;
    static fromPointValues(id: string, locationType: LocationType, lrp1: LocationReferencePoint, lrp2: LocationReferencePoint, offsets: Offsets, sideOfRoad: SideOfRoad, orientation: Orientation): RawPointLocationReference;
    getLocationReferencePoints(): LocationReferencePoint[];
    getOffsets(): Offsets;
    getOrientation(): Orientation;
    getSideOfRoad(): SideOfRoad;
}
