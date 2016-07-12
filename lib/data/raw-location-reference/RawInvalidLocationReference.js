'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RawLocationReference2 = require('./RawLocationReference');

var _RawLocationReference3 = _interopRequireDefault(_RawLocationReference2);

var _LocationType = require('../LocationType');

var _LocationType2 = _interopRequireDefault(_LocationType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RawInvalidLocationReference = function (_RawLocationReference) {
    _inherits(RawInvalidLocationReference, _RawLocationReference);

    function RawInvalidLocationReference() {
        _classCallCheck(this, RawInvalidLocationReference);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RawInvalidLocationReference).apply(this, arguments));
    }

    _createClass(RawInvalidLocationReference, null, [{
        key: 'fromIdAndStatusCode',
        value: function fromIdAndStatusCode(id, error) {
            var rawInvalidLocationReference = new RawInvalidLocationReference();
            rawInvalidLocationReference._id = id;
            rawInvalidLocationReference._locationType = _LocationType2.default.UNKNOWN;
            rawInvalidLocationReference._returnCode = error;
            return rawInvalidLocationReference;
        }
    }, {
        key: 'fromValues',
        value: function fromValues(id, error, locationType) {
            var rawInvalidLocationReference = new RawInvalidLocationReference();
            rawInvalidLocationReference._id = id;
            rawInvalidLocationReference._locationType = locationType;
            rawInvalidLocationReference._returnCode = error;
            return rawInvalidLocationReference;
        }
    }]);

    return RawInvalidLocationReference;
}(_RawLocationReference3.default);

exports.default = RawInvalidLocationReference;
;