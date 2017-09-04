'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BinaryInformation = require('./BinaryInformation');

var _BinaryInformation2 = _interopRequireDefault(_BinaryInformation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Attr5 extends _BinaryInformation2.default {

    /** The functional road class information. */


    /** Number of bits used for frc */
    static fromValues(frc, fow) {
        const attr5 = new Attr5();
        attr5._frc = frc;
        attr5._fow = fow;
        return attr5;
    }

    /** The form of way information. */


    /** Number of bits used for fow */

    /** The Constant RFU. */


    static fromBitStreamInput(bitStreamInput) {
        const rfu = bitStreamInput.getBits(Attr5._NR_RFU);
        if (rfu !== Attr5._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        const attr5 = new Attr5();
        attr5._frc = bitStreamInput.getBits(Attr5._DNP_BITS);
        attr5._fow = bitStreamInput.getBits(Attr5._FOW_BITS);
        return attr5;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(Attr5._RFU_VALUE, Attr5._NR_RFU);
        bitStreamOutput.putBits(this._frc, Attr5._FRC_BITS);
        bitStreamOutput.putBits(this._fow, Attr5._FOW_BITS);
    }

    get frc() {
        return this._frc;
    }

    get fow() {
        return this._fow;
    }
}exports.default = Attr5; /**
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

Attr5._NR_RFU = 2;
Attr5._FRC_BITS = 3;
Attr5._FOW_BITS = 3;
;