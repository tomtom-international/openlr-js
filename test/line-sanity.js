import {Buffer} from 'buffer';
import {BinaryDecoder, BinaryEncoder, LocationReference, Serializer} from '../src';

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

const openLrString = 'CwNhbCU+jzPLAwD0/34zGw==';
const openLrBinary = Buffer.from(openLrString, 'base64');
const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
const rawLocationReference = binaryDecoder.decodeData(locationReference);
const serializedRawLocationReference = Serializer.serialize(rawLocationReference);
const deserializerRawLocationReference = Serializer.deserialize(serializedRawLocationReference);
const encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserializerRawLocationReference);
const encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData();
const encodedOpenLrString = encodedOpenLrBinary.toString('base64');

if (openLrString != encodedOpenLrString) {
    throw new Error('Expected OpenLR string to be equal: ' + openLrString + ' and ' + encodedOpenLrString);
}
