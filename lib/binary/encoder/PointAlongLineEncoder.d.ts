/// <reference types="node" />
import AbstractEncoder from './AbstractEncoder';
import LocationReference from '../../data/LocationReference';
import RawLocationReference from '../../data/raw-location-reference/RawLocationReference';
import LocationReferencePoint from '../../data/LocationReferencePoint';
import Offsets from '../../data/Offsets';
import SideOfRoad from '../../data/location/data/SideOfRoad';
import Orientation from '../../data/location/data/Orientation';
export default class PointAlongLineEncoder extends AbstractEncoder {
    encodeData(rawLocationReference: RawLocationReference, version: number): LocationReference;
    protected _generateBinaryPointAlongLineLocation(startLRP: LocationReferencePoint, endLRP: LocationReferencePoint, offsets: Offsets, sideOfRoad: SideOfRoad, orientation: Orientation, version: number): Buffer;
}
