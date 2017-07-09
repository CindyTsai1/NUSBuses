const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const Route = require('../models/route');
const rankHandler = require('../handlers/rankHandler');

module.exports = function(bot){

    bot.action(/end(.+)/, function(ctx) {

        var source = ctx.callbackQuery.data.split(':')[2];
        var destination = ctx.callbackQuery.data.split(':')[1];
        var routes = new Array();
        //var busesToTake = new Array();

        if (source === destination){
            return ctx.reply('Are you trying to trick me? That\'s not funny');
        };

        MongoClient.connect('mongodb://localhost/orbitalBot', function(err, db) {

            if (err) throw err;

            db.collection("busstops").findOne({name: source}).then(function(result) {

                result.buses.forEach(function(bus){
                     
                    //if destination not found, search the opposite route;
                    if (bus.busStops.indexOf(destination) === -1){
                        source = source.oppBusStops;
                        bus = bus.oppBus;
                    };
                    
                    var indexSource = bus.busStops.indexOf(source);
                    var indexDestination = bus.busStops.indexOf(destination);
                    //insert arrival time function after its done
                    var waitingTime = Math.floor((Math.random() * 10) + 1);
                    
                    //busesToTake.push(bus.name);//I think don't need;

                    var numStops = indexDestination - indexSource;
                    
                    //if indexDestination is before indexSource and the starting terminal is the same as the ending terminal, check the number of stops if the bus reach destination and continue
                    if(numStops < 0 && bus.busStops[0] === bus.busStops[bus.busStops.length-1]){
                        numStops = bus.busStops.length + numStops;
                        //waitingTime2 is for the bus at the terminal
                        var waitingTime2 = Math.floor((Math.random() * 10) + 1);
                        var travelTime = waitingTime + waitingTime2 + 2*numStops;
                        
                        routes.push(new Route({
                            bus: bus.name,
                            message: `Take bus ${bus.name} to ${bus.busStops[bus.busStops.length - 1].name}, reaching in ${waitingTime} minutes, and take the same bus again, reaching in ${waitingTime2}.`,
                            travelTime: travelTime
                        }));
                        
                    }else if(numStops > 0){
                        travelTime = waitingTime + 2*numStops;
                        
                        routes.push(new Route({
                            bus: bus.name,
                            message: `Take bus ${bus.name} to ${destination}, reaching in ${waitingTime} minutes.`,
                            travelTime: travelTime
                        }));
                    };
                });

                var newRoutes = rankHandler(routes);

                if (newRoutes.length === 0){
                    ctx.reply('No direct buses available!');

                } else {

                    var possibleRoutes = "";
                    var rank = 1;

                    newRoutes.forEach(function(route) {
        
                        possibleRoutes += `${rank}.` + route.message + `Total travelling time is ${route.travelTime} minutes!\n`;
                        rank++;

                    });
                    ctx.reply(possibleRoutes);

                    db.collection("busstops").findOne({name: source}).then(function(result) {
                        ctx.reply('The waiting time is long! \n' + result.description);
                    });

                }

                db.close();
            });

        });
            
    });

};
