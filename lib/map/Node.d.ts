import GeoCoordinates from './GeoCoordinates';
import Line from './Line';
export default interface Node {
    getLatitudeDeg(): number;
    getLongitudeDeg(): number;
    getGeoCoordinates(): GeoCoordinates;
    getConnectedLines(): Array<Line>;
    getNumberConnectedLines(): number;
    getOutgoingLines(): Array<Line>;
    getIncomingLines(): Array<Line>;
    getID(): number;
}
