import LocationReference from '../data/LocationReference';
import LocationType from '../data/LocationType';
import RawLocationReference from '../data/raw-location-reference/RawLocationReference';
export default class BinaryEncoder {
    protected static _VERSIONS: number[];
    protected _checkVersion(version: number, locationType: LocationType): boolean;
    getDataFormatIdentifier(): string;
    getSupportedVersions(): number[];
    encodeDataFromRLR(rawLocationReference: RawLocationReference): LocationReference;
    encodeDataFromRLRAndVersion(rawLocationReference: RawLocationReference, version: number): LocationReference;
}
