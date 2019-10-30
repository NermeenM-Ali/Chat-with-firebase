const functions = require('firebase-functions');

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.sendMessageNotification = functions.database.ref('messages').onWrite(event => {
    if (event.data.previous.exists()) {
      return;
    }
  firebase.database().ref('messages').once('value').then(function(snap) {
      var messageData = snap.val();
  var SendToToken =  messageData.user._id;
      var payload = {
        notification: {
          title: "You got a new Message",
          body: messageData.text,
        }
      };
      
      admin.messaging().sendToDevice(SendToToken, payload)
          .then((response)=> {
            console.log("Successfully sent message:", response);
          })
          .catch((error)=> {
            console.log("Error sending message:", error);
          });
    });
  });















/*
exports.sendNotification = functions.database.ref('/messages')
.onWrite(event => {
    //hna 3mlna store ll data eli etktbt fl messages
    var request = event.before.val() || []
    //const root = event.before.ref.root
    var payload = {
        title : "New Message",
        text: request.text

    }
    admin.messaging().sendToDevice(request.user._id, payload)
    .then((response)=> {console.log("success :" + response)})
    .catch((error)=> {console.log("error: " + error)})
})
*/
/*
const root  = admin.database().ref('messages').root
exports.pushNotification = functions.database.ref('messages')
.onCreate(event => {
    const msgs = event.val()
    var sendingMsgs = []
    return root.child('tokens').once('value').then((snapShot)=>{
        const tokens = snapShot.val() || []
        Object.values(tokens).forEach((t)=> {
            if(t) {
                sendingMsgs.push({
                    "to": t,
                    "data": msgs[0].text
                })
            }
        })
        return Promise.all(sendingMsgs)
    }).then((response)=>{
        admin.messaging().sendToDevice(, )
    })
})*/








/*
exports.sendPushNotification = functions.database.ref('messages')
.onCreate(event=>{
    const root = event.data.ref.root  //da ref ll root bta3 el database folder messages
    var messages = []  //dii hyb2a feha kol el notifications

    //bgeeb kol el tokens  //da propmis
  return  root.child('/tokens').once('value').then((snapShot)=>{
        snapShot.forEach(childSnapShot => {
            const eachToken = childSnapShot.val()
            if(eachToken) {
                messages.push({
                    "to": eachToken,
                    "body": 'New Message'
                })
            }
        });

        return Promise.all(messages)
    }).then(messages => {
        admin.messaging().sendToDevice(eachToken, JSON.stringify(messages))
    })
})*/