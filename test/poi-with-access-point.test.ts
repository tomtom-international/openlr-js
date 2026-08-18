import { Buffer } from 'buffer';
import { describe, expect, it } from 'vitest';
import { BinaryDecoder, BinaryEncoder, FormOfWay, FunctionalRoadClass, GeoCoordinates, LocationReference, LocationReferencePoint, LocationType, Offsets, Orientation, RawPoiAccessLocationReference, Serializer, SideOfRoad } from '../src/index';

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

/*
 * OpenLR whitepaper v1.5, section 13.2.4 "PoiWithAccessPoint" is the reference example for this
 * location type. It carries two location reference points, a positive offset and the absolute
 * coordinate of the point of interest (stored relative to the first LRP).
 */
const referenceOpenLrString = 'KwRboCNGfhJRAf/O/7SSQ03/fgCD';

/*
 * The reference example carries orientation NO_ORIENTATION_OR_UNKNOWN, which is all-zero bits, so
 * on its own it cannot distinguish a correctly written orientation from a dropped one. This vector
 * is the same location with SideOfRoad.RIGHT and Orientation.AGAINST_LINE_DIRECTION, both non-zero
 * and different from each other, so it pins the two fields independently and in the right bytes.
 */
const nonZeroOrientationOpenLrString = 'KwRboCNGfpJRAf/O/7RSQ07/fgCD';

/*
 * The same location with the positive offset in bucket 78 instead of 77. Decoding resolves an
 * offset bucket to the middle of that bucket, so only a bucket that re-quantises onto itself
 * survives a decode/encode cycle byte for byte: DNP bucket 1 decodes to an estimated 88 meter,
 * offset bucket 77 resolves to 30.2734375% which is 27 meter, and 27 of 88 meter encodes back as
 * bucket floor(256 * 27 / 88) = 78. Only 88 of the 255 non-zero buckets are fixed points of that
 * map, and 77 is not one of them.
 *
 * This is a property of the offset code shared by all location types (AbstractDecoder
 * ._calculateRelativeDistance -> Offsets.getPositiveOffset -> AbstractEncoder
 * ._calculateRelativeInterval), not of this location type. The whitepaper's own "point along line"
 * example shifts 77 -> 78 in exactly the same way, which is why test/point-along-line.test.ts
 * pins a bucket 78 vector rather than the whitepaper's bucket 77 one.
 */
const roundTrippingOpenLrString = 'KwRboCNGfhJRAf/O/7SSQ07/fgCD';

/*
 * The same location without a positive offset (POffF cleared, offset byte dropped): 20 instead of
 * 21 bytes. Section 5.4.3.4: "If the offset is missing the access point is implicitly defined by
 * the first LRP".
 */
const withoutOffsetOpenLrString = 'KwRboCNGfhJRAf/O/7SSA/9+AIM=';

const decode = (openLrString: string) => binaryDecoder.decodeData(LocationReference.fromIdAndBuffer('binary', Buffer.from(openLrString, 'base64')));

describe('poi-with-access-point location reference', () => {
    it('decodes the whitepaper reference example', () => {
        const rawLocationReference = decode(referenceOpenLrString);

        expect(rawLocationReference.getLocationType()).toBe(LocationType.POI_WITH_ACCESS_POINT);
        expect(rawLocationReference.isValid()).toBe(true);

        const locationReferencePoints = rawLocationReference.getLocationReferencePoints();
        expect(locationReferencePoints).not.toBeNull();
        expect(locationReferencePoints!.length).toBe(2);

        // Whitepaper section 13.2.4, XML reference: first LRP at 6.12829 / 49.60597, BEAR 202, DNP 92.
        expect(locationReferencePoints![0].getLongitudeDeg()).toBeCloseTo(6.12829, 4);
        expect(locationReferencePoints![0].getLatitudeDeg()).toBeCloseTo(49.60597, 4);
        expect(locationReferencePoints![0].getBearing()).toBe(196.875);
        expect(locationReferencePoints![0].getDistanceToNext()).toBe(88);

        // Whitepaper section 13.2.4, XML reference: last LRP at 6.12779 / 49.60521, BEAR 42.
        expect(locationReferencePoints![1].getLongitudeDeg()).toBeCloseTo(6.12779, 4);
        expect(locationReferencePoints![1].getLatitudeDeg()).toBeCloseTo(49.60521, 4);
        expect(locationReferencePoints![1].getBearing()).toBe(39.375);
        expect(locationReferencePoints![1].isLastLRP()).toBe(true);

        // Whitepaper Table 112: the point of interest itself.
        const geoCoordinates = rawLocationReference.getGeoCoordinates();
        expect(geoCoordinates).not.toBeNull();
        expect(geoCoordinates!.getLongitudeDeg()).toBeCloseTo(6.12699, 4);
        expect(geoCoordinates!.getLatitudeDeg()).toBeCloseTo(49.60728, 4);

        // Whitepaper Table 113.
        expect(rawLocationReference.getSideOfRoad()).toBe(SideOfRoad.LEFT);
        expect(rawLocationReference.getOrientation()).toBe(Orientation.NO_ORIENTATION_OR_UNKNOWN);

        // Whitepaper section 13.2.4: an offset of 28 meter along a line of roughly 92 meter. Both
        // values are resolved from their bucket to the middle of that bucket when decoding.
        const offsets = rawLocationReference.getOffsets();
        expect(offsets).not.toBeNull();
        expect(offsets!.hasPositiveOffset()).toBe(true);
        expect(offsets!.hasNegativeOffset()).toBe(false);
        expect(offsets!.getPositiveOffset(locationReferencePoints![0].getDistanceToNext())).toBe(27);
    });

    it('round-trips the OpenLR string', () => {
        const openLrString = roundTrippingOpenLrString;
        const openLrBinary = Buffer.from(openLrString, 'base64');
        const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
        const rawLocationReference = binaryDecoder.decodeData(locationReference);

        const serialized = Serializer.serialize(rawLocationReference);
        const deserialized = Serializer.deserialize(serialized);

        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserialized);
        const encodedOpenLrString = encodedLocationReference.getLocationReferenceData().toString('base64');

        expect(encodedOpenLrString).toBe(openLrString);
    });

    it('round-trips the OpenLR string without a positive offset', () => {
        const openLrString = withoutOffsetOpenLrString;
        const openLrBinary = Buffer.from(openLrString, 'base64');
        const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
        const rawLocationReference = binaryDecoder.decodeData(locationReference);

        expect(rawLocationReference.getLocationType()).toBe(LocationType.POI_WITH_ACCESS_POINT);
        expect(rawLocationReference.getOffsets().hasPositiveOffset()).toBe(false);

        // The point of interest is unaffected by the missing offset.
        expect(rawLocationReference.getGeoCoordinates().getLongitudeDeg()).toBeCloseTo(6.12699, 4);
        expect(rawLocationReference.getGeoCoordinates().getLatitudeDeg()).toBeCloseTo(49.60728, 4);

        const serialized = Serializer.serialize(rawLocationReference);
        const deserialized = Serializer.deserialize(serialized);

        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserialized);
        const encodedOpenLrString = encodedLocationReference.getLocationReferenceData().toString('base64');

        expect(encodedOpenLrString).toBe(openLrString);
    });

    it('encodes a location reference built from values', () => {
        const decoded = decode(roundTrippingOpenLrString);
        const locationReferencePoints = decoded.getLocationReferencePoints()!;

        const rawLocationReference = RawPoiAccessLocationReference.fromPoiAccessValues(
            'binary',
            locationReferencePoints[0],
            locationReferencePoints[1],
            decoded.getOffsets()!,
            decoded.getGeoCoordinates()!,
            decoded.getSideOfRoad()!,
            decoded.getOrientation()!
        );

        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawLocationReference);
        expect(encodedLocationReference.getLocationReferenceData().toString('base64')).toBe(roundTrippingOpenLrString);
    });

    /*
     * The reason this location type exists: the exact coordinate of the object is transmitted
     * alongside the network access point, instead of being derived from an offset along a line.
     */
    it('encodes a caller supplied point of interest coordinate', () => {
        const decoded = decode(roundTrippingOpenLrString);
        const locationReferencePoints = decoded.getLocationReferencePoints()!;

        const pointOfInterest = GeoCoordinates.fromValues(6.12699, 49.60728);
        const rawLocationReference = RawPoiAccessLocationReference.fromPoiAccessValues(
            'binary',
            locationReferencePoints[0],
            locationReferencePoints[1],
            decoded.getOffsets()!,
            pointOfInterest,
            SideOfRoad.LEFT,
            Orientation.NO_ORIENTATION_OR_UNKNOWN
        );

        const encodedOpenLrBinary = binaryEncoder.encodeDataFromRLR(rawLocationReference).getLocationReferenceData();
        expect(encodedOpenLrBinary.length).toBe(21);

        // The coordinate survives the encode/decode cycle to within the resolution of the two byte
        // relative coordinate format (a deca-micro degree, roughly a meter).
        const reDecoded = binaryDecoder.decodeData(LocationReference.fromIdAndBuffer('binary', encodedOpenLrBinary));
        expect(reDecoded.getGeoCoordinates()!.getLongitudeDeg()).toBeCloseTo(6.12699, 4);
        expect(reDecoded.getGeoCoordinates()!.getLatitudeDeg()).toBeCloseTo(49.60728, 4);
        expect(reDecoded.getSideOfRoad()).toBe(SideOfRoad.LEFT);
    });

    it('round-trips a non-zero orientation and side of road', () => {
        const rawLocationReference = decode(nonZeroOrientationOpenLrString);

        expect(rawLocationReference.getSideOfRoad()).toBe(SideOfRoad.RIGHT);
        expect(rawLocationReference.getOrientation()).toBe(Orientation.AGAINST_LINE_DIRECTION);

        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(Serializer.deserialize(Serializer.serialize(rawLocationReference)));
        expect(encodedLocationReference.getLocationReferenceData().toString('base64')).toBe(nonZeroOrientationOpenLrString);
    });

    /*
     * Orientation lives in the first LRP's attribute byte and side of road in the last LRP's, so a
     * mix-up between the two is the realistic hazard in this layout. Sweeping every combination
     * pins both fields against being swapped, dropped or defaulted.
     */
    it('preserves every side of road and orientation combination', () => {
        const decoded = decode(roundTrippingOpenLrString);
        const locationReferencePoints = decoded.getLocationReferencePoints()!;
        const sidesOfRoad = [SideOfRoad.ON_ROAD_OR_UNKNOWN, SideOfRoad.RIGHT, SideOfRoad.LEFT, SideOfRoad.BOTH];
        const orientations = [Orientation.NO_ORIENTATION_OR_UNKNOWN, Orientation.WITH_LINE_DIRECTION, Orientation.AGAINST_LINE_DIRECTION, Orientation.BOTH];

        for (const sideOfRoad of sidesOfRoad) {
            for (const orientation of orientations) {
                const rawLocationReference = RawPoiAccessLocationReference.fromPoiAccessValues(
                    'binary',
                    locationReferencePoints[0],
                    locationReferencePoints[1],
                    decoded.getOffsets()!,
                    decoded.getGeoCoordinates()!,
                    sideOfRoad,
                    orientation
                );

                const encodedOpenLrBinary = binaryEncoder.encodeDataFromRLR(rawLocationReference).getLocationReferenceData();
                const reDecoded = binaryDecoder.decodeData(LocationReference.fromIdAndBuffer('binary', encodedOpenLrBinary));

                expect(reDecoded.getSideOfRoad()).toBe(sideOfRoad);
                expect(reDecoded.getOrientation()).toBe(orientation);
            }
        }
    });

    /*
     * Everything this test needs comes from the package index, with no deep module imports: a
     * consumer can describe a point of interest and its access point from scratch and encode it.
     * The values are the whitepaper reference example's, so the expected bytes are its own.
     */
    it('encodes a location reference built entirely from the public exports', () => {
        const firstLRP = LocationReferencePoint.fromValues(1, FunctionalRoadClass.FRC_2, FormOfWay.MULTIPLE_CARRIAGEWAY, 6.128300428361281, 49.60596442198941, 196.875, 88, FunctionalRoadClass.FRC_2, false);
        const lastLRP = LocationReferencePoint.fromValues(2, FunctionalRoadClass.FRC_2, FormOfWay.MULTIPLE_CARRIAGEWAY, 6.127800428361281, 49.60520442198941, 39.375, 0, FunctionalRoadClass.FRC_7, true);

        const rawLocationReference = RawPoiAccessLocationReference.fromPoiAccessValues(
            'binary',
            firstLRP,
            lastLRP,
            Offsets.fromRelativeValues(30.6640625, 0.0),
            GeoCoordinates.fromValues(6.127000428361281, 49.60727442198941),
            SideOfRoad.LEFT,
            Orientation.NO_ORIENTATION_OR_UNKNOWN
        );

        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawLocationReference);
        expect(encodedLocationReference.getLocationReferenceData().toString('base64')).toBe(roundTrippingOpenLrString);
    });

    it('encodes a location reference built without a positive offset', () => {
        const decoded = decode(roundTrippingOpenLrString);
        const locationReferencePoints = decoded.getLocationReferencePoints()!;

        const rawLocationReference = RawPoiAccessLocationReference.fromPoiAccessValues(
            'binary',
            locationReferencePoints[0],
            locationReferencePoints[1],
            Offsets.fromValues(0, 0),
            decoded.getGeoCoordinates()!,
            decoded.getSideOfRoad()!,
            decoded.getOrientation()!
        );

        const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawLocationReference);
        const encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData();

        // Without a positive offset the location reference is one byte shorter.
        expect(encodedOpenLrBinary.length).toBe(20);
        expect(encodedOpenLrBinary.toString('base64')).toBe(withoutOffsetOpenLrString);
    });
});
