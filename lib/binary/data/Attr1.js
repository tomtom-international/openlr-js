import BinaryInformation from './BinaryInformation';
export default class Attr1 extends BinaryInformation {
    static fromValues(frc, fow, sideOrOrientation) {
        const attr1 = new Attr1();
        attr1._frc = frc;
        attr1._fow = fow;
        attr1._sideOrOrientation = sideOrOrientation;
        return attr1;
    }
    static fromBitStreamInput(bitStreamInput) {
        const attr1 = new Attr1();
        attr1._sideOrOrientation = bitStreamInput.getBits(Attr1._SIDE_OR_ORIENTATION_BITS);
        attr1._frc = bitStreamInput.getBits(Attr1._FRC_BITS);
        attr1._fow = bitStreamInput.getBits(Attr1._FOW_BITS);
        return attr1;
    }
    put(bitStreamOutput) {
        bitStreamOutput.putBits(this._sideOrOrientation, Attr1._SIDE_OR_ORIENTATION_BITS);
        bitStreamOutput.putBits(this._frc, Attr1._FRC_BITS);
        bitStreamOutput.putBits(this._fow, Attr1._FOW_BITS);
    }
    get frc() {
        return this._frc;
    }
    get fow() {
        return this._fow;
    }
    get sideOrOrientation() {
        return this._sideOrOrientation;
    }
}
Attr1._SIDE_OR_ORIENTATION_BITS = 2;
Attr1._FRC_BITS = 3;
Attr1._FOW_BITS = 3;
;
//# sourceMappingURL=Attr1.js.map