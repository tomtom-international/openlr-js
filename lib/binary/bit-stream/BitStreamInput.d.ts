/// <reference types="node" />
import BitStreamAbstract from './BitStreamAbstract';
export default class BitStreamInput extends BitStreamAbstract {
    protected _bufferFilledBytes: number;
    protected _inBuffer: Buffer;
    static fromString(string: string, encoding: string): BitStreamInput;
    static fromStringAndLength(string: string, encoding: string, length: number): BitStreamInput;
    static fromBuffer(buffer: Buffer): BitStreamInput;
    static fromBufferAndLength(buffer: Buffer, length: number): BitStreamInput;
    protected _getNextBits(count: number): number;
    protected _getNextSignedBits(count: number): number;
    getBits(count: number): number;
    getSignedBits(count: number): number;
    protected _fillBufferFromInput(): void;
}
