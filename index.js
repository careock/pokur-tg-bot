const TelegramBot = require('node-telegram-bot-api');
const token = "5788161727:AAG6yWHbuwMySGo9PPvbxVt0_EOfJfSGxNI";
const bot = new TelegramBot(token,{polling: true});
const axios = require ('axios');
const express = require("express");
const app2 = express();
const port = process.env.PORT || 3001;
app2.get("/", (req, res) => res.writeHead(200, {'Content-Type': 'text/plain'}));

app2.listen(port, () => console.log(`Example app listening on port ${port}!`));

//------------------------------------
const {initializeApp} = require ("firebase/app");
const {getDatabase, set, ref, get, child, push, update} = require ("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyCP_MM8PwNuwIB29s3aAkKh1ai-QZ83aW0",
  authDomain: "pokur-bot.firebaseapp.com",
  projectId: "pokur-bot",
  storageBucket: "pokur-bot.appspot.com",
  messagingSenderId: "1059723331580",
  appId: "1:1059723331580:web:7b0973560984a74757d479",
  databaseURL: "https://pokur-bot-default-rtdb.firebaseio.com"
};
const app = initializeApp(firebaseConfig);


/*get(app)
.then (function(req,res){
        res.sendStatus(200);
});*/
  
//const db = getDatabase(app);
let db = getDatabase(app);
textWannaSmoke = "Хочешь покур?";
let chatIDs = {};
let chatIdsSize = 0;
const chats=ref(db, 'chats');
let msgOnCalltoSmoke = "зовет вас на покур!";
let textInstruction = "❕Просто добавь меня в чаты, где собираются курильщики. 🔔 Во все чаты, где я нахожусь, будет отправлено оповещение, когда ты захочешь покур!✅"
//-------------------------------------

//актуализация списка чатов. В РабВерсии - в функцию передается объект ChatIds
async function updateChatIds(newChatId) {
    console.log('chatIds '+chatIDs);
    chatIdsSize=Object.keys(chatIDs).length;
    console.log(chatIdsSize);
    let isPovtor = false; 
    for (i=0; i<=chatIdsSize;i++) {
        if (chatIDs[i]==newChatId){
            isPovtor = true;
            break;
        }
    }
    if (isPovtor == false){
        chatIDs[chatIdsSize]=newChatId;
    }
    console.log("object (hopefully)"+chatIDs)
    await update(chats,chatIDs);
    console.log('updated');
}

    function getChats () {
        get(chats,'value')
            .then(function(snapshot) {
                chatIDs=snapshot.val();
                console.log( "snapshot.val   " + snapshot.val());
                console.log( "snapshot   " + snapshot);
                chatIdsSize=snapshot.val().length;
                console.log("size:   " + chatIdsSize);
        })
    }
    //getChats();

//логика бота--------------------------------------------------------------------------

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
  ];
  const keyboard6 = [
    [
        {
            text: "Хочу еще покур.",
            callback_data: "wannaSmoke"

        }
    ],
  ];

    bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    text = msg.text; 
    if (text === "/start" || text === "Хочу покур!" || text === "хочу покур" 
    || text === "покур" || text === "Покур" || text === "хочу покур!" ) {
        bot.sendMessage(chatId, textInstruction, { 
        });
        bot.sendMessage(chatId, textWannaSmoke, { 
            reply_markup: {
                inline_keyboard: keyboard,
            }
        });
    }
    else if(msg.new_chat_member) {
        bot.sendMessage (chatId, "Спасибо, что позвали! Через меня вы можете звать на покур всех, кто меня пользует.", {
        })
        get(chats,'value')
            .then(function(snapshot) {
                let chatIDsUPD={};
                chatIDs=snapshot.val();
                console.log( "snapshot.val   " + snapshot.val());
                console.log( "snapshot   " + snapshot);
                //chatIdsSize=Object.keys(snapshot).length;
                chatIdsSize=snapshot.val().length;
                console.log("size:   " + chatIdsSize);
    let isPovtor = false; 
    for (i=0; i<chatIdsSize;i++) {
        //console.log(snapshot.val());
        console.log(chatIDs[i]);
        chatIDsUPD[i]=chatIDs[i];
        console.log(chatIDsUPD);
        console.log(i);
        if (chatIDsUPD[i]==chatId){
            isPovtor = true;
            console.log(isPovtor);
            break;
        }
        else {
            chatIDsUPD[i+1]=chatId;
            update(chats,chatIDsUPD);
            console.log('updated');
        }
    }
    /*if (isPovtor == false){
        chatIDs[chatIdsSize]=chatId;
    }*/
    //console.log(chatIDsUPD);
    //update(chats,chatIDs);

        })
        
    }
    else{
            console.log(msg);
            bot.sendMessage (chatId, "Я тебя не понимаю, гнида. Говори понятнее");
    }
  });
  

    bot.on('callback_query', msg => {
    const fromUsername = msg.from.username;
    const chatId = msg.message.chat.id;
    const data = msg.data;


    if (data === 'wannaSmoke') { 
        bot.sendMessage (chatId, "Есть что покурить?", {
        reply_markup: {
            inline_keyboard: keyboard2
        }
       })
    };

    if (data === 'haveCig') { 
        bot.sendMessage (chatId, "Стрельнешь, если что?", {
         reply_markup: {
             inline_keyboard: keyboard3
         }
        })
     };
     if (data === 'canGive') { 
        bot.sendMessage (chatId, "Внатуре ты кабан. Зовем всех на покур?", {
         reply_markup: {
             inline_keyboard: keyboard5
         }
        })
        msgOnCalltoSmoke = "зовет вас на покур и говорит, что стрельнет сигу, если надо! 🦁💪";
     };
     if (data === 'canNotGive') { 
        bot.sendMessage (chatId, "Ок. Зовем всех на покур?", {
         reply_markup: {
             inline_keyboard: keyboard5
         }
        })
        msgOnCalltoSmoke = "зовет вас на покур, но сигу не стрельнет. 🐭🖕";
     };
     if (data === 'haveNoCig') { 
        bot.sendMessage (chatId, "Не вопрос, бро", {
         reply_markup: {
             inline_keyboard: keyboard4
         }
        })
        
     };
     if (data === 'wannaBumCig') { 
        bot.sendMessage (chatId, "Ты хочешь стрельнуть сигу. Зовем всех на покур?", {
         reply_markup: {
             inline_keyboard: keyboard5
         }
        })
        msgOnCalltoSmoke = "зовет вас на покур, и просит стрельнуь сигу! 🙏🥺";
     };
     if (data === 'wannaBumDudka') { 
        bot.sendMessage (chatId, "Ты хочешь покурить чужую дудку. Зовем всех на покур?", {
         reply_markup: {
             inline_keyboard: keyboard5
         }
        })
        msgOnCalltoSmoke = "зовет вас на покур, и просит дать пососать дудку. 👌🏻👈🏿";
     };

    if (data === 'callToSmoke') { 
        bot.sendMessage (chatId, "Вы позвали всех на покур. Не опаздывайте! 🚬", {
        })
        bot.sendMessage (chatId, "Хочешь покур?", {
            reply_markup: {
                inline_keyboard: keyboard
            }
        })
       console.log(chatIdsSize);
       getChats();
        for (i=0;i<chatIdsSize;i++) {
            bot.sendMessage (chatIDs[i], "📣 @" + fromUsername + " "+msgOnCalltoSmoke, {
            })
            console.log('chatIds '+chatIDs);
        }
     }
    }
    );