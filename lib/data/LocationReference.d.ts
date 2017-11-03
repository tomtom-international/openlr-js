/// <reference types="node" />
import LocationType from './LocationType';
export default class LocationReference {
    protected _id: string;
    protected _locationType: LocationType;
    protected _returnCode: number | null;
    protected _data: Buffer | null;
    protected _version: number;
    protected static _VERSION_MASK: number;
    static fromIdAndBuffer(id: string, data: Buffer): LocationReference;
    static fromValues(id: string, returnCode: number, locationType: LocationType, version: number): LocationReference;
    protected static _checkVersion(ver: number): boolean;
    protected static _resolveVersion(data: Buffer): number;
    protected static _resolveLocationType(data: Buffer): LocationType;
    getReturnCode(): number | null;
    getId(): string;
    isValid(): boolean;
    getDataIdentifier(): string;
    getLocationReferenceData(): Buffer | null;
    getLocationType(): LocationType;
    getVersion(): number;
}
