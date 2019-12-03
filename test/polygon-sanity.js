/**
 * Copyright 2018 TomTom International B.V
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

const { Buffer } = require('buffer');
const { BinaryDecoder, BinaryEncoder, LocationReference, Serializer } = require('../lib/es5');

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

const openLrString = 'E/2WTyfN7j0qA/MmW/olEdbrDA==';
const exptedEncodedOpenLrString = 'E/2WTyfN7j0qA/MmW/okEdbrDg==';

const openLrBinary = Buffer.from(openLrString, 'base64');
const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
const rawLocationReference = binaryDecoder.decodeData(locationReference);
const serializedRawLocationReference = Serializer.serialize(rawLocationReference);
const deserializerRawLocationReference = Serializer.deserialize(serializedRawLocationReference);
const encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserializerRawLocationReference);
const encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData();
const encodedOpenLrString = encodedOpenLrBinary.toString('base64');

// Due to floating point handling issue, the decoded openlr string isn't exactly same to the encoded openlr.
// Always the last latitude is out by very small number.
// It could be a bug with OpenLR precision limitation.
if (exptedEncodedOpenLrString !== encodedOpenLrString) {
    throw new Error('Expected OpenLR string to be equal: ' + exptedEncodedOpenLrString + ' and ' + encodedOpenLrString);
}
