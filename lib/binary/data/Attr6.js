'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BinaryInformation = require('./BinaryInformation');

var _BinaryInformation2 = _interopRequireDefault(_BinaryInformation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Attr6 extends _BinaryInformation2.default {

    /** number of bits used for bear */
    static fromValues(bear) {
        const attr6 = new Attr6();
        attr6._bear = bear;
        return attr6;
    }

    /** The bearing information. */

    /** number of bits used for lfrcnp */


    static fromBitStreamInput(bitStreamInput) {
        const rfu = bitStreamInput.getBits(Attr6._NR_RFU);
        if (rfu !== Attr6._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        const attr6 = new Attr6();
        attr6._bear = bitStreamInput.getBits(Attr6._BEAR_BITS);
        return attr6;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(Attr6._RFU_VALUE, Attr6._NR_RFU);
        bitStreamOutput.putBits(this._bear, Attr6._BEAR_BITS);
    }

    get bear() {
        return this._bear;
    }
}exports.default = Attr6; /**
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

Attr6._NR_RFU = 3;
Attr6._BEAR_BITS = 5;
;