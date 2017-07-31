const Route = require('../models/route');

module.exports = function(bus, routes, source, destination, s1, d1, description) {

    var date = new Date();
    var time = date.getHours()*100 + date.getMinutes();

    if ((bus.name === 'A1E' && (time < 630 || time > 1000)) || 
        (bus.name === 'A2E' && (time < 1730 || time > 1900)) ||
        (bus.name === 'C' && (time < 1000))) {

        return routes;
        
    } else {
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

            //insert arrival time function
            var waitingTime = Math.floor((Math.random() * 10) + 1);

            var travelTime = waitingTime + 2*numStops;
            
            var message = `🚍 <b>${bus.name}</b>, ${numStops} stops. Coming in <i>${waitingTime} min</i>\n`;
            
            if (source !== s1) {
                
                message = `🚶 to ${source}\n` + message;
                
            }
            
            if (destination !== d1) {
                
                message += `🚶 to ${d1}\n`;
                
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
}
