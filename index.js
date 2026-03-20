const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const { goals } = require('mineflayer-pathfinder');
const pvp = require('mineflayer-pvp').plugin;
const autoeat = require('mineflayer-auto-eat').plugin;

function startBot() {
  const bot = mineflayer.createBot({
    host: 'play.ashpvp.xyz',
    username: 'HHHHH3MK',
    auth: 'offline',
    version: '1.20.1'
  });

  bot.loadPlugin(pathfinder);
  bot.loadPlugin(pvp);
  bot.loadPlugin(autoeat);

  bot.on('spawn', () => {
    console.log('البوت دخل السيرفر');

    // تسجيل الدخول
    bot.chat('/reg 123yyyuuu 123yyyuuu');

    // إعداد الحركة الطبيعية
    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);

    // مثال: يمشي لمكان عشوائي
    const randomGoal = new goals.GoalXZ(
      bot.entity.position.x + Math.floor(Math.random() * 10),
      bot.entity.position.z + Math.floor(Math.random() * 10)
    );
    bot.pathfinder.setGoal(randomGoal, false);
  });

  // أوامر من الشات للتحكم في البوت
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    if (message === 'attack') {
      const target = bot.nearestEntity(e => e.type === 'player' && e.username !== bot.username);
      if (target) {
        bot.pvp.attack(target);
        bot.chat('هجمت على ' + target.username);
      } else {
        bot.chat('مافيش لاعب قريب');
      }
    }

    if (message === 'stop') {
      bot.pvp.stop();
      bot.chat('وقفت القتال');
    }
  });

  bot.on('autoeat_started', () => {
    console.log('البوت بدأ ياكل تلقائيًا');
  });

  bot.on('autoeat_finished', () => {
    console.log('البوت خلص أكل');
  });

  bot.on('end', () => {
    console.log('تم فصل البوت... إعادة الاتصال بعد 5 ثواني');
    setTimeout(startBot, 5000);
  });

  bot.on('error', err => {
    console.log('خطأ:', err.message);
    setTimeout(startBot, 5000);
  });
}

startBot();
