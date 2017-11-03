import AbstractEncoder from './AbstractEncoder';
import LocationReference from '../../data/LocationReference';
import BinaryReturnCode from '../BinaryReturnCode';
import LocationType from '../../data/LocationType';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class LineEncoder extends AbstractEncoder {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null) {
            return LocationReference.fromValues('', BinaryReturnCode.MISSING_DATA, LocationType.LINE_LOCATION, version);
        }
        const locationReferences = rawLocationReference.getLocationReferencePoints();
        if (locationReferences !== null) {
            const offsets = rawLocationReference.getOffsets();
            if (locationReferences === null || offsets === null || locationReferences.length <= 0) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.LINE_LOCATION, version);
            }
            let returnCode = this._checkOffsets(offsets, true, locationReferences);
            if (!returnCode) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.LINE_LOCATION, version);
            }
            returnCode = this._checkOffsets(offsets, false, locationReferences);
            if (!returnCode) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.LINE_LOCATION, version);
            }
            return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryLineLocation(locationReferences, offsets, version));
        }
        else {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.LINE_LOCATION, version);
        }
    }
    _generateBinaryLineLocation(locationReferences, offsets, version) {
        const header = this._generateHeader(version, LocationType.LINE_LOCATION, true);
        const firstLRP = this._generateFirstLRPFromLRP(locationReferences[0]);
        const lrps = this._generateLRPs(locationReferences);
        const pOff = this._generateOffset(offsets, true, version, locationReferences);
        const nOff = this._generateOffset(offsets, false, version, locationReferences);
        const lastLRP = this._generateLastLrpFromPointsAndOffsets(locationReferences, pOff, nOff);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        firstLRP.put(out);
        for (let i = 0; i < lrps.length; i++) {
            lrps[i].put(out);
        }
        lastLRP.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        if (nOff !== null) {
            nOff.put(out);
        }
        return out.getData();
    }
}
;
//# sourceMappingURL=LineEncoder.js.map