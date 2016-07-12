'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
    function Node() {
        _classCallCheck(this, Node);
    }

    _createClass(Node, [{
        key: 'getLatitudeDeg',
        value: function getLatitudeDeg() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getLongitudeDeg',
        value: function getLongitudeDeg() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getGeoCoordinates',
        value: function getGeoCoordinates() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getConnectedLines',
        value: function getConnectedLines() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getNumberConnectedLines',
        value: function getNumberConnectedLines() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getOutgoingLines',
        value: function getOutgoingLines() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getIncomingLines',
        value: function getIncomingLines() {
            throw new Error('This is an interface method');
        }
    }, {
        key: 'getId',
        value: function getId() {
            throw new Error('This is an interface method');
        }
    }]);

    return Node;
}();

exports.default = Node;
;