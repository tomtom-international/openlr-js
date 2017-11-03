export default class LocationReferencePoint {
    static fromValues(sequenceNumber, frc, fow, longitude, latitude, bearing, distanceToNext, lfrcnp, isLast) {
        const lrp = new LocationReferencePoint();
        lrp._bearing = bearing;
        lrp._distanceToNext = distanceToNext;
        lrp._frc = frc;
        lrp._fow = fow;
        lrp._lfrcnp = lfrcnp;
        lrp._isLast = isLast;
        lrp._longitude = longitude;
        lrp._latitude = latitude;
        lrp._sequenceNumber = sequenceNumber;
        return lrp;
    }
    static fromGeoCoordinate(coord) {
        const lrp = new LocationReferencePoint();
        lrp._longitude = coord.getLongitudeDeg();
        lrp._latitude = coord.getLatitudeDeg();
        lrp._frc = null;
        lrp._fow = null;
        lrp._bearing = 0;
        lrp._lfrcnp = null;
        lrp._isLast = false;
        lrp._distanceToNext = 0;
        lrp._sequenceNumber = 1;
        return lrp;
    }
    getLongitudeDeg() {
        return this._longitude;
    }
    getLatitudeDeg() {
        return this._latitude;
    }
    getBearing() {
        return this._bearing;
    }
    getDistanceToNext() {
        return this._distanceToNext;
    }
    getFRC() {
        return this._frc;
    }
    getFOW() {
        return this._fow;
    }
    getLfrc() {
        return this._lfrcnp;
    }
    isLastLRP() {
        return this._isLast;
    }
}
;
//# sourceMappingURL=LocationReferencePoint.js.map