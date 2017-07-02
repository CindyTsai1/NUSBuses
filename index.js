const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');

const bot = new Telegraf('377118340:AAEUEccw3pbt4FsXJEhbCmXrCDKn-Too2AA');

bot.use(Telegraf.log());

//Call '/start' command
const startBot = require('./commands/startCommand');
startBot(bot);

//Handle '/start' command
const startHandler = require('./handlers/startHandler');
startHandler(bot);

bot.startPolling();
