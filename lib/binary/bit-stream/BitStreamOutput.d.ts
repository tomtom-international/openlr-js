/// <reference types="node" />
import BitStreamAbstract from './BitStreamAbstract';
export default class BitStreamOutput extends BitStreamAbstract {
    static fromValues(): BitStreamOutput;
    static fromLength(length: number): BitStreamOutput;
    putBits(value: number, countBitsToPut: number): number;
    getData(): Buffer;
}
