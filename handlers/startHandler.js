const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const routeHandler = require('./routeHandler');

module.exports = function(bot){

    bot.action(/start(.+)/, function(ctx) {

        var source = ctx.callbackQuery.data.split(':')[1];
        ctx.reply(`Bus arrival timings at ${source} are:\nA1                  3 mins\nA2                  10 mins\nD1 to BIZ2      5 mins\nD1 to UTown   1 min`, 
            Markup.inlineKeyboard([
            Markup.callbackButton('I don\'t know what bus to take. Help me!', `route:${source}`)
            ]).extra()
        );

        //Handle route callback
        return routeHandler(bot);
        
    });
    
};