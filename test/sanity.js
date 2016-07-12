import {Buffer} from 'buffer';
import LocationReference from '../lib/data/LocationReference';
import BinaryDecoder from '../lib/binary/BinaryDecoder';

const openLrString = 'CwNhbCU+jzPLAwD0/34zGw==';
const openLrBinary = Buffer.from(openLrString, 'base64');

const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
const binaryDecoder = new BinaryDecoder();
const rawLocationReference = binaryDecoder.decodeData(locationReference);

console.log(rawLocationReference);
