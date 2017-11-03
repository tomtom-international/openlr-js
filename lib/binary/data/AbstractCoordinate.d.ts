import BinaryInformation from './BinaryInformation';
import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class AbstractCoordinate extends BinaryInformation {
    protected _lon: number;
    protected _lat: number;
    protected _coordBits: number;
    static fromBitCount(countBits: number): AbstractCoordinate;
    readonly lon: number;
    readonly lat: number;
    protected _read(bitStreamInput: BitStreamInput): void;
    putCoordinates(bitStreamOutput: BitStreamOutput): void;
}
