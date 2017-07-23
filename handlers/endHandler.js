const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const Route = require('../models/route');
const rankRouteHandler = require('../handlers/rankRouteHandler');
const routeHandler = require('./routeHandler');

module.exports = function(bot){

    bot.action(/end(.+)/, function(ctx) {

        var source = ctx.callbackQuery.data.split(':')[2];
        var destination = ctx.callbackQuery.data.split(':')[1];
        var routes = new Array();

        if (source === destination){
            return ctx.reply('Are you trying to trick me? That\'s not funny :( ', 
                Markup.inlineKeyboard([
                    Markup.callbackButton('I\'m sorry! Let me select my destination again', `route:${source}`)
                ]).extra());
        };

        MongoClient.connect('mongodb://rebstan97:orbitalbus@ds151232.mlab.com:51232/orbitalbot', function(err, db) {

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

                    var numStops = indexDestination - indexSource;
                    
                    //if indexDestination is before indexSource and the starting terminal is the same as the ending terminal, check the number of stops if the bus reach destination and continue
                    if(numStops < 0 && bus.name === "A1"){
                        numStops = bus.busStops.length + numStops;
                        //waitingTime2 is for the A1 at the terminal
                        var waitingTime2 = Math.floor((Math.random() * 10) + 1);
                        var travelTime = waitingTime + waitingTime2 + 2*numStops;
                        
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
                        
                    } else if(numStops > 0) {
                        travelTime = waitingTime + 2*numStops;
                        
                        routes.push(new Route({
                            bus: bus.name,
                            message: `Take bus ${bus.name} to ${destination}, reaching in ${waitingTime} minutes.`,
                            travelTime: travelTime
                        }));
                    };
                });

                var newRoutes = rankRouteHandler(routes);

                if (newRoutes.length === 0){
                    ctx.reply('No direct buses available!');

                } else {

                    var possibleRoutes = "";
                    var rank = 1;
                    var shortestWait = newRoutes[0].travelTime;

                    newRoutes.forEach(function(route) {

                        if (rank === 1) { shortestWait = route.waitingTime; }
                        if (rank == 2) { possibleRoutes += '\nAlternative route(s):\n'; }
                        
                        possibleRoutes += `${route.message} Total time needed to get to ${destination} is ${route.travelTime} minutes!\n`;
                        rank++;

                    });
                    
                    ctx.reply(possibleRoutes);

                    db.collection("busstops").findOne({name: source}).then(function(result) {
                         if (shortestWait >= 6) {
                             ctx.reply('The waiting time is long! \n' + result.description);
                         } else {
                             ctx.reply('If you\'re not already there please hurry! The bus is coming real soon... ');
                         }
                    });

                }

                db.close();
            });

        });
            
    });

};
