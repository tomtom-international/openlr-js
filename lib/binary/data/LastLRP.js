'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractLRP = require('./AbstractLRP');

var _AbstractLRP2 = _interopRequireDefault(_AbstractLRP);

var _Attr = require('./Attr1');

var _Attr2 = _interopRequireDefault(_Attr);

var _Attr3 = require('./Attr4');

var _Attr4 = _interopRequireDefault(_Attr3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LastLRP extends _AbstractLRP2.default {
    /** Number of bits used for coordinates (relative) */
    static fromValues(lon, lat, attrib1, attrib4) {
        const lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._lon = lon;
        lastLrp._lat = lat;
        lastLrp._attrib1 = attrib1;
        lastLrp._attrib4 = attrib4;
        return lastLrp;
    }

    /** The attrib4 information. */


    static fromBitStreamInput(bitStreamInput) {
        const lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._read(bitStreamInput);
        lastLrp._attrib1 = _Attr2.default.fromBitStreamInput(bitStreamInput);
        lastLrp._attrib4 = _Attr4.default.fromBitStreamInput(bitStreamInput);
        return lastLrp;
    }

    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib4.put(bitStreamOutput);
    }

    get attrib4() {
        return this._attrib4;
    }
}exports.default = LastLRP; /**
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

LastLRP._COORD_BITS = 16;
;