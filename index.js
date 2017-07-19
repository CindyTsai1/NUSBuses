const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');

const bot = new Telegraf('377118340:AAEUEccw3pbt4FsXJEhbCmXrCDKn-Too2AA');

bot.use(Telegraf.log());

//Invalid user input
bot.hears(/^(?!\/start)(?!\/customise)(.+)$/, function(ctx) {
    return ctx.reply('Enter /start to begin!');
})

//Call '/start' command
const startBot = require('./commands/startCommand');
startBot(bot);

//Handle '/start' command
const startHandler = require('./handlers/startHandler');
startHandler(bot);

const nearestStopHandler = require('./handlers/nearestStopHandler');
nearestStopHandler(bot);

bot.command('customise', function(ctx) {
    ctx.reply('Add bus stops to your favourites list!', 
        Markup.inlineKeyboard([
            [Markup.callbackButton('AS7', 'add:AS7')],
            [Markup.callbackButton('BIZ2', 'add:BIZ2')],
            [Markup.callbackButton('Central Library', 'add:Central Library')]
        ]).extra()
    );
});

bot.action(/add(.+)/, function(ctx) {

    var favStop = ctx.callbackQuery.data.split(':')[1];
    console.log(favStop);
    return ctx.reply(`Bus stop ${favStop} added!`, 
        Markup.keyboard([`${favStop}`])
        .resize()
        .extra()
        
    );
});

bot.startPolling();
