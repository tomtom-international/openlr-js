import AbstractLRP from './AbstractLRP';
import Attr1 from './Attr1';
import Attr4 from './Attr4';

export default class LastLRP extends AbstractLRP {
    /** Number of bits used for coordinates (relative) */
    static _COORD_BITS = 16;

    /** The attrib4 information. */
    _attrib4;

    static fromValues(lon, lat, attrib1, attrib4) {
        const lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._lon = lon;
        lastLrp._lat = lat;
        lastLrp._attrib1 = attrib1;
        lastLrp._attrib4 = attrib4;
        return lastLrp;
    }

    static fromBitStreamInput(bitStreamInput) {
        const lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._read(bitStreamInput);
        lastLrp._attrib1 = Attr1.fromBitStreamInput(bitStreamInput);
        lastLrp._attrib4 = Attr4.fromBitStreamInput(bitStreamInput);
        return lastLrp;
    }

    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib4.put(bitStreamOutput);
    }

    get attrib4() {
        return this._attrib4;
    }
};
