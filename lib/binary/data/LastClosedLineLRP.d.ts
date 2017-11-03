import BinaryInformation from './BinaryInformation';
import Attr5 from './Attr5';
import Attr6 from './Attr6';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class LastClosedLineLRP extends BinaryInformation {
    protected _attrib5: Attr5;
    protected _attrib6: Attr6;
    static fromValues(attrib5: Attr5, attrib6: Attr6): LastClosedLineLRP;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): LastClosedLineLRP;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly attrib5: Attr5;
    readonly attrib6: Attr6;
}
