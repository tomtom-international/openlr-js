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

var RawLineLocationReference = function (_RawLocationReference) {
    _inherits(RawLineLocationReference, _RawLocationReference);

    function RawLineLocationReference() {
        _classCallCheck(this, RawLineLocationReference);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RawLineLocationReference).apply(this, arguments));
    }

    _createClass(RawLineLocationReference, [{
        key: 'equals',
        value: function equals(otherRawLineLocationReference) {
            throw new Error('Needs proper implementation');
        }
    }, {
        key: 'points',
        get: function get() {
            return this._points;
        }
    }, {
        key: 'offsets',
        get: function get() {
            return this._offsets;
        }
    }], [{
        key: 'fromValues',

        /** The points. */
        value: function fromValues(id, points, offsets) {
            var rawLineLocationReference = new RawLineLocationReference();
            rawLineLocationReference._id = id;
            rawLineLocationReference._locationType = _LocationType2.default.LINE_LOCATION;
            rawLineLocationReference._returnCode = null;
            rawLineLocationReference._points = points;
            rawLineLocationReference._offsets = offsets;
            return rawLineLocationReference;
        }

        /** The offsets. */

    }]);

    return RawLineLocationReference;
}(_RawLocationReference3.default);

exports.default = RawLineLocationReference;
;