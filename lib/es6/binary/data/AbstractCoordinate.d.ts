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
import { BinaryInformation } from './BinaryInformation';
import { BitStreamInput } from '../bit-stream/BitStreamInput';
import { BitStreamOutput } from '../bit-stream/BitStreamOutput';
export declare class AbstractCoordinate extends BinaryInformation {
    protected _lon: number;
    protected _lat: number;
    protected _coordBits: number;
    putCoordinates(bitStreamOutput: BitStreamOutput): void;
    protected _read(bitStreamInput: BitStreamInput): void;
    static fromBitCount(countBits: number): AbstractCoordinate;
    readonly lon: number;
    readonly lat: number;
}
