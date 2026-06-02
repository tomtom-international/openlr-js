/*
 * Copyright (c) 2020-2025 TomTom International B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * OpenLR whitepaper v1.5, section 5.4.3.3 "Point along line": the positive
 * offset is optional. "If the offset is missing the point is implicitly
 * defined by the first LRP". Encoding a point along line location without a
 * positive offset must therefore succeed.
 */

const { Buffer } = require('buffer');
const { BinaryDecoder, BinaryEncoder, LocationReference, RawPointAlongLineLocationReference, Offsets } = require('../lib/es5');

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

// A valid point along line location reference (this one carries a positive offset).
const openLrString = 'KwRboCNGfhJRAf/O/7SSQ04=';
const openLrBinary = Buffer.from(openLrString, 'base64');
const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
const rawLocationReference = binaryDecoder.decodeData(locationReference);

const locationReferencePoints = rawLocationReference.getLocationReferencePoints();

// Build the same location but without any positive offset.
const rawWithoutOffset = RawPointAlongLineLocationReference.fromPointAlongLineValues(
    'binary',
    locationReferencePoints[0],
    locationReferencePoints[1],
    Offsets.fromValues(0, 0),
    rawLocationReference.getSideOfRoad(),
    rawLocationReference.getOrientation()
);

// Encoding a point along line without a positive offset must not throw.
const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawWithoutOffset);
const encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData();

// The encoded location must round-trip back to a reference without a positive offset.
const reDecoded = binaryDecoder.decodeData(LocationReference.fromIdAndBuffer('binary', encodedOpenLrBinary));
if (reDecoded.getOffsets().hasPositiveOffset()) {
    throw new Error('Expected re-decoded point along line to have no positive offset');
}
