import Header from './Header';
import FirstLRP from './FirstLRP';
import Offset from './Offset';
import LastLRP from './LastLRP';
import LastClosedLineLRP from './LastClosedLineLRP';
import IntermediateLRP from './IntermediateLRP';
import AbsoluteCoordinates from './AbsoluteCoordinates';
import AbstractCoordinate from './AbstractCoordinate';
import RelativeCoordinates from './RelativeCoordinates';
export default class RawBinaryData {
    header: Header;
    firstLRP: FirstLRP;
    posOffset: Offset | null;
    negOffset: Offset | null;
    lastLRP: LastLRP;
    lastClosedLineLRP: LastClosedLineLRP;
    intermediates: Array<IntermediateLRP>;
    absCoord: AbsoluteCoordinates;
    relCoord: RelativeCoordinates;
    absCenter: AbsoluteCoordinates;
    absCoordUR: AbstractCoordinate;
    absCoordLL: AbsoluteCoordinates;
}
