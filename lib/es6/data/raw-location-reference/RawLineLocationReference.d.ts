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
import { RawLocationReference } from './RawLocationReference';
import { LocationReferencePoint } from '../LocationReferencePoint';
import { Offsets } from '../Offsets';
export declare class RawLineLocationReference extends RawLocationReference {
    /** The points. */
    protected _points: Array<LocationReferencePoint>;
    /** The offsets. */
    protected _offsets: Offsets;
    getLocationReferencePoints(): LocationReferencePoint[];
    getOffsets(): Offsets;
    static fromLineValues(id: string, points: Array<LocationReferencePoint>, offsets: Offsets): RawLineLocationReference;
}
