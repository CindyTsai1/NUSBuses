const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const startHandler = require('./startHandler');
const computeDistanceHandler = require('./computeDistanceHandler');
const NearestStop = require('../models/nearestStop');
const rankStopHandler = require('./rankStopHandler');

module.exports = function(bot){

    bot.on('location', function(ctx) {

        var latitude = ctx.message.location.latitude;
        var longitude = ctx.message.location.longitude;
        var smallestDistance = Number.MAX_VALUE;
        var nearestStops = new Array();

        MongoClient.connect('mongodb://rebstan97:orbitalbus@ds151232.mlab.com:51232/orbitalbot', function(err, db) {

            if (err) throw err;

            db.collection("busstops").findOne({name: 'All Bus Stops'}).then(function(result){

                result.busStops.forEach(function(stop) {

                    var distance = computeDistanceHandler(latitude, longitude, stop.latitude, stop.longitude);
                    
                    if (distance <= 0.8) {
                        nearestStops.push(new NearestStop({
                            name: stop.name,
                            distance: distance
                        }));
                    }
                    
                });

                var rankedStops = rankStopHandler(nearestStops);

                if (rankedStops.length === 0) {
                    ctx.reply(`My dear, there are no bus stops near you.`);
                }

                if (rankedStops.length === 1) {
                    ctx.reply(`My dear, the bus stop nearest to you is ${rankedStops[0]}.`,
                        Markup.inlineKeyboard([
                            [Markup.callbackButton(`${rankedStops[0].name}`, `start:${rankedStops[0].name}`)],
                        ]).extra()
                     );
                }

                if (rankedStops.length === 2) {
                    ctx.reply('My dear, here are the bus stops near you (ranked with distance in ascending order).',
                        Markup.inlineKeyboard([
                            [Markup.callbackButton(`${rankedStops[0].name}`, `start:${rankedStops[0].name}`)],
                            [Markup.callbackButton(`${rankedStops[1].name}`, `start:${rankedStops[1].name}`)]
                        ]).extra());
                }

                if (rankedStops.length >= 3) {
                    ctx.reply('My dear, here are the bus stops near you (ranked with distance in ascending order).',
                        Markup.inlineKeyboard([
                            [Markup.callbackButton(`${rankedStops[0].name}`, `start:${rankedStops[0].name}`)],
                            [Markup.callbackButton(`${rankedStops[1].name}`, `start:${rankedStops[1].name}`)],
                            [Markup.callbackButton(`${rankedStops[2].name}`, `start:${rankedStops[2].name}`)]
                        ]).extra()
                     );
                }
                
                db.close();

            });

           startHandler(bot);
           
        })
        
    });
    
};
