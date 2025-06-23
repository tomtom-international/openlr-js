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

import { BinaryInformation } from './BinaryInformation';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';

export class AbstractCoordinate extends BinaryInformation {
    protected _lon!: number;

    protected _lat!: number;

    protected _coordBits!: number;

    public get lon() {
        return this._lon;
    }

    public get lat() {
        return this._lat;
    }

    public putCoordinates(bitStreamOutput: BitStreamOutput) {
        bitStreamOutput.putBits(this._lon, this._coordBits);
        bitStreamOutput.putBits(this._lat, this._coordBits);
    }

    protected _read(bitStreamInput: BitStreamInput) {
        this._lon = bitStreamInput.getSignedBits(this._coordBits);
        this._lat = bitStreamInput.getSignedBits(this._coordBits);
    }

    public static fromBitCount(countBits: number) {
        const abstractCoordinate = new AbstractCoordinate();
        abstractCoordinate._coordBits = countBits;
        return abstractCoordinate;
    }
}
