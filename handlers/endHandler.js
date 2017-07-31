const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const rankRouteHandler = require('../handlers/rankRouteHandler');
const routeHandler = require('./routeHandler');
const findRouteHandler = require('./findRouteHandler');

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
    
            db.collection("busstops").findOne({name: source}).then(function(starting) {

                var description = starting.description;     
                var oppSource = starting.oppBusStop;

                db.collection("busstops").findOne({name: destination}).then(function(ending) {
                    
                    var oppDestination = ending.oppBusStop;

                    if (oppSource === destination) {
                        ctx.reply(`Cross the road to ${destination}!`)

                    } else {
                    
                        // Source to destination
                        starting.buses.forEach(function(bus){

                            routes = findRouteHandler(bus, routes, source, destination, source, destination, description);  
                        
                        });
                        
                        if (oppDestination !== undefined) {
                            
                            // Source to opp destination
                            starting.buses.forEach(function(bus){
                                
                                routes = findRouteHandler(bus, routes, source, oppDestination, source, destination, description);
                            
                            });
                            
                        }
                            
                        db.collection("busstops").findOne({name: oppSource}).then(function(oppStarting) {
                            
                            if (oppSource !== undefined) {

                                var oppDescription = oppStarting.description;
                        
                                // Opp source to destination
                                oppStarting.buses.forEach(function(bus){
                            
                                    routes = findRouteHandler(bus, routes, oppSource, destination, source, destination, oppDescription);

                                });
                                
                                if (oppDestination !== undefined) {
                                
                                    // Opp source to opp destination
                                    oppStarting.buses.forEach(function(bus){
                                        
                                        routes = findRouteHandler(bus, routes, oppSource, oppDestination, source, destination, oppDescription);
                                    
                                    });  
                                    
                                }
                            }
                            
                            var newRoutes = rankRouteHandler(routes);

                            if (newRoutes.length === 0){
                                ctx.reply('No direct buses available!');
                                
                            } else {

                                var possibleRoutes = "";
                                var rank = 1;
                                var shortestWait = newRoutes[0].waitingTime;
                                
                                newRoutes.forEach(function(route) {
                                    
                                    if(rank === 2){possibleRoutes += '\nAlternative route(s):\n';}
                                    
                                    if(rank >= 2){ possibleRoutes += `\n${rank-1}. `}

                                    possibleRoutes += `${route.message} Total time needed is ${route.travelTime} min!\n`;
                                    rank++;

                                });
                                
                                ctx.replyWithHTML(possibleRoutes);
                                
                                if (shortestWait >= 6) {
                                    ctx.reply('The waiting time is long! \n' + newRoutes[0].description);
                                    
                                } else if (shortestWait < 6) {
                                    ctx.reply('If you\'re not already there please hurry! The bus is coming real soon... ');
                                }

                            }
                                        
                            db.close(); 
                        
                        });

                    }

                });

            });
        
        });
    
    });

}
