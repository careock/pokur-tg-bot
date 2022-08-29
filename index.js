const TelegramBot = require ('node-telegram-bot-api');
const token = "5788161727:AAG6yWHbuwMySGo9PPvbxVt0_EOfJfSGxNI";
const bot = new TelegramBot(token,{polling: true});

textWannaSmoke = "Хочешь покур?";
chatId1 = "-684468455"

const keyboard = [
    [
      {
        text: "🚬 Хочу покур!", // текст на кнопке
        callback_data: 'wannaSmoke' // данные для обработчика событий
      }
    ],
  ];

  const keyboard2 = [
    [
        {
            text: '🟢 Сиги есть!',
            callback_data: 'haveCig'
        },
        {
            text: '🔴 Сиг нет',
            callback_data: 'haveNoCig'
        }
    ],
  ];

  const keyboard3 = [
    [
        {
            text: "🔫 Могу стрельнуть",
            callback_data: "canGive"

        },
        {
            text: "🐭 У меня последняя",
            callback_data: "canNotGive"

        }
    ],
  ];

  const keyboard4 = [
    [
        {
            text: "🙍‍♂️ Хочу сигу",
            callback_data: "wannaBumCig"

        },
        {
            text: "👨‍❤️‍👨 Хочу дудку",
            callback_data: "wannaBumDudka"

        }
    ],
  ];
  const keyboard5 = [
    [
        {
            text: "📣 Звать на покур!",
            callback_data: "callToSmoke"

        }
    ],
  ]


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    text = msg.text; 
    if (text === "/start" || text === "Хочу покур!" || text === "хочу покур" || text === "покур" || text === "Покур" || text === "хочу покур!" ) {
        bot.sendMessage(chatId, textWannaSmoke, { 
            reply_markup: {
                inline_keyboard: keyboard,
            }
        });
    }
    else {return bot.sendMessage (chatId, "Я тебя не понимаю, гнида. Говори понятнее")}
  });
  
  bot.on('callback_query', msg => {
    const fromUsername = msg.from.username;
    console.log (fromUsername)
    const chatId = msg.message.chat.id;
    const data = msg.data;
    const msgId = msg.message.message_id;
    if (data === 'wannaSmoke') { 
       bot.sendMessage (chatId, "Есть что покурить?", {
        reply_markup: {
            inline_keyboard: keyboard2
        }
       })
    }

    if (data === 'haveCig') { 
        bot.sendMessage (chatId, "Стрельнешь, если что?", {
         reply_markup: {
             inline_keyboard: keyboard3
         }
        })
     }
     if (data === 'canGive') { 
        bot.sendMessage (chatId, "Внатуре ты кабан. Зовем всех на покур?", {
         reply_markup: {
             inline_keyboard: keyboard5
         }
        })
     }
     if (data === 'canNotGive') { 
        bot.sendMessage (chatId, "Ок. Зовем всех на покур?", {
         reply_markup: {
             inline_keyboard: keyboard5
         }
        })
     }



     if (data === 'haveNoCig') { 
        bot.sendMessage (chatId, "Не вопрос, бро", {
         reply_markup: {
             inline_keyboard: keyboard4
         }
        })
     }
     if (data === 'wannaBumCig') { 
        bot.sendMessage (chatId, "Ты хочешь стрельнуть сигу. Зовем всех на покур?", {
         reply_markup: {
             inline_keyboard: keyboard5
         }
        })
     }
     if (data === 'wannaBumDudka') { 
        bot.sendMessage (chatId, "Ты хочешь покурить чужую дудку. Зовем всех на покур?", {
         reply_markup: {
             inline_keyboard: keyboard5
         }
        })
     }


    if (data === 'callToSmoke') { 
        bot.sendMessage (chatId, "Вы позвали всех на покур. Не опаздывайте", {
        })
        bot.sendMessage (chatId1, "📣 @" + fromUsername + " зовет вас на покур!", {
        })
     }
    }
    );


    
    
    /*
     bot.editMessageReplyMarkup ({
            reply_markup: {
                inline_keyboard: keyboard2
            }
        }, 
        {
                chat_id: chatId, 
                message_id: msgId
        });
        
    if (data === 'noCig') { 
        bot.sendMessage (chatId, "Есть что покурить?", {
            reply_markup: {
                inline_keyboard: keyboard2
            }
        })
    }
    }
    ); 
  
  bot.on('callback_query', (query) => {
      const chatId = query.message.chat.id;
      let text = '';
  
      if (query.data === 'wannaSmoke') { 
          text = 'ну иди кури бля';
      }


      if (text) {
        bot.sendMessage (chatId, text, {
            reply_markup: {
                inline_keyboard: keyboard2
            }
        })
      }

      if (query.data === 'haveCig') { 
        text = 'заебись, бро!';
        bot.sendMessage (chatId,text,{
            reply_markup: {
                inline_keyboard: keyboard3
            }
        })
    }
    if (query.data === "haveNoCig") {
        text = "ну ты и чертила";
        bot.sendMessage (chatId,text,{
            reply_markup: {
                inline_keyboard: keyboard4
            }
        })
    }
    if (query.data === "wannaBumCig") {
        text = "у тебя нет сиг и ты хочешь сигу";
        bot.sendMessage (chatId,text)
    }
    if (query.data === "wannaBumDudka") {
        text = "у тебя нет сиг и ты хочешь дудку";
        bot.sendMessage (chatId,text)
    }
    if (query.data === "canGive") {
        text = "хочешь покур и можешь стрельнуть. Красавчик!";
        bot.sendMessage (chatId,text)
    }

    }); */
