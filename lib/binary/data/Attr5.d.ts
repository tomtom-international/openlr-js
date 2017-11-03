import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class Attr5 extends BinaryInformation {
    protected static _NR_RFU: number;
    protected static _FRC_BITS: number;
    protected static _FOW_BITS: number;
    protected _frc: number;
    protected _fow: number;
    static fromValues(frc: number, fow: number): Attr5;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Attr5;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly frc: number;
    readonly fow: number;
}
