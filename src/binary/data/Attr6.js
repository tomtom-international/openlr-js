import BinaryInformation from './BinaryInformation';

export default class Attr6 extends BinaryInformation {
    /** number of bits used for lfrcnp */
    static get _NR_RFU() {
        return 3;
    }

    /** number of bits used for bear */
    static get _BEAR_BITS() {
        return 5;
    }

    /** The bearing information. */
    _bear;

    static fromValues(bear) {
        const attr6 = new Attr6();
        attr6._bear = bear;
        return attr6;
    }

    static fromBitStreamInput(bitStreamInput) {
        const rfu = bitStreamInput.getBits(Attr6._NR_RFU);
        if (rfu != Attr6._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        const attr6 = new Attr6();
        attr6._bear = bitStreamInput.getBits(Attr6._BEAR_BITS);
        return attr6;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(Attr6._RFU_VALUE, Attr6._NR_RFU);
        bitStreamOutput.putBits(this._bear, Attr6._BEAR_BITS);
    }

    get bear() {
        return this._bear;
    }

    equals(otherAttr6) {
        return this._bear == otherAttr6._bear;
    }
};
