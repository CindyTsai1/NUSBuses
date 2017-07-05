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

                    var indexSource = bus.busStops.indexOf(source);
                    var indexDestination = bus.busStops.indexOf(destination);

                    if (indexDestination !== -1 && indexSource < indexDestination){

                        //busesToTake.push(bus.name);

                        var numStops = indexDestination - indexSource;
                        //insert arrival time function after its done
                        var waitingTime = Math.floor((Math.random() * 10) + 1);
                        var travelTime = waitingTime + 2*numStops;
                        
                        routes.push(new Route({
                            bus: bus.name,
                            message: `Take bus ${bus.name} to ${destination}, reaching in 15 minutes`,
                            waitingTime: waitingTime,
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
        
                        possibleRoutes += `${rank}. Take bus ${route.bus} to ${destination}, reaching in ${route.waitingTime} minutes. Total travelling time is ${route.travelTime} minutes!\n`;
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
