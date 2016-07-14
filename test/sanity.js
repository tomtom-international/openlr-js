import {Buffer} from 'buffer';
import LocationReference from '../src/data/LocationReference';
import BinaryDecoder from '../src/binary/BinaryDecoder';
import BinaryEncoder from '../src/binary/BinaryEncoder';

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

const openLrString = 'CwhpSyMqAgosFQWS/aoKWQY=';
const openLrBinary = Buffer.from(openLrString, 'base64');
const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);

const rawLocationReference = binaryDecoder.decodeData(locationReference);

const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawLocationReference);
const encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData();
const encodedOpenLrString = encodedOpenLrBinary.toString('base64');

if(openLrString != encodedOpenLrString) {
    throw new Error('Expected OpenLR string to be equal: ' + openLrString + ' and ' + encodedOpenLrString);
}
