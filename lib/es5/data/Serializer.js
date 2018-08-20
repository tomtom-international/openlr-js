"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Offsets_1 = require("./Offsets");
var LocationReference_1 = require("./LocationReference");
var LocationReferencePoint_1 = require("./LocationReferencePoint");
var GeoCoordinates_1 = require("../map/GeoCoordinates");
var RawInvalidLocationReference_1 = require("./raw-location-reference/RawInvalidLocationReference");
var RawLineLocationReference_1 = require("./raw-location-reference/RawLineLocationReference");
var RawPointAlongLineLocationReference_1 = require("./raw-location-reference/RawPointAlongLineLocationReference");
var RawGeoCoordLocationReference_1 = require("./raw-location-reference/RawGeoCoordLocationReference");
var RawPolygonLocationReference_1 = require("./raw-location-reference/RawPolygonLocationReference");
var RawCircleLocationReference_1 = require("./raw-location-reference/RawCircleLocationReference");
var constructors = {
    Object: Object,
    Array: Array,
    Offsets: Offsets_1.Offsets,
    LocationReference: LocationReference_1.LocationReference,
    LocationReferencePoint: LocationReferencePoint_1.LocationReferencePoint,
    GeoCoordinates: GeoCoordinates_1.GeoCoordinates,
    RawInvalidLocationReference: RawInvalidLocationReference_1.RawInvalidLocationReference,
    RawLineLocationReference: RawLineLocationReference_1.RawLineLocationReference,
    RawPointAlongLineLocationReference: RawPointAlongLineLocationReference_1.RawPointAlongLineLocationReference,
    RawGeoCoordLocationReference: RawGeoCoordLocationReference_1.RawGeoCoordLocationReference,
    RawPolygonLocationReference: RawPolygonLocationReference_1.RawPolygonLocationReference,
    RawCircleLocationReference: RawCircleLocationReference_1.RawCircleLocationReference
};
var Serializer = /** @class */ (function () {
    function Serializer() {
    }
    Serializer.serialize = function (instance) {
        if (!instance) {
            return instance;
        }
        else {
            switch (instance.constructor.name) {
                case 'Number':
                case 'Boolean':
                case 'String':
                    return instance;
                case 'Object':
                case 'Array':
                default:
                    var properties = instance.constructor.name === 'Array' ? [] : {};
                    for (var property in instance) {
                        if (instance.hasOwnProperty(property)) {
                            properties[property] = Serializer.serialize(instance[property]);
                        }
                    }
                    return { type: instance.constructor.name, properties: properties };
            }
        }
    };
    Serializer.deserialize = function (object) {
        if (!object) {
            return object;
        }
        else {
            switch (object.constructor.name) {
                case 'Number':
                case 'Boolean':
                case 'String':
                    return object;
                case 'Object':
                case 'Array':
                    var type = object.type;
                    var properties = object.properties;
                    var constructor = constructors[type];
                    var instance = new constructor();
                    for (var property in properties) {
                        if (properties.hasOwnProperty(property)) {
                            instance[property] = Serializer.deserialize(properties[property]);
                        }
                    }
                    return instance;
                default:
                    throw new Error('Unsupported JavaScript object type: ' + object.constructor.name);
            }
        }
    };
    return Serializer;
}());
exports.Serializer = Serializer;
//# sourceMappingURL=Serializer.js.map