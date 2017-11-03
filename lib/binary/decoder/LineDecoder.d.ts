import AbstractDecoder from './AbstractDecoder';
import RawLineLocationReference from '../../data/raw-location-reference/RawLineLocationReference';
import BitStreamInput from '../bit-stream/BitStreamInput';
import RawBinaryData from '../data/RawBinaryData';
export default class LineDecoder extends AbstractDecoder {
    decodeData(id: string, bitStreamInput: BitStreamInput, totalBytes: number, version: number, binaryData: RawBinaryData | null): RawLineLocationReference;
}
