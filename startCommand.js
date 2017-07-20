const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');

module.exports = function(bot){

    bot.command('start', function(ctx) {

        console.log('starting new route...');

        ctx.reply('Where are you my dear?',
            Extra.markup((markup) => {
                return markup.resize().keyboard([
                markup.locationRequestButton('Find my location')
                ]);
            })
        ).then(function(){

            return ctx.reply('Select where you are at or allow us to find your location',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Arts & Social Sciences', 'buttons:fass'),
                    Markup.callbackButton('Botanic Gardens Campus', 'buttons:btc')],
                    [Markup.callbackButton('Business', 'buttons:business'),
                    Markup.callbackButton('Central Forum', 'buttons:clb')],
                    [Markup.callbackButton('Computing', 'buttons:computing'),
                    Markup.callbackButton('Engineering', 'buttons:engine')],
                    [Markup.callbackButton('Kent Ridge MRT', 'buttons:kr'),
                    Markup.callbackButton('Prince George\'s Park', 'buttons:pgp')],
                    [Markup.callbackButton('Science', 'buttons:science'),
                    Markup.callbackButton('University Health Centre', 'buttons:uhc')],
                    [Markup.callbackButton('Yusof Ishak House', 'buttons:yih'),
                    Markup.callbackButton('University Town', 'start:University Town')],
                    [Markup.callbackButton('Others', 'buttons:others')]
                ]).extra()
            );
        });
    });

    bot.action(/buttons(.+)/, function(ctx) {

        var faculty = ctx.callbackQuery.data.split(':')[1];

        if (faculty === 'fass') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('AS7', 'start:AS7')],
                    [Markup.callbackButton('LT13', 'start:LT13')],
                    [Markup.callbackButton('Ventus (Opp LT13)', 'start:Ventus')]
                ]).extra()
            );
        } 

        if (faculty === 'btc') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Botanic Gardens MRT', 'start:Botanic Gardens MRT')], 
                    [Markup.callbackButton('BTC - Oei Tiong Ham', 'start:BTC')],
                    [Markup.callbackButton('College Green Hostel', 'start:College Green Hostel')]
                ]).extra()
            );
        }

        if (faculty === 'business') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('BIZ2', 'start:BIZ2')],
                    [Markup.callbackButton('Opp Hon Sui Sen Memorial Library', 'start:Opp Hon Sui Sen Memorial Library')]
                ]).extra()
            );
        }

        if (faculty === 'clb') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Central Library', 'start:Central Library')],
                    [Markup.callbackButton('Computer Centre', 'start:Computer Centre')] 
                ]).extra()
            );
        }

        if (faculty === 'computing') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('COM2', 'start:COM2')]
                ]).extra()
            );
        }

        if (faculty === 'engineering') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Block EA', 'start:Block EA')],
                    [Markup.callbackButton('Opp Block EA', 'start:Opp Block EA')] 
                ]).extra()
            );
        }

        if (faculty === 'kr') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Kent Ridge MRT', 'start:Kent Ridge MRT')],
                    [Markup.callbackButton('Opp Kent Ridge MRT', 'start:Opp Kent Ridge MRT')]
                ]).extra()
            );
        }

        if (faculty === 'pgp') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Prince George\'s Park', 'start:Prince George\'s Park')],
                    [Markup.callbackButton('Prince George\'s Park Residences', 'start:Prince George\'s Park Residences')],
                    [Markup.callbackButton('PGP House 12', 'start:PGP House 12')],
                    [Markup.callbackButton('Opp PGP House 12', 'start:Opp PGP House 12')],
                    [Markup.callbackButton('PGP House 14 and 15', 'start:PGP House 14 and 15')]
                ]).extra()
            );
        }

        if (faculty === 'science') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('LT29', 'start:LT29')], 
                    [Markup.callbackButton('S17', 'start:S17')]
                ]).extra()
            );
        }

        if (faculty === 'uhc') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('University Health Centre', 'start:University Health Centre')],
                    [Markup.callbackButton('Opp University Health Centre', 'start:Opp University Health Centre')]
                ]).extra()
            );
        }

        if (faculty === 'yih') {
            ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Yusof Ishak House', 'start:Yusof Ishak House')]
                    [Markup.callbackButton('Opp Yusof Ishak House', 'start:Opp Yusof Ishak House')]
                ]).extra()
            );
        }

        if (faculty === 'others') {
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

             


