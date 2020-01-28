/**
 * Copyright 2020 TomTom International B.V
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

import * as BinaryConstants from '../binary/BinaryConstants';

export class Offsets {
    /** The Constant PERCENTAGE. */
    protected static _PERCENTAGE = 100;

    /**
     * The positive offset of the binary data (0 if no positive offset available).
     */
    protected _pOffset!: number;

    /**
     * The negative offset of the binary data (0 if not negative offset available).
     */
    protected _nOffset!: number;

    /** The p off relative. */
    protected _pOffRelative!: number;

    /** The n off relative. */
    protected _nOffRelative!: number;

    /** The version. */
    protected _version!: number;

    public hasPositiveOffset() {
        return (this._pOffset !== 0 || this._pOffRelative !== 0);
    }

    public hasNegativeOffset() {
        return (this._nOffset !== 0 || this._nOffRelative !== 0);
    }

    public getPositiveOffset(length: number) {
        if (this.hasPositiveOffset()) {
            if (this._version === BinaryConstants.BINARY_VERSION_2) {
                return this._pOffset;
            } else if (this._version === BinaryConstants.BINARY_VERSION_3) {
                return Math.round(this._pOffRelative * length / Offsets._PERCENTAGE);
            }
        }
        return 0;
    }

    public getNegativeOffset(length: number) {
        if (this.hasNegativeOffset()) {
            if (this._version === BinaryConstants.BINARY_VERSION_2) {
                return this._nOffset;
            } else if (this._version === BinaryConstants.BINARY_VERSION_3) {
                return Math.round(this._nOffRelative * length / Offsets._PERCENTAGE);
            }
        }
        return 0;
    }

    public static fromValues(pOff: number, nOff: number) {
        const offsets = new Offsets();
        offsets._pOffset = pOff;
        offsets._nOffset = nOff;
        offsets._version = BinaryConstants.BINARY_VERSION_2;
        offsets._pOffRelative = 0.0;
        offsets._nOffRelative = 0.0;
        return offsets;
    }

    public static fromRelativeValues(pOff: number, nOff: number) {
        const offsets = new Offsets();
        offsets._pOffset = 0;
        offsets._nOffset = 0;
        offsets._version = BinaryConstants.BINARY_VERSION_3;
        offsets._pOffRelative = pOff;
        offsets._nOffRelative = nOff;
        return offsets;
    }
}
