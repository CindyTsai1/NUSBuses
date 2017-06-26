const Telegraf = require('telegraf');
const { Extra, Markup, memorySession, Router } = require('telegraf');

const bot = new Telegraf('377118340:AAEUEccw3pbt4FsXJEhbCmXrCDKn-Too2AA');

const simpleRouter = new Router((ctx) => {
  if (! ctx.callbackQuery.data){
    return Promise.resolve;
  }

  //const parts = ctx.callbackQuery.data.split(':');
  return Promise.resolve({
    route: ctx.callbackQuery.data
  });

});

bot.use(memorySession());
bot.on('callback_query', simpleRouter.middleware());

//Call '/start' command
const startBot = require('./commands/startCommand');
startBot(bot);

simpleRouter.on('start:COM2', function(ctx) {
    return ctx.reply(`Bus arrival timings at COM2 are:\nA1                  3 mins\nA2                  10 mins\nD1 to BIZ2      5 mins\nD1 to UTown   1 min`, 
        Markup.inlineKeyboard([
        Markup.callbackButton('I don\'t know what bus to take. Help me!', 'route')
        ]).extra()
    )
});

simpleRouter.on('start:KRMrt', function(ctx) {
    return ctx.reply(`Bus arrival timings at Kent Ridge MRT are:\nA1  12 mins\nD2  9 mins\n95  2 mins`, 
        Markup.inlineKeyboard([
        Markup.callbackButton('I don\'t know what bus to take. Help me!', 'route')
        ]).extra()
    )
});

simpleRouter.on('start:OppUHC', function(ctx) {
    return ctx.reply(`Bus arrival timings at Opp UHC are:\nA1     2 mins\nA1E    -\nC       5 mins\nD2     10 mins`, 
        Markup.inlineKeyboard([
        Markup.callbackButton('I don\'t know what bus to take. Help me!', 'route')
        ]).extra()
    )
});

simpleRouter.on('route', function(ctx) {
  return ctx.reply('No problem my dear, I\'m here to help! Where are you going?',
    Markup.inlineKeyboard([
          [Markup.callbackButton('AS7', 'end:AS7'), 
          Markup.callbackButton('Biz 2', 'end:Biz2')], 
          [Markup.callbackButton('Block EA', 'end:BlockEA'), 
          Markup.callbackButton('Botanic Gardens MRT', 'end:BotanicMRT')], 
          [Markup.callbackButton('BTC', 'end:BTC'), 
          Markup.callbackButton('Central Library', 'end:CLB')],
          [Markup.callbackButton('College Green Hostel', 'end:CollegeGreen'), 
          Markup.callbackButton('COM2', 'end:COM2')], 
          [Markup.callbackButton('Computer Centre', 'end:ComCentre'), 
          Markup.callbackButton('Kent Ridge Bus Terminal', 'end:KRBusTerminal')], 
          [Markup.callbackButton('Kent Ridge MRT', 'end:KRMrt'),
          Markup.callbackButton('Kent Vale', 'end:KentVale')], 
          [Markup.callbackButton('LT13', 'end:LT13'),
          Markup.callbackButton('LT29', 'end:LT29')], 
          [Markup.callbackButton('Museum', 'end:Museum'), 
          Markup.callbackButton('Opp Block EA', 'end:OppBlockEA')], 
          [Markup.callbackButton('Opp HSSML', 'end:OppHSSML'), 
          Markup.callbackButton('Opp Kent Ridge MRT', 'end:OppKRMrt')], 
          [Markup.callbackButton('NUSS', 'end:NUSS'),
          Markup.callbackButton('Opp PGP Hse No 12', 'end:OppPGP12')],
          [Markup.callbackButton('Opp UHall', 'end:OppUHall'),
          Markup.callbackButton('Opp University Health Centre', 'end:OppUHC')],
          [Markup.callbackButton('Opp YIH', 'end:OppYIH'),
          Markup.callbackButton('PGP Hse No 12', 'end:PGP12')],
          [Markup.callbackButton('PGP Hse No 14 and 15', 'end:PGP14'),
          Markup.callbackButton('PGPR', 'end:PGPR')],
          [Markup.callbackButton('Prince George\'s Park', 'end:PGP'),
          Markup.callbackButton('Raffles Hall', 'end:RafflesHall')],
          [Markup.callbackButton('S17', 'end:S17'),
          Markup.callbackButton('UHall', 'end:UHall')],
          [Markup.callbackButton('University Health Centre', 'end:UHC'),
          Markup.callbackButton('University Town', 'end:UTown')],
          [Markup.callbackButton('Ventus (Opp LT13)', 'end:Ventus'),
          Markup.callbackButton('YIH', 'end:YIH')]
    ]).extra()
)});

simpleRouter.on('end:S17', function(ctx) {
    return ctx.reply(`1. Take bus A1 to PGP then take either A1 or D2 to S17, reaching in 3 mins\n2. Take bus A2 to LT29, reaching in 10 mins`
    )
});

simpleRouter.on('end:KRMrt', function(ctx) {
    return ctx.reply(`1. Take bus B2 to KR MRT, reaching in 1 min\n2. Take bus D2 to KR MRT, reaching in 7 mins`
    )
});

bot.hears('Find my location', function(ctx){
    ctx.replyWithLocation(1.298814, 103.776500);
    return ctx.reply('Your nearest bus stop is: ',
    Markup.inlineKeyboard([
      Markup.callbackButton('Opp University Health Centre', 'start:OppUHC')
    ]).extra()
)});

bot.startPolling();
