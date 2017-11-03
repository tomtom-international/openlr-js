import AbstractCoordinate from './AbstractCoordinate';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class RelativeCoordinates extends AbstractCoordinate {
    protected static _COORD_BITS: number;
    static fromValues(longitude: number, latitude: number): RelativeCoordinates;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): RelativeCoordinates;
    put(bitStreamOutput: BitStreamOutput): void;
}
