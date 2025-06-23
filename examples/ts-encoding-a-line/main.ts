import * as OpenLR from "openlr-js";

// Set up the line positions
const locations = [
    { lng: 4.7538936137926395, lat: 52.374883889902236 },
    { lng: 4.7563336137926395, lat: 52.373583889902235 },
];

// Create raw location reference
const rawLineLocationReference = OpenLR.RawLineLocationReference.fromLineValues(
    "binary",
    locations.map((location, i) => {
        return OpenLR.LocationReferencePoint.fromValues(
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
    OpenLR.Offsets.fromValues(0, 0)
);

// Encode
const binaryEncoder = new OpenLR.BinaryEncoder();
const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawLineLocationReference);

// Display base64 encoded OpenLR binary
const locationReferenceData = encodedLocationReference.getLocationReferenceData();
if (locationReferenceData) {
    console.log(locationReferenceData.toString("base64")); // prints: CwNhbCU+jzjgAQD0/344AA==
}
