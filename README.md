# Read Me for openlr-js

Copyright (C) 2018, TomTom International BV. All rights reserved.
----

[downloads-image]: https://img.shields.io/npm/dm/openlr-js.svg
[npm-image]: https://img.shields.io/npm/v/openlr-js.svg
[npm-url]: https://npmjs.org/package/openlr-js
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/openlr-js/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/openlr-js
[dependency-status-image]: https://david-dm.org/tomtom-international/openlr-js.svg
[dependency-status-url]: https://david-dm.org/tomtom-international/openlr-js
[devDependency-status-image]: https://david-dm.org/tomtom-international/openlr-js/dev-status.svg
[devDependency-status-url]: https://david-dm.org/tomtom-international/openlr-js#info=devDependencies
[![npm][npm-image]][npm-url] [![downloads][downloads-image]][npm-url] [![jsdelivr download][jsdelivr-image]][jsdelivr-url] [![dependency  status][dependency-status-image]][dependency-status-url] [![devDependency  status][devDependency-status-image]][devDependency-status-url]

This library contains an OpenLR implementation for JavaScript.

Java binaries and the OpenLR specification can be found at [OpenLR.org](http://www.openlr.org).

Currently only supports **geo-coordinate**, **line**, **point along line**, **polygon** and **circle** geometries encoding/decoding to/from **binary**.
This project is open to contributions, and will likely support more OpenLR geometries in future.

Supports both [Node.js](http://nodejs.org) (v4+) and web browsers by using the [Buffer](https://www.npmjs.com/package/buffer) package.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

## Installation

### NodeJS

```bash
npm install --save openlr-js
```

### Browser

```html
<script src="//cdn.jsdelivr.net/npm/openlr-js@latest/lib/browser/bundle.js"></script>
// or
<script src="//cdn.jsdelivr.net/npm/openlr-js@latest/lib/browser/bundle.min.js"></script>

<script>
// window.OpenLR contains exports
</script>
```

## Migration from version 2 to version 3

In addition to adding new geometries to version 3, we have also made a small change to the library structure.
If you were using version 2 before and would like to start using version 3, be aware that we are now using named exports across the board, and moved the library folders.
If you never used any imports beyond the main exports, then there is no need to change anything.
If you used any imports from files other than the main export, then you will have to change a bit.

```js
// If all you ever used was this, then nothing needs to change:
import {...} from 'openlr-js';

// If you used imports from other files, then you will have to change 'lib-esX' to 'lib/esX' and make sure to use named imports:
import RawGeoCoordLocationReference from 'openlr-js/lib-es6/data/raw-location-reference/RawGeoCoordLocationReference';
// becomes
import { RawGeoCoordLocationReference } from 'openlr-js/lib/es6/data/raw-location-reference/RawGeoCoordLocationReference';
```

## Example Usage

The following examples will give you a quick overview of how to use the library.
For more examples, you may also check out the tests in the `test/` folder.

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

### Encoding a JSON Object to OpenLR

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

This produces the following OpenLR string:

```
CwNhbCU+jzPLAwD0/34zGw==
```

### In browser

[See example on CodePen.io](https://codepen.io/woutervh/pen/QVWwLR?editors=1010)

```html
<script>
const binaryDecoder = new OpenLR.BinaryDecoder();

const openLrString = 'CwNhbCU+jzPLAwD0/34zGw==';
const openLrBinary = OpenLR.Buffer.from(openLrString, 'base64');
const locationReference = OpenLR.LocationReference.fromIdAndBuffer('binary', openLrBinary);
const rawLocationReference = binaryDecoder.decodeData(locationReference);
const jsonObject = OpenLR.Serializer.serialize(rawLocationReference);
console.log(jsonObject);
</script>
```

## Using Git and `.gitignore`

It's good practice to set up a personal global `.gitignore` file on your machine which filters a number of files on your file systems that you do not wish to submit to the Git repository.
You can set up your own global `~/.gitignore`  file by executing:
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
