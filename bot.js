const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'yyyycraft.falixsrv.me', // اسم السيرفر
    username: 'wwe',              // اسم البوت
    auth: 'offline',              // للسيرفرات الـ cracked
    version: false                // يكتشف النسخة تلقائيًا
  });

  bot.on('spawn', () => {
    console.log('البوت متصل (AFK)');

    // تسجيل الحساب أوّل ما يدخل
    bot.chat('/reg 123yyyuuu 123yyyuuu'); 
    // لو السيرفر بيطلب login بدل reg، غيّرها لـ:
    // bot.chat('/login 123yyyuuu');

    // البوت واقف مكانه (مفيش حركة مستمرة)
    // لو عايز تخليه يمشي للأمام زي المثال السابق:
    // bot.setControlState('forward', true);
  });

  bot.on('message', (message) => {
    console.log('شات:', message.toAnsi());
  });

  bot.on('end', () => {
    console.log('تم فصل البوت... إعادة الاتصال بعد 5 ثواني');
    setTimeout(startBot, 5000);
  });

  bot.on('error', err => {
    console.log('خطأ:', err.message);
    setTimeout(startBot, 5000);
  });

  process.on('SIGINT', () => {
    console.log('إيقاف البوت...');
    bot.quit();
    process.exit();
  });
}

startBot();
