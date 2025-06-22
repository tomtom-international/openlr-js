/*
 * Copyright (c) 2020-2025 TomTom International B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Buffer} from 'buffer'
import {BinaryDecoder} from './binary/BinaryDecoder'
import {BinaryEncoder} from './binary/BinaryEncoder'
import {LocationReference} from './data/LocationReference'
import {LocationReferencePoint} from './data/LocationReferencePoint'
import {AREA_LOCATIONS, LocationType, POINTS_LOCATIONS} from './data/LocationType'
import {RawLocationReference} from './data/raw-location-reference/RawLocationReference'
import {RawCircleLocationReference} from './data/raw-location-reference/RawCircleLocationReference'
import {RawGeoCoordLocationReference} from './data/raw-location-reference/RawGeoCoordLocationReference'
import {RawInvalidLocationReference} from './data/raw-location-reference/RawInvalidLocationReference'
import {RawPointAlongLineLocationReference} from './data/raw-location-reference/RawPointAlongLineLocationReference'
import {RawPointLocationReference} from './data/raw-location-reference/RawPointLocationReference'
import {RawPolygonLocationReference} from './data/raw-location-reference/RawPolygonLocationReference'
import {RawLineLocationReference} from './data/raw-location-reference/RawLineLocationReference'
import {Serializer} from './data/Serializer'
import {Offsets} from './data/Offsets'

export {
    Buffer,
    BinaryDecoder,
    BinaryEncoder,
    LocationReference,
    LocationReferencePoint,
    LocationType,
    AREA_LOCATIONS,
    POINTS_LOCATIONS,
    Offsets,
    RawLocationReference,
    RawCircleLocationReference,
    RawGeoCoordLocationReference,
    RawInvalidLocationReference,
    RawPointAlongLineLocationReference,
    RawPointLocationReference,
    RawPolygonLocationReference,
    RawLineLocationReference,
    Serializer
}
