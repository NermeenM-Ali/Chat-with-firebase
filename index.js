import { YellowBox} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {registerScreens} from './src/screens'
import configure  from './src/screens/PushNotifications'

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Warning: ...'])
//AppRegistry.registerComponent("Chat", () => App);

//configure()
registerScreens()
Navigation.events().registerAppLaunchedListener(()=> {
    //configure()
    Navigation.setRoot({
        root: {
            stack:{
                id:'AppStack',
                children: [
                    {
                        component: {
                            name:'Splash',
                            id:'Splash',
                            options: {
                                topBar: {
                                    visible: false,
                                    drawBehind: true
                                }
                            }
                            
                        },
                        
                    },
                   
                ]
            }
        }
    })
})

/*
const functions = require('firebase-functions');
const admin = require('firebase-admin')


admin.initializeApp()



exports.isTyping = functions.database.ref('/messages').onCreate((snapShot,context)=>{
        console.log(context.params)
})











 /*exports.helloWorld = functions.https.onRequest((request, response) => {
   response.send("Hello from Firebase!");

  //return {"data": "Hello from Firebase!" }
 });

/* exports.isTyping = functions.https.onCall((request, response)=> {
      functions.database.ref('/messages').onCreate((snapShot, context)=>{
        const result = snapShot.val() || []
        const Info = context.params[0]
        console.log('Info: ' + Info)
        
    });
     response.send("IsTyping")
 })

 exports.sendNotification = functions.database.ref('/messages').onWrite((snapShot, context)=>{

 })
*/


 /*
 admin.database.ref('messages').push(data)
     .then(()=> send("RealTime:" +data))
     .catch((error)=> console.log(error) )*/