const Route = require('../models/route');

module.exports = function(bus, routes, source, destination, s1, d1, description) {

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
        
        var message = `Take bus ${bus.name} to ${destination}, reaching in ${waitingTime} minutes.`;
        
        if (source !== s1) {
            
            message = `Cross over to ${source}. ` + message;
            
        }
        
        if(destination !== d1) {
            
            message = message + ` And cross over to ${d1}.`;
            
        }
            
        routes.push(new Route({
            bus: bus.name,
            message: message,
            travelTime: travelTime,
            waitingTime: waitingTime,
            description: description
        }));
        
    }

    return routes;

}
