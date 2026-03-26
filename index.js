const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const { GoalFollow } = require('mineflayer-pathfinder').goals;
const pvp = require('mineflayer-pvp').plugin;

const protectPlayerName = 'hoagb'; // اللاعب اللي البوتات لازم تحميه
const password = '1234yyyuuu';     // الباسورد المستخدم للتسجيل والدخول

function createBot(name) {
  const bot = mineflayer.createBot({
    host: 'mc.ashpvp.xyz',
    username: name,
    auth: 'offline',
    version: '1.20.1'
  });

  bot.loadPlugin(pathfinder);
  bot.loadPlugin(pvp);

  bot.on('spawn', () => {
    console.log(`البوت ${name} اتصل`);

    // تسجيل أول مرة
    setTimeout(() => {
      bot.chat(`/register ${password} ${password}`);
    }, 2000);

    // بعد التسجيل، يدخل باستخدام login
    setTimeout(() => {
      bot.chat(`/login ${password}`);
    }, 4000);

    // يمشي للأمام 10 ثواني
    bot.setControlState('forward', true);
    setTimeout(() => {
      bot.setControlState('forward', false);
      console.log(`${name} توقف عن المشي وبدأ القتال`);
      startCombat(bot);
    }, 10000);
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

function startCombat(bot) {
  setInterval(() => {
    const protectPlayer = bot.players[protectPlayerName]?.entity;
    if (protectPlayer) {
      // يتبع اللاعب ويحميه
      const mcData = require('minecraft-data')(bot.version);
      const movements = new Movements(bot, mcData);
      bot.pathfinder.setMovements(movements);
      bot.pathfinder.setGoal(new GoalFollow(protectPlayer, 2), true);
    }

    // يهاجم أي لاعب قريب غير اللاعب المحمي
    for (const username in bot.players) {
      if (username !== protectPlayerName) {
        const entity = bot.players[username]?.entity;
        if (entity) {
          bot.pvp.attack(entity);
        }
      }
    }
  }, 3000); // كل 3 ثواني يتأكد
}

// يولّد بوت جديد كل دقيقة (عدد محدود)
let count = 1;
setInterval(() => {
  if (count <= 5) { // عدد البوتات الأقصى
    const name = `labooo${count}`;
    createBot(name);
    console.log(`تم إنشاء البوت رقم ${count} (${name})`);
    count++;
  }
}, 60000);
