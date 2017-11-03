import SideOfRoad from '../../data/location/data/SideOfRoad';
import Orientation from '../../data/location/data/Orientation';
import LocationReferencePoint from '../../data/LocationReferencePoint';
import BitStreamInput from '../bit-stream/BitStreamInput';
import RawBinaryData from '../data/RawBinaryData';
import Attr1 from '../data/Attr1';
import FirstLRP from '../data/FirstLRP';
import IntermediateLRP from '../data/IntermediateLRP';
import LastClosedLineLRP from '../data/LastClosedLineLRP';
import LastLRP from '../data/LastLRP';
export default class AbstractDecoder {
    decodeData(id: string, bitStreamInput: BitStreamInput, totalBytes: number, version: number, binaryData: RawBinaryData | null): void;
    protected _resolveSideOfRoad(attrib1: Attr1): SideOfRoad;
    protected _resolveOrientation(attrib1: Attr1): Orientation;
    protected _calculateRelativeDistance(offset: number): number;
    protected _createFirstLRP(seqNr: number, firstLRP: FirstLRP): LocationReferencePoint;
    protected _createIntermediateLRPFromLatitudeLongitude(seqNr: number, intermediateLRP: IntermediateLRP, prevLon: number, prevLat: number): LocationReferencePoint;
    protected _createIntermediateLRPFromFirstAndLast(seqNr: number, lastClosedLineLRP: LastClosedLineLRP, firstLRP: FirstLRP): LocationReferencePoint;
    protected _createLastLRP(seqNr: number, lastLRP: LastLRP, prevLon: number, prevLat: number): LocationReferencePoint;
    protected _calculate32BitRepresentation(val: number): number;
    protected _calculateBearingEstimate(interval: number): number;
    protected _calculateDistanceEstimate(interval: number): number;
    protected _get24BitRepresentation(val: number): number;
}
