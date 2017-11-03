import BitStreamInput from '../bit-stream/BitStreamInput';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export declare enum RadiusType {
    SMALL = 1,
    MEDIUM = 2,
    LARGE = 3,
    EXTRA_LARGE = 4,
    UNKNOWN = 0,
}
export declare const resolveRadius: (bytes: number) => RadiusType;
export default class Radius {
    protected static _MAX_RADIUS_SMALL: number;
    protected static _MAX_RADIUS_MEDIUM: number;
    protected static _MAX_RADIUS_LARGE: number;
    protected static _MAX_RADIUS_EXTRA_LARGE: number;
    protected _radius: number;
    static fromValues(radiusValue: number): Radius;
    static fromBitStreamInput(bitStreamInput: BitStreamInput, type: RadiusType): Radius;
    put(bitStreamOutput: BitStreamOutput): void;
    readonly radius: number;
    protected static _intToLong(integer: number): number;
}
