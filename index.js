const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'yyyycraft.falixsrv.me',
    username: 'shay', // اسم مختلف عن حسابك الأساسي
    auth: 'offline',          // cracked
    version: '1.21.11'
  });

  bot.on('spawn', () => {
    console.log('البوت متصل (AFK)');

    // حلقة حركات AFK متنوعة
    setInterval(() => {
      // دوران عشوائي
      bot.look(Math.random() * 360, 0);

      // قفز + انحناء قصير
      bot.setControlState('jump', true);
      bot.setControlState('sneak', true);

      setTimeout(() => {
        bot.setControlState('jump', false);
        bot.setControlState('sneak', false);
      }, 500);
    }, 30000); // كل 30 ثانية
  });

  // تجاهل رسائل الشات
  bot.on('message', (message) => {
    // لا تفعل شيء
  });

  // إعادة الاتصال عند الانفصال
  bot.on('end', () => {
    console.log('تم فصل البوت... إعادة الاتصال بعد 5 ثواني');
    setTimeout(startBot, 5000);
  });

  // إعادة الاتصال عند حدوث خطأ
  bot.on('error', err => {
    console.log('خطأ:', err.message);
    setTimeout(startBot, 5000);
  });

  // إيقاف نظيف عند إغلاق البرنامج
  process.on('SIGINT', () => {
    console.log('إيقاف البوت...');
    bot.quit();
    process.exit();
  });
}

startBot();
