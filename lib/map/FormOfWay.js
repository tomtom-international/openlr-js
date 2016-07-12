"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** The physical road type is unknown. */
var UNDEFINED = 0;

/**
 * A Motorway is defined as a road permitted for motorized vehicles only in combination with a prescribed minimum speed. It has two or more physically separated carriageways and no single level-crossings.
 */
var MOTORWAY = 1;

/**
 * A multiple carriageway is defined as a road with physically separated carriageways regardless of the number of lanes. If a road is also a motorway; it should be coded as such and not as a multiple carriageway.
 */
var MULTIPLE_CARRIAGEWAY = 2;

/**
 * All roads without separate carriageways are considered as roads with a single carriageway.
 */
var SINGLE_CARRIAGEWAY = 3;

/**
 * A Roundabout is a road which forms a ring on which traffic travelling in only one direction is allowed.
 */
var ROUNDABOUT = 4;

/**
 * A Traffic Square is an open area (partly) enclosed by roads which is used for non-traffic purposes and which is not a Roundabout.
 */
var TRAFFIC_SQUARE = 5;

/** A Slip Road is a road especially designed to enter or leave a line. */
var SLIPROAD = 6;

/**
 * The physical road type is known but does not fit into one of the other categories.
 */
var OTHER = 7;

exports.default = {
  UNDEFINED: UNDEFINED,
  MOTORWAY: MOTORWAY,
  MULTIPLE_CARRIAGEWAY: MULTIPLE_CARRIAGEWAY,
  SINGLE_CARRIAGEWAY: SINGLE_CARRIAGEWAY,
  ROUNDABOUT: ROUNDABOUT,
  TRAFFIC_SQUARE: TRAFFIC_SQUARE,
  SLIPROAD: SLIPROAD,
  OTHER: OTHER,
  getFormOfWayValues: function getFormOfWayValues() {
    return [UNDEFINED, MOTORWAY, MULTIPLE_CARRIAGEWAY, SINGLE_CARRIAGEWAY, ROUNDABOUT, TRAFFIC_SQUARE, SLIPROAD];
  },
  getId: function getId(formOfWay) {
    return formOfWay;
  }
};