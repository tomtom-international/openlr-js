import AbstractEncoder from './AbstractEncoder';
import LocationReference from '../../data/LocationReference';
import BinaryReturnCode from '../BinaryReturnCode';
import BinaryConstants from '../BinaryConstants';
import LocationType from '../../data/LocationType';
import BitStreamOutput from '../bit-stream/BitStreamOutput';
export default class PointAlongLineEncoder extends AbstractEncoder {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null || rawLocationReference.getLocationReferencePoints() === null) {
            return LocationReference.fromValues('', BinaryReturnCode.MISSING_DATA, LocationType.POINT_ALONG_LINE, version);
        }
        const locationReferencePoints = rawLocationReference.getLocationReferencePoints();
        if (locationReferencePoints === null || locationReferencePoints.length <= 0) {
            return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.POINT_ALONG_LINE, version);
        }
        else {
            const startLRP = locationReferencePoints[0];
            const endLRP = locationReferencePoints[1];
            const offsets = rawLocationReference.getOffsets();
            const sideOfRoad = rawLocationReference.getSideOfRoad();
            const orientation = rawLocationReference.getOrientation();
            if (startLRP === null || endLRP === null || offsets === null || sideOfRoad === null || orientation === null) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.MISSING_DATA, LocationType.POINT_ALONG_LINE, version);
            }
            if (version < BinaryConstants.BINARY_VERSION_3) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_VERSION, LocationType.POI_WITH_ACCESS_POINT, version);
            }
            const returnCode = this._checkOffsets(offsets, true, locationReferencePoints);
            if (!returnCode) {
                return LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode.INVALID_OFFSET, LocationType.POINT_ALONG_LINE, version);
            }
            return LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version));
        }
    }
    _generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version) {
        const header = this._generateHeader(version, LocationType.POINT_ALONG_LINE, true);
        const first = this._generateFirstLRPFromLRPAndOrientation(startLRP, orientation);
        const lrps = [startLRP, endLRP];
        const pOff = this._generateOffset(offsets, true, version, lrps);
        if (pOff === null) {
            throw new Error('Positive offset cannot be null');
        }
        const last = this._generateLastLrpFromPointsAndOffsetAndSideOfRoad(lrps, pOff, sideOfRoad);
        const out = BitStreamOutput.fromValues();
        header.put(out);
        first.put(out);
        last.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        return out.getData();
    }
}
;
//# sourceMappingURL=PointAlongLineEncoder.js.map