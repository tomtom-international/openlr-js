import AbstractDecoder from './AbstractDecoder';
import BinaryConstants from '../BinaryConstants';
import FirstLRP from '../data/FirstLRP';
import IntermediateLRP from '../data/IntermediateLRP';
import LastLRP from '../data/LastLRP';
import Offset from '../data/Offset';
import Offsets from '../../data/Offsets';
import RawLineLocationReference from '../../data/raw-location-reference/RawLineLocationReference';
export default class LineDecoder extends AbstractDecoder {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        const nrIntermediates = Math.floor((totalBytes - (BinaryConstants.MIN_BYTES_LINE_LOCATION)) / BinaryConstants.LRP_SIZE);
        const firstLRP = FirstLRP.fromBitStreamInput(bitStreamInput);
        const intermediates = [];
        for (let i = 0; i < nrIntermediates; i++) {
            const lrp = IntermediateLRP.fromBitStreamInput(bitStreamInput);
            intermediates.push(lrp);
        }
        const lastLRP = LastLRP.fromBitStreamInput(bitStreamInput);
        let posOff = null;
        let negOff = null;
        if (lastLRP.attrib4.pOffsetF === BinaryConstants.HAS_OFFSET) {
            posOff = Offset.fromBitStreamInput(bitStreamInput);
        }
        if (lastLRP.attrib4.nOffsetF === BinaryConstants.HAS_OFFSET) {
            negOff = Offset.fromBitStreamInput(bitStreamInput);
        }
        let offsets = Offsets.fromValues(0, 0);
        if (version === BinaryConstants.BINARY_VERSION_2) {
            let pOffValue = 0;
            let nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateDistanceEstimate(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateDistanceEstimate(negOff.offset);
            }
            offsets = Offsets.fromValues(pOffValue, nOffValue);
        }
        else if (version === BinaryConstants.BINARY_VERSION_3) {
            let pOffValue = 0;
            let nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateRelativeDistance(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateRelativeDistance(negOff.offset);
            }
            offsets = Offsets.fromRelativeValues(pOffValue, nOffValue);
        }
        let lrpCount = 1;
        const points = [];
        const p = this._createFirstLRP(lrpCount, firstLRP);
        lrpCount++;
        points.push(p);
        let prevLon = p.getLongitudeDeg();
        let prevLat = p.getLatitudeDeg();
        for (let intermediate of intermediates) {
            const intermediatePoint = this._createIntermediateLRPFromLatitudeLongitude(lrpCount, intermediate, prevLon, prevLat);
            lrpCount++;
            points.push(intermediatePoint);
            prevLon = intermediatePoint.getLongitudeDeg();
            prevLat = intermediatePoint.getLatitudeDeg();
        }
        const lp = this._createLastLRP(lrpCount, lastLRP, prevLon, prevLat);
        points.push(lp);
        const rawLocRef = RawLineLocationReference.fromLineValues(id, points, offsets);
        if (binaryData !== null) {
            binaryData.negOffset = negOff;
            binaryData.posOffset = posOff;
            binaryData.lastLRP = lastLRP;
            binaryData.intermediates = intermediates;
            binaryData.firstLRP = firstLRP;
        }
        return rawLocRef;
    }
}
;
//# sourceMappingURL=LineDecoder.js.map