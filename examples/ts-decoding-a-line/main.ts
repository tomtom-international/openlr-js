import * as OpenLR from 'openlr-js';

// Set up a base64 encoded OpenLR string and a location reference object
const openLrString = 'CwNhbCU+jzjgAQD0/344AA==';
const openLrBuffer = OpenLR.Buffer.from(openLrString, 'base64');
const locationReference = OpenLR.LocationReference.fromIdAndBuffer('My location reference', openLrBuffer);

// Decode the OpenLR string into a LocationReference object
const binaryDecoder = new OpenLR.BinaryDecoder();
const rawLocationReference = binaryDecoder.decodeData(locationReference);

// Check that it's a line location reference
if (rawLocationReference && rawLocationReference.getLocationType() === OpenLR.LocationType.LINE_LOCATION && rawLocationReference instanceof OpenLR.RawLineLocationReference) {
    // Log the ID and return code
    console.log('ID:', rawLocationReference.getId());

    // Log the location reference points
    const locationReferencePoints = rawLocationReference.getLocationReferencePoints();
    locationReferencePoints.forEach((point, index) => {
        console.log(`Point ${index + 1}:`, point);
    });

    // Log the offsets
    const offsets = rawLocationReference.getOffsets();
    console.log('Offsets:', offsets);
}
