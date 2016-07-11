const FRC_0 = 0;
const FRC_1 = 1;
const FRC_2 = 2;
const FRC_3 = 3;
const FRC_4 = 4;
const FRC_5 = 5;
const FRC_6 = 6;
const FRC_7 = 7;

export default {
    FRC_0,
    FRC_1,
    FRC_2,
    FRC_3,
    FRC_4,
    FRC_5,
    FRC_6,
    FRC_7,
    getFRCValues: () => [FRC_0, FRC_1, FRC_2, FRC_3, FRC_4, FRC_5, FRC_6, FRC_7],
    getId: frc => frc,
    lower: frc => Math.min(frc + 1, FRC_7),
    higher: frc => Math.max(frc - 1, FRC_0),
    getHighestFrc: FRC_0,
    getLowestFrc: FRC_7
};
