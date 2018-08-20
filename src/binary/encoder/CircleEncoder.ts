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

import * as BinaryConstants from '../BinaryConstants';
import { AbstractEncoder } from './AbstractEncoder';
import { LocationReference } from '../../data/LocationReference';
import { BinaryReturnCode } from '../BinaryReturnCode';
import { LocationType } from '../../data/LocationType';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';
import { RawLocationReference } from '../../data/raw-location-reference/RawLocationReference';
import { GeoCoordinates } from '../../map/GeoCoordinates';

export class CircleEncoder extends AbstractEncoder {
    public encodeData(rawLocationReference: RawLocationReference, version: number) {
        const center = rawLocationReference.getCenterPoint();
        const radius = rawLocationReference.getRadius();
        if (center === null) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.CIRCLE, version);
        }
        if (radius < 0) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_RADIUS, LocationType.CIRCLE, version);
        }
        if (version < BinaryConstants.BINARY_VERSION_3) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_VERSION, LocationType.CIRCLE, version);
        }
        return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryCircleLocation(center, radius, version));
    }

    protected _generateBinaryCircleLocation(center: GeoCoordinates, r: number, version: number) {
        const radius = this._generateRadius(r); // r represents radius in meters
        const absCoord = this._generateAbsCoord(center);
        const header = this._generateHeader(version, LocationType.CIRCLE, false);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        absCoord.put(out);
        if (radius != null) {
            radius.put(out);
        }
        return out.getData();
    }
}
