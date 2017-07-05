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

            return ctx.reply('Select a bus stop or allow us to find your location',
                Markup.inlineKeyboard([
                    [Markup.callbackButton('AS7', 'start:AS7'), 
                    Markup.callbackButton('BIZ2', 'start:BIZ2')], 
                    [Markup.callbackButton('Block EA', 'start:Block EA'), 
                    Markup.callbackButton('Botanic Gardens MRT', 'start:Botanic Gardens MRT')], 
                    [Markup.callbackButton('BTC - Oei Tiong Ham', 'start:BTC'), 
                    Markup.callbackButton('Central Library', 'start:Central Library')],
                    [Markup.callbackButton('College Green Hostel', 'start:College Green Hostel'), 
                    Markup.callbackButton('COM2', 'start:COM2')], 
                    [Markup.callbackButton('Computer Centre', 'start:Computer Centre'), 
                    Markup.callbackButton('Kent Ridge Bus Terminal', 'start:Kent Ridge Bus Terminal')], 
                    [Markup.callbackButton('Kent Ridge MRT', 'start:Kent Ridge MRT'),
                    Markup.callbackButton('Kent Vale', 'start:Kent Vale')], 
                    [Markup.callbackButton('LT13', 'start:LT13'),
                    Markup.callbackButton('LT29', 'start:LT29')], 
                    [Markup.callbackButton('Museum', 'start:Museum'), 
                    Markup.callbackButton('Opp Block EA', 'start:Opp Block EA')], 
                    [Markup.callbackButton('Opp Hon Sui Sen Memorial Library', 'start:Opp Hon Sui Sen Memorial Library'), 
                    Markup.callbackButton('Opp Kent Ridge MRT', 'start:Opp Kent Ridge MRT')], 
                    [Markup.callbackButton('Opp NUSS', 'start:Opp NUSS'),
                    Markup.callbackButton('Opp PGP House 12', 'start:Opp PGP House 12')],
                    [Markup.callbackButton('Opp University Hall', 'start:Opp University Hall'),
                    Markup.callbackButton('Opp University Health Centre', 'start:Opp University Health Centre')],
                    [Markup.callbackButton('Opp Yusof Ishak House', 'start:Opp Yusof Ishak House'),
                    Markup.callbackButton('PGP House 12', 'start:PGP House 12')],
                    [Markup.callbackButton('PGP House 14 and 15', 'start:PGP House 14 and 15'),
                    Markup.callbackButton('Prince George\'s Park Residences', 'start:Prince George\'s Park Residences')],
                    [Markup.callbackButton('Prince George\'s Park', 'start:Prince George\'s Park'),
                    Markup.callbackButton('Raffles Hall', 'start:Raffles Hall')],
                    [Markup.callbackButton('S17', 'start:S17'),
                    Markup.callbackButton('University Hall', 'start:University Hall')],
                    [Markup.callbackButton('University Health Centre', 'start:University Health Centre'),
                    Markup.callbackButton('University Town', 'start:University Town')],
                    [Markup.callbackButton('Ventus (Opp LT13)', 'start:Ventus'),
                    Markup.callbackButton('Yusof Ishak House', 'start:Yusof Ishak House')]
                ]).extra()
            )
        }) 

    }); 

}

