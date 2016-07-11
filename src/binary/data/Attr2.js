import BinaryInformation from './BinaryInformation';

export default class Attr2 extends BinaryInformation {
    /** Number of bits used for lfrcnp */
    static _LFRCNP_BITS = 3;

    /** Number of bits used for bear */
    static _BEAR_BITS = 5;

    /** The lowest functional road class information. */
    _lfrcnp;

    /** The bearing information. */
    _bear;

    static fromValues(lfrcnp, bear) {
        const attr2 = new Attr2();
        attr2._lfrcnp = lfrcnp;
        attr2._bear = bear;
        return attr2;
    }

    static fromBitStreamInput(bitStreamInput) {
        const attr2 = new Attr2();
        attr2._lfrcnp = bitStreamInput.getBits(Attr2._LFRCNP_BITS);
        attr2._bear = bitStreamInput.getBits(Attr2._BEAR_BITS);
        return attr2;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(this._lfrcnp, Attr2._LFRCNP_BITS);
        bitStreamOutput.putBits(this._bear, Attr2._BEAR_BITS);
    }

    get lfrcnp() {
        return this._lfrcnp;
    }

    get bear() {
        return this._bear;
    }

    equals(otherAttr2) {
        return this._lfrcnp == otherAttr2._lfrcnp
            && this._bear == otherAttr2._bear;
    }
};
