import {Buffer} from 'buffer';
import LocationReference from '../src/data/LocationReference';
import BinaryDecoder from '../src/binary/BinaryDecoder';
import BinaryEncoder from '../src/binary/BinaryEncoder';

const binaryDecoder = new BinaryDecoder();
const binaryEncoder = new BinaryEncoder();

const openLrString = 'Cwhr8SMo2RtxAf/K/6sbYgIARwBzG2EAAAYACjPBAAATACYzwQUBJP+6M8AAAAIACQo4A/7HABcKOSkBs//gChg=';
const openLrBinary = Buffer.from(openLrString, 'base64');
const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);

const rawLocationReference = binaryDecoder.decodeData(locationReference);

const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawLocationReference);
const encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData();
const encodedOpenLrString = encodedOpenLrBinary.toString('base64');

if(openLrString != encodedOpenLrString) {
    throw new Error('Expected OpenLR string to be equal: ' + openLrString + ' and ' + encodedOpenLrString);
}

console.log(rawLocationReference);
