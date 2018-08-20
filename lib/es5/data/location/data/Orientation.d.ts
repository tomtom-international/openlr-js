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
export declare enum Orientation {
    NO_ORIENTATION_OR_UNKNOWN = 0,
    WITH_LINE_DIRECTION = 1,
    AGAINST_LINE_DIRECTION = 2,
    BOTH = 3
}
export declare const getOrientationValues: () => Orientation[];
export declare const getDefault: () => Orientation;
export declare const getId: (orientation: Orientation) => number;
