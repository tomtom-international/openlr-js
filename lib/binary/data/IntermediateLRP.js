'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractLRP = require('./AbstractLRP');

var _AbstractLRP2 = _interopRequireDefault(_AbstractLRP);

var _Attr = require('./Attr1');

var _Attr2 = _interopRequireDefault(_Attr);

var _Attr3 = require('./Attr2');

var _Attr4 = _interopRequireDefault(_Attr3);

var _Attr5 = require('./Attr3');

var _Attr6 = _interopRequireDefault(_Attr5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2016 TomTom International B.V
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

class IntermediateLRP extends _AbstractLRP2.default {

    /** The attrib2. */
    static fromValues(lon, lat, attrib1, attrib2, attrib3) {
        const intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._lon = lon;
        intermediateLrp._lat = lat;
        intermediateLrp._attrib1 = attrib1;
        intermediateLrp._attrib2 = attrib2;
        intermediateLrp._attrib3 = attrib3;
        return intermediateLrp;
    }

    /** The attrib3. */

    /** Number of bits used for coordinates (relative) */


    static fromBitStreamInput(bitStreamInput) {
        const intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._read(bitStreamInput);
        intermediateLrp._attrib1 = _Attr2.default.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib2 = _Attr4.default.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib3 = _Attr6.default.fromBitStreamInput(bitStreamInput);
        return intermediateLrp;
    }

    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    }

    get attrib2() {
        return this._attrib2;
    }

    get attrib3() {
        return this._attrib3;
    }
}exports.default = IntermediateLRP;
IntermediateLRP._COORD_BITS = 16;
;