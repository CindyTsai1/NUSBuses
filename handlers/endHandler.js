const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;

module.exports = function(bot, source){

    bot.action(/end(.+)/, function(ctx) {

        var destination = ctx.callbackQuery.data.split(':')[1];

        MongoClient.connect('mongodb://localhost/orbitalBot', function(err, db) {

            if (err) throw err;

            db.collection("busstops").findOne({name: source}).then(function(result) {

                var busesToTake = new Array();
                result.buses.forEach(function(bus){
                    if (bus.busStops.indexOf(destination) !== -1 && bus.busStops.indexOf(source) < bus.busStops.indexOf(destination)){
                        busesToTake.push(bus.name);                 
                    };
                });

                if (busesToTake.length !== 0){

                    var possibleRoutes = "";
                    busesToTake.forEach(function(bus){
                    possibleRoutes += `Take bus ${bus} to ${destination}, reaching in 15 minutes\n`;
                    });
                    ctx.reply(possibleRoutes);

                    db.collection("busstops").findOne({name: destination}).then(function(result) {
                    ctx.reply('The waiting time is long! \n' + result.description);
                    });
                
                } else {
                    ctx.reply('No direct buses available!');
                };
                
                db.close();
            
            });
            
        });
/*
        const destination = ctx.callbackQuery.data.split(':')[1];
        orbitalBot.getCollection('busstops').findOne({name: source}).then(function(result){
            console.log(result);
        })
        return ctx.reply(`1. Take bus A1 to PGP then take either A1 or D2 to S17, reaching in 3 mins\n2. Take bus A2 to LT29, reaching in 10 mins`
        );
*/

    });

};
