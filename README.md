# openlr-js
OpenLR implementation in JavaScript

Java binaries and the OpenLR specification can be found at [OpenLR.org](http://www.openlr.org/)

Currently only supports **line** encoding and decoding.
This project is open to contributions, and will likely support more OpenLR geometries in the future.

Supports both Node.js and Browsers by using the [buffer](https://www.npmjs.com/package/buffer) package.

## Installation

```bash
npm install --save openlr-js
```

## Example usage

```js
import {BinaryDecoder, LocationReference, Serializer} from 'openlr-js';

const binaryDecoder = new BinaryDecoder();

const openLrString = 'CwNhbCU+jzPLAwD0/34zGw==';
const openLrBinary = Buffer.from(openLrString, 'base64');
const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
const rawLocationReference = binaryDecoder.decodeData(locationReference);
const jsonObject = Serializer.serialize(rawLocationReference);
console.log(jsonObject); // {"type":"RawLineLocationReference","properties":{"_id":"binary","_locationType":1,"_returnCode":null,"_points":{"type":"Array","properties":[{"type":"LocationReferencePoint","properties":{"_bearing":129.375,"_distanceToNext":205,"_frc":6,"_fow":3,"_lfrcnp":6,"_isLast":false,"_longitude":4.7538936137926395,"_latitude":52.374883889902236,"_sequenceNumber":1}},{"type":"LocationReferencePoint","properties":{"_bearing":309.375,"_distanceToNext":0,"_frc":6,"_fow":3,"_lfrcnp":7,"_isLast":true,"_longitude":4.7563336137926395,"_latitude":52.373583889902235,"_sequenceNumber":2}}]},"_offsets":{"type":"Offsets","properties":{"_pOffset":0,"_nOffset":0,"_version":3,"_pOffRelative":0,"_nOffRelative":0}}}}
```

```js
import {BinaryEncoder, Serializer} from 'openlr-js';

const binaryEncoder = new BinaryEncoder();

const jsonObject = {"type":"RawLineLocationReference","properties":{"_id":"binary","_locationType":1,"_returnCode":null,"_points":{"type":"Array","properties":[{"type":"LocationReferencePoint","properties":{"_bearing":129.375,"_distanceToNext":205,"_frc":6,"_fow":3,"_lfrcnp":6,"_isLast":false,"_longitude":4.7538936137926395,"_latitude":52.374883889902236,"_sequenceNumber":1}},{"type":"LocationReferencePoint","properties":{"_bearing":309.375,"_distanceToNext":0,"_frc":6,"_fow":3,"_lfrcnp":7,"_isLast":true,"_longitude":4.7563336137926395,"_latitude":52.373583889902235,"_sequenceNumber":2}}]},"_offsets":{"type":"Offsets","properties":{"_pOffset":0,"_nOffset":0,"_version":3,"_pOffRelative":0,"_nOffRelative":0}}}};
const rawLocationReference = Serializer.deserialize(jsonObject);
const locationReference = binaryEncoder.encodeDataFromRLR(rawLocationReference);
const openLrBinary = locationReference.getLocationReferenceData();
const openLrString = openLrBinary.toString('base64');
console.log(openLrString); // CwNhbCU+jzPLAwD0/34zGw==
```
