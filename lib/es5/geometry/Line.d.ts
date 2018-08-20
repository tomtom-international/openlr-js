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
export declare class Line {
    protected _x1: number;
    protected _y1: number;
    protected _x2: number;
    protected _y2: number;
    intersectsLineValues(x1: number, y1: number, x2: number, y2: number): boolean;
    intersectsLineObject(line: Line): boolean;
    static fromValues(x1: number, y1: number, x2: number, y2: number): Line;
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
    static relativeCCW(x1: number, y1: number, x2: number, y2: number, px: number, py: number): 1 | 0 | -1;
    static linesIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): boolean;
}
