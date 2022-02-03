const yargs = require("yargs");

const options = yargs
 .usage("Usage: -n <name>")
 .option("ax", { alias: "startx", describe: "-", type: "string", demandOption: true })
 .option("az", { alias: "startz", describe: "-", type: "string", demandOption: true })
 .option("bx", { alias: "endx", describe: "-", type: "string", demandOption: true })
 .option("bz", { alias: "endz", describe: "-", type: "string", demandOption: true })
 .argv;

    let coords = {
        ax:options.ax,
        az:options.az*-1,
        bx:options.bx,
        bz:options.bz*-1,
    }

const ReplyInput = `Starting position: ${options.ax}, ${options.az}. Destination position: ${options.bx}, ${options.bz}`;

function computeHeading() {
    let angleRad = Math.atan((coords.ax-coords.bx)/(coords.az-coords.bz));
    let angleDeg1 = angleRad * 180 / Math.PI;
    let angleDeg2 = angleDeg + 180
    let angleDegCorrected

    if(0 < coords.bx-coords.ax && 0 < coords.bz-coords.az) { //Quadrant NE
        angleDegCorrected = angleRad * 180 / Math.PI
    } else { //Quadrant SW
        angleDegCorrected = angleRad * 180 / Math.PI + 180
    }
    if(coords.bx-coords.ax > 0 && coords.bz-coords.az < 0) { //Quadrant SE
        angleDegCorrected = angleRad * 180 / Math.PI + 90
    } else { //Quadrant NW
        angleDegCorrected = angleRad * 180 / Math.PI + 270
    }



    //Fix negative or >360 angles
    if(angleDeg<0) {
        angleDeg = 360-angleDeg;
    }
    if(angleDeg>=360) {
        angleDeg -=360;
    }

    if(angleDeg2<0) {
        angleDeg2 = 360-angleDeg;
    }
    if(angleDeg2>=360) {
        angleDeg2 -=360;
    }
    if(angleDegCorrected<0) {
        angleDegCorrected = 360-angleDegCorrected;
    }
    if(angleDegCorrected>=360) {
        angleDegCorrected -= 360
    }

    console.log(ReplyInput);
    console.log(`Flight heading ${angleDeg1} / ${angleDeg2} (Corrected heading: ${angleDegCorrected})`);
}

let distance
function computeDistance() {
    distance = Math.sqrt(((coords.ax-coords.bx)**2)+((coords.az-coords.bz)**2));
    console.log(`Distance: ${distance/1000}km`);
    return distance;
}

function computeAltitude() {
    console.log(`Glide ratio 7.5:1, Starting altitude (AGL) → ${distance/7.5}`)
}

function computeFlightTime() {
    const FlighTimeS = distance/30
    let FlightTime
    if(FlighTimeS<3600) { FlightTime = new Date(FlighTimeS * 1000).toISOString().substr(14, 5) + " mm/ss" } else { FlightTime = new Date(FlighTimeS * 1000).toISOString().substr(11, 8) + " hh/mm/ss" }
    console.log(`Flight time @58.3kts: ${FlightTime}`)
}
 
computeHeading()
computeDistance()
computeAltitude()
computeFlightTime()
