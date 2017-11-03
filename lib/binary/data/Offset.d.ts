import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class Offset extends BinaryInformation {
    protected static _OFFSET_BITS: number;
    protected _offset: number;
    static fromValues(offsetValue: number): Offset;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Offset;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly offset: number;
}
