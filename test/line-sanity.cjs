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

const test1 = () => {
  // Check OpenLR string for 2 points.
  // Decode.
  let openLrString = "CwNhbCU+jzPLAwD0/34zGw=="
  let openLrBinary = Buffer.from(openLrString, "base64")
  let locationReference = LocationReference.fromIdAndBuffer("binary", openLrBinary)
  let rawLocationReference = binaryDecoder.decodeData(locationReference)

  // Serialize/deserialize.
  let serializedRawLocationReference = Serializer.serialize(rawLocationReference)
  let deserializedRawLocationReference = Serializer.deserialize(serializedRawLocationReference)

  // Re-encode.
  let encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserializedRawLocationReference)
  let encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData()
  let encodedOpenLrString = encodedOpenLrBinary.toString("base64")

  // Should be the same OpenLR string.
  if (openLrString !== encodedOpenLrString
  ) {
    throw new Error("Expected OpenLR string to be equal: " + openLrString + " and " + encodedOpenLrString)
  }
}

const test2 = () => {
  // Check OpenLR string for 2 other, the same points.
  // Decode.
  let openLrString = "CwOgbiT6UDjgAAAAAAA4AA=="
  let openLrBinary = Buffer.from(openLrString, "base64")
  let locationReference = LocationReference.fromIdAndBuffer("binary", openLrBinary)
  let rawLocationReference = binaryDecoder.decodeData(locationReference)

  // Serialize/deserialize.
  let serializedRawLocationReference = Serializer.serialize(rawLocationReference)
  let deserializedRawLocationReference = Serializer.deserialize(serializedRawLocationReference)

  // Re-encode.
  let encodedLocationReference = binaryEncoder.encodeDataFromRLR(deserializedRawLocationReference)
  let encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData()
  let encodedOpenLrString = encodedOpenLrBinary.toString("base64")

  // Should be the same OpenLR string.
  if (openLrString !== encodedOpenLrString) {
    throw new Error("Expected OpenLR string to be equal: " + openLrString + " and " + encodedOpenLrString)
  }

  // Check if encoding/decoding OpenLR of 2 points yields more or less the correct points.
  let locations = [{lng: 5.1, lat: 52.0}, {lng: 5.1, lat: 52.0}]

  // Encode.
  let rawLineLocationReference = RawLineLocationReference.fromLineValues(
    "binary",
    locations.map((location, i) => {
      return LocationReferencePoint.fromValues(
        i,
        7,
        0,
        location.lng,
        location.lat,
        0,
        i < locations.length - 1 ? 100 : 0,
        7,
        i === locations.length - 1
      )
    }),
    Offsets.fromValues(0, 0)
  )
  encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawLineLocationReference)
  encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData()
  encodedOpenLrString = encodedOpenLrBinary.toString("base64")

  // Decode.
  openLrBinary = Buffer.from(encodedOpenLrString, "base64")
  locationReference = LocationReference.fromIdAndBuffer("binary", openLrBinary)
  rawLocationReference = binaryDecoder.decodeData(locationReference)

  // Should yield correct values.
  locations.map((location, i) => {
      let locationReferencePoint = rawLocationReference.getLocationReferencePoints()[i]
      if (!almostEqual(locationReferencePoint.getLongitudeDeg(), location.lng) || !almostEqual(locationReferencePoint.getLatitudeDeg(), location.lat)) {
        throw new Error("Expected location to be equal: " + location.lng + "," + location.lat + " !== " + locationReferencePoint.getLongitudeDeg() + "," + locationReferencePoint.getLatitudeDeg())
      }
    }
  )
}

test1()
test2()
