/// <reference types="node" />
import RawInvalidLocationReference from '../data/raw-location-reference/RawInvalidLocationReference';
import Header from './data/Header';
import RawBinaryData from './data/RawBinaryData';
import LocationReference from '../data/LocationReference';
export default class BinaryDecoder {
    protected static _VERSIONS: number[];
    protected _checkVersion(header: Header): boolean;
    protected _parseBinaryData(id: string, data: Buffer, binaryData: RawBinaryData | null): RawInvalidLocationReference | null;
    decodeData(locationReference: LocationReference): RawInvalidLocationReference | null;
    getDataFormatIdentifier(): string;
    resolveBinaryData(id: string, data: Buffer): RawBinaryData;
    static getVersions(): number[];
}
