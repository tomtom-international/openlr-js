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

import AbstractEncoder from './AbstractEncoder';
import LocationReference from '../../data/LocationReference';
import BinaryReturnCode from '../BinaryReturnCode';
import LocationType from '../../data/LocationType';
import BitStreamOutput from '../bit-stream/BitStreamOutput';

export default class GeoCoordEncoder extends AbstractEncoder {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null) {
            return LocationReference.fromValues('', BinaryReturnCode.MISSING_DATA, LocationType.GEO_COORDINATES, version);
        } else {
            const coord = rawLocationReference.getGeoCoordinates();
            if (coord === null) {
                return LocationReference.fromValues('', BinaryReturnCode.MISSING_DATA, LocationType.GEO_COORDINATES, version);
            } else if (version < 3) {
                return LocationReference.fromValues('', BinaryReturnCode.INVALID_VERSION, LocationType.GEO_COORDINATES, version);
            } else {
                return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryGeoCoordLocation(coord, version));
            }
        }
    }

    _generateBinaryGeoCoordLocation(coord, version) {
        const header = this._generateHeader(version, LocationType.GEO_COORDINATES, false);
        const absCoord = this._generateAbsCoord(coord);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        absCoord.put(out);
        return out.getData();
    }
};
