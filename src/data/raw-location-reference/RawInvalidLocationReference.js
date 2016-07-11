import RawLocationReference from './RawLocationReference';
import LocationType from '../LocationType';

export default class RawInvalidLocationReference extends RawLocationReference {
    static fromIdAndStatusCode(id, error) {
        const rawInvalidLocationReference = new RawInvalidLocationReference();
        rawInvalidLocationReference._id = id;
        rawInvalidLocationReference._locationType = LocationType.UNKNOWN;
        rawInvalidLocationReference._returnCode = error;
    }

    static fromValues(id, error, locationType) {
        const rawInvalidLocationReference = new RawInvalidLocationReference();
        rawInvalidLocationReference._id = id;
        rawInvalidLocationReference._locationType = locationType;
        rawInvalidLocationReference._returnCode = error;
    }
};
