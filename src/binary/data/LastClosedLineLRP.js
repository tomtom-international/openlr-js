import BinaryInformation from './BinaryInformation';
import Attr5 from './Attr5';
import Attr6 from './Attr6';

export default class LastClosedLineLRP extends BinaryInformation {
    _attrib5;

    _attrib6;

    static fromValues(attrib5, attrib6) {
        const lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = attrib5;
        lastClosedLineLrp._attrib6 = attrib6;
        return lastClosedLineLrp;
    }

    static fromBitStreamInput(bitStreamInput) {
        const lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = Attr5.fromBitStreamInput(bitStreamInput);
        lastClosedLineLrp._attrib6 = Attr6.fromBitStreamInput(bitStreamInput);
        return lastClosedLineLrp;
    }


    put(bitStreamOutput) {
        this._attrib5.put(bitStreamOutput);
        this._attrib6.put(bitStreamOutput);
    }

    get attrib5() {
        return this._attrib5;
    }

    get attrib6() {
        return this._attrib6;
    }
};
