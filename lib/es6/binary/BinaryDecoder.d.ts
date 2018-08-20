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
/// <reference types="node" />
import { Header } from './data/Header';
import { RawBinaryData } from './data/RawBinaryData';
import { LocationReference } from '../data/LocationReference';
import { RawLocationReference } from '../data/raw-location-reference/RawLocationReference';
export declare class BinaryDecoder {
    protected static _VERSIONS: number[];
    decodeData(locationReference: LocationReference): RawLocationReference | null;
    getDataFormatIdentifier(): string;
    resolveBinaryData(id: string, data: Buffer): RawBinaryData;
    protected _checkVersion(header: Header): boolean;
    protected _parseBinaryData(id: string, data: Buffer, binaryData: RawBinaryData | null): RawLocationReference | null;
    static getVersions(): number[];
}
