export default class RawLocationReference {
    _locationType;

    _id;

    _returnCode;

    static fromValues(id, locationType, returnCode) {
        const rawLocationReference = new RawLocationReference();
        rawLocationReference._id = id;
        rawLocationReference._locationType = locationType;
        rawLocationReference._returnCode = returnCode;
        return rawLocationReference;
    }

    static fromIdAndLocationType(id, locationType) {
        const rawLocationReference = new RawLocationReference();
        rawLocationReference._id = id;
        rawLocationReference._locationType = locationType;
        rawLocationReference._returnCode = null;
        return rawLocationReference;
    }

    get id() {
        return this._id;
    }

    hasId() {
        return !!this._id;
    }

    get locationType() {
        return this._locationType;
    }

    get returnCode() {
        return this._returnCode;
    }

    isValid() {
        return !this._returnCode;
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
};
