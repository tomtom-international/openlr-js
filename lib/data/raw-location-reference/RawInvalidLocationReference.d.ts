import RawLocationReference from './RawLocationReference';
import LocationType from '../LocationType';
export default class RawInvalidLocationReference extends RawLocationReference {
    static fromIdAndStatusCode(id: string, error: number): RawInvalidLocationReference;
    static fromInvalidValues(id: string, error: number, locationType: LocationType): RawInvalidLocationReference;
}
