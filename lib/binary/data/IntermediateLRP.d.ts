import AbstractLRP from './AbstractLRP';
import Attr1 from './Attr1';
import Attr2 from './Attr2';
import Attr3 from './Attr3';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class IntermediateLRP extends AbstractLRP {
    protected static _COORD_BITS: number;
    protected _attrib2: Attr2;
    protected _attrib3: Attr3;
    static fromValues(lon: number, lat: number, attrib1: Attr1, attrib2: Attr2, attrib3: Attr3): IntermediateLRP;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): IntermediateLRP;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly attrib2: Attr2;
    readonly attrib3: Attr3;
}
