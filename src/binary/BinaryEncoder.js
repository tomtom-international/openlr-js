/**
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

import BinaryConstants from './BinaryConstants';
import LocationReference from '../data/LocationReference';
import BinaryReturnCode from './BinaryReturnCode';
import LocationType from '../data/LocationType';
import LineEncoder from './encoder/LineEncoder';
import PointAlongLineEncoder from './encoder/PointAlongLineEncoder';

export default class BinaryEncoder {
    /** The Constant VERSIONS. */
    static _VERSIONS = [2, 3];

    _checkVersion(version, locationType) {
        let valid = false;
        for (let ver of BinaryEncoder._VERSIONS) {
            if (version === ver) {
                valid = true;
            }
        }
        if (BinaryConstants.POINT_LOCATION_TYPES.has(locationType) && version < BinaryConstants.POINT_LOCATION_VERSION) {
            valid = false;
        }
        if (BinaryConstants.AREA_LOCATION_TYPES.has(locationType) && version < BinaryConstants.AREA_LOCATION_VERSION) {
            valid = false;
        }
        return valid;
    }

    getDataFormatIdentifier() {
        return BinaryConstants.IDENTIFIER;
    }

    getSupportedVersions() {
        return BinaryEncoder._VERSIONS;
    }

    encodeDataFromRLR(rawLocationReference) {
        return this.encodeDataFromRLRAndVersion(rawLocationReference, BinaryEncoder._VERSIONS[BinaryEncoder._VERSIONS.length - 1]);
    }

    encodeDataFromRLRAndVersion(rawLocationReference, version) {
        const locationType = rawLocationReference.getLocationType();
        if (!this._checkVersion(version, locationType)) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_VERSION, locationType, version);
        }
        let encoder = null;
        switch (locationType) {
            case LocationType.GEO_COORDINATES:
                //encoder = new GeoCoordEncoder();
                throw new Error('GeoCoordEncoder not implemented');
                break;
            case LocationType.LINE_LOCATION:
                encoder = new LineEncoder();
                break;
            case LocationType.POI_WITH_ACCESS_POINT:
                //encoder = new PoiAccessEncoder();
                throw new Error('PoiAccessEncoder not implemented');
                break;
            case LocationType.POINT_ALONG_LINE:
                encoder = new PointAlongLineEncoder();
                break;
            case LocationType.CIRCLE:
                //encoder = new CircleEncoder();
                throw new Error('CircleEncoder not implemented');
                break;
            case LocationType.RECTANGLE:
                //encoder = new RectangleEncoder();
                throw new Error('RectangleEncoder not implemented');
                break;
            case LocationType.GRID:
                //encoder = new GridEncoder();
                throw new Error('GridEncoder not implemented');
                break;
            case LocationType.POLYGON:
                //encoder = new PolygonEncoder();
                throw new Error('PolygonEncoder not implemented');
                break;
            case LocationType.CLOSED_LINE:
                //encoder = new ClosedLineEncoder();
                throw new Error('ClosedLineEncoder not implemented');
                break;
            case LocationType.UNKNOWN:
            default:
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.UNKNOWN_LOCATION_TYPE, locationType, version);
        }
        return encoder.encodeData(rawLocationReference, version);
    }
};
