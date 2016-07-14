import RawLocationReference from './RawLocationReference';
import LocationType from '../LocationType';

export default class RawLineLocationReference extends RawLocationReference {
    /** The points. */
    _points;

    /** The offsets. */
    _offsets;

    static fromValues(id, points, offsets) {
        const rawLineLocationReference = new RawLineLocationReference();
        rawLineLocationReference._id = id;
        rawLineLocationReference._locationType = LocationType.LINE_LOCATION;
        rawLineLocationReference._returnCode = null;
        rawLineLocationReference._points = points;
        rawLineLocationReference._offsets = offsets;
        return rawLineLocationReference;
    }

    get points() {
        return this._points;
    }

    get offsets() {
        return this._offsets;
    }
};
