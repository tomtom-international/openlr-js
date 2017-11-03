export default class RawLocationReference {
    getId() {
        return this._id;
    }
    hasId() {
        return this._id !== null;
    }
    getLocationType() {
        return this._locationType;
    }
    getReturnCode() {
        return this._returnCode;
    }
    isValid() {
        return this._returnCode === null;
    }
    getLocationReferencePoints() {
        return null;
    }
    getOffsets() {
        return null;
    }
    getGeoCoordinates() {
        return null;
    }
    getSideOfRoad() {
        return null;
    }
    getOrientation() {
        return null;
    }
    getCornerPoints() {
        return null;
    }
    getLowerLeftPoint() {
        return null;
    }
    getUpperRightPoint() {
        return null;
    }
    getCenterPoint() {
        return null;
    }
    getRadius() {
        return -1;
    }
    getNumberOfColumns() {
        return -1;
    }
    getNumberOfRows() {
        return -1;
    }
}
;
//# sourceMappingURL=RawLocationReference.js.map