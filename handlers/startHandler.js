const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const routeHandler = require('./routeHandler');
const MongoClient = require('mongodb').MongoClient;

module.exports = function(bot){

    bot.action(/start(.+)/, function(ctx) {

        var source = ctx.callbackQuery.data.split(':')[1];
        var arrivalResponse = `Bus arrival timings at ${source} are:\n`;

        MongoClient.connect('mongodb://rebstan97:orbitalbus@ds151232.mlab.com:51232/orbitalbot', function(err, db) {
            
            if (err) throw err;

            db.collection("busstops").findOne({name: source}).then(function(result) {
                result.buses.forEach(function(bus) {
                    var arrivalTime = Math.floor((Math.random() * 10) + 1);
                    arrivalResponse += `${bus.name2}         ${arrivalTime} min\n`;
                });
                ctx.reply(arrivalResponse, Markup.inlineKeyboard([
                    Markup.callbackButton('I don\'t know what bus to take. Help me!', `route:${source}`)
                ]).extra()
                                                );
            });
        });

        //Handle route callback
        return routeHandler(bot);
        
    });
    
};