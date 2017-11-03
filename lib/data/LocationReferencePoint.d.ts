import GeoCoordinates from '../map/GeoCoordinates';
import FormOfWay from '../map/FormOfWay';
import FunctionalRoadClass from '../map/FunctionalRoadClass';
export default class LocationReferencePoint {
    protected _bearing: number;
    protected _distanceToNext: number;
    protected _frc: FunctionalRoadClass | null;
    protected _fow: FormOfWay | null;
    protected _lfrcnp: FunctionalRoadClass | null;
    protected _isLast: boolean;
    protected _longitude: number;
    protected _latitude: number;
    protected _sequenceNumber: number;
    static fromValues(sequenceNumber: number, frc: FunctionalRoadClass, fow: FormOfWay, longitude: number, latitude: number, bearing: number, distanceToNext: number, lfrcnp: FunctionalRoadClass | null, isLast: boolean): LocationReferencePoint;
    static fromGeoCoordinate(coord: GeoCoordinates): LocationReferencePoint;
    getLongitudeDeg(): number;
    getLatitudeDeg(): number;
    getBearing(): number;
    getDistanceToNext(): number;
    getFRC(): FunctionalRoadClass | null;
    getFOW(): FormOfWay | null;
    getLfrc(): FunctionalRoadClass | null;
    isLastLRP(): boolean;
}
