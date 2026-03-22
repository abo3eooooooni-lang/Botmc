const mineflayer = require('mineflayer');

function createBot(name) {
  const bot = mineflayer.createBot({
    host: 'mc.ashpvp.xyz',   // السيرفر
    username: name,              // اسم البوت
    auth: 'offline',
    version: '1.20.1'            // النسخة المطلوبة
  });

  bot.on('spawn', () => {
    console.log(`البوت ${name} اتصل`);

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
    console.log(`[${name}] شات:`, message.toAnsi());
  });

  bot.on('end', () => {
    console.log(`البوت ${name} فصل... إعادة الاتصال بعد 5 ثواني`);
    setTimeout(() => createBot(name), 5000);
  });

  bot.on('error', err => {
    console.log(`خطأ في ${name}:`, err.message);
    setTimeout(() => createBot(name), 5000);
  });
}

// يولّد بوت جديد كل ثانية باسم laboo1, laboo2, laboo3, ...
let count = 1;
setInterval(() => {
  const name = `laboo${count}`;
  createBot(name);
  console.log(`تم إنشاء البوت رقم ${count} (${name})`);
  count++;
}, 5000); // كل ثانية
