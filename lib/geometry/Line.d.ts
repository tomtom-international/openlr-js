export default class Line {
    protected _x1: number;
    protected _y1: number;
    protected _x2: number;
    protected _y2: number;
    static fromValues(x1: number, y1: number, x2: number, y2: number): Line;
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
    intersectsLineValues(x1: number, y1: number, x2: number, y2: number): boolean;
    intersectsLineObject(line: Line): boolean;
    static relativeCCW(x1: number, y1: number, x2: number, y2: number, px: number, py: number): 1 | 0 | -1;
    static linesIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): boolean;
}
