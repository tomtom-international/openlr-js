/**
 * Copyright 2017 TomTom International B.V
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export var FormOfWay;
(function (FormOfWay) {
    /** The physical road type is unknown. */
    FormOfWay[FormOfWay["UNDEFINED"] = 0] = "UNDEFINED";
    /**
     * A Motorway is defined as a road permitted for motorized vehicles only in combination with a prescribed minimum speed. It has two or more physically separated carriageways and no single level-crossings.
     */
    FormOfWay[FormOfWay["MOTORWAY"] = 1] = "MOTORWAY";
    /**
     * A multiple carriageway is defined as a road with physically separated carriageways regardless of the number of lanes. If a road is also a motorway; it should be coded as such and not as a multiple carriageway.
     */
    FormOfWay[FormOfWay["MULTIPLE_CARRIAGEWAY"] = 2] = "MULTIPLE_CARRIAGEWAY";
    /**
     * All roads without separate carriageways are considered as roads with a single carriageway.
     */
    FormOfWay[FormOfWay["SINGLE_CARRIAGEWAY"] = 3] = "SINGLE_CARRIAGEWAY";
    /**
     * A Roundabout is a road which forms a ring on which traffic travelling in only one direction is allowed.
     */
    FormOfWay[FormOfWay["ROUNDABOUT"] = 4] = "ROUNDABOUT";
    /**
     * A Traffic Square is an open area (partly) enclosed by roads which is used for non-traffic purposes and which is not a Roundabout.
     */
    FormOfWay[FormOfWay["TRAFFIC_SQUARE"] = 5] = "TRAFFIC_SQUARE";
    /** A Slip Road is a road especially designed to enter or leave a line. */
    FormOfWay[FormOfWay["SLIPROAD"] = 6] = "SLIPROAD";
    /**
     * The physical road type is known but does not fit into one of the other categories.
     */
    FormOfWay[FormOfWay["OTHER"] = 7] = "OTHER";
})(FormOfWay || (FormOfWay = {}));
export const getFormOfWayValues = () => [FormOfWay.UNDEFINED, FormOfWay.MOTORWAY, FormOfWay.MULTIPLE_CARRIAGEWAY, FormOfWay.SINGLE_CARRIAGEWAY, FormOfWay.ROUNDABOUT, FormOfWay.TRAFFIC_SQUARE, FormOfWay.SLIPROAD];
export const getId = (formOfWay) => formOfWay;
//# sourceMappingURL=FormOfWay.js.map