import AbstractCoordinate from './AbstractCoordinate';

export default class AbstractLRP extends AbstractCoordinate {
    _attrib1;

    static fromBitCount(countBits) {
        const abstractLrp = new AbstractLRP();
        abstractLrp._coordBits = countBits;
    }

    get attrib1() {
        return this._attrib1;
    }
};
