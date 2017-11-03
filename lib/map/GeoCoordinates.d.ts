export default class GeoCoordinates {
    protected _longitude: number;
    protected _latitude: number;
    static fromValues(longitude: number, latitude: number): GeoCoordinates;
    getLatitudeDeg(): number;
    getLongitudeDeg(): number;
}
