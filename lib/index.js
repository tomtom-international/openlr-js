'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Serializer = exports.RawLocationReference = exports.LocationReference = exports.BinaryEncoder = exports.BinaryDecoder = undefined;

var _BinaryDecoder = require('./binary/BinaryDecoder');

var _BinaryDecoder2 = _interopRequireDefault(_BinaryDecoder);

var _BinaryEncoder = require('./binary/BinaryEncoder');

var _BinaryEncoder2 = _interopRequireDefault(_BinaryEncoder);

var _LocationReference = require('./data/LocationReference');

var _LocationReference2 = _interopRequireDefault(_LocationReference);

var _RawLocationReference = require('./data/raw-location-reference/RawLocationReference');

var _RawLocationReference2 = _interopRequireDefault(_RawLocationReference);

var _Serializer = require('./data/Serializer');

var _Serializer2 = _interopRequireDefault(_Serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BinaryDecoder = _BinaryDecoder2.default;
exports.BinaryEncoder = _BinaryEncoder2.default;
exports.LocationReference = _LocationReference2.default;
exports.RawLocationReference = _RawLocationReference2.default;
exports.Serializer = _Serializer2.default; /**
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