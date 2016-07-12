export default class Line {
    getStartNode() {
        throw new Error('This is an interface method');
    }

    getEndNode() {
        throw new Error('This is an interface method');
    }

    getFOW() {
        throw new Error('This is an interface method');
    }

    getFRC() {
        throw new Error('This is an interface method');
    }

    getGeoCoordinateAlongLine(distanceAlong) {
        throw new Error('This is an interface method');
    }

    getLineLength() {
        throw new Error('This is an interface method');
    }

    getId() {
        throw new Error('This is an interface method');
    }

    getPrevLines() {
        throw new Error('This is an interface method');
    }

    getNextLines() {
        throw new Error('This is an interface method');
    }

    distanceToPoint(longitude, latitude) {
        throw new Error('This is an interface method');
    }

    measureAlongLine(longitude, latitude) {
        throw new Error('This is an interface method');
    }

    getShapeCoordinates() {
        throw new Error('This is an interface method');
    }

    getNames() {
        throw new Error('This is an interface method');
    }
};
