const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'play.ashpvp.xyz',
    username: 'HHHHHHH_3mk',
    auth: 'offline',
    version: '1.20.1'
  });

  let loggedIn = false;

  bot.on('spawn', () => {
    console.log('البوت متصل (AFK)');

    // تسجيل مرة واحدة فقط
    if (!loggedIn) {
      setTimeout(() => {
        bot.chat('/login 123yyyuuu');
        loggedIn = true;
      }, 2000);
    }

    // يمشي للأمام باستمرار
    bot.setControlState('forward', true);

    // تفعيل auto-jump
    bot.setControlState('jump', true);
  });

  // لو فيه بلوك قدام، البوت ينط تلقائي
  bot.on('physicsTick', () => {
    const blockInFront = bot.blockAt(bot.entity.position.offset(0, 0, 1));
    if (blockInFront && !blockInFront.transparent) {
      bot.setControlState('jump', true);
    } else {
      bot.setControlState('jump', false);
    }
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
