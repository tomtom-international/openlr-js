'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BinaryConstants = require('../binary/BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Offsets {

    /** The n off relative. */


    /**
     * The negative offset of the binary data (0 if not negative offset available).
     */

    /** The Constant PERCENTAGE. */
    static fromValues(pOff, nOff) {
        const offsets = new Offsets();
        offsets._pOffset = pOff;
        offsets._nOffset = nOff;
        offsets._version = _BinaryConstants2.default.BINARY_VERSION_2;
        offsets._pOffRelative = 0.0;
        offsets._nOffRelative = 0.0;
        return offsets;
    }

    /** The version. */


    /** The p off relative. */


    /**
     * The positive offset of the binary data (0 if no positive offset available).
     */


    static fromRelativeValues(pOff, nOff) {
        const offsets = new Offsets();
        offsets._pOffset = 0;
        offsets._nOffset = 0;
        offsets._version = _BinaryConstants2.default.BINARY_VERSION_3;
        offsets._pOffRelative = pOff;
        offsets._nOffRelative = nOff;
        return offsets;
    }

    hasPositiveOffset() {
        return this._pOffset !== 0 || this._pOffRelative !== 0;
    }

    hasNegativeOffset() {
        return this._nOffset !== 0 || this._nOffRelative !== 0;
    }

    getPositiveOffset(length) {
        if (this.hasPositiveOffset()) {
            if (this._version === _BinaryConstants2.default.BINARY_VERSION_2) {
                return this._pOffset;
            } else if (this._version === _BinaryConstants2.default.BINARY_VERSION_3) {
                return Math.round(this._pOffRelative * length / Offsets._PERCENTAGE);
            }
        }
        return 0;
    }

    getNegativeOffset(length) {
        if (this.hasNegativeOffset()) {
            if (this._version === _BinaryConstants2.default.BINARY_VERSION_2) {
                return this._nOffset;
            } else if (this._version === _BinaryConstants2.default.BINARY_VERSION_3) {
                return Math.round(this._nOffRelative * length / Offsets._PERCENTAGE);
            }
        }
        return 0;
    }
}exports.default = Offsets; /**
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

Offsets._PERCENTAGE = 100;
;