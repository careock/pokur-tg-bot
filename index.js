const express = require("express");
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = "5788161727:AAG6yWHbuwMySGo9PPvbxVt0_EOfJfSGxNI";
const bot = new TelegramBot(token,{polling: true});

//1) docker build -t pokur_bot .
//2) docker run -d pokur_bot
//const fs = require("fs");
const app2 = express();


app2.listen(10000, function(){
    console.log("Сервер ожидает подключения...");
});
app2.get("/", function(req,res){
    res.status(200).send();
  }
  ); 

//------------------------------------
const {initializeApp} = require ("firebase/app");
const {getDatabase, set, ref, get, child, update, push} = require ("firebase/database");


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
let db = getDatabase(app);
textWannaSmoke = "Хочешь покур?";
textCallToSnoke = [ '📣Звать всех на покур!'];
let chatIDs = {};
let chatIdsSize = 0;
const chats=ref(db, 'chats');
const zovs=ref(db,'zovs');

let fff=[];
function getZovs () {
    get(zovs,"value").then(snapshot=> {
    //snapshot.val();
    //console.log(snapshot.val());
    const fff=snapshot.val();
    return(snapshot.val())
    })
    
}

fff=getZovs();
//console.log(fff);

let msgOnCalltoSmoke = "зовет вас на покур!";
let textInstruction = "❕Просто добавь меня в чаты, где собираются курильщики. 🔔 Во все чаты, где я нахожусь, и всем пользователям бота будет отправлено оповещение, когда ты захочешь покур!✅"
//-------------------------------------

//актуализация списка чатов. В РабВерсии - в функцию передается объект ChatIds

function convertTimestampToTime(timestamp) {
    try {
      // Create a Date object from the timestamp (in milliseconds)
      const date = new Date(timestamp * 1000);
      
      // Extract the time components
      const hours = date.getHours();
      const minutes = date.getMinutes();
      
      // Format the time as "HH:MM"
      const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      return timeStr;
    } catch (error) {
      return "Invalid timestamp";
    }
  }

    function getChats () {
        get(chats,'value')
            .then(function(snapshot) {
                app2.get("/", function(req,res){
                    res.status(200).send();
                  }
                  );  
                chatIDs=snapshot.val();
                console.log( "snapshot.val  (getChats) " + snapshot.val());
                //console.log( "snapshot   " + snapshot);
                chatIdsSize=snapshot.val().length;
                console.log("size:   " + chatIdsSize);
        })
    }

//клава--------------------------------------------------------------------------

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
            text: "🫡 Иду на покур!",
            callback_data: "gonnaSmoke"
        },
        {
            text: "🤓 Я лох",
            callback_data: "notGonnaSmoke"
        }
    ],
  ];
//логика--------------------------






    bot.on('message', (msg) => {
    console.log(msg);
    const chatId = msg.chat.id;
    text = msg.text;

    if (text === "/start"){


        const options = {
            reply_markup: {
              keyboard: [[ "🚬 Хочу покур!"]],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          };
        
          //bot.sendMessage(chatId, 'Choose an option:', options);

        bot.sendMessage(chatId, textInstruction, options); //отправить сообщение

       /* bot.sendMessage(chatId, textWannaSmoke, { 
            reply_markup: {
                inline_keyboard: keyboard,
            }
        });*/
        //---------------------добавить в бд---------------------

        get(chats,'value')
        .then(function(snapshot) {
            let chatIDsUPD={};
            chatIDs=snapshot.val();
            console.log( "snapshot.val   " + snapshot.val());
            console.log( "snapshot   " + snapshot);;
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
    }}})

    }

    else if (text == "🚬 Хочу покур!") {

        let replyText = "Есть что покурить?";
        let options = {
            reply_markup: {
              keyboard: [[ '🟢 Сиги есть!'],['🔴 Сиг нет']],
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          };

        bot.sendMessage(chatId, replyText, options); 
    }

    
    
    else if (text == '🟢 Сиги есть!') {
        const replyText = "Стрельнешь, если что?";
        const options = {
            reply_markup: {
              keyboard: [[ '🔫 Могу стрельнуть'],['🐭 У меня последняя']],
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          };

        bot.sendMessage(chatId, replyText, options); 

    }

    

    else if (text == '🔴 Сиг нет') {
        const replyText = "Не вопрос, бро";
        const options = {
            reply_markup: {
              keyboard: [[ '🙍‍♂️ Хочу сигу'],['👨‍❤️‍👨 Хочу дудку']],
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          };

        bot.sendMessage(chatId, replyText, options); 
       
    }

    else if (text == "🙍‍♂️ Хочу сигу" ) {
        const replyText = "Ты хочешь стрельнуть сигу. Зовем всех на покур?";
        const options = {
            reply_markup: {
              keyboard: [[ '📣Звать всех на покур!']],
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          };

        bot.sendMessage(chatId, replyText, options); 

    }

    else if (text == "👨‍❤️‍👨 Хочу дудку" ) {
        const replyText = "Ты хочешь покурить чужую дудку. Зовем всех на покур?";
        const options = {
            reply_markup: {
              keyboard: [[ '📣Звать всех на покур!']],
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          };

        bot.sendMessage(chatId, replyText, options); 

    }

    else if (text =="🔫 Могу стрельнуть" ) {
        const replyText = "Внатуре ты кабан. Зовем всех на покур?";
        const options = {
            reply_markup: {
              keyboard: [textCallToSnoke],
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          };

        bot.sendMessage(chatId, replyText, options); 

    }

   else if (text == "🐭 У меня последняя" ) {
    const replyText = "Ок. Зовем всех на покур?";
    const options = {
        reply_markup: {
          keyboard: [textCallToSnoke],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      };

    bot.sendMessage(chatId, replyText, options); 

    }


    else if (text==textCallToSnoke){

        const fromUsername = msg.from.username;
        const chatId = msg.chat.id;
        //const data = msg.data;

        const zovUPD = {};
        //console.log(msg);
        console.log("time n shit-------------------------")
        const timestamp = msg.date;
        const time = convertTimestampToTime(timestamp);
        //console.log(msg.message.date);
        console.log(time);
        console.log("time n shit-------------------------")


       
        const options = {
            reply_markup: {
              keyboard: [["🚬 Хочу покур!"]],
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          };

        //bot.sendMessage(chatId, replyText, options); 

        bot.sendMessage (chatId, "🚀🚀🚀 Вы позвали всех на покур в " +time+ ". 🚬 Посмотрим, кто отзовется.", options)
        .then(response=>{
                    console.log(response);
                    console.log(chatIDs);
                    const messageId = response.message_id;
                    const chatID = response.chat.id;
                    zovUPD[chatID]=messageId;
                    console.log(zovUPD);
                    set(newZovsUPD, zovUPD)
                    .then(() => {
                    console.log('New object added with key:', newZovsUPD.key);
                    })
                    .catch(error => {
                    console.error('Error pushing object:', error);
                    });

                    for (i=0;i<chatIdsSize;i++) {
                        //здесь запись в бд массив с ключем "номер зова (просто новый по порядку)", а внутрь массива - айди чата: айди сообщения.
               
                        if (chatIDs[i]!=chatId) {
                            bot.sendMessage (chatIDs[i], "📣 @" + fromUsername + " "+msgOnCalltoSmoke, {
                                reply_markup: {
                                    inline_keyboard: keyboard6
                                }
                            }).then(response=>{
                                const messageId = response.message_id;
                                const chatID = response.chat.id;
                                console.log(response);
                                console.log("chatID: "+chatID+ " messageID: ", messageId);
                                zovUPD[chatID]=messageId;
                                console.log(zovUPD);
                                set(newZovsUPD, zovUPD)
                                .then(() => {
                                console.log('New object added with key:', newZovsUPD.key);
                                })
                                .catch(error => {
                                console.error('Error pushing object:', error);
                                });
                                
                            }).catch (error=> {
                                console.log("Error:", error.response.statusMessage, error.code)
                            })
                        }
                       
                    }
        })


        


        //console.log(getZovs())
        const newZovsUPD = push(zovs);
        

    }



    else if(msg.new_chat_member) {
        const options = {
            reply_markup: {
              keyboard: [[ "🚬 Хочу покур!"]],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          };
        bot.sendMessage (chatId, "Спасибо, что позвали! Через меня вы можете звать на покур всех, кто меня пользует.", options)
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


        })
        
    }

    else{
            console.log(msg);
            bot.sendMessage (chatId, "Я тебя не понимаю, гнида. Говори понятнее");

            
    }
  });


//----------------------

/*
    bot.on('error', (error) => {
    console.log('Error:', error);
  });
*/
    bot.on('callback_query', msg => {
    const fromUsername = msg.from.username;
    const chatId = msg.message.chat.id;
    const data = msg.data;


    /*
    if (data === 'wannaSmoke') { 
        bot.sendMessage (chatId, "Есть что покурить?", {
        reply_markup: {
            inline_keyboard: keyboard2
        }
       })
    };
*/

/*
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

     */


    //---------------
    //---------------
    //---------------
    //---------------

    /*
    if (data === 'callToSmoke') { 
        const zovUPD = {};
        console.log("time n shit-------------------------")
        const timestamp = msg.message.date;
        const time = convertTimestampToTime(timestamp);
        console.log(msg.message.date);
        console.log(time);
        console.log("time n shit-------------------------")

        bot.sendMessage (chatId, "🚀🚀🚀 Вы позвали всех на покур в " +time+ ". 🚬 Посмотрим, кто отзовется.", {
        }).then(response=>{

                    const messageId = response.message_id;
                    const chatID = response.chat.id;
                    zovUPD[chatID]=messageId;
                    console.log(zovUPD);
                    set(newZovsUPD, zovUPD)
                    .then(() => {
                    console.log('New object added with key:', newZovsUPD.key);
                    })
                    .catch(error => {
                    console.error('Error pushing object:', error);
                    });
        })


        for (i=0;i<chatIdsSize;i++) {
            //здесь запись в бд массив с ключем "номер зова (просто новый по порядку)", а внутрь массива - айди чата: айди сообщения.
   
            if (chatIDs[i]!=chatId) {
                bot.sendMessage (chatIDs[i], "📣 @" + fromUsername + " "+msgOnCalltoSmoke, {
                    reply_markup: {
                        inline_keyboard: keyboard6
                    }
                }).then(response=>{
                    const messageId = response.message_id;
                    const chatID = response.chat.id;
                    console.log(response);
                    console.log("chatID: "+chatID+ " messageID: ", messageId);
                    zovUPD[chatID]=messageId;
                    console.log(zovUPD);
                    set(newZovsUPD, zovUPD)
                    .then(() => {
                    console.log('New object added with key:', newZovsUPD.key);
                    })
                    .catch(error => {
                    console.error('Error pushing object:', error);
                    });
                    
                }).catch (error=> {
                    console.log("Error:", error.response.statusMessage, error.code)
                })
            }
           
        }


      

   
            

        //console.log(getZovs())
        const newZovsUPD = push(zovs);
        


     }

     */

     if (data== 'gonnaSmoke') {
        const messageId=msg.message.message_id
        get(zovs,"value").then(snapshot=> {
            const fff=snapshot.val();
            console.log(Object.keys(fff).length);
            console.log(chatId);
            console.log(msg);
            console.log("username of supporter is: "+fromUsername);

            for(i=0;i<Object.keys(fff).length;i++){ //i это количество всех зовов
                if (Object.values(fff)[i][chatId]==messageId){ //если велью по ключу чатайди равно айди сообщения, на которое отвечает юзер
                    console.log(Object.values(Object.values(fff)[i]).length);
                    console.log(Object.values(fff)[i]);
                    console.log(Object.values(fff)[i][chatId]); // велью по ключу чатайди
                    console.log(Object.values(Object.values(fff)[i]))
                    console.log(Object.keys(Object.values(fff)[i]))
                    console.log("------------------------");
                    //Object.values(fff)[i] - это например { '-751164055': 1178, '5880272339': 1177 }
                    for (k=0;k<Object.values(Object.values(fff)[i]).length;k++){
                        const chatToEdit = Object.keys(Object.values(fff)[i])[k];
                        const messageToEdit = Object.values(Object.values(fff)[i])[k];
                        if (chatId!=chatToEdit){
                            console.log(chatToEdit);
                        console.log(messageToEdit);
                        bot.sendMessage(chatToEdit, "✅ @"+fromUsername+" идет на покур", { reply_to_message_id: messageToEdit })
                            .then(() => {
                                console.log('replied to:' + chatToEdit + " message: "+messageToEdit);
                            })
                    }
                    else {
                        bot.sendMessage(chatId, "✅ Вы откликнулись на покур (уважаемо)")
                        .then(() => {
                            //console.log('replied to:' + chatToEdit + " message: "+messageToEdit);
                        })
                    }
                        }
                    
                }
            }
            })
       
    }
    if (data== 'notGonnaSmoke') {
        const messageId=msg.message.message_id
        get(zovs,"value").then(snapshot=> {
            const fff=snapshot.val();
            console.log(Object.keys(fff).length);
            console.log(chatId);
            console.log(msg);
            console.log("username of supporter is: "+fromUsername);

            for(i=0;i<Object.keys(fff).length;i++){ //i это количество всех зовов
                if (Object.values(fff)[i][chatId]==messageId){ //если велью по ключу чатайди равно айди сообщения, на которое отвечает юзер
                    console.log(Object.values(Object.values(fff)[i]).length);
                    console.log(Object.values(fff)[i]);
                    console.log(Object.values(fff)[i][chatId]); // велью по ключу чатайди
                    console.log(Object.values(Object.values(fff)[i]))
                    console.log(Object.keys(Object.values(fff)[i]))
                    console.log("------------------------");
                    //Object.values(fff)[i] - это например { '-751164055': 1178, '5880272339': 1177 }
                    for (k=0;k<Object.values(Object.values(fff)[i]).length;k++){
                        const chatToEdit = Object.keys(Object.values(fff)[i])[k];
                        const messageToEdit = Object.values(Object.values(fff)[i])[k];
                        if (chatId!=chatToEdit){
                            console.log(chatToEdit);
                        console.log(messageToEdit);
                        bot.sendMessage(chatToEdit, "❌ @"+fromUsername+" говорит, что не идет на покур", { reply_to_message_id: messageToEdit })
                            .then(() => {
                                console.log('replied to:' + chatToEdit + " message: "+messageToEdit);
                            })
                    }
                    else {
                        bot.sendMessage(chatId, "🖕 Вы лох (попущен)")
                        .then(() => {
                            //console.log('replied to:' + chatToEdit + " message: "+messageToEdit);
                        })
                    }
                        }
                    
                }
            }
            })

    }

    }
    );