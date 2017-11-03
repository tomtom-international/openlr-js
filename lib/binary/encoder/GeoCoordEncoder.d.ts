/// <reference types="node" />
import AbstractEncoder from './AbstractEncoder';
import LocationReference from '../../data/LocationReference';
import RawLocationReference from '../../data/raw-location-reference/RawLocationReference';
import GeoCoordinates from '../../map/GeoCoordinates';
export default class GeoCoordEncoder extends AbstractEncoder {
    encodeData(rawLocationReference: RawLocationReference, version: number): LocationReference;
    protected _generateBinaryGeoCoordLocation(coord: GeoCoordinates, version: number): Buffer;
}
