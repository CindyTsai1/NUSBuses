const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');

module.exports = function(bot){

    bot.command('start', function(ctx, msg) {

        ctx.reply('Select a bus stop or allow us to find your location',
            Extra.markup((markup) => {
                return markup.resize().keyboard([
                    'Find my location'
                //markup.locationRequestButton('Find my location')
                ])
            })
        );

        return ctx.reply('Where are you my dear?',
            Markup.inlineKeyboard([
                [Markup.callbackButton('AS7', 'start:AS7'), 
                Markup.callbackButton('Biz 2', 'start:Biz2')], 
                [Markup.callbackButton('Block EA', 'start:BlockEA'), 
                Markup.callbackButton('Botanic Gardens MRT', 'start:BotanicMRT')], 
                [Markup.callbackButton('BTC', 'start:BTC'), 
                Markup.callbackButton('Central Library', 'start:CLB')],
                [Markup.callbackButton('College Green Hostel', 'start:CollegeGreen'), 
                Markup.callbackButton('COM2', 'start:COM2')], 
                [Markup.callbackButton('Computer Centre', 'start:ComCentre'), 
                Markup.callbackButton('Kent Ridge Bus Terminal', 'start:KRBusTerminal')], 
                [Markup.callbackButton('Kent Ridge MRT', 'start:KRMrt'),
                Markup.callbackButton('Kent Vale', 'start:KentVale')], 
                [Markup.callbackButton('LT13', 'start:LT13'),
                Markup.callbackButton('LT29', 'start:LT29')], 
                [Markup.callbackButton('Museum', 'start:Museum'), 
                Markup.callbackButton('Opp Block EA', 'start:OppBlockEA')], 
                [Markup.callbackButton('Opp HSSML', 'start:OppHSSML'), 
                Markup.callbackButton('Opp Kent Ridge MRT', 'start:OppKRMrt')], 
                [Markup.callbackButton('NUSS', 'start:NUSS'),
                Markup.callbackButton('Opp PGP Hse No 12', 'start:OppPGP12')],
                [Markup.callbackButton('Opp UHall', 'start:OppUHall'),
                Markup.callbackButton('Opp University Health Centre', 'start:OppUHC')],
                [Markup.callbackButton('Opp YIH', 'start:OppYIH'),
                Markup.callbackButton('PGP Hse No 12', 'start:PGP12')],
                [Markup.callbackButton('PGP Hse No 14 and 15', 'start:PGP14'),
                Markup.callbackButton('PGPR', 'start:PGPR')],
                [Markup.callbackButton('Prince George\'s Park', 'start:PGP'),
                Markup.callbackButton('Raffles Hall', 'start:RafflesHall')],
                [Markup.callbackButton('S17', 'start:S17'),
                Markup.callbackButton('UHall', 'start:UHall')],
                [Markup.callbackButton('University Health Centre', 'start:UHC'),
                Markup.callbackButton('University Town', 'start:UTown')],
                [Markup.callbackButton('Ventus (Opp LT13)', 'start:Ventus'),
                Markup.callbackButton('YIH', 'start:YIH')]
            ]).extra()
        )
    }) 

}

