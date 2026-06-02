import { Buffer } from 'buffer';
import { describe, expect, it } from 'vitest';
import { BinaryDecoder, BinaryEncoder, LocationReference, RawPointAlongLineLocationReference, Offsets } from '../src/index';

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

/*
 * OpenLR whitepaper v1.5, section 5.4.3.3 "Point along line": the positive
 * offset is optional. "If the offset is missing the point is implicitly
 * defined by the first LRP". Encoding a point along line location without a
 * positive offset must therefore succeed.
 */
describe('point-along-line location reference without positive offset', () => {
    it('encodes and round-trips without a positive offset', () => {
        // A valid point along line location reference (this one carries a positive offset).
        const openLrString = 'KwRboCNGfhJRAf/O/7SSQ04=';
        const openLrBinary = Buffer.from(openLrString, 'base64');
        const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
        const rawLocationReference = binaryDecoder.decodeData(locationReference);

        const locationReferencePoints = rawLocationReference.getLocationReferencePoints();

        expect(locationReferencePoints).not.toBeNull();
        expect(locationReferencePoints!.length).toBeGreaterThanOrEqual(2);

        // Build the same location but without any positive offset.
        const rawWithoutOffset = RawPointAlongLineLocationReference.fromPointAlongLineValues(
            'binary',
            locationReferencePoints![0],
            locationReferencePoints![1],
            Offsets.fromValues(0, 0),
            rawLocationReference.getSideOfRoad()!,
            rawLocationReference.getOrientation()!
        );

        // Encoding a point along line without a positive offset must not throw.
        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawWithoutOffset);
        const encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData();

        expect(encodedOpenLrBinary).not.toBeNull();

        // The encoded location must round-trip back to a reference without a positive offset.
        const reDecoded = binaryDecoder.decodeData(LocationReference.fromIdAndBuffer('binary', encodedOpenLrBinary));
        expect(reDecoded.getOffsets().hasPositiveOffset()).toBe(false);
    });
});
