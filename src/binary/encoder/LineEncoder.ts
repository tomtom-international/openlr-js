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

import { AbstractEncoder } from './AbstractEncoder';
import { LocationReference } from '../../data/LocationReference';
import { BinaryReturnCode } from '../BinaryReturnCode';
import { LocationType } from '../../data/LocationType';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';
import { RawLocationReference } from '../../data/raw-location-reference/RawLocationReference';
import { Offsets } from '../../data/Offsets';
import { LocationReferencePoint } from '../../data/LocationReferencePoint';

export class LineEncoder extends AbstractEncoder {
    public encodeData(rawLocationReference: RawLocationReference, version: number) {
        const locationReferences = rawLocationReference.getLocationReferencePoints();
        if (locationReferences !== null) {
            const offsets = rawLocationReference.getOffsets();
            if (offsets === null || locationReferences.length <= 0) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.LINE_LOCATION, version);
            }
            let returnCode = this._checkOffsets(offsets, true, locationReferences);
            if (!returnCode) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.LINE_LOCATION, version);
            }
            returnCode = this._checkOffsets(offsets, false, locationReferences);
            if (!returnCode) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.LINE_LOCATION, version);
            }
            return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryLineLocation(locationReferences, offsets, version));
        } else {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.LINE_LOCATION, version);
        }
    }

    protected _generateBinaryLineLocation(locationReferences: Array<LocationReferencePoint>, offsets: Offsets, version: number) {
        const header = this._generateHeader(version, LocationType.LINE_LOCATION, true);
        const firstLRP = this._generateFirstLRPFromLRP(locationReferences[0]);
        const lrps = this._generateLRPs(locationReferences);
        const pOff = this._generateOffset(offsets, true, version, locationReferences);
        const nOff = this._generateOffset(offsets, false, version, locationReferences);
        const lastLRP = this._generateLastLrpFromPointsAndOffsets(locationReferences, pOff, nOff);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        firstLRP.put(out);
        for (const lrp of lrps) {
            lrp.put(out);
        }
        lastLRP.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        if (nOff !== null) {
            nOff.put(out);
        }
        return out.getData();
    }
}
