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
                     
                    //if destination is found, search it as normal;
                    if (bus.busStops.indexOf(destination) !== -1){
                        var indexSource = bus.busStops.indexOf(source);
                        var indexDestination = bus.busStops.indexOf(destination);
                        routes = findRouteHandler(routes, indexSource, indexDestination);
                    }
                    //should we find opposite bus stops
                        
                });

                var newRoutes = rankRouteHandler(routes);

                if (newRoutes.length === 0){
                    ctx.reply('No direct buses available!');
                    
                } else if (newRoutes.length === 1){
                    var shortestWait = newRoutes[0].waitingTime;
                    ctx.reply(`${newRoutes[0].message} Total time needed to get to ${destination} is ${newRoute[0].travelTime} minutes!`);

                } else {

                    var possibleRoutes = "";
                    var rank = 1;
                    
                    newRoutes.forEach(function(route) {
                        
                        if(rank === 2){possibleRoutes += '\nAlternative route(s):\n';};
                        
                        possibleRoutes += `${rank}. ${route.message} Total time needed to get to ${destination} is ${route.travelTime} minutes!\n`;
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
