const mineflayer = require('mineflayer');

function createBot(options) {
  const bot = mineflayer.createBot(options);
  let registered = false;

  bot.on('spawn', () => {
    console.log(`البوت ${options.username} اتصل`);

    if (!registered) {
      setTimeout(() => {
        bot.chat('.');
        registered = true;
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

// يولّد بوت جديد كل 2 ثانية باسم laboo1, laboo2, ...
let count = 1;
setInterval(() => {
  createBot({
    host: 'sixaa.falixsrv.me',
    username: `laboo${count}`,
    auth: 'offline',
    version: '1.20.1'
  });
  console.log(`تم إنشاء البوت رقم ${count}`);
  count++;
}, 2000);
