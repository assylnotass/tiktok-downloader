var Telegram = require('node-telegram-bot-api');
var request = require("request");
var token = process.env.TELEGRAM_TOKEN;

var opt = {
  polling: true
};

var bot = new Telegram(token, opt);

bot.on("message", function(msg) {
  var text = msg.text;

  if (text == '/start') {
    bot.sendMessage(msg.chat.id, "❤️❤️❤️💋💋💋💋 Привет, ЖАНЫЫЫЫМ, я создан специально ради тебя, чтобы ты быстро скачивала видео с тиктока.");
    
    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    delay(500).then(() => bot.sendMessage(msg.chat.id, "Отправь мне ссылку на видео, которое хочешь скачать, Жаныыым!"));
  } else if (text.includes('tiktok.com')) {
    bot.sendMessage(msg.chat.id, "⏳ПАДАЖДИКААААА, я уже скачиваю видео для тебя, ЖАНЫЫЫЫМ!");

    var reqvideourl = "https://www.tikwm.com/api/?url=" + text + "&hd=1";
    request(reqvideourl, function(error, response, body) {
      var json = JSON.parse(body);

      if (json.data == undefined) {
        bot.sendMessage(msg.chat.id, "😔 БЛИНА, ЧОТА НЕ МОГУ СКАЧАТЬ...");
      } else {
        function delay(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }

        delay(500).then(() => bot.sendVideo(msg.chat.id, json.data.hdplay));
      }
    });
  } else {
    bot.sendMessage(msg.chat.id, "🧐 пж, отправь правильную ссылку на видео, а то чот эта неправильная");
  }
});