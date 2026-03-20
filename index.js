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

    // يمشي للأمام باستمرار
    bot.setControlState('forward', true);

    // يقفز كل 5 ثواني
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 5000);
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

// إنشاء 10 بوتات بأسماء labo1 إلى labo10
for (let i = 1; i <= 10; i++) {
  createBot({
    host: 'play.ashpvp.xyz',
    username: `labo${i}`,
    auth: 'offline',
    version: '1.20.1'
  });
}
