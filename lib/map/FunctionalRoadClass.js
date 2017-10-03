"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

const FRC_0 = 0;
const FRC_1 = 1;
const FRC_2 = 2;
const FRC_3 = 3;
const FRC_4 = 4;
const FRC_5 = 5;
const FRC_6 = 6;
const FRC_7 = 7;

exports.default = {
  FRC_0,
  FRC_1,
  FRC_2,
  FRC_3,
  FRC_4,
  FRC_5,
  FRC_6,
  FRC_7,
  getFRCValues: () => [FRC_0, FRC_1, FRC_2, FRC_3, FRC_4, FRC_5, FRC_6, FRC_7],
  getId: frc => frc,
  lower: frc => Math.min(frc + 1, FRC_7),
  higher: frc => Math.max(frc - 1, FRC_0),
  getHighestFrc: FRC_0,
  getLowestFrc: FRC_7
};