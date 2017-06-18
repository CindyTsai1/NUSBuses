const Telegraf = require('telegraf');
const { Extra, Markup, memorySession, Router } = require('telegraf');

const bot = new Telegraf('377118340:AAEUEccw3pbt4FsXJEhbCmXrCDKn-Too2AA');
bot.busdata = require('./busdata.json');
console.log(bot.busdata);
const http = require('http');

const simpleRouter = new Router((ctx) => {
  if (! ctx.callbackQuery.data){
    return Promise.resolve;
  }
  const parts = ctx.callbackQuery.data.split(':');
  return Promise.resolve({
    route: parts[0],
    state: {
      location: parts[1]
    }
  });
});

bot.use(memorySession());
bot.on('callback_query', simpleRouter.middleware());

//Call '/start' command
const startBot = require('./commands/startCommand');
startBot(bot);

simpleRouter.on('start', function(ctx) {
    let currLocation = ctx.state.location;
    return ctx.reply(`Bus arrival timings are:\nA2  5 min\nB1  10min\nD1  1 min`, 
        Markup.inlineKeyboard([
        Markup.callbackButton('I don\'t know what bus to take. Help me!', 'route')
        ]).extra()
    )});

simpleRouter.on('route', function(ctx) {
  return ctx.reply('No problem my dear, I\'m here to help! Where are you going?',
    Markup.inlineKeyboard([[
      Markup.callbackButton('AS7', 'end: AS7')],[
      Markup.callbackButton('Central Library', 'end')],[
      Markup.callbackButton('COM2', 'end')],[
      Markup.callbackButton('Computer Centre', 'end')],[
      Markup.callbackButton('YIH', 'end')]
    ]).extra()
)});

simpleRouter.on('end', function(ctx) {
    if (ctx.state.location === currLocation) {
      return ctx.reply('Hey that\'s not funny');
}});

bot.startPolling();
