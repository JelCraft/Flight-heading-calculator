function getCoords() {
    let coords = {
        ax:document.getElementById("ax").value,
        az:document.getElementById("az").value*-1,
        bx:document.getElementById("bx").value,
        bz:document.getElementById("bz").value*-1
    }
    return coords
}

function computeHeading() {
    const coords = getCoords();
    let angleRad = Math.atan((coords.ax-coords.bx)/(coords.az-coords.bz));
    let angleDeg = angleRad * 180 / Math.PI;
    let angleDeg2 = angleDeg + 180

    if(angleDeg<0) {
        angleDeg = 360-angleDeg;
    }
    if(angleDeg>=360) {
        angleDeg = angleDeg-360;
    }

    if(angleDeg2<0) {
        angleDeg = 360-angleDeg;
    }
    if(angleDeg2>=360) {
        angleDeg = angleDeg-360;
    }

    document.getElementById("Pos").innerHTML = `Starting position: ${coords.ax}, ${coords.az}. Destination position: ${coords.bx}, ${coords.bz}`
    document.getElementById("Head").innerHTML = `Flight heading ${angleDeg} / ${angleDeg2}`
}

let distance
function computeDistance() {
    const coords = getCoords();
    distance = Math.sqrt(((coords.ax-coords.bx)**2)+((coords.az-coords.bz)**2));
    document.getElementById("Dist").innerHTML = `Distance: ${distance/1000}km`
    return distance;
}

function computeAltitude() {
    document.getElementById("Alt").innerHTML = `Glide ratio 7.5:1, Starting altitude (AGL) → ${distance/7.5}`
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
    console.log("Compute completed.")
}