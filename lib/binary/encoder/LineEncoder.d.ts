/// <reference types="node" />
import AbstractEncoder from './AbstractEncoder';
import LocationReference from '../../data/LocationReference';
import RawLocationReference from '../../data/raw-location-reference/RawLocationReference';
import Offsets from '../../data/Offsets';
import LocationReferencePoint from '../../data/LocationReferencePoint';
export default class LineEncoder extends AbstractEncoder {
    encodeData(rawLocationReference: RawLocationReference, version: number): LocationReference;
    protected _generateBinaryLineLocation(locationReferences: Array<LocationReferencePoint>, offsets: Offsets, version: number): Buffer;
}
