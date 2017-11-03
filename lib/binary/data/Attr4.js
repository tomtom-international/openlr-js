import BinaryInformation from './BinaryInformation';
export default class Attr4 extends BinaryInformation {
    static fromValues(pOffsetF, nOffsetF, bear) {
        const attr4 = new Attr4();
        attr4._pOffsetF = pOffsetF;
        attr4._nOffsetF = nOffsetF;
        attr4._bear = bear;
        return attr4;
    }
    static fromBitStreamInput(bitStreamInput) {
        const rfu = bitStreamInput.getBits(Attr4._RFU_BITS);
        if (rfu !== Attr4._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        const attr4 = new Attr4();
        attr4._pOffsetF = bitStreamInput.getBits(Attr4._POFFF_BITS);
        attr4._nOffsetF = bitStreamInput.getBits(Attr4._NOFFF_BITS);
        attr4._bear = bitStreamInput.getBits(Attr4._BEAR_BITS);
        return attr4;
    }
    put(bitStreamOutput) {
        bitStreamOutput.putBits(Attr4._RFU_VALUE, Attr4._RFU_BITS);
        bitStreamOutput.putBits(this._pOffsetF, Attr4._POFFF_BITS);
        bitStreamOutput.putBits(this._nOffsetF, Attr4._NOFFF_BITS);
        bitStreamOutput.putBits(this._bear, Attr4._BEAR_BITS);
    }
    get pOffsetF() {
        return this._pOffsetF;
    }
    get nOffsetF() {
        return this._nOffsetF;
    }
    get bear() {
        return this._bear;
    }
}
Attr4._RFU_BITS = 1;
Attr4._POFFF_BITS = 1;
Attr4._NOFFF_BITS = 1;
Attr4._BEAR_BITS = 5;
;
//# sourceMappingURL=Attr4.js.map