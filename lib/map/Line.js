'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
    function Line() {
        _classCallCheck(this, Line);
    }

    _createClass(Line, [{
        key: 'getStartNode',
        value: function getStartNode() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getEndNode',
        value: function getEndNode() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getFOW',
        value: function getFOW() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getFRC',
        value: function getFRC() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getGeoCoordinateAlongLine',
        value: function getGeoCoordinateAlongLine(distanceAlong) {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getLineLength',
        value: function getLineLength() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getId',
        value: function getId() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getPrevLines',
        value: function getPrevLines() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getNextLines',
        value: function getNextLines() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'distanceToPoint',
        value: function distanceToPoint(longitude, latitude) {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'measureAlongLine',
        value: function measureAlongLine(longitude, latitude) {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getShapeCoordinates',
        value: function getShapeCoordinates() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getNames',
        value: function getNames() {
            throw new Error('This is an interface method');
        }
    }]);

    return Line;
}();

exports.default = Line;
;