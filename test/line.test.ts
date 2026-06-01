import { Buffer } from 'buffer';
import { describe, expect, it } from 'vitest';
import {
    BinaryDecoder,
    BinaryEncoder,
    LocationReference,
    LocationReferencePoint,
    Offsets,
    RawLineLocationReference,
    Serializer
} from '../src/index';

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

describe('line location reference', () => {
    it.each([
        'CwNhbCU+jzPLAwD0/34zGw==',
        'CwOgbiT6UDjgAAAAAAA4AA=='
    ])('round-trips the OpenLR string %s', (openLrString) => {
        const openLrBinary = Buffer.from(openLrString, 'base64');
        const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
        const rawLocationReference = binaryDecoder.decodeData(locationReference);

        const serialized = Serializer.serialize(rawLocationReference);
        const deserialized = Serializer.deserialize(serialized);

        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserialized);
        const encodedOpenLrString = encodedLocationReference.getLocationReferenceData().toString('base64');

        expect(encodedOpenLrString).toBe(openLrString);
    });

    it('encodes and decodes two points back to their original coordinates', () => {
        const locations = [{ lng: 5.1, lat: 52.0 }, { lng: 5.1, lat: 52.0 }];

        const rawLineLocationReference = RawLineLocationReference.fromLineValues(
            'binary',
            locations.map((location, i) => LocationReferencePoint.fromValues(
                i,
                7,
                0,
                location.lng,
                location.lat,
                0,
                i < locations.length - 1 ? 100 : 0,
                7,
                i === locations.length - 1
            )),
            Offsets.fromValues(0, 0)
        );

        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawLineLocationReference);
        const encodedOpenLrString = encodedLocationReference.getLocationReferenceData().toString('base64');

        const openLrBinary = Buffer.from(encodedOpenLrString, 'base64');
        const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
        const rawLocationReference = binaryDecoder.decodeData(locationReference) as RawLineLocationReference;

        locations.forEach((location, i) => {
            const point = rawLocationReference.getLocationReferencePoints()[i];
            expect(Math.abs(point.getLongitudeDeg() - location.lng)).toBeLessThan(0.0001);
            expect(Math.abs(point.getLatitudeDeg() - location.lat)).toBeLessThan(0.0001);
        });
    });
});
