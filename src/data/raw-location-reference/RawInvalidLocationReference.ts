/**
 * Copyright 2018 TomTom International B.V
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
import { LocationType } from '../LocationType';

export class RawInvalidLocationReference extends RawLocationReference {
    public static fromIdAndStatusCode(id: string, error: number) {
        const rawInvalidLocationReference = new RawInvalidLocationReference();
        rawInvalidLocationReference._id = id;
        rawInvalidLocationReference._locationType = LocationType.UNKNOWN;
        rawInvalidLocationReference._returnCode = error;
        return rawInvalidLocationReference;
    }

    public static fromInvalidValues(id: string, error: number, locationType: LocationType) {
        const rawInvalidLocationReference = new RawInvalidLocationReference();
        rawInvalidLocationReference._id = id;
        rawInvalidLocationReference._locationType = locationType;
        rawInvalidLocationReference._returnCode = error;
        return rawInvalidLocationReference;
    }
}
