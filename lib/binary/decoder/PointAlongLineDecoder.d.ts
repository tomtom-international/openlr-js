import AbstractDecoder from './AbstractDecoder';
import RawPointAlongLineLocationReference from '../../data/raw-location-reference/RawPointAlongLineLocationReference';
import BitStreamInput from '../bit-stream/BitStreamInput';
import RawBinaryData from '../data/RawBinaryData';
export default class PointAlongLineDecoder extends AbstractDecoder {
    decodeData(id: string, bitStreamInput: BitStreamInput, totalBytes: number, version: number, binaryData: RawBinaryData | null): RawPointAlongLineLocationReference;
}
