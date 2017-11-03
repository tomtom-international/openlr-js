import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class Attr3 extends BinaryInformation {
    protected static _DNP_BITS: number;
    protected _dnp: number;
    static fromValues(dnp: number): Attr3;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Attr3;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly dnp: number;
}
