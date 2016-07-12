import BinaryInformation from './BinaryInformation';

export default class Attr3 extends BinaryInformation {
    /** Number of bits used for dnp */
    static _DNP_BITS = 8;

    /** The distance to next point information. */
    _dnp;


    static fromValues(dnp) {
        const attr3 = new Attr3();
        attr3._dnp = dnp;
        return attr3;
    }

    static fromBitStreamInput(bitStreamInput) {
        const attr3 = new Attr3();
        attr3._dnp = bitStreamInput.getBits(Attr3._DNP_BITS);
        return attr3;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(this._dnp, Attr3._DNP_BITS);
    }

    get dnp() {
        return this._dnp;
    }

    equals(otherAttr3) {
        return this._dnp == otherAttr3._dnp;
    }
};
