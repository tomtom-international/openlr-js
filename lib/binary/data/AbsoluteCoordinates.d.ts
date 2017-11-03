import AbstractCoordinate from './AbstractCoordinate';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class AbsoluteCoordinates extends AbstractCoordinate {
    protected static _COORD_BITS: number;
    static fromValues(longitude: number, latitude: number): AbsoluteCoordinates;
    static fromBitStreamInput(bitStreamInput: BitStreamInput): AbsoluteCoordinates;
    put(bitStreamOutput: BitStreamOutput): void;
}
