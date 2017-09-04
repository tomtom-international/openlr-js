'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BinaryInformation = require('./BinaryInformation');

var _BinaryInformation2 = _interopRequireDefault(_BinaryInformation);

var _Attr = require('./Attr5');

var _Attr2 = _interopRequireDefault(_Attr);

var _Attr3 = require('./Attr6');

var _Attr4 = _interopRequireDefault(_Attr3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LastClosedLineLRP extends _BinaryInformation2.default {

    static fromValues(attrib5, attrib6) {
        const lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = attrib5;
        lastClosedLineLrp._attrib6 = attrib6;
        return lastClosedLineLrp;
    }

    static fromBitStreamInput(bitStreamInput) {
        const lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = _Attr2.default.fromBitStreamInput(bitStreamInput);
        lastClosedLineLrp._attrib6 = _Attr4.default.fromBitStreamInput(bitStreamInput);
        return lastClosedLineLrp;
    }

    put(bitStreamOutput) {
        this._attrib5.put(bitStreamOutput);
        this._attrib6.put(bitStreamOutput);
    }

    get attrib5() {
        return this._attrib5;
    }

    get attrib6() {
        return this._attrib6;
    }
}exports.default = LastClosedLineLRP; /**
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

;