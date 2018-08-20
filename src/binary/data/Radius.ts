/**
 * Copyright 2018 TomTom International B.V
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

import * as BinaryConstants from '../BinaryConstants';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';

export enum RadiusType {
    /** Small radius (BINARY_VERSION_3: up to 255m) */
    SMALL = 1,
    /** Medium radius (BINARY_VERSION_3: up to 65536m) */
    MEDIUM = 2,
    /** Large radius (BINARY_VERSION_3: up to 16777216m) */
    LARGE = 3,
    /** Extra large radius (BINARY_VERSION_3: up to 4294967296m) */
    EXTRA_LARGE = 4,
    /** Unknown radius type */
    UNKNOWN = 0
}

export const resolveRadius = (bytes: number): RadiusType => {
    return bytes >= RadiusType.UNKNOWN && bytes <= RadiusType.EXTRA_LARGE ? bytes : RadiusType.UNKNOWN;
};

export class Radius {
    /** The Constant MAX_RADIUS_SMALL. */
    protected static _MAX_RADIUS_SMALL = Math.pow(2, BinaryConstants.SMALL_RADIUS_BITS);

    /** The Constant MAX_RADIUS_MEDIUM. */
    protected static _MAX_RADIUS_MEDIUM = Math.pow(2, BinaryConstants.MEDIUM_RADIUS_BITS);

    /** The Constant MAX_RADIUS_LARGE. */
    protected static _MAX_RADIUS_LARGE = Math.pow(2, BinaryConstants.LARGE_RADIUS_BITS);

    /** The Constant MAX_RADIUS_EXTRA_LARGE. */
    protected static _MAX_RADIUS_EXTRA_LARGE = Math.pow(2, BinaryConstants.EXTRA_LARGE_RADIUS_BITS);

    // The radius (up to 4 bytes) according to OpenLR white paper.
    protected _radius!: number;

    public put(bitStreamOutput: BitStreamOutput) {
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

    public static fromValues(radiusValue: number) {
        const radius = new Radius();
        radius._radius = radiusValue;
        return radius;
    }

    public static fromBitStreamInput(bitStreamInput: BitStreamInput, type: RadiusType) {
        const radius = new Radius();
        switch (type) {
            case RadiusType.SMALL:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.SMALL_RADIUS_BITS));
                break;
            case RadiusType.MEDIUM:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.MEDIUM_RADIUS_BITS));
                break;
            case RadiusType.LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.LARGE_RADIUS_BITS));
                break;
            case RadiusType.EXTRA_LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.EXTRA_LARGE_RADIUS_BITS));
                break;
            default:
                throw new Error('Invalid value range');
        }
        return radius;
    }

    public get radius() {
        return this._radius;
    }

    protected static _intToLong(integer: number) {
        if (integer < 0) {
            return integer & (Radius._MAX_RADIUS_EXTRA_LARGE - 1);
        } else {
            return integer;
        }
    }
}
