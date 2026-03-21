const mineflayer = require('mineflayer');

function createBot(name) {
  const bot = mineflayer.createBot({
    host: 'sixaa.falixsrv.me',   // السيرفر
    username: name,              // اسم البوت
    auth: 'offline',
    version: '1.20.1'            // النسخة المطلوبة
  });

  bot.on('spawn', () => {
    console.log(`البوت ${bot.username} اتصل`);

    // يكتب 0 أول ما يدخل
    setTimeout(() => {
      bot.chat('0');
    }, 2000);

    // يمشي للأمام باستمرار
    bot.setControlState('forward', true);

    // يقفز كل 5 ثواني
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 5000);
  });

  bot.on('message', (message) => {
    console.log(`[${bot.username}] شات:`, message.toAnsi());
  });

  bot.on('end', () => {
    console.log(`البوت ${bot.username} فصل... إعادة الاتصال بعد 5 ثواني`);
    setTimeout(() => createBot(name), 5000);
  });

  bot.on('error', err => {
    console.log(`خطأ في ${bot.username}:`, err.message);
    setTimeout(() => createBot(name), 5000);
  });
}

// إنشاء 3 بوتات
createBot('laboo1');
createBot('laboo2');
createBot('laboo3');
