export declare enum FunctionalRoadClass {
    FRC_0 = 0,
    FRC_1 = 1,
    FRC_2 = 2,
    FRC_3 = 3,
    FRC_4 = 4,
    FRC_5 = 5,
    FRC_6 = 6,
    FRC_7 = 7,
}
export declare const getFRCValues: () => FunctionalRoadClass[];
export declare const getId: (frc: FunctionalRoadClass) => number;
export declare const lower: (frc: FunctionalRoadClass) => number;
export declare const higher: (frc: FunctionalRoadClass) => number;
export declare const getHighestFrc: FunctionalRoadClass;
export declare const getLowestFrc: FunctionalRoadClass;
export default FunctionalRoadClass;
