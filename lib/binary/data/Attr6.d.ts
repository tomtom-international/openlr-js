import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class Attr6 extends BinaryInformation {
    protected static _NR_RFU: number;
    protected static _BEAR_BITS: number;
    protected _bear: number;
    static fromValues(bear: number): Attr6;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Attr6;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly bear: number;
}
