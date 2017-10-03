/**
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

import BinaryConstants from '../BinaryConstants';

/** Unknown radius type */
const UNKNOWN = 0;
/** Small radius (BINARY_VERSION_3: up to 255m) */
const SMALL = 1;
/** Medium radius (BINARY_VERSION_3: up to 65536m) */
const MEDIUM = 2;
/** Large radius (BINARY_VERSION_3: up to 16777216m) */
const LARGE = 3;
/** Extra large radius (BINARY_VERSION_3: up to 4294967296m) */
const EXTRA_LARGE = 4;

export default class Radius {
    /** The Constant MAX_RADIUS_SMALL. */
    static _MAX_RADIUS_SMALL = Math.pow(2, BinaryConstants.SMALL_RADIUS_BITS);

    /** The Constant MAX_RADIUS_MEDIUM. */
    static _MAX_RADIUS_MEDIUM = Math.pow(2, BinaryConstants.MEDIUM_RADIUS_BITS);

    /** The Constant MAX_RADIUS_LARGE. */
    static _MAX_RADIUS_LARGE = Math.pow(2, BinaryConstants.LARGE_RADIUS_BITS);

    /** The Constant MAX_RADIUS_EXTRA_LARGE. */
    static _MAX_RADIUS_EXTRA_LARGE = Math.pow(2, BinaryConstants.EXTRA_LARGE_RADIUS_BITS);

    /**
     * The Enum RadiusType.
     */
    static RadiusType = {
        SMALL,
        MEDIUM,
        LARGE,
        EXTRA_LARGE,
        UNKNOWN,
        resolveRadius: type => type >= UNKNOWN && type <= EXTRA_LARGE ? type : UNKNOWN

    };

    // The radius (up to 4 bytes) according to OpenLR white paper.
    _radius;

    static fromValues(radiusValue) {
        const radius = new Radius();
        radius._radius = radiusValue;
        return radius;
    }

    static fromBitStreamInput(bitStreamInput, type) {
        const radius = new Radius();
        switch (type) {
            case SMALL:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.SMALL_RADIUS_BITS));
                break;
            case MEDIUM:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.MEDIUM_RADIUS_BITS));
                break;
            case LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.LARGE_RADIUS_BITS));
                break;
            case EXTRA_LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.EXTRA_LARGE_RADIUS_BITS));
                break;
            default:
                throw new Error('Invalid value range');
        }
        return radius;
    }


    put(bitStreamOutput) {
        if (this._radius <= Radius._MAX_RADIUS_SMALL) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.SMALL_RADIUS_BITS);
        } else if (this._radius <= Radius._MAX_RADIUS_MEDIUM) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.MEDIUM_RADIUS_BITS);
        } else if (this._radius <= Radius._MAX_RADIUS_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.LARGE_RADIUS_BITS);
        } else if (this._radius <= Radius._MAX_RADIUS_EXTRA_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.EXTRA_LARGE_RADIUS_BITS);
        } else {
            throw new Error('Invalid range');
        }
    }

    get radius() {
        return this._radius;
    }


    static _intToLong(integer) {
        if (integer < 0) {
            return integer & (Radius._MAX_RADIUS_EXTRA_LARGE - 1);
        } else {
            return integer;
        }
    }
};
