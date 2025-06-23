/*
 * Copyright (c) 2020-2025 TomTom International B.V.
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

const {Buffer} = require("buffer")
const {
  BinaryDecoder,
  BinaryEncoder,
  LocationReference,
  LocationReferencePoint,
  Offsets,
  Serializer,
  RawLineLocationReference
} = require("../lib/es5")

const almostEqual = (x, y) => Math.abs(x - y) < 0.0001
const binaryDecoder = new BinaryDecoder()
const binaryEncoder = new BinaryEncoder()

// Check 2 points.
let openLrString = "CwNhbCU+jzPLAwD0/34zGw=="
let openLrBinary = Buffer.from(openLrString, "base64")
let locationReference = LocationReference.fromIdAndBuffer("binary", openLrBinary)
let rawLocationReference = binaryDecoder.decodeData(locationReference)
let serializedRawLocationReference = Serializer.serialize(rawLocationReference)
let deserializedRawLocationReference = Serializer.deserialize(serializedRawLocationReference)
let encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserializedRawLocationReference)
let encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData()
let encodedOpenLrString = encodedOpenLrBinary.toString("base64")

if (openLrString !== encodedOpenLrString) {
  throw new Error("Expected OpenLR string to be equal: " + openLrString + " and " + encodedOpenLrString)
}

// Check 3 points.
openLrString = "CwNhbCU+jzjrAwD0/3447S6GP24SOAA="
openLrBinary = Buffer.from(openLrString, "base64")
locationReference = LocationReference.fromIdAndBuffer("binary", openLrBinary)
rawLocationReference = binaryDecoder.decodeData(locationReference)
serializedRawLocationReference = Serializer.serialize(rawLocationReference)
deserializedRawLocationReference = Serializer.deserialize(serializedRawLocationReference)
encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserializedRawLocationReference)
encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData()
encodedOpenLrString = encodedOpenLrBinary.toString("base64")

if (openLrString !== encodedOpenLrString) {
  throw new Error("Expected OpenLR string to be equal: " + openLrString + " and " + encodedOpenLrString)
}

// NOTE: the following cases are commented out because they are not within the limits of the OpenLR specification.

// // Check 3 specific points and make sure the intermediate results are OK.
// let locations = [
//   {lng: 4.7538936137926395, lat: 52.374883889902236},
//   {lng: 4.7563336137926395, lat: 52.373583889902235},
//   {lng: 5.1, lat: 52.0}
// ]

// // Encode
// let rawLineLocationReference = RawLineLocationReference.fromLineValues(
//   "binary",
//   locations.map((location, i) => {
//     return LocationReferencePoint.fromValues(
//       i,
//       7,
//       0,
//       location.lng,
//       location.lat,
//       0,
//       i < locations.length - 1 ? 100 : 0,
//       7,
//       i === locations.length - 1
//     )
//   }),
//   Offsets.fromValues(0, 0)
// )
// serializedRawLocationReference = Serializer.serialize(rawLineLocationReference)
// deserializedRawLocationReference = Serializer.deserialize(serializedRawLocationReference)
// encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserializedRawLocationReference)
// encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData()
// encodedOpenLrString = encodedOpenLrBinary.toString("base64")
// const almost = (x, y) => Math.abs(x - y) < 0.0001
// // Decode
// openLrBinary = Buffer.from(encodedOpenLrString, "base64")
// locationReference = LocationReference.fromIdAndBuffer("binary", openLrBinary)
// rawLocationReference = binaryDecoder.decodeData(locationReference)
// locations.map((location, i) => {
//     let locationReferencePoint = rawLocationReference.getLocationReferencePoints()[i]
//     if (!almostEqual(locationReferencePoint.getLongitudeDeg(), location.lng) || !almostEqual(locationReferencePoint.getLatitudeDeg(), location.lat)) {
//       throw new Error("Expected location to be equal: " + location.lng + "," + location.lat + " !== " + locationReferencePoint.getLongitudeDeg() + "," + locationReferencePoint.getLatitudeDeg())
//     }
//   }
// )

// if (openLrString !== encodedOpenLrString) {
//   throw new Error("Expected OpenLR string to be equal: " + openLrString + " and " + encodedOpenLrString)
// }
