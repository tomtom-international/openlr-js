import RawPointLocationReference from './RawPointLocationReference';
import LocationType from '../LocationType';
export default class RawPointAlongLineLocationReference extends RawPointLocationReference {
    static fromPointAlongLineValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation) {
        const rawPointAlongLineLocationReference = new RawPointAlongLineLocationReference();
        rawPointAlongLineLocationReference._id = id;
        rawPointAlongLineLocationReference._locationType = LocationType.POINT_ALONG_LINE;
        rawPointAlongLineLocationReference._returnCode = null;
        rawPointAlongLineLocationReference._points = [lrp1, lrp2];
        rawPointAlongLineLocationReference._offsets = offsets;
        rawPointAlongLineLocationReference._orientation = orientation;
        rawPointAlongLineLocationReference._sideOfRoad = sideOfRoad;
        return rawPointAlongLineLocationReference;
    }
}
;
//# sourceMappingURL=RawPointAlongLineLocationReference.js.map