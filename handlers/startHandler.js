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
                
                //getting the current unix timestamp of the message and convert to hours
                //var hour = (ctx.message.date)/60/60%24;
                //ctx.reply(hour); //see if it prints out the current time for hour
                
                result.buses.forEach(function(bus) {
                    var arrivalTime = Math.floor((Math.random() * 10) + 1);
                    //if not operating, the api shall not return any value
                    if(arrivalTime == null){
                        arrivalResponse += `${bus.name} is not operating now\n`;
                    }else{
                        arrivalResponse += `${bus.name2}         ${arrivalTime} min\n`;
                    };
                    
                    /*if(bus.startTime <= hour && hour <= bus.endTime){
                        var arrivalTime = Math.floor((Math.random() * 10) + 1);
                        arrivalResponse += `${bus.name2}         ${arrivalTime} min\n`;
                    }else{
                        arrivalResponse += `${bus.name} is not operating now\n`;
                    };*/
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
