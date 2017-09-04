'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BinaryInformation = require('./BinaryInformation');

var _BinaryInformation2 = _interopRequireDefault(_BinaryInformation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Attr2 extends _BinaryInformation2.default {

    /** The lowest functional road class information. */

    /** Number of bits used for lfrcnp */
    static fromValues(lfrcnp, bear) {
        const attr2 = new Attr2();
        attr2._lfrcnp = lfrcnp;
        attr2._bear = bear;
        return attr2;
    }

    /** The bearing information. */


    /** Number of bits used for bear */


    static fromBitStreamInput(bitStreamInput) {
        const attr2 = new Attr2();
        attr2._lfrcnp = bitStreamInput.getBits(Attr2._LFRCNP_BITS);
        attr2._bear = bitStreamInput.getBits(Attr2._BEAR_BITS);
        return attr2;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(this._lfrcnp, Attr2._LFRCNP_BITS);
        bitStreamOutput.putBits(this._bear, Attr2._BEAR_BITS);
    }

    get lfrcnp() {
        return this._lfrcnp;
    }

    get bear() {
        return this._bear;
    }
}exports.default = Attr2; /**
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

Attr2._LFRCNP_BITS = 3;
Attr2._BEAR_BITS = 5;
;