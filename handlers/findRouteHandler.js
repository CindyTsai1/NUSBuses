const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const Route = require('../models/route');

module.exports = function(routes, indexSource, indexDestination){
    
    var numStops = indexDestination - indexSource;
    
    //insert arrival time function after its done
    var waitingTime = Math.floor((Math.random() * 10) + 1);
                        
    if(numStops > 0) {
        var travelTime = waitingTime + 2*numStops;
        
        routes.push(new Route({
            bus: bus.name,
            message: `Take bus ${bus.name} to ${destination}, reaching in ${waitingTime} minutes.`,
            travelTime: travelTime
        }));
    
    }
    
    /*else{
        if(indexDestination <== 4){
            numStops = bus.busStops.length + numStops;
            
            if(bus.name === "A1"){
                //waitingTime2 is for the A1 at the terminal
                var waitingTime2 = Math.floor((Math.random() * 10) + 1);
                travelTime = waitingTime + waitingTime2 + 2*numStops;
                
                routes.push(new Route({
                    bus: bus.name,
                    message: `Take bus A1 to ${bus.busStops[0].name}, reaching in ${waitingTime} minutes, and take the same bus again, reaching in ${waitingTime2}.`,
                    travelTime: travelTime
                }));
                
                //waitingTime2 for D2 at the terminal
                waitingTime2 = Math.floor((Math.random() * 10) + 1);
                travelTime = waitingTime + waitingTime2 + 2*numStops;
                
                routes.push(new Route({
                    bus: bus.name,
                    message: `Take bus A1 to ${bus.busStops[0].name}, reaching in ${waitingTime} minutes, and take bus D2, reaching in ${waitingTime2}.`,
                    travelTime: travelTime
                }));
            
            }else if(bus.name === "D2"){
                
                //waitingTime2 is for the D2 at the terminal
                waitingTime2 = Math.floor((Math.random() * 10) + 1);
                travelTime = waitingTime + waitingTime2 + 2*numStops;
                        
                routes.push(new Route({
                    bus: bus.name,
                    message: `Take bus D2 to ${bus.busStops[0].name}, reaching in ${waitingTime} minutes, and take the same bus again, reaching in ${waitingTime2}.`,
                    travelTime: travelTime
                }));
                
                //waitingTime2 for A1 at the terminal
                waitingTime2 = Math.floor((Math.random() * 10) + 1);
                travelTime = waitingTime + waitingTime2 + 2*numStops;
                
                routes.push(new Route({
                    bus: bus.name,
                    message: `Take bus D2 to ${bus.busStops[0].name}, reaching in ${waitingTime} minutes, and take bus A1, reaching in ${waitingTime2}.`,
                    travelTime: travelTime
                }));
            };
        };
    };
    */
};
