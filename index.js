const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'mc.mineberry.org',
    username: 'wwe', // اسم مختلف عن حسابك الأساسي
    auth: 'offline',          // للسيرفرات الـ cracked
    version: '1.20.1'         // أو false لو عايز يتعرف تلقائيًا
  });

  bot.on('spawn', () => {
    console.log('البوت متصل (AFK)');

    // تسجيل الحساب أوّل ما يدخل
    bot.chat('/reg 123yyyuuu');

    // يمشي للأمام باستمرار
    bot.setControlState('forward', true);
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
