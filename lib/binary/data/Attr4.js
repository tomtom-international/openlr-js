'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BinaryInformation = require('./BinaryInformation');

var _BinaryInformation2 = _interopRequireDefault(_BinaryInformation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Attr4 extends _BinaryInformation2.default {

    /** The negative offset flag information. */


    /** Number of bits used for bearing */


    /** Number of bits used for positive offset flag */
    static fromValues(pOffsetF, nOffsetF, bear) {
        const attr4 = new Attr4();
        attr4._pOffsetF = pOffsetF;
        attr4._nOffsetF = nOffsetF;
        attr4._bear = bear;
        return attr4;
    }

    /** The bearing information. */


    /** The positive offset flag information. */


    /** Number of bits used for negative offset flag */

    /** Number of unused bits */


    static fromBitStreamInput(bitStreamInput) {
        const rfu = bitStreamInput.getBits(Attr4._RFU_BITS);
        if (rfu !== Attr4._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        const attr4 = new Attr4();
        attr4._pOffsetF = bitStreamInput.getBits(Attr4._POFFF_BITS);
        attr4._nOffsetF = bitStreamInput.getBits(Attr4._NOFFF_BITS);
        attr4._bear = bitStreamInput.getBits(Attr4._BEAR_BITS);
        return attr4;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(Attr4._RFU_VALUE, Attr4._RFU_BITS);
        bitStreamOutput.putBits(this._pOffsetF, Attr4._POFFF_BITS);
        bitStreamOutput.putBits(this._nOffsetF, Attr4._NOFFF_BITS);
        bitStreamOutput.putBits(this._bear, Attr4._BEAR_BITS);
    }

    get pOffsetF() {
        return this._pOffsetF;
    }

    get nOffsetF() {
        return this._nOffsetF;
    }

    get bear() {
        return this._bear;
    }
}exports.default = Attr4; /**
                           * Copyright 2017 TomTom International B.V
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

Attr4._RFU_BITS = 1;
Attr4._POFFF_BITS = 1;
Attr4._NOFFF_BITS = 1;
Attr4._BEAR_BITS = 5;
;