import GeoCoordinates from './GeoCoordinates';
import Node from './Node';
import FormOfWay from './FormOfWay';
import FunctionalRoadClass from './FunctionalRoadClass';
export default interface Line {
    getStartNode(): Node;
    getEndNode(): Node;
    getFOW(): FormOfWay;
    getFRC(): FunctionalRoadClass;
    getGeoCoordinateAlongLine(t: number): GeoCoordinates;
    getLineLength(): number;
    getID(): number;
    getPrevLines(): Array<Line>;
    getNextLines(): Array<Line>;
    distanceToPoint(latitude: number, longitude: number): number;
    measureAlongLine(latitude: number, longitude: number): number;
    getShapeCoordinates(): Array<GeoCoordinates>;
    getNames(): {
        [key: string]: Array<String>;
    };
}
