import RawLocationReference from './RawLocationReference';
import LocationReferencePoint from '../LocationReferencePoint';
import Offsets from '../Offsets';
export default class RawLineLocationReference extends RawLocationReference {
    protected _points: Array<LocationReferencePoint>;
    protected _offsets: Offsets;
    static fromLineValues(id: string, points: Array<LocationReferencePoint>, offsets: Offsets): RawLineLocationReference;
    getLocationReferencePoints(): LocationReferencePoint[];
    getOffsets(): Offsets;
}
