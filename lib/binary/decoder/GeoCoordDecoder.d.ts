import AbstractDecoder from './AbstractDecoder';
import RawGeoCoordLocationReference from '../../data/raw-location-reference/RawGeoCoordLocationReference';
import BitStreamInput from '../bit-stream/BitStreamInput';
import RawBinaryData from '../data/RawBinaryData';
export default class GeoCoordDecoder extends AbstractDecoder {
    decodeData(id: string, bitStreamInput: BitStreamInput, totalBytes: number, version: number, binaryData: RawBinaryData | null): RawGeoCoordLocationReference;
}
