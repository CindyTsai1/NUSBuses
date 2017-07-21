const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const startHandler = require('../handlers/startHandler');

module.exports = function(bot){

    bot.command('start', function(ctx) {

        ctx.reply('Where are you my dear?',
            Extra.markup((markup) => {
                return markup.resize().keyboard([
                markup.locationRequestButton('What\'s the nearest bus stop near me? ')
                ]);
            })
        ).then(function(){

            return ctx.reply('Select where you are at or allow us to find your nearest bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Arts & Social Sciences', 'buttonsStart:fass'),
                    Markup.callbackButton('Bukit Timah Campus', 'buttonsStart:btc')],
                    [Markup.callbackButton('Business', 'buttonsStart:business'),
                    Markup.callbackButton('Central Forum', 'buttonsStart:clb')],
                    [Markup.callbackButton('Computing', 'buttonsStart:computing'),
                    Markup.callbackButton('Engineering', 'buttonsStart:engine')],
                    [Markup.callbackButton('Kent Ridge MRT', 'buttonsStart:kr'),
                    Markup.callbackButton('Prince George\'s Park', 'buttonsStart:pgp')],
                    [Markup.callbackButton('Science', 'buttonsStart:science'),
                    Markup.callbackButton('University Health Centre', 'buttonsStart:uhc')],
                    [Markup.callbackButton('Yusof Ishak House', 'buttonsStart:yih'),
                    Markup.callbackButton('University Town', 'start:University Town')],
                    [Markup.callbackButton('Others', 'buttonsStart:others')]
                ]).extra()
            );
        });
    });

    bot.action(/buttonsStart(.+)/, function(ctx) {

        var region = ctx.callbackQuery.data.split(':')[1];

        if (region === 'fass') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('AS7', 'start:AS7')],
                    [Markup.callbackButton('LT13', 'start:LT13')],
                    [Markup.callbackButton('Ventus (Opp LT13)', 'start:Ventus')]
                ]).extra()
            );
        } 

        if (region === 'btc') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Botanic Gardens MRT', 'start:Botanic Gardens MRT')], 
                    [Markup.callbackButton('BTC - Oei Tiong Ham', 'start:BTC')],
                    [Markup.callbackButton('College Green Hostel', 'start:College Green Hostel')]
                ]).extra()
            );
        }

        if (region === 'business') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('BIZ2', 'start:BIZ2')],
                    [Markup.callbackButton('Opp Hon Sui Sen Memorial Library', 'start:Opp Hon Sui Sen Memorial Library')]
                ]).extra()
            );
        }

        if (region === 'clb') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Central Library', 'start:Central Library')],
                    [Markup.callbackButton('Computer Centre', 'start:Computer Centre')] 
                ]).extra()
            );
        }

        if (region === 'computing') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('COM2', 'start:COM2')]
                ]).extra()
            );
        }

        if (region === 'engine') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Block EA', 'start:Block EA')],
                    [Markup.callbackButton('Opp Block EA', 'start:Opp Block EA')] 
                ]).extra()
            );
        }

        if (region === 'kr') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Kent Ridge MRT', 'start:Kent Ridge MRT')],
                    [Markup.callbackButton('Opp Kent Ridge MRT', 'start:Opp Kent Ridge MRT')]
                ]).extra()
            );
        }

        if (region === 'pgp') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Prince George\'s Park', 'start:Prince George\'s Park')],
                    [Markup.callbackButton('Prince George\'s Park Residences', 'start:Prince George\'s Park Residences')],
                    [Markup.callbackButton('PGP House 7', 'start:PGP House 7')],
                    [Markup.callbackButton('PGP House 12', 'start:PGP House 12')],
                    [Markup.callbackButton('Opp PGP House 12', 'start:Opp PGP House 12')],
                    [Markup.callbackButton('PGP House 14 and 15', 'start:PGP House 14 and 15')]
                ]).extra()
            );
        }

        if (region === 'science') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('LT29', 'start:LT29')], 
                    [Markup.callbackButton('S17', 'start:S17')]
                ]).extra()
            );
        }

        if (region === 'uhc') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('University Health Centre', 'start:University Health Centre')],
                    [Markup.callbackButton('Opp University Health Centre', 'start:Opp University Health Centre')]
                ]).extra()
            );
        }

        if (region === 'yih') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Yusof Ishak House', 'start:Yusof Ishak House')],
                    [Markup.callbackButton('Opp Yusof Ishak House', 'start:Opp Yusof Ishak House')]
                ]).extra()
            );
        }

        if (region === 'others') {
            return ctx.reply('Select a bus stop or allow us to find your location',
                Markup.inlineKeyboard([      
                    [Markup.callbackButton('Kent Ridge Bus Terminal', 'start:Kent Ridge Bus Terminal')],      
                    [Markup.callbackButton('Kent Vale', 'start:Kent Vale')], 
                    [Markup.callbackButton('Museum', 'start:Museum')], 
                    [Markup.callbackButton('Opp NUSS', 'start:Opp NUSS')],      
                    [Markup.callbackButton('Opp University Hall', 'start:Opp University Hall')],
                    [Markup.callbackButton('Raffles Hall', 'start:Raffles Hall')],
                    [Markup.callbackButton('University Hall', 'start:University Hall')]
                ]).extra()
            );
        }
    });
}
