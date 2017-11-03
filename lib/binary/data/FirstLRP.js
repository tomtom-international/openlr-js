import AbstractLRP from './AbstractLRP';
import Attr1 from './Attr1';
import Attr2 from './Attr2';
import Attr3 from './Attr3';
export default class FirstLRP extends AbstractLRP {
    static fromValues(lon, lat, attrib1, attrib2, attrib3) {
        const firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._lon = lon;
        firstLrp._lat = lat;
        firstLrp._attrib1 = attrib1;
        firstLrp._attrib2 = attrib2;
        firstLrp._attrib3 = attrib3;
        return firstLrp;
    }
    static fromBitStreamInput(bitStreamInput) {
        const firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._read(bitStreamInput);
        firstLrp._attrib1 = Attr1.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib2 = Attr2.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib3 = Attr3.fromBitStreamInput(bitStreamInput);
        return firstLrp;
    }
    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    }
    get attrib2() {
        return this._attrib2;
    }
    get attrib3() {
        return this._attrib3;
    }
}
FirstLRP._COORD_BITS = 24;
;
//# sourceMappingURL=FirstLRP.js.map