'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constructors = {
    Object: Object,
    Array: Array,
    Offsets: _Offsets2.default,
    LocationReference: _LocationReference2.default,
    LocationReferencePoint: _LocationReferencePoint2.default,
    RawInvalidLocationReference: _RawInvalidLocationReference2.default,
    RawLineLocationReference: _RawLineLocationReference2.default
};

var Serializer = function () {
    function Serializer() {
        _classCallCheck(this, Serializer);
    }

    _createClass(Serializer, null, [{
        key: 'serialize',
        value: function serialize(instance) {
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
                        var properties = instance.constructor.name == 'Array' ? [] : {};
                        for (var property in instance) {
                            if (instance.hasOwnProperty(property)) {
                                properties[property] = Serializer.serialize(instance[property]);
                            }
                        }
                        return { type: instance.constructor.name, properties: properties };
                }
            }
        }
    }, {
        key: 'deserialize',
        value: function deserialize(object) {
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
                        var type = object.type;
                        var properties = object.properties;
                        var _constructor = constructors[type];
                        var instance = new _constructor();
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
        }
    }]);

    return Serializer;
}();

exports.default = Serializer;
;