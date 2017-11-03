"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Offsets_1 = require("./Offsets");
const LocationReference_1 = require("./LocationReference");
const LocationReferencePoint_1 = require("./LocationReferencePoint");
const GeoCoordinates_1 = require("../map/GeoCoordinates");
const RawInvalidLocationReference_1 = require("./raw-location-reference/RawInvalidLocationReference");
const RawLineLocationReference_1 = require("./raw-location-reference/RawLineLocationReference");
const RawPointAlongLineLocationReference_1 = require("./raw-location-reference/RawPointAlongLineLocationReference");
const RawGeoCoordLocationReference_1 = require("./raw-location-reference/RawGeoCoordLocationReference");
const constructors = {
    Object,
    Array,
    Offsets: Offsets_1.default,
    LocationReference: LocationReference_1.default,
    LocationReferencePoint: LocationReferencePoint_1.default,
    GeoCoordinates: GeoCoordinates_1.default,
    RawInvalidLocationReference: RawInvalidLocationReference_1.default,
    RawLineLocationReference: RawLineLocationReference_1.default,
    RawPointAlongLineLocationReference: RawPointAlongLineLocationReference_1.default,
    RawGeoCoordLocationReference: RawGeoCoordLocationReference_1.default
};
class Serializer {
    static serialize(instance) {
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
                    const properties = instance.constructor.name === 'Array' ? [] : {};
                    for (const property in instance) {
                        if (instance.hasOwnProperty(property)) {
                            properties[property] = Serializer.serialize(instance[property]);
                        }
                    }
                    return { type: instance.constructor.name, properties };
            }
        }
    }
    static deserialize(object) {
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
exports.default = Serializer;
;
//# sourceMappingURL=Serializer.js.map