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
        var nearestStop = new Array();

        MongoClient.connect('mongodb://rebstan97:orbitalbus@ds151232.mlab.com:51232/orbitalbot', function(err, db) {

            if (err) throw err;

            db.collection("busstops").findOne({name: 'All Bus Stops'}).then(function(result){

                result.busStops.forEach(function(stop) {

                    var distance = Math.pow(stop.latitude - latitude, 2) + Math.pow(stop.longitude - longitude, 2);
            
                    if (distance < smallestDistance){
                        smallestDistance = distance;
                        while(nearestStop.length > 0){
                            nearestStop.pop();
                        };
                        nearestStop.push(stop.name);
                    }else if(distance == smallestDistance){
                        nearestStop.push(stop.name);
                    };
                       
                });
                
                if (nearestStop.length == 2){
                    ctx.reply(`My dear, the nearest bus stops are $(nearestStop[0]) and ${nearestStop[1]}. They are within the same distance from you. Which one do you want to go?`,
                        Markup.inlineKeyboard([
                            [Markup.callbackButton(`${nearestStop[0]}`, `start:${nearestStop[0]}`)]
                        ],[
                            [Markup.callbackButton(`${nearestStop[1]}`, `start:${nearestStop[1]}`)]
                        ]).extra()
                     );
                }else if (nearestStop.length == 1){
                    ctx.reply(`My dear, the nearest bus stop is ${nearestStop}`,
                        Markup.inlineKeyboard([
                            [Markup.callbackButton(`${nearestStop}`, `start:${nearestStop}`)]
                        ]).extra()
                    );
                };

                db.close();

            });

           startHandler(bot);
           
        })
        
    });
    
};