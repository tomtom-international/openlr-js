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
import { LocationType } from './LocationType';
export declare class LocationReference {
    /** The Constant VERSION_MASK. */
    protected static _VERSION_MASK: number;
    /** The unique id. */
    protected _id: string;
    /** The loc type. */
    protected _locationType: LocationType;
    /** The error. */
    protected _returnCode: number | null;
    /** The binary location reference data. Implemented as a Node JS buffer. */
    protected _data: Buffer | null;
    /** The version. */
    protected _version: number;
    getReturnCode(): number | null;
    getId(): string;
    isValid(): boolean;
    getDataIdentifier(): string;
    getLocationReferenceData(): Buffer | null;
    getLocationType(): LocationType;
    getVersion(): number;
    static fromIdAndBuffer(id: string, data: Buffer): LocationReference;
    static fromValues(id: string, returnCode: number, locationType: LocationType, version: number): LocationReference;
    protected static _checkVersion(ver: number): boolean;
    protected static _resolveVersion(data: Buffer): number;
    protected static _resolveLocationType(data: Buffer): LocationType;
}
