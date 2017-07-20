const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const startHandler = require('./startHandler');

module.exports = function(bot){

    bot.on('location', function(ctx) {

        var latitude = ctx.message.location.latitude;
        var longitude = ctx.message.location.longitude;
        var smallestDistance = Number.MAX_VALUE;

        MongoClient.connect('mongodb://rebstan97:orbitalbus@ds151232.mlab.com:51232/orbitalbot', function(err, db) {

            if (err) throw err;

            var nearestStop;

            db.collection("busstops").find().forEach(function(result){          
                
                var distance = Math.pow(result.latitude - latitude, 2) + Math.pow(result.longitude - longitude, 2);
                
                if (distance < smallestDistance){
                    smallestDistance = distance;
                    nearestStop = result.name;
                };
                
            });

            ctx.reply(`My dear, the nearest bus stop is ${nearestStop}`,
                Markup.inlineKeyboard([
                    [Markup.callbackButton(`${nearestStop}`, `start:${nearestStop}`)]
                ]).extra()
            );

            startHandler(bot);

            db.close();

        })
        
    });
    
};
