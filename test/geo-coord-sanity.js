/**
 * Copyright 2017 TomTom International B.V
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

import {Buffer} from 'buffer';
import {BinaryDecoder, BinaryEncoder, LocationReference, Serializer} from '../lib';

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

const openLrString = 'IwXB2SPTtA==';
const openLrBinary = Buffer.from(openLrString, 'base64');
const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
const rawLocationReference = binaryDecoder.decodeData(locationReference);
const serializedRawLocationReference = Serializer.serialize(rawLocationReference);
const deserializerRawLocationReference = Serializer.deserialize(serializedRawLocationReference);
const encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserializerRawLocationReference);
const encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData();
const encodedOpenLrString = encodedOpenLrBinary.toString('base64');

if (openLrString !== encodedOpenLrString) {
    throw new Error('Expected OpenLR string to be equal: ' + openLrString + ' and ' + encodedOpenLrString);
}
