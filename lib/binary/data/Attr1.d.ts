import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class Attr1 extends BinaryInformation {
    protected static _SIDE_OR_ORIENTATION_BITS: number;
    protected static _FRC_BITS: number;
    protected static _FOW_BITS: number;
    protected _frc: number;
    protected _fow: number;
    protected _sideOrOrientation: number;
    static fromValues(frc: number, fow: number, sideOrOrientation: number): Attr1;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Attr1;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly frc: number;
    readonly fow: number;
    readonly sideOrOrientation: number;
}
