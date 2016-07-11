/** The physical road type is unknown. */
const UNDEFINED = 0;

/**
 * A Motorway is defined as a road permitted for motorized vehicles only in combination with a prescribed minimum speed. It has two or more physically separated carriageways and no single level-crossings.
 */
const MOTORWAY = 1;

/**
 * A multiple carriageway is defined as a road with physically separated carriageways regardless of the number of lanes. If a road is also a motorway; it should be coded as such and not as a multiple carriageway.
 */
const MULTIPLE_CARRIAGEWAY = 2;

/**
 * All roads without separate carriageways are considered as roads with a single carriageway.
 */
const SINGLE_CARRIAGEWAY = 3;

/**
 * A Roundabout is a road which forms a ring on which traffic travelling in only one direction is allowed.
 */
const ROUNDABOUT = 4;

/**
 * A Traffic Square is an open area (partly) enclosed by roads which is used for non-traffic purposes and which is not a Roundabout.
 */
const TRAFFIC_SQUARE = 5;

/** A Slip Road is a road especially designed to enter or leave a line. */
const SLIPROAD = 6;

/**
 * The physical road type is known but does not fit into one of the other categories.
 */
const OTHER = 7;

export default {
    UNDEFINED,
    MOTORWAY,
    MULTIPLE_CARRIAGEWAY,
    SINGLE_CARRIAGEWAY,
    ROUNDABOUT,
    TRAFFIC_SQUARE,
    SLIPROAD,
    OTHER,
    getFormOfWayValues: () => [UNDEFINED, MOTORWAY, MULTIPLE_CARRIAGEWAY, SINGLE_CARRIAGEWAY, ROUNDABOUT, TRAFFIC_SQUARE, SLIPROAD],
    getId: formOfWay => formOfWay
};
