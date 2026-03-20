const mineflayer = require('mineflayer');

function createBot(options) {
  const bot = mineflayer.createBot(options);

  let loggedIn = false;

  bot.on('spawn', () => {
    console.log(`البوت ${options.username} اتصل`);

    if (!loggedIn) {
      setTimeout(() => {
        bot.chat('/register 123yyyuuu 123yyyuuu');
        loggedIn = true;
      }, 2000);
    }

    // يمشي للأمام
    bot.setControlState('forward', true);

    // auto jump
    bot.on('physicsTick', () => {
      const blockInFront = bot.blockAt(bot.entity.position.offset(0, 0, 1));
      if (blockInFront && !blockInFront.transparent) {
        bot.setControlState('jump', true);
      } else {
        bot.setControlState('jump', false);
      }
    });
  });

  bot.on('message', (message) => {
    console.log(`[${options.username}] شات:`, message.toAnsi());
  });

  bot.on('end', () => {
    console.log(`البوت ${options.username} فصل... إعادة الاتصال بعد 5 ثواني`);
    setTimeout(() => createBot(options), 5000);
  });

  bot.on('error', err => {
    console.log(`خطأ في ${options.username}:`, err.message);
    setTimeout(() => createBot(options), 5000);
  });
}

// هنا تضيف البوتات اللي عايزها
createBot({
  host: 'play.ashpvp.xyz',
  username: 'omat',
  auth: 'offline',
  version: '1.20.1'
});

createBot({
  host: 'play.ashpvp.xyz',
  username: 'alawy',
  auth: 'offline',
  version: '1.20.1'
});
