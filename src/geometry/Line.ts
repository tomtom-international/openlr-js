/**
 * Copyright 2020 TomTom International B.V
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

export class Line {
    protected _x1!: number;

    protected _y1!: number;

    protected _x2!: number;

    protected _y2!: number;

    public intersectsLineValues(x1: number, y1: number, x2: number, y2: number) {
        return Line.linesIntersect(x1, y1, x2, y2, this._x1, this._y1, this._x2, this._y2);
    }

    public intersectsLineObject(line: Line) {
        return Line.linesIntersect(line.x1, line.y1, line.x2, line.y2, this._x1, this._y1, this._x2, this._y2);
    }

    public static fromValues(x1: number, y1: number, x2: number, y2: number) {
        const line = new Line();
        line._x1 = x1;
        line._y1 = y1;
        line._x2 = x2;
        line._y2 = y2;
        return line;
    }

    public get x1() {
        return this._x1;
    }

    public get y1() {
        return this._y1;
    }

    public get x2() {
        return this._x2;
    }

    public get y2() {
        return this._y2;
    }

    public static relativeCCW(x1: number, y1: number, x2: number, y2: number, px: number, py: number) {
        x2 -= x1;
        y2 -= y1;
        px -= x1;
        py -= y1;
        let ccw = px * y2 - py * x2;
        if (ccw === 0.0) {
            ccw = px * x2 + py * y2;
            if (ccw > 0.0) {
                px -= x2;
                py -= y2;
                ccw = px * x2 + py * y2;
                if (ccw < 0.0) {
                    ccw = 0.0;
                }
            }
        }
        return (ccw < 0.0) ? -1 : ((ccw > 0.0) ? 1 : 0);
    }

    public static linesIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
        return ((Line.relativeCCW(x1, y1, x2, y2, x3, y3) * Line.relativeCCW(x1, y1, x2, y2, x4, y4) <= 0) && (Line.relativeCCW(x3, y3, x4, y4, x1, y1) * Line.relativeCCW(x3, y3, x4, y4, x2, y2) <= 0));
    }
}
