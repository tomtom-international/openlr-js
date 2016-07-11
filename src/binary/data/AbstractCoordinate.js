import BinaryInformation from './BinaryInformation';

export default class AbstractCoordinate extends BinaryInformation {
    _lon;

    _lat;

    _coordBits;

    static fromBitCount(countBits) {
        const abstractCoordinate = new AbstractCoordinate();
        abstractCoordinate._coordBits = countBits;
    }

    get lon() {
        return this._lon;
    }

    get lat() {
        return this._lat;
    }

    _read(bitStreamInput) {
        this._lon = bitStreamInput.getSignedBits(this._coordBits);
        this._lat = bitStreamInput.getSignedBits(this._coordBits);
    }


    putCoordinates(bitStreamOutput) {
        bitStreamOutput.putBits(this._lon, this._coordBits);
        bitStreamOutput.putBits(this._lat, this._coordBits);
    }
};
