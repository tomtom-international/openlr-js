/// <reference types="node" />
export default class BitStreamAbstract {
    protected static _BIT_BYTE_SHIFT: number;
    protected static _BYTE_SIZE: number;
    protected static _HIGHEST_BIT: number;
    protected static _BITMASK: number[];
    protected static _COMPLEMENT_MASK: number[];
    protected static _SIGNED_MASK: number[];
    protected static _DEFAULT_BUFFER_LENGTH: number;
    protected static _MAX_BIT_SIZE: number;
    protected _buffer: Buffer;
    protected _totalBufferLengthBytes: number;
    protected _currentBit: number;
    protected _expandBuffer(newLength?: number): void;
    protected _createBuffer(length: number): void;
    protected _getData(): Buffer;
}
