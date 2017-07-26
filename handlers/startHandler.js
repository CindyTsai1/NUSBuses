const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const routeHandler = require('./routeHandler');
const MongoClient = require('mongodb').MongoClient;

module.exports = function(bot){

    bot.action(/start(.+)/, function(ctx) {

        var source = ctx.callbackQuery.data.split(':')[1];
        var arrivalResponse = `Bus arrival timings at ${source} are:\n`;

        var date = new Date();
        var time = date.getHours()*100 + date.getMinutes();

        MongoClient.connect('mongodb://rebstan97:orbitalbus@ds151232.mlab.com:51232/orbitalbot', function(err, db) {
            
            if (err) throw err;

            db.collection("busstops").findOne({name: source}).then(function(result) {

                for (var bus of result.buses) {

                    if ((bus.name === 'A1E' && (time < 630 || time > 1000)) || 
                       (bus.name === 'A2E' && (time < 1730 || time > 1900)) ||
                       (bus.name === 'C' && (time < 1000))) {
                            arrivalResponse += `${bus.name2}         - \n`; 

                    } else {
                        var arrivalTime = Math.floor((Math.random() * 10) + 1);
                        arrivalResponse += `${bus.name2}         ${arrivalTime} min\n`;
                    }
                };
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
