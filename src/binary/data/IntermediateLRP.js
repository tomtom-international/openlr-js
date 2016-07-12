import AbstractLRP from './AbstractLRP';
import Attr1 from './Attr1';
import Attr2 from './Attr2';
import Attr3 from './Attr3';

export default class IntermediateLRP extends AbstractLRP {
    /** Number of bits used for coordinates (relative) */
    static _COORD_BITS = 16;

    /** The attrib2. */
    _attrib2;

    /** The attrib3. */
    _attrib3;

    static fromValues(lon, lat, attrib1, attrib2, attrib3) {
        const intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._lon = lon;
        intermediateLrp._lat = lat;
        intermediateLrp._attrib1 = attrib1;
        intermediateLrp._attrib2 = attrib2;
        intermediateLrp._attrib3 = attrib3;
    }

    static fromBitStreamInput(bitStreamInput) {
        const intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._read(bitStreamInput);
        intermediateLrp._attrib1 = Attr1.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib2 = Attr2.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib3 = Attr3.fromBitStreamInput(bitStreamInput);
        return intermediateLrp;
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

    equals(otherIntermediateLrp) {
        return this._lon == otherIntermediateLrp._lon
            && this._lat == otherIntermediateLrp._lat
            && this._attrib1.equals(otherIntermediateLrp._attrib1)
            && this._attrib2.equals(otherIntermediateLrp._attrib2)
            && this._attrib3.equals(otherIntermediateLrp._attrib3);
    }
};
