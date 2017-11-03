import AbstractCoordinate from './AbstractCoordinate';
export default class AbsoluteCoordinates extends AbstractCoordinate {
    static fromValues(longitude, latitude) {
        const absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._lon = longitude;
        absoluteCoordinates._lat = latitude;
        return absoluteCoordinates;
    }
    static fromBitStreamInput(bitStreamInput) {
        const absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._read(bitStreamInput);
        return absoluteCoordinates;
    }
    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    }
}
AbsoluteCoordinates._COORD_BITS = 24;
;
//# sourceMappingURL=AbsoluteCoordinates.js.map