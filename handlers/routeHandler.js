const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const endHandler = require('./endHandler');

module.exports = function(bot){

    bot.action(/route(.+)/, function(ctx) {

        var source = ctx.callbackQuery.data.split(':')[1];
        
        ctx.reply('No problem my dear, I\'m here to help! Where are you going?',
            Markup.inlineKeyboard([
                [Markup.callbackButton('AS7', `end:AS7:${source}`), 
                Markup.callbackButton('BIZ2', `end:BIZ2:${source}`)], 
                [Markup.callbackButton('Block EA', `end:Block EA:${source}`), 
                Markup.callbackButton('Botanic Gardens MRT', `end:Botanic Gardens MRT:${source}`)], 
                [Markup.callbackButton('BTC - Oei Tiong Ham', `end:BTC:${source}`), 
                Markup.callbackButton('Central Library', `end:Central Libary:${source}`)],
                [Markup.callbackButton('College Green Hostel', `end:College Green Hostel:${source}`), 
                Markup.callbackButton('COM2', `end:COM2:${source}`)], 
                [Markup.callbackButton('Computer Centre', `end:Computer Centre:${source}`), 
                Markup.callbackButton('Kent Ridge Bus Terminal', `end:Kent Ridge Bus Terminal:${source}`)], 
                [Markup.callbackButton('Kent Ridge MRT', `end:Kent Ridge MRT:${source}`),
                Markup.callbackButton('Kent Vale', `end:Kent Vale:${source}`)], 
                [Markup.callbackButton('LT13', `end:LT13:${source}`),
                Markup.callbackButton('LT29', `end:LT29:${source}`)], 
                [Markup.callbackButton('Museum', `end:Museum:${source}`), 
                Markup.callbackButton('Opp Block EA', `end:Opp Block EA:${source}`)], 
                [Markup.callbackButton('Opp Hon Sui Sen Memorial Library', `end:Opp Hon Sui Sen Memorial Library:${source}`), 
                Markup.callbackButton('Opp Kent Ridge MRT', `end:Opp Kent Ridge MRT:${source}`)], 
                [Markup.callbackButton('NUSS', `end:NUSS:${source}`),
                Markup.callbackButton('Opp PGP House 12', `end:Opp PGP House 12:${source}`)],
                [Markup.callbackButton('Opp University Hall', `end:Opp University Hall:${source}`),
                Markup.callbackButton('Opp University Health Centre', `end:Opp University Health Centre:${source}`)],
                [Markup.callbackButton('Opp Yusof Ishak House', `end:Opp Yusof Ishak House:${source}`),
                Markup.callbackButton('PGP House 12', `end:PGP House 12:${source}`)],
                [Markup.callbackButton('PGP House 14 and 15', `end:PGP House 14 and 15:${source}`),
                Markup.callbackButton('Prince George\'s Park Residences', `end:Prince George\'s Park Residences:${source}`)],
                [Markup.callbackButton('Prince George\'s Park', `end:Prince George\'s Park:${source}`),
                Markup.callbackButton('Raffles Hall', `end:Raffles Hall:${source}`)],
                [Markup.callbackButton('S17', `end:S17:${source}`),
                Markup.callbackButton('University Hall', `end:University Hall:${source}`)],
                [Markup.callbackButton('University Health Centre', `end:University Health Centre:${source}`),
                Markup.callbackButton('University Town', `end:University Town:${source}`)],
                [Markup.callbackButton('Ventus (Opp LT13)', `end:Ventus:${source}`),
                Markup.callbackButton('Yusof Ishak House', `end:Yusof Ishak House:${source}`)]
            ]).extra()
        );

        return endHandler(bot);
    });

}

