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
import { LocationReference } from '../data/LocationReference';
import { LocationType } from '../data/LocationType';
import { RawLocationReference } from '../data/raw-location-reference/RawLocationReference';
export declare class BinaryEncoder {
    /** The Constant VERSIONS. */
    protected static _VERSIONS: number[];
    getDataFormatIdentifier(): string;
    getSupportedVersions(): number[];
    encodeDataFromRLR(rawLocationReference: RawLocationReference): void | LocationReference;
    encodeDataFromRLRAndVersion(rawLocationReference: RawLocationReference, version: number): void | LocationReference;
    protected _checkVersion(version: number, locationType: LocationType): boolean;
}
