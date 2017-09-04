'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BinaryInformation = require('./BinaryInformation');

var _BinaryInformation2 = _interopRequireDefault(_BinaryInformation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Attr3 extends _BinaryInformation2.default {
    /** Number of bits used for dnp */
    static fromValues(dnp) {
        const attr3 = new Attr3();
        attr3._dnp = dnp;
        return attr3;
    }

    /** The distance to next point information. */


    static fromBitStreamInput(bitStreamInput) {
        const attr3 = new Attr3();
        attr3._dnp = bitStreamInput.getBits(Attr3._DNP_BITS);
        return attr3;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(this._dnp, Attr3._DNP_BITS);
    }

    get dnp() {
        return this._dnp;
    }
}exports.default = Attr3; /**
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

Attr3._DNP_BITS = 8;
;