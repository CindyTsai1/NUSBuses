const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');

module.exports = function(bot){

    bot.command('start', function(ctx) {

        return ctx.reply('Where are you, my dear?',
            Markup.inlineKeyboard([[
            Markup.callbackButton('AS7', 'start: AS7')],[
            Markup.callbackButton('Biz 2', 'start: Biz 2')],[
            Markup.callbackButton('Block EA', 'start')],[
            Markup.callbackButton('Botanic Gardens MRT', 'start')],[
            Markup.callbackButton('BTC', 'start')],[
            Markup.callbackButton('Central Library', 'start')],[
            Markup.callbackButton('College Green Hostel', 'start')],[
            Markup.callbackButton('COM2', 'start')],[
            Markup.callbackButton('Computer Centre', 'start')],[
            Markup.callbackButton('Kent Ridge Bus Terminal', 'start')],[
            Markup.callbackButton('Kent Vale', 'start')],[
            Markup.callbackButton('LT13', 'start')],[
            Markup.callbackButton('LT29', 'start')],[
            Markup.callbackButton('Museum', 'start')],[
            Markup.callbackButton('Opp Block EA', 'start')],[
            Markup.callbackButton('Opp HSSML', 'start')],[
            Markup.callbackButton('Opp Kent Ridge MRT', 'start')],[
            Markup.callbackButton('NUSS', 'start')],[
            Markup.callbackButton('Opp PGP Hse No 12', 'start')],[
            Markup.callbackButton('Opp UHall', 'start')],[
            Markup.callbackButton('Opp University Health Centre', 'start')],[
            Markup.callbackButton('Opp YIH', 'start')],[
            Markup.callbackButton('PGP Hse No 12', 'start')],[
            Markup.callbackButton('PGP Hse No 14 and 15', 'start')],[
            Markup.callbackButton('PGPR', 'start')],[
            Markup.callbackButton('Prince George\'s Park', 'start')],[
            Markup.callbackButton('Raffles Hall', 'start')],[
            Markup.callbackButton('S17', 'start')],[
            Markup.callbackButton('UHall', 'start')],[
            Markup.callbackButton('University Health Centre', 'start')],[
            Markup.callbackButton('University Town', 'start')],[
            Markup.callbackButton('Ventus (Opp LT13)', 'start')],[
            Markup.callbackButton('YIH', 'start')]
            ]).extra()
        );
    });
};

