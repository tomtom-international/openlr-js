import BinaryInformation from './BinaryInformation';

export default class Header extends BinaryInformation {
    static RFU_BITS = 1;

    static AREA_FLAG_BIT0 = 1;

    static AREA_FLAG_BIT1 = 1;

    /** number bits used for area flag */
    //static AREA_FLAG_BITS = Header.AREA_FLAG_BIT0 + Header.AREA_FLAG_BIT1;

    /** number of bits used for attributes flag */
    static ATTR_FLAG_BITS = 1;

    /** number of bits used for poflag */
    static POINT_FLAG_BITS = 1;

    /** number of bits used for version */
    static VERSION_BITS = 3;

    /** The area flag information. */
    _arf;

    /** The attribute flag information. */
    _af;

    /** The poflag information */
    _pf;

    /** The version information. */
    _ver;

    static fromValues(arfValue, afValue, pfValue, verValue) {
        const header = new Header();
        header._arf = arfValue;
        header._af = afValue;
        header._pf = pfValue;
        header._ver = verValue;
        return header;
    }

    static fromBitStreamInput(bitStreamInput) {
        const rfu = bitStreamInput.getBits(Header.RFU_BITS);
        if (rfu != BinaryInformation.RFU_VALUE) {
            throw new Error('Const value mismatch');
        }
        const arf1 = bitStreamInput.getBits(Header.AREA_FLAG_BIT0);
        this._pf = bitStreamInput.getBits(Header.POINT_FLAG_BITS);
        const arf0 = bitStreamInput.getBits(Header.AREA_FLAG_BIT1);
        this._arf = 2 * arf1 + arf0;
        this._af = bitStreamInput.getBits(Header.ATTR_FLAG_BITS);
        this._ver = bitStreamInput.getBits(Header.VERSION_BITS);
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(BinaryInformation.RFU_VALUE, Header.RFU_BITS);
        const arf1 = this._arf / 2;
        const arf0 = this._arf % 2;
        bitStreamOutput.putBits(arf1, Header.AREA_FLAG_BIT1);
        bitStreamOutput.putBits(this._pf, Header.POINT_FLAG_BITS);
        bitStreamOutput.putBits(arf0, Header.AREA_FLAG_BIT0);
        bitStreamOutput.putBits(this._af, Header.ATTR_FLAG_BITS);
        bitStreamOutput.putBits(this._ver, Header.VERSION_BITS);
    }

    get arf() {
        return this._arf;
    }

    get af() {
        return this._af;
    }

    get pf() {
        return this._pf;
    }

    get ver() {
        return this._ver;
    }

    equals(otherHeader) {
        return this._arf == otherHeader._arf
            && this._af == otherHeader._af
            && this._pf == otherHeader._pf
            && this._ver == otherHeader._ver;
    }
};
