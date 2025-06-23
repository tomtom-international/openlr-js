/*
 * Copyright (c) 2020-2025 TomTom International B.V.
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

import { Offsets } from './Offsets';
import { LocationReference } from './LocationReference';
import { LocationReferencePoint } from './LocationReferencePoint';
import { GeoCoordinates } from '../map/GeoCoordinates';
import { RawInvalidLocationReference } from './raw-location-reference/RawInvalidLocationReference';
import { RawLineLocationReference } from './raw-location-reference/RawLineLocationReference';
import { RawPointAlongLineLocationReference } from './raw-location-reference/RawPointAlongLineLocationReference';
import { RawGeoCoordLocationReference } from './raw-location-reference/RawGeoCoordLocationReference';
import { RawPolygonLocationReference } from './raw-location-reference/RawPolygonLocationReference';
import { RawCircleLocationReference } from './raw-location-reference/RawCircleLocationReference';

const constructors: { [Key: string]: any } = {
    Object,
    Array,
    Offsets,
    LocationReference,
    LocationReferencePoint,
    GeoCoordinates,
    RawInvalidLocationReference,
    RawLineLocationReference,
    RawPointAlongLineLocationReference,
    RawGeoCoordLocationReference,
    RawPolygonLocationReference,
    RawCircleLocationReference
};

export class Serializer {
    public static serialize(instance: any) {
        if (!instance) {
            return instance;
        } else {
            switch (instance.constructor.name) {
                case 'Number':
                case 'Boolean':
                case 'String':
                    return instance;
                case 'Object':
                case 'Array':
                default:
                    const properties: { [Key: string]: any } = instance.constructor.name === 'Array' ? [] : {};
                    for (const property in instance) {
                        if (instance.hasOwnProperty(property)) {
                            properties[property] = Serializer.serialize(instance[property]);
                        }
                    }
                    return { type: instance.constructor.name, properties };
            }
        }
    }

    public static deserialize(object: any) {
        if (!object) {
            return object;
        } else {
            switch (object.constructor.name) {
                case 'Number':
                case 'Boolean':
                case 'String':
                    return object;
                case 'Object':
                case 'Array':
                    const type = object.type;
                    const properties = object.properties;
                    const constructor = constructors[type];
                    const instance = new constructor();
                    for (const property in properties) {
                        if (properties.hasOwnProperty(property)) {
                            instance[property] = Serializer.deserialize(properties[property]);
                        }
                    }
                    return instance;
                default:
                    throw new Error('Unsupported JavaScript object type: ' + object.constructor.name);
            }
        }
    }
}
