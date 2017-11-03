export default class Offsets {
    protected static _PERCENTAGE: number;
    protected _pOffset: number;
    protected _nOffset: number;
    protected _pOffRelative: number;
    protected _nOffRelative: number;
    protected _version: number;
    static fromValues(pOff: number, nOff: number): Offsets;
    static fromRelativeValues(pOff: number, nOff: number): Offsets;
    hasPositiveOffset(): boolean;
    hasNegativeOffset(): boolean;
    getPositiveOffset(length: number): number;
    getNegativeOffset(length: number): number;
}
