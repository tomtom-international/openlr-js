import AbstractLRP from './AbstractLRP';
import Attr1 from './Attr1';
import Attr4 from './Attr4';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class LastLRP extends AbstractLRP {
    protected static _COORD_BITS: number;
    protected _attrib4: Attr4;
    static fromValues(lon: number, lat: number, attrib1: Attr1, attrib4: Attr4): LastLRP;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): LastLRP;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly attrib4: Attr4;
}
