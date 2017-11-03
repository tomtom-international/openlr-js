import RawPointLocationReference from './RawPointLocationReference';
import LocationReferencePoint from '../LocationReferencePoint';
import Offsets from '../Offsets';
import SideOfRoad from '../location/data/SideOfRoad';
import Orientation from '../location/data/Orientation';
export default class RawPointAlongLineLocationReference extends RawPointLocationReference {
    static fromPointAlongLineValues(id: string, lrp1: LocationReferencePoint, lrp2: LocationReferencePoint, offsets: Offsets, sideOfRoad: SideOfRoad, orientation: Orientation): RawPointAlongLineLocationReference;
}
