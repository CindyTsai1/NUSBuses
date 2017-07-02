const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const endHandler= require('./endHandler');

module.exports = function(bot, source){

    bot.action('route', function(ctx) {
        ctx.reply('No problem my dear, I\'m here to help! Where are you going?',
            Markup.inlineKeyboard([
                [Markup.callbackButton('AS7', 'end:AS7'), 
                Markup.callbackButton('BIZ2', 'end:BIZ2')], 
                [Markup.callbackButton('Block EA', 'end:Block EA'), 
                Markup.callbackButton('Botanic Gardens MRT', 'end:Botanic Gardens MRT')], 
                [Markup.callbackButton('BTC - Oei Tiong Ham', 'end:BTC'), 
                Markup.callbackButton('Central Library', 'end:Central Libary')],
                [Markup.callbackButton('College Green Hostel', 'end:College Green Hostel'), 
                Markup.callbackButton('COM2', 'end:COM2')], 
                [Markup.callbackButton('Computer Centre', 'end:Computer Centre'), 
                Markup.callbackButton('Kent Ridge Bus Terminal', 'end:Kent Ridge Bus Terminal')], 
                [Markup.callbackButton('Kent Ridge MRT', 'end:Kent Ridge MRT'),
                Markup.callbackButton('Kent Vale', 'end:Kent Vale')], 
                [Markup.callbackButton('LT13', 'end:LT13'),
                Markup.callbackButton('LT29', 'end:LT29')], 
                [Markup.callbackButton('Museum', 'end:Museum'), 
                Markup.callbackButton('Opp Block EA', 'end:Opp Block EA')], 
                [Markup.callbackButton('Opp Hon Sui Sen Memorial Library', 'end:Opp Hon Sui Sen Memorial Library'), 
                Markup.callbackButton('Opp Kent Ridge MRT', 'end:Opp Kent Ridge MRT')], 
                [Markup.callbackButton('NUSS', 'end:NUSS'),
                Markup.callbackButton('Opp PGP House 12', 'end:Opp PGP House 12')],
                [Markup.callbackButton('Opp University Hall', 'end:Opp University Hall'),
                Markup.callbackButton('Opp University Health Centre', 'end:Opp University Health Centre')],
                [Markup.callbackButton('Opp Yusof Ishak House', 'end:Opp Yusof Ishak House'),
                Markup.callbackButton('PGP House 12', 'end:PGP House 12')],
                [Markup.callbackButton('PGP House 14 and 15', 'end:PGP House 14 and 15'),
                Markup.callbackButton('Prince George\'s Park Residences', 'Prince George\'s Park Residences')],
                [Markup.callbackButton('Prince George\'s Park', 'end:Prince George\'s Park'),
                Markup.callbackButton('Raffles Hall', 'end:Raffles Hall')],
                [Markup.callbackButton('S17', 'end:S17'),
                Markup.callbackButton('University Hall', 'end:University Hall')],
                [Markup.callbackButton('University Health Centre', 'end:University Health Centre'),
                Markup.callbackButton('University Town', 'end:University Town')],
                [Markup.callbackButton('Ventus (Opp LT13)', 'end:Ventus'),
                Markup.callbackButton('Yusof Ishak House', 'end:Yusof Ishak House')]
            ]).extra()
        );
        return endHandler(bot, source);
    });

}

