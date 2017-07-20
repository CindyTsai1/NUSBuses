const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const endHandler = require('./endHandler');

module.exports = function(bot){

    bot.action(/route(.+)/, function(ctx) {

        var source = ctx.callbackQuery.data.split(':')[1];

        return ctx.reply('No problem my dear, I\'m here to help! Where are you going?',
            Markup.inlineKeyboard([
                [Markup.callbackButton('Arts & Social Sciences', `buttonsEnd:fass:${source}`),
                Markup.callbackButton('Botanic Gardens Campus', `buttonsEnd:btc:${source}`)],
                [Markup.callbackButton('Business', `buttonsEnd:business:${source}`),
                Markup.callbackButton('Central Forum', `buttonsEnd:clb:${source}`)],
                [Markup.callbackButton('Computing', `buttonsEnd:computing:${source}`),
                Markup.callbackButton('Engineering', `buttonsEnd:engine:${source}`)],
                [Markup.callbackButton('Kent Ridge MRT', `buttonsEnd:kr:${source}`),
                Markup.callbackButton('Prince George\'s Park', `buttonsEnd:pgp:${source}`)],
                [Markup.callbackButton('Science', `buttonsEnd:science:${source}`),
                Markup.callbackButton('University Health Centre', `buttonsEnd:uhc:${source}`)],
                [Markup.callbackButton('Yusof Ishak House', `buttonsEnd:yih:${source}`),
                Markup.callbackButton('University Town', `end:University Town:${source}`)],
                [Markup.callbackButton('Others', `buttonsEnd:others:${source}`)]
            ]).extra()
        );
    });

    bot.action(/buttonsEnd(.+)/, function(ctx) {

        var region = ctx.callbackQuery.data.split(':')[1];
        var source = ctx.callbackQuery.data.split(':')[2];

        if (region === 'fass') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('AS7', `end:AS7:${source}`)],
                    [Markup.callbackButton('LT13', `end:LT13:${source}`)],
                    [Markup.callbackButton('Ventus (Opp LT13)', `end:Ventus:${source}`)]
                ]).extra()
            );
        } 

        if (region === 'btc') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Botanic Gardens MRT', `end:Botanic Gardens MRT:${source}`)], 
                    [Markup.callbackButton('BTC - Oei Tiong Ham', `end:BTC:${source}`)],
                    [Markup.callbackButton('College Green Hostel', `end:College Green Hostel:${source}`)]
                ]).extra()
            );
        }

        if (region === 'business') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('BIZ2', `end:BIZ2:${source}`)],
                    [Markup.callbackButton('Opp Hon Sui Sen Memorial Library', `end:Opp Hon Sui Sen Memorial Library:${source}`)]
                ]).extra()
            );
        }

        if (region === 'clb') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Central Library', `end:Central Library:${source}`)],
                    [Markup.callbackButton('Computer Centre', `end:Computer Centre:${source}`)] 
                ]).extra()
            );
        }

        if (region === 'computing') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('COM2', `end:COM2:${source}`)]
                ]).extra()
            );
        }

        if (region === 'engine') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Block EA', `end:Block EA:${source}`)],
                    [Markup.callbackButton('Opp Block EA', `end:Opp Block EA:${source}`)] 
                ]).extra()
            );
        }

        if (region === 'kr') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Kent Ridge MRT', `end:Kent Ridge MRT:${source}`)],
                    [Markup.callbackButton('Opp Kent Ridge MRT', `end:Opp Kent Ridge MRT:${source}`)]
                ]).extra()
            );
        }

        if (region === 'pgp') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Prince George\'s Park', `end:Prince George\'s Park:${source}`)],
                    [Markup.callbackButton('Prince George\'s Park Residences', `end:Prince George\'s Park Residences:${source}`)],
                    [Markup.callbackButton('PGP House 12', `end:PGP House 12:${source}`)],
                    [Markup.callbackButton('Opp PGP House 12', `end:Opp PGP House 12:${source}`)],
                    [Markup.callbackButton('PGP House 14 and 15', `end:PGP House 14 and 15:${source}`)]
                ]).extra()
            );
        }

        if (region === 'science') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('LT29', `end:LT29:${source}`)], 
                    [Markup.callbackButton('S17', `end:S17:${source}`)]
                ]).extra()
            );
        }

        if (region === 'uhc') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('University Health Centre', `end:University Health Centre:${source}`)],
                    [Markup.callbackButton('Opp University Health Centre', `end:Opp University Health Centre:${source}`)]
                ]).extra()
            );
        }

        if (region === 'yih') {
            return ctx.reply('Select a bus stop',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('Yusof Ishak House', `end:Yusof Ishak House:${source}`)],
                    [Markup.callbackButton('Opp Yusof Ishak House', `end:Opp Yusof Ishak House:${source}`)]
                ]).extra()
            );
        }

        if (region === 'others') {
            return ctx.reply('Select a bus stop or allow us to find your location',
                Markup.inlineKeyboard([      
                    [Markup.callbackButton('Kent Ridge Bus Terminal', `end:Kent Ridge Bus Terminal:${source}`)],      
                    [Markup.callbackButton('Kent Vale', `end:Kent Vale:${source}`)], 
                    [Markup.callbackButton('Museum', `end:Museum:${source}`)], 
                    [Markup.callbackButton('Opp NUSS', `end:Opp NUSS:${source}`)],      
                    [Markup.callbackButton('Opp University Hall', `end:Opp University Hall:${source}`)],
                    [Markup.callbackButton('Raffles Hall', `end:Raffles Hall:${source}`)],
                    [Markup.callbackButton('University Hall', `end:University Hall:${source}`)]
                ]).extra()
            );
        }
    });

    return endHandler(bot);

}

