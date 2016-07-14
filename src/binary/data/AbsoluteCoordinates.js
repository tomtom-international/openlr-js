import AbstractCoordinate from './AbstractCoordinate';

export default class AbsoluteCoordinates extends AbstractCoordinate {
    /** Number of bits used for coordinate (absolute) */
    static _COORD_BITS = 24;

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
};
