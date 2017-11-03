import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class Attr4 extends BinaryInformation {
    protected static _RFU_BITS: number;
    protected static _POFFF_BITS: number;
    protected static _NOFFF_BITS: number;
    protected static _BEAR_BITS: number;
    protected _pOffsetF: number;
    protected _nOffsetF: number;
    protected _bear: number;
    static fromValues(pOffsetF: number, nOffsetF: number, bear: number): Attr4;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Attr4;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly pOffsetF: number;
    readonly nOffsetF: number;
    readonly bear: number;
}
