export declare enum FormOfWay {
    UNDEFINED = 0,
    MOTORWAY = 1,
    MULTIPLE_CARRIAGEWAY = 2,
    SINGLE_CARRIAGEWAY = 3,
    ROUNDABOUT = 4,
    TRAFFIC_SQUARE = 5,
    SLIPROAD = 6,
    OTHER = 7,
}
export declare const getFormOfWayValues: () => FormOfWay[];
export declare const getId: (formOfWay: FormOfWay) => number;
export default FormOfWay;
