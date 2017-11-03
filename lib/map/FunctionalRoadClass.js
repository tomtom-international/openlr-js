export var FunctionalRoadClass;
(function (FunctionalRoadClass) {
    FunctionalRoadClass[FunctionalRoadClass["FRC_0"] = 0] = "FRC_0";
    FunctionalRoadClass[FunctionalRoadClass["FRC_1"] = 1] = "FRC_1";
    FunctionalRoadClass[FunctionalRoadClass["FRC_2"] = 2] = "FRC_2";
    FunctionalRoadClass[FunctionalRoadClass["FRC_3"] = 3] = "FRC_3";
    FunctionalRoadClass[FunctionalRoadClass["FRC_4"] = 4] = "FRC_4";
    FunctionalRoadClass[FunctionalRoadClass["FRC_5"] = 5] = "FRC_5";
    FunctionalRoadClass[FunctionalRoadClass["FRC_6"] = 6] = "FRC_6";
    FunctionalRoadClass[FunctionalRoadClass["FRC_7"] = 7] = "FRC_7";
})(FunctionalRoadClass || (FunctionalRoadClass = {}));
export const getFRCValues = () => [FunctionalRoadClass.FRC_0, FunctionalRoadClass.FRC_1, FunctionalRoadClass.FRC_2, FunctionalRoadClass.FRC_3, FunctionalRoadClass.FRC_4, FunctionalRoadClass.FRC_5, FunctionalRoadClass.FRC_6, FunctionalRoadClass.FRC_7];
export const getId = (frc) => frc;
export const lower = (frc) => Math.min(frc + 1, FunctionalRoadClass.FRC_7);
export const higher = (frc) => Math.max(frc - 1, FunctionalRoadClass.FRC_0);
export const getHighestFrc = FunctionalRoadClass.FRC_0;
export const getLowestFrc = FunctionalRoadClass.FRC_7;
export default FunctionalRoadClass;
//# sourceMappingURL=FunctionalRoadClass.js.map