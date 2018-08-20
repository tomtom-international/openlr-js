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

import { AbstractEncoder } from './AbstractEncoder';
import { LocationReference } from '../../data/LocationReference';
import { BinaryReturnCode } from '../BinaryReturnCode';
import { LocationType } from '../../data/LocationType';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';
import { RawLocationReference } from '../../data/raw-location-reference/RawLocationReference';
import { GeoCoordinates } from '../../map/GeoCoordinates';

export class GeoCoordEncoder extends AbstractEncoder {
    public encodeData(rawLocationReference: RawLocationReference, version: number) {
        const coord = rawLocationReference.getGeoCoordinates();
        if (coord === null) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.GEO_COORDINATES, version);
        } else if (version < 3) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_VERSION, LocationType.GEO_COORDINATES, version);
        } else {
            return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryGeoCoordLocation(coord, version));
        }
    }

    protected _generateBinaryGeoCoordLocation(coord: GeoCoordinates, version: number) {
        const header = this._generateHeader(version, LocationType.GEO_COORDINATES, false);
        const absCoord = this._generateAbsCoord(coord);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        absCoord.put(out);
        return out.getData();
    }
}
