'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Offsets = require('./Offsets');

var _Offsets2 = _interopRequireDefault(_Offsets);

var _LocationReference = require('./LocationReference');

var _LocationReference2 = _interopRequireDefault(_LocationReference);

var _LocationReferencePoint = require('./LocationReferencePoint');

var _LocationReferencePoint2 = _interopRequireDefault(_LocationReferencePoint);

var _RawInvalidLocationReference = require('./raw-location-reference/RawInvalidLocationReference');

var _RawInvalidLocationReference2 = _interopRequireDefault(_RawInvalidLocationReference);

var _RawLineLocationReference = require('./raw-location-reference/RawLineLocationReference');

var _RawLineLocationReference2 = _interopRequireDefault(_RawLineLocationReference);

var _RawPointAlongLineLocationReference = require('./raw-location-reference/RawPointAlongLineLocationReference');

var _RawPointAlongLineLocationReference2 = _interopRequireDefault(_RawPointAlongLineLocationReference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const constructors = {
    Object,
    Array,
    Offsets: _Offsets2.default,
    LocationReference: _LocationReference2.default,
    LocationReferencePoint: _LocationReferencePoint2.default,
    RawInvalidLocationReference: _RawInvalidLocationReference2.default,
    RawLineLocationReference: _RawLineLocationReference2.default,
    RawPointAlongLineLocationReference: _RawPointAlongLineLocationReference2.default
};

class Serializer {
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
}exports.default = Serializer;
;