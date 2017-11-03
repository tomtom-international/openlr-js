import RawLocationReference from './RawLocationReference';
export default class RawPointLocationReference extends RawLocationReference {
    static fromPointValues(id, locationType, lrp1, lrp2, offsets, sideOfRoad, orientation) {
        const rawPointLocationReference = new RawPointLocationReference();
        rawPointLocationReference._id = id;
        rawPointLocationReference._locationType = locationType;
        rawPointLocationReference._returnCode = null;
        rawPointLocationReference._points = [lrp1, lrp2];
        rawPointLocationReference._offsets = offsets;
        rawPointLocationReference._orientation = orientation;
        rawPointLocationReference._sideOfRoad = sideOfRoad;
        return rawPointLocationReference;
    }
    getLocationReferencePoints() {
        return this._points;
    }
    getOffsets() {
        return this._offsets;
    }
    getOrientation() {
        return this._orientation;
    }
    getSideOfRoad() {
        return this._sideOfRoad;
    }
}
;
//# sourceMappingURL=RawPointLocationReference.js.map