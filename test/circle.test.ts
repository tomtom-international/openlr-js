import { Buffer } from 'buffer';
import { describe, expect, it } from 'vitest';
import { BinaryDecoder, BinaryEncoder, LocationReference, Serializer } from '../src/index';

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

describe('circle location reference', () => {
    it('round-trips the OpenLR string', () => {
        const openLrString = 'A/2lJCfIiAfQ';
        const openLrBinary = Buffer.from(openLrString, 'base64');
        const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
        const rawLocationReference = binaryDecoder.decodeData(locationReference);

        const serialized = Serializer.serialize(rawLocationReference);
        const deserialized = Serializer.deserialize(serialized);

        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserialized);
        const encodedOpenLrString = encodedLocationReference.getLocationReferenceData().toString('base64');

        expect(encodedOpenLrString).toBe(openLrString);
    });
});
