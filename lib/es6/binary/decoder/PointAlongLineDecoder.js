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
import { AbstractDecoder } from './AbstractDecoder';
import { FirstLRP } from '../data/FirstLRP';
import { LastLRP } from '../data/LastLRP';
import { Offset } from '../data/Offset';
import { Offsets } from '../../data/Offsets';
import { RawPointAlongLineLocationReference } from '../../data/raw-location-reference/RawPointAlongLineLocationReference';
export class PointAlongLineDecoder extends AbstractDecoder {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        const firstLRP = FirstLRP.fromBitStreamInput(bitStreamInput);
        const lrp1 = this._createFirstLRP(1, firstLRP);
        const orientation = this._resolveOrientation(firstLRP.attrib1);
        const lastLRP = LastLRP.fromBitStreamInput(bitStreamInput);
        const lrp2 = this._createLastLRP(2, lastLRP, lrp1.getLongitudeDeg(), lrp1.getLatitudeDeg());
        const sideOfRoad = this._resolveSideOfRoad(lastLRP.attrib1);
        let offsets = Offsets.fromValues(0, 0);
        let posOff = null;
        if (lastLRP.attrib4.pOffsetF === 1) {
            posOff = Offset.fromBitStreamInput(bitStreamInput);
            const rawLocRef = this._calculateRelativeDistance(posOff.offset);
            offsets = Offsets.fromRelativeValues(rawLocRef, 0.0);
        }
        const rawLocationReference = RawPointAlongLineLocationReference.fromPointAlongLineValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation);
        if (binaryData !== null) {
            binaryData.firstLRP = firstLRP;
            binaryData.lastLRP = lastLRP;
            binaryData.posOffset = posOff;
        }
        return rawLocationReference;
    }
}
//# sourceMappingURL=PointAlongLineDecoder.js.map