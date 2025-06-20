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

import { Buffer } from 'buffer';
import * as BinaryConstants from './BinaryConstants';
import { BinaryReturnCode } from './BinaryReturnCode';
import { BitStreamInput } from './bit-stream/BitStreamInput';
import { RawInvalidLocationReference } from '../data/raw-location-reference/RawInvalidLocationReference';
import { Header } from './data/Header';
import { LineDecoder } from './decoder/LineDecoder';
import { PointAlongLineDecoder } from './decoder/PointAlongLineDecoder';
import { GeoCoordDecoder } from './decoder/GeoCoordDecoder';
import { PolygonDecoder } from './decoder/PolygonDecoder';
import { CircleDecoder } from './decoder/CircleDecoder';
import { RawBinaryData } from './data/RawBinaryData';
import { LocationReference } from '../data/LocationReference';
import { AbstractDecoder } from './decoder/AbstractDecoder';
import { RawLocationReference } from '../data/raw-location-reference/RawLocationReference';

export class BinaryDecoder {
    protected static _VERSIONS = [2, 3];

    public decodeData(locationReference: LocationReference) {
        const data = locationReference.getLocationReferenceData();
        if (data === null) {
            return RawInvalidLocationReference.fromIdAndStatusCode(locationReference.getId(), BinaryReturnCode.NOT_ENOUGH_BYTES);
        } else {
            return this._parseBinaryData(locationReference.getId(), data, null);
        }
    }

    public getDataFormatIdentifier() {
        return BinaryConstants.IDENTIFIER;
    }

    public resolveBinaryData(id: string, data: Buffer) {
        const binaryData = new RawBinaryData();
        this._parseBinaryData(id, data, binaryData);
        return binaryData;
    }

    protected _checkVersion(header: Header) {
        const ver = header.ver;
        for (const v of BinaryDecoder._VERSIONS) {
            if (v === ver) {
                return true;
            }
        }
        return false;
    }

    protected _parseBinaryData(id: string, data: Buffer, binaryData: RawBinaryData | null) {
        const totalBytes = data.length;

        // Check if enough bytes available
        if (totalBytes < Math.min(BinaryConstants.MIN_BYTES_LINE_LOCATION, Math.min(Math.min(BinaryConstants.MIN_BYTES_POINT_LOCATION, BinaryConstants.MIN_BYTES_POLYGON), BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION))) {
            return RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.NOT_ENOUGH_BYTES);
        }

        // Read in data
        const bitStreamInput = BitStreamInput.fromBufferAndLength(data, totalBytes);
        let header;
        // Read header information
        try {
            header = Header.fromBitStreamInput(bitStreamInput);
            if (binaryData !== null) {
                binaryData.header = header;
            }
        } catch (error) {
            return RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.READING_HEADER_FAILURE);
        }

        // Check version
        if (!this._checkVersion(header)) {
            return RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_VERSION);
        }

        const isPointLocation = header.pf === BinaryConstants.IS_POINT;
        const hasAttributes = header.af === BinaryConstants.HAS_ATTRIBUTES;
        const areaLocationCode = header.arf;
        const isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
        let rawLocRef: RawLocationReference | null = null;
        let decoder: AbstractDecoder | null = null;
        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            decoder = new LineDecoder();
        } else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants.GEOCOORD_SIZE) {
                    decoder = new GeoCoordDecoder();
                } else {
                    rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
                }
            } else {
                if (totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    decoder = new PointAlongLineDecoder();
                } else if (totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    // decoder = new PoiAccessDecoder();
                    throw new Error('PoiAccessDecider not implemented');
                } else {
                    rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
                }
            }
        } else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION) {
                // decoder = new ClosedLineDecoder();
                throw new Error('ClosedLineDecoder not implemented');
            } else {
                rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
            }
        } else {
            switch (areaLocationCode) {
                case BinaryConstants.AREA_CODE_CIRCLE:
                    decoder = new CircleDecoder();
                    break;
                case BinaryConstants.AREA_CODE_RECTANGLE:
                    /* includes case OpenLRBinaryConstants.AREA_CODE_GRID */
                    if (totalBytes === BinaryConstants.RECTANGLE_SIZE || totalBytes === BinaryConstants.LARGE_RECTANGLE_SIZE) {
                        // decoder = new RectangleDecoder();
                        throw new Error('RectangleDecoder not implemented');
                    } else if (totalBytes === BinaryConstants.GRID_SIZE || totalBytes === BinaryConstants.LARGE_GRID_SIZE) {
                        // decoder = new GridDecoder();
                        throw new Error('GridDecoder not implemented');
                    } else {
                        rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
                    }
                    break;
                case BinaryConstants.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants.MIN_BYTES_POLYGON) {
                        decoder = new PolygonDecoder();
                    } else {
                        rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_BYTE_SIZE);
                    }
                    break;
                default:
                    rawLocRef = RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode.INVALID_HEADER);
            }
        }
        if (decoder !== null) {
            rawLocRef = decoder.decodeData(id, bitStreamInput, totalBytes, header.ver, binaryData);
        }
        return rawLocRef;
    }

    public static getVersions() {
        return BinaryDecoder._VERSIONS;
    }
}
