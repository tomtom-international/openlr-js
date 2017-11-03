export var FormOfWay;
(function (FormOfWay) {
    FormOfWay[FormOfWay["UNDEFINED"] = 0] = "UNDEFINED";
    FormOfWay[FormOfWay["MOTORWAY"] = 1] = "MOTORWAY";
    FormOfWay[FormOfWay["MULTIPLE_CARRIAGEWAY"] = 2] = "MULTIPLE_CARRIAGEWAY";
    FormOfWay[FormOfWay["SINGLE_CARRIAGEWAY"] = 3] = "SINGLE_CARRIAGEWAY";
    FormOfWay[FormOfWay["ROUNDABOUT"] = 4] = "ROUNDABOUT";
    FormOfWay[FormOfWay["TRAFFIC_SQUARE"] = 5] = "TRAFFIC_SQUARE";
    FormOfWay[FormOfWay["SLIPROAD"] = 6] = "SLIPROAD";
    FormOfWay[FormOfWay["OTHER"] = 7] = "OTHER";
})(FormOfWay || (FormOfWay = {}));
export const getFormOfWayValues = () => [FormOfWay.UNDEFINED, FormOfWay.MOTORWAY, FormOfWay.MULTIPLE_CARRIAGEWAY, FormOfWay.SINGLE_CARRIAGEWAY, FormOfWay.ROUNDABOUT, FormOfWay.TRAFFIC_SQUARE, FormOfWay.SLIPROAD];
export const getId = (formOfWay) => formOfWay;
export default FormOfWay;
//# sourceMappingURL=FormOfWay.js.map