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
    const coords = getCoords();
    let angleRad = Math.atan((coords.ax-coords.bx)/(coords.az-coords.bz));
    let angleDeg

    if(0 < coords.bx-coords.ax && 0 < coords.bz-coords.az) { //Quadrant NE
        angleDeg = -1 * angleRad * 180 / Math.PI + 180;
        console.log("Quadrant NE");
    } else if(0 > coords.bx-coords.ax && 0 > coords.bz-coords.az){ //Quadrant SW
        angleDeg = -1 * angleRad * 180 / Math.PI - 270;
        console.log("Quadrant SW");
    }
    if(coords.bx-coords.ax > 0 && coords.bz-coords.az < 0) { //Quadrant SE
        angleDeg = angleRad * 180 / Math.PI;
        console.log(`Quadrant SE, ${coords.bx} - ${coords.ax}, ${coords.bz} - ${coords.az}`);
    } else if(coords.bx-coords.ax < 0 && coords.bz-coords.az > 0) { //Quadrant NW
        angleDeg = angleRad * 180 / Math.PI - 180;
        console.log(`Quadrant NW, ${coords.bx} - ${coords.ax}, ${coords.bz} -${coords.az}`);
    }

    if(angleDeg<0) {
        angleDeg = 360-angleDeg;
    }
    if(angleDeg>=360) {
        angleDeg -= 360
    }

    console.log(ReplyInput);
    console.log(`Flight heading ${angleDeg}`);
}

let distance
function computeDistance() {
    distance = Math.sqrt(((coords.ax-coords.bx)**2)+((coords.az-coords.bz)**2));
    console.log(`Distance: ${distance/1000}km`);
    return distance;
}

function computeAltitude() {
    console.log(`Glide ratio 8.5:1, Starting altitude (AGL) → ${distance/8.5}`)
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
