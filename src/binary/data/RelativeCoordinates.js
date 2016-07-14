import AbstractCoordinate from './AbstractCoordinate';

export default class RelativeCoordinates extends AbstractCoordinate {
    /** Number of bits used for coordinates (relative) */
    static _COORD_BITS = 16;

    static fromValues(longitude, latitude) {
        const relativeCoordinates = new RelativeCoordinates();
        relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
        relativeCoordinates._lon = longitude;
        relativeCoordinates._lat = latitude;
        return relativeCoordinates;
    }

    static fromBitStreamInput(bitStreamInput) {
        const relativeCoordinates = new RelativeCoordinates();
        relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
        relativeCoordinates._read(bitStreamInput);
        return relativeCoordinates;
    }

    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    }
};
