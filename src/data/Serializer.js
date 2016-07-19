import Offsets from './Offsets';
import LocationReference from './LocationReference';
import LocationReferencePoint from './LocationReferencePoint';
import RawInvalidLocationReference from './raw-location-reference/RawInvalidLocationReference';
import RawLineLocationReference from './raw-location-reference/RawLineLocationReference';

const constructors = {
    Object,
    Array,
    Offsets,
    LocationReference,
    LocationReferencePoint,
    RawInvalidLocationReference,
    RawLineLocationReference
};

export default class Serializer {
    static serialize(instance) {
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
                    const properties = instance.constructor.name == 'Array' ? [] : {};
                    for (const property in instance) {
                        if (instance.hasOwnProperty(property)) {
                            properties[property] = Serializer.serialize(instance[property]);
                        }
                    }
                    return {type: instance.constructor.name, properties};
            }
        }
    }

    static deserialize(object) {
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
};
