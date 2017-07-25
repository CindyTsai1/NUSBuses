const Route = require('../models/route');

module.exports = function(bus, routes, source, destination) {

    var indexDest1 = bus.busStops.indexOf(destination);
    var indexDest2 = bus.busStops.lastIndexOf(destination);
    var indexSource = bus.busStops.indexOf(source);

    if (indexDest1 > indexSource){
        indexDestination = indexDest1;
    } else {
        indexDestination = indexDest2;
    }

    var numStops = indexDestination - indexSource;
    
    //if destination is found and destination is after source
    if (numStops > 0) {

        //insert arrival time function after its done
        var waitingTime = Math.floor((Math.random() * 10) + 1);

        var travelTime = waitingTime + 2*numStops;
            
        routes.push(new Route({
            bus: bus.name,
            message: `Take bus ${bus.name} to ${destination}, reaching in ${waitingTime} minutes.`,
            travelTime: travelTime,
            waitingTime: waitingTime
        }));
        
    }

    return routes;

}