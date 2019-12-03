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
import { AbstractEncoder } from './AbstractEncoder';
import { LocationReference } from '../../data/LocationReference';
import { BinaryReturnCode } from '../BinaryReturnCode';
import { LocationType } from '../../data/LocationType';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';
import { RawLocationReference } from '../../data/raw-location-reference/RawLocationReference';
import { GeoCoordinates } from '../../map/GeoCoordinates';
import { RelativeCoordinates } from '../data/RelativeCoordinates';
import { RawGeoCoordLocationReference } from '../../data/raw-location-reference/RawGeoCoordLocationReference';
import { GeoCoordEncoder } from './GeoCoordEncoder';
import { Buffer } from 'buffer';
import { BinaryDecoder } from '../BinaryDecoder';
import { Serializer } from '../../data/Serializer';

export class PolygonEncoder extends AbstractEncoder {
    public encodeData(rawLocationReference: RawLocationReference, version: number) {
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

    protected _processCornerPoints(cornerPoints: Array<GeoCoordinates>, version: number) {
        const binaryEncoder = new GeoCoordEncoder();
        const binaryDecoder = new BinaryDecoder();
        return cornerPoints.map((geoCoordinates) => {
            const rawGeoCoordLocationReference = RawGeoCoordLocationReference.fromGeoCoordValues('point', geoCoordinates);
            const encodedPointReference = binaryEncoder.encodeData(rawGeoCoordLocationReference, version);
            if (encodedPointReference) {
                const encodedPointOpenLrBinary = encodedPointReference.getLocationReferenceData();
                if (encodedPointOpenLrBinary) {
                    const openLrString = encodedPointOpenLrBinary.toString('base64');
                    const openLrBinary = Buffer.from(openLrString, 'base64');
                    const locationReference = LocationReference.fromIdAndBuffer('binary', openLrBinary);
                    const rawLocationReference = binaryDecoder.decodeData(locationReference);
                    const serializedRawLocationReference = Serializer.serialize(rawLocationReference);
                    const deserializerRawLocationReference = Serializer.deserialize(serializedRawLocationReference);
                    const geoCoordinates = deserializerRawLocationReference.getGeoCoordinates();
                    return geoCoordinates;
                }
            }
        });
    }

    protected _generateBinaryPolygonLocation(cornerPoints: Array<GeoCoordinates>, version: number) {
        const convertedCornerPoints = this._processCornerPoints(cornerPoints, version);
        let prevCoord = convertedCornerPoints[0];
        const firstCornerPoint = this._generateAbsCoord(prevCoord);

        const relCornerCoords: Array<RelativeCoordinates> = [];

        for (let i = 1; i < convertedCornerPoints.length; i++) {
            const geoCoord = convertedCornerPoints[i];

            const relRepValLon = this._getRelativeRepresentation(prevCoord.getLongitudeDeg(), geoCoord.getLongitudeDeg());
            const relRepValLat = this._getRelativeRepresentation(prevCoord.getLatitudeDeg(), geoCoord.getLatitudeDeg());
            if (this._fitsInto2Bytes(relRepValLon) && this._fitsInto2Bytes(relRepValLat)) {
                const relCornerCoord = RelativeCoordinates.fromValues(relRepValLon, relRepValLat);
                relCornerCoords.push(relCornerCoord);
                prevCoord = geoCoord;
            }
        }

        const header = this._generateHeader(version, LocationType.POLYGON, false);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        firstCornerPoint.put(out);
        relCornerCoords.forEach((relCoord) => relCoord.put(out));

        return out.getData();
    }
}
