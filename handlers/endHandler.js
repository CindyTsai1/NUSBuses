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

        if (source === destination){
            return ctx.reply('Are you trying to trick me? That\'s not funny');
        };

        MongoClient.connect('mongodb://rebstan97:orbitalbus@ds151232.mlab.com:51232/orbitalbot', function(err, db) {

            if (err) throw err;

            db.collection("busstops").findOne({name: source}).then(function(result) {

                result.buses.forEach(function(bus){

                    var indexSource = bus.busStops.indexOf(source);
                    var indexDestination = bus.busStops.indexOf(destination);

                    if (indexDestination !== -1 && indexSource < indexDestination){

                        var numStops = indexDestination - indexSource;
                        //insert arrival time function after its done
                        var waitingTime = Math.floor((Math.random() * 10) + 1);
                        var travelTime = waitingTime + 2*numStops;

                        routes.push(new Route({
                            bus: bus.name,
                            waitingTime: waitingTime,
                            travelTime: travelTime
                        })); 
             
                    }

                });

                var newRoutes = rankHandler(routes);

                if (newRoutes.length === 0){
                    ctx.reply('No direct buses available!');

                } else {

                    var possibleRoutes = "";
                    var rank = 1;
                    var shortestWait = 20;

                    newRoutes.forEach(function(route) {

                        if (rank === 1) { shortestWait = route.waitingTime; }
                        if (rank == 2) { possibleRoutes += '\nAlternative route(s):\n'; }
                        
                        possibleRoutes += `Take bus ${route.bus} to ${destination}, reaching in ${route.waitingTime} minutes. Total time needed to get to ${destination} is ${route.travelTime} minutes!\n`;
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
