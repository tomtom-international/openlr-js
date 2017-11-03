import AbstractCoordinate from './AbstractCoordinate';
export default class AbstractLRP extends AbstractCoordinate {
    static fromBitCount(countBits) {
        const abstractLrp = new AbstractLRP();
        abstractLrp._coordBits = countBits;
        return abstractLrp;
    }
    get attrib1() {
        return this._attrib1;
    }
}
;
//# sourceMappingURL=AbstractLRP.js.map