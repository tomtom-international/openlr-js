/*
 * Copyright (c) 2020-2025 TomTom International B.V.
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

import { Buffer } from 'buffer';
import { BinaryDecoder } from '../binary/BinaryDecoder';
import { BitStreamInput } from '../binary/bit-stream/BitStreamInput';
import { Header } from '../binary/data/Header';
import * as BinaryConstants from '../binary/BinaryConstants';
import { LocationType } from './LocationType';

export class LocationReference {
    /** The Constant VERSION_MASK. */
    protected static _VERSION_MASK = 7;

    /** The unique id. */
    protected _id!: string;

    /** The loc type. */
    protected _locationType!: LocationType;

    /** The error. */
    protected _returnCode!: number | null;

    /** The binary location reference data. Implemented as a Node JS buffer. */
    protected _data!: Buffer | null;

    /** The version. */
    protected _version!: number;

    public getReturnCode() {
        return this._returnCode;
    }

    public getId() {
        return this._id;
    }

    public isValid() {
        return this._returnCode === null;
    }

    public getDataIdentifier() {
        return BinaryConstants.IDENTIFIER;
    }

    public getLocationReferenceData() {
        if (this.isValid()) {
            return this._data;
        } else {
            return null;
        }
    }

    public getLocationType() {
        return this._locationType;
    }

    public getVersion() {
        return this._version;
    }

    public static fromIdAndBuffer(id: string, data: Buffer) {
        const locationReference = new LocationReference();
        locationReference._id = id;
        locationReference._data = data;
        locationReference._returnCode = null;
        locationReference._locationType = LocationReference._resolveLocationType(data);
        const version = LocationReference._resolveVersion(data);
        if (!LocationReference._checkVersion(version)) {
            throw new Error('Invalid version');
        }
        locationReference._version = version;
        return locationReference;
    }

    public static fromValues(id: string, returnCode: number, locationType: LocationType, version: number) {
        const locationReference = new LocationReference();
        locationReference._id = id;
        locationReference._data = null;
        locationReference._returnCode = returnCode;
        locationReference._locationType = locationType;
        locationReference._version = version;
        return locationReference;
    }

    protected static _checkVersion(ver: number) {
        for (const v of BinaryDecoder.getVersions()) {
            if (ver === v) {
                return true;
            }
        }
        return false;
    }

    protected static _resolveVersion(data: Buffer) {
        if (data === null || data.length === 0) {
            throw new Error('Invalid binary data');
        }
        return data[0] & LocationReference._VERSION_MASK;
    }

    protected static _resolveLocationType(data: Buffer) {
        let locationType = null;
        const totalBytes = data.length;
        const bitStreamInput = BitStreamInput.fromBufferAndLength(data, totalBytes);
        const header = Header.fromBitStreamInput(bitStreamInput);
        const hasAttributes = header.af === BinaryConstants.HAS_ATTRIBUTES;
        const isPointLocation = header.pf === BinaryConstants.IS_POINT;
        const areaLocationCode = header.arf;
        const isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);

        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            locationType = LocationType.LINE_LOCATION;
        } else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants.GEOCOORD_SIZE) {
                    locationType = LocationType.GEO_COORDINATES;
                } else {
                    throw new Error('Byte size does not match geo coordinate location');
                }
            } else {
                if (totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    locationType = LocationType.POINT_ALONG_LINE;
                } else if (totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    locationType = LocationType.POI_WITH_ACCESS_POINT;
                } else {
                    throw new Error('Bye size does not match point location');
                }
            }
        } else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION) {
                locationType = LocationType.CLOSED_LINE;
            } else {
                throw new Error('Byte size does not match closed line location');
            }
        } else {
            switch (areaLocationCode) {
                case BinaryConstants.AREA_CODE_CIRCLE:
                    locationType = LocationType.CIRCLE;
                    break;
                case BinaryConstants.AREA_CODE_RECTANGLE:
                    /* Includes case BinaryConstants.AREA_CODE_GRID */
                    if (totalBytes === BinaryConstants.RECTANGLE_SIZE || totalBytes === BinaryConstants.LARGE_RECTANGLE_SIZE) {
                        locationType = LocationType.RECTANGLE;
                    } else if (totalBytes === BinaryConstants.GRID_SIZE || totalBytes === BinaryConstants.LARGE_GRID_SIZE) {
                        locationType = LocationType.GRID;
                    } else {
                        throw new Error('Byte size does not match area rectangle location');
                    }
                    break;
                case BinaryConstants.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants.MIN_BYTES_POLYGON) {
                        locationType = LocationType.POLYGON;
                    } else {
                        throw new Error('Byte size does not match polygon location');
                    }
                    break;
                default:
                    throw new Error('Byte size does not match area location');
            }
        }
        return locationType;
    }
}
