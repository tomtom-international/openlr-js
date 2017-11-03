import AbstractCoordinate from './AbstractCoordinate';
import Attr1 from './Attr1';
export default class AbstractLRP extends AbstractCoordinate {
    protected _attrib1: Attr1;
    static fromBitCount(countBits: number): AbstractLRP;
    readonly attrib1: Attr1;
}
