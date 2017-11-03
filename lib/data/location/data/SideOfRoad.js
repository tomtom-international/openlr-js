export var SideOfRoad;
(function (SideOfRoad) {
    SideOfRoad[SideOfRoad["ON_ROAD_OR_UNKNOWN"] = 0] = "ON_ROAD_OR_UNKNOWN";
    SideOfRoad[SideOfRoad["RIGHT"] = 1] = "RIGHT";
    SideOfRoad[SideOfRoad["LEFT"] = 2] = "LEFT";
    SideOfRoad[SideOfRoad["BOTH"] = 3] = "BOTH";
})(SideOfRoad || (SideOfRoad = {}));
export const getSideOfRoadValues = () => [SideOfRoad.ON_ROAD_OR_UNKNOWN, SideOfRoad.RIGHT, SideOfRoad.LEFT, SideOfRoad.BOTH];
export const getDefault = () => SideOfRoad.ON_ROAD_OR_UNKNOWN;
export const getId = (sideOfRoad) => sideOfRoad;
export default SideOfRoad;
//# sourceMappingURL=SideOfRoad.js.map