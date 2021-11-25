function degreesToRadians(degree) {
    return degree * (Math.PI / 180);
}

function fromCoordinatesReturningKM(centerCoordinates, extremeCoordinates) {

    const RADIUS = 6371;

    const [centerLatitude, centerLongitude] = centerCoordinates;
    const [extremeLatitude, extremeLongitude] = extremeCoordinates;

    const deltaLatitude = degreesToRadians(extremeLatitude - centerLatitude);
    const deltaLongitude = degreesToRadians(extremeLongitude - centerLongitude);

    const circumference = Math.sin(deltaLatitude / 2) *
        Math.sin(deltaLatitude / 2) +
        Math.cos(degreesToRadians(centerLatitude)) *
        Math.cos(degreesToRadians(extremeLatitude)) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2);


    const center = 2 *
        Math.atan2(Math.sqrt(circumference), Math.sqrt(1 - circumference));
    const distanceInKM = RADIUS * center;

    return distanceInKM;
}

function fromCoordinatesReturningM(centerCoordinates, extremeCoordinates) {
    return fromCoordinatesReturningKM(centerCoordinates, extremeCoordinates) * 1000;
}

exports.fromCoordinatesReturningM = fromCoordinatesReturningM;

exports.fromCoordinatesReturningKM = fromCoordinatesReturningKM;