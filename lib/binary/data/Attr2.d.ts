import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class Attr2 extends BinaryInformation {
    protected static _LFRCNP_BITS: number;
    protected static _BEAR_BITS: number;
    protected _lfrcnp: number;
    protected _bear: number;
    static fromValues(lfrcnp: number, bear: number): Attr2;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Attr2;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly lfrcnp: number;
    readonly bear: number;
}
