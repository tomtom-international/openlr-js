# Read Me for openlr-js

Copyright (C) 2016, TomTom International BV. All rights reserved.
----

This library contain an OpenLR implementation for JavaScript.

Java binaries and the OpenLR specification can be found at [OpenLR.org](http://www.openlr.org).

Currently only supports **line** and **point along line geometries** encoding and decoding.
This project is open to contributions, and will likely support more OpenLR geometries in future.

Supports both [Node.js](http://nodejs.org) and web browsers by using 
the [Buffer](https://www.npmjs.com/package/buffer) package.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

## Installation

```bash
npm install --save openlr-js
```

## Example Usage

### Decoding OpenLR to a JSON Object 

```js
import {BinaryDecoder, LocationReference, Serializer} from 'openlr-js';

const binaryDecoder = new BinaryDecoder();

const openLrString = 'CwNhbCU+jzPLAwD0/34zGw==';
const openLrBinary = Buffer.from(openLrString, 'base64');
const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
const rawLocationReference = binaryDecoder.decodeData(locationReference);
const jsonObject = Serializer.serialize(rawLocationReference);
console.log(jsonObject);
```

This produces the following JSON: 
```json
{
  "type": "RawLineLocationReference",
  "properties": {
    "_id": "binary",
    "_locationType": 1,
    "_returnCode": null,
    "_points": {
      "type": "Array",
      "properties": [
        {
          "type": "LocationReferencePoint",
          "properties": {
            "_bearing": 129.375,
            "_distanceToNext": 205,
            "_frc": 6,
            "_fow": 3,
            "_lfrcnp": 6,
            "_isLast": false,
            "_longitude": 4.7538936137926395,
            "_latitude": 52.374883889902236,
            "_sequenceNumber": 1
          }
        }, {
          "type": "LocationReferencePoint",
          "properties": {
            "_bearing": 309.375,
            "_distanceToNext": 0,
            "_frc": 6,
            "_fow": 3,
            "_lfrcnp": 7,
            "_isLast": true,
            "_longitude": 4.7563336137926395,
            "_latitude": 52.373583889902235,
            "_sequenceNumber": 2
          }
        }
      ]
    },
    "_offsets": {
      "type": "Offsets",
      "properties": {
        "_pOffset": 0,
        "_nOffset": 0,
        "_version": 3,
        "_pOffRelative": 0,
        "_nOffRelative": 0
      }
    }
  }
}
```

### Encoding a JSON OBject to OpenLR

```js
import {BinaryEncoder, Serializer} from 'openlr-js';

const binaryEncoder = new BinaryEncoder();

const jsonObject = {"type":"RawLineLocationReference","properties":{"_id":"binary","_locationType":1,"_returnCode":null,"_points":{"type":"Array","properties":[{"type":"LocationReferencePoint","properties":{"_bearing":129.375,"_distanceToNext":205,"_frc":6,"_fow":3,"_lfrcnp":6,"_isLast":false,"_longitude":4.7538936137926395,"_latitude":52.374883889902236,"_sequenceNumber":1}},{"type":"LocationReferencePoint","properties":{"_bearing":309.375,"_distanceToNext":0,"_frc":6,"_fow":3,"_lfrcnp":7,"_isLast":true,"_longitude":4.7563336137926395,"_latitude":52.373583889902235,"_sequenceNumber":2}}]},"_offsets":{"type":"Offsets","properties":{"_pOffset":0,"_nOffset":0,"_version":3,"_pOffRelative":0,"_nOffRelative":0}}}};
const rawLocationReference = Serializer.deserialize(jsonObject);
const locationReference = binaryEncoder.encodeDataFromRLR(rawLocationReference);
const openLrBinary = locationReference.getLocationReferenceData();
const openLrString = openLrBinary.toString('base64');
console.log(openLrString); 
```

This produces the followign OpenLR string:

```
CwNhbCU+jzPLAwD0/34zGw==
```

## Using Git and `.gitignore`

It's good practice to set up a personal global `.gitignore` file on your machine which filters a number of files on your file systems that you do not wish to submit to the Git repository.
You can set up your own global`~/.gitignore`  file by executing:
`git config --global core.excludesfile ~/.gitignore`

In general, add the following file types to `~/.gitignore` (each entry should be on a separate line):
`*.com *.class *.dll *.exe *.o *.so *.log *.sql *.sqlite *.tlog *.epoch *.swp *.hprof *.hprof.index *.releaseBackup *~`

If you're using a Mac, filter:
`.DS_Store* Thumbs.db`

If you're using IntelliJ IDEA, filter:
`*.iml *.iws .idea/`

If you're using Eclipse, filter:
`.classpath .project .settings .cache`

If you're using NetBeans, filter:
`nb-configuration.xml *.orig`

The local `.gitignore` file in the Git repository itself to reflect those file only that are produced by executing regular compile, build or release commands, such as: `target/ out/`

## Bug reports and new feature requests

If you encounter any problems with this library, don't hesitate to use the `Issues`  section to file your issues.
Normally, one of our developers should be able to comment on them and fix.
