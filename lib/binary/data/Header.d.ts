import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class Header extends BinaryInformation {
    protected static _RFU_BITS: number;
    protected static _AREA_FLAG_BIT0: number;
    protected static _AREA_FLAG_BIT1: number;
    protected static _ATTR_FLAG_BITS: number;
    protected static _POINT_FLAG_BITS: number;
    protected static _VERSION_BITS: number;
    protected _arf: number;
    protected _af: number;
    protected _pf: number;
    protected _ver: number;
    static fromValues(arfValue: number, afValue: number, pfValue: number, verValue: number): Header;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): Header;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly arf: number;
    readonly af: number;
    readonly pf: number;
    readonly ver: number;
}
