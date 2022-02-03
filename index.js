function getCoords() {
    let coords = {
        ax:document.getElementById("ax").value,
        az:document.getElementById("az").value*1,
        bx:document.getElementById("bx").value,
        bz:document.getElementById("bz").value*1
    }
    return coords
}
function computeHeading() {
    const coords = getCoords();
    let angleRad = Math.atan((coords.ax-coords.bx)/(coords.az-coords.bz));
    let angleDeg

    if(0 < coords.bx-coords.ax && 0 < coords.bz-coords.az) { //Quadrant NE
        angleDeg = -1 * angleRad * 180 / Math.PI + 180;
    } else if(0 > coords.bx-coords.ax && 0 > coords.bz-coords.az){ //Quadrant SW
        angleDeg = -1 * angleRad * 180 / Math.PI - 270;
    }
    if(coords.bx-coords.ax > 0 && coords.bz-coords.az < 0) { //Quadrant SE
        angleDeg = angleRad * 180 / Math.PI;
    } else if(coords.bx-coords.ax < 0 && coords.bz-coords.az > 0) { //Quadrant NW
        angleDeg = angleRad * 180 / Math.PI - 180;
    }
    if(angleDeg<0) {
        angleDeg = 360-angleDeg;
    }
    if(angleDeg>=360) {
        angleDeg -= 360
    }
    document.getElementById("Pos").innerHTML = `Starting position: ${coords.ax}, ${coords.az}. Destination position: ${coords.bx}, ${coords.bz}`
    document.getElementById("Head").innerHTML = `Flight heading ${Math.round(angleDeg * 100)/100}°`
}

let distance
function computeDistance() {
    const coords = getCoords();
    distance = Math.sqrt(((coords.ax-coords.bx)**2)+((coords.az-coords.bz)**2));
    document.getElementById("Dist").innerHTML = `Distance: ${Math.round(distance) / 1000}km`
    return distance;
}

function computeAltitude() {
    document.getElementById("Alt").innerHTML = `Glide ratio 8.5:1, Starting altitude (AGL) → ${Math.round(distance/8.5 *100)/100}`
}

function computeFlightTime() {
    const FlighTimeS = distance/30
    let FlightTime
    if(FlighTimeS<3600) { FlightTime = new Date(FlighTimeS * 1000).toISOString().substr(14, 5) + " mm/ss" } else { FlightTime = new Date(FlighTimeS * 1000).toISOString().substr(11, 8) + " hh/mm/ss" }
    document.getElementById("Time").innerHTML = `Flight time @58.3kts: ${FlightTime}`
}

function main() {
    computeHeading()
    computeDistance()
    computeAltitude()
    computeFlightTime()
    console.log("Computed output.")
}