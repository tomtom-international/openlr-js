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
import AbstractEncoder from './AbstractEncoder';
import LocationReference from '../../data/LocationReference';
import BinaryReturnCode from '../BinaryReturnCode';
import LocationType from '../../data/LocationType';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
import RawLocationReference from '../../data/raw-location-reference/RawLocationReference';
import GeoCoordinates from '../../map/GeoCoordinates';
import RelativeCoordinates from '../data/RelativeCoordinates';

export default class PolygonEncoder extends AbstractEncoder {
    public encodeData(rawLocationReference: RawLocationReference, version: number) {
        if (rawLocationReference === null) {
            return LocationReference.fromValues('', BinaryReturnCode.MISSING_DATA, LocationType.POLYGON, version);
        }
        const id = rawLocationReference.getId();
        const cornerPoints = rawLocationReference.getCornerPoints();

        if (cornerPoints === null) {
            return LocationReference.fromValues(id, BinaryReturnCode.MISSING_DATA, LocationType.POLYGON, version);
		}
		if (version < BinaryConstants.BINARY_VERSION_3) {
			return LocationReference.fromValues(id, BinaryReturnCode.INVALID_VERSION, LocationType.POLYGON, version);
        }

        let lr: LocationReference | null = null;


		try {
            lr = LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPolygonLocation(cornerPoints, version));
		} catch (error) {
            lr = LocationReference.fromValues(id, BinaryReturnCode.INVALID_BINARY_DATA, LocationType.POLYGON, version);
		}
        return lr;
    }

    protected _generateBinaryPolygonLocation(cornerPoints: Array<GeoCoordinates>, version: number) {
        let prevCoord = cornerPoints[0];
        const firstCornerPoint = this._generateAbsCoord(prevCoord);

        const relCornerCoords: Array<RelativeCoordinates> = [];

        for (let i = 1; i < cornerPoints.length; i++) {
            const geoCoord = cornerPoints[i];

            const relRepValLon = this._getRelativeRepresentation(prevCoord.getLongitudeDeg(), geoCoord.getLongitudeDeg());
            const relRepValLat = this._getRelativeRepresentation(prevCoord.getLatitudeDeg(), geoCoord.getLatitudeDeg());
            if (this._fitsInto2Bytes(relRepValLon) && this._fitsInto2Bytes(relRepValLat)) {
                const relCornerCoord = RelativeCoordinates.fromValues(relRepValLon, relRepValLat);
                relCornerCoords.push(relCornerCoord);
                prevCoord = geoCoord;
            } else {
                throw new Error('PolygonEncoder invalid invalid relative coordinates');
            }
        }

        const header = this._generateHeader(version, LocationType.POLYGON, false);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        firstCornerPoint.put(out);
		relCornerCoords.forEach((relCoord) => relCoord.put(out));

        return out.getData();
    }
};
