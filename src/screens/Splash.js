import React, {Component} from 'react'
import {Image, View, StatusBar, AsyncStorage, NetInfo} from 'react-native'
import {Spinner} from 'native-base'
import PushNotification from 'react-native-push-notification'
import { Button } from 'native-base';
import { RNToasty } from 'react-native-toasty'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppText from '../common/AppText'
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import {userToken, currentUser} from '../actions/AuthAction'
import {changeLanguage} from '../actions/SelectLanguageAction'
import {startFetchMessage} from '../actions/MessagesAction'
import Strings from '../assets/Strings'


 class Splash extends Component {
     constructor(props) {
         super(props)
         this.state={
             active: false
         }
     }



     async componentDidMount() {
        this.checkConnection()
        this.checkLanguage()
        this.checkUser()
        firebase.messaging().getToken()
        .then((token)=> {
            this.checkToken(token)
            console.log('firebase token: '+ token)
        })
       console.log(this.props.msg)
    }



   async checkConnection() {

        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            if(isConnected ) {
                this.setState({active: true})
               // alert(this.state.active)
                AsyncStorage.setItem('@userStatus', this.state.active)
                RNToasty.Success({title:'Active'})
            }else {
                this.setState({active: false})
                AsyncStorage.removeItem('@userStatus')
                RNToasty.Warn({title:'Inactive check Connection and login again'})
            }
          });

           handleFirstConnectivityChange=(isConnected)=> {
            console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
            if(!isConnected) {
                RNToasty.Warn({title:'Inactive check Connection and login again'})
                AsyncStorage.removeItem('@userStatus')
            }else{
                this.setState({active: true})
                RNToasty.Success({title:'Active'})
                AsyncStorage.setItem('@userStatus', this.state.active)
            }

            NetInfo.isConnected.removeEventListener(
              'connectionChange',
              handleFirstConnectivityChange
            );
          }
          NetInfo.isConnected.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
          );
      }

    checkLanguage= async ()=> {
        const lang = await AsyncStorage.getItem('@lang')
        if(lang == 'ar') {
            this.props.changeLanguage(true)
            Strings.setLanguage('ar')
        }

        if(lang == 'en') {
            this.props.changeLanguage(false)
            Strings.setLanguage('en')
        }    
    }


    
    checkUser = async ()=> {
       
        const token = await AsyncStorage.getItem('@userToken')
        const name = await AsyncStorage.getItem('@userName')
        const image =  await AsyncStorage.getItem('@userImage')
        const status =  await AsyncStorage.getItem('@userStatus')
        //alert(status)
        if(token && name && status ) {
            console.log('CheckUser:  exist')
         //   this.props.currentUser(user)
       //  alert(token)
            Navigation.push('AppStack', {
                component: {
                    name:'App',
                    options: {
                        topBar:{
                            visible: false,
                            drawBehind: true
                        },
                        
                    },
                    passProps: {
                        user: name,
                        image: image,
                        status: this.state.active,
                        token: token
                    }
                }
            })
        }else  if(token && name  ) {
            console.log('CheckUser:  exist')
         //   this.props.currentUser(user)
       //  alert(token)
            Navigation.push('AppStack', {
                component: {
                    name:'App',
                    options: {
                        topBar:{
                            visible: false,
                            drawBehind: true
                        },
                        
                    },
                    passProps: {
                        user: name,
                        image: image,
                        status: this.state.active,
                        token: token
                    }
                }
            })
        }
        
        else {
            console.log('CheckUser not exist')
           // AsyncStorage.setItem('@userStatus', this.state.active)
            //this.props.currentUser(user)
            Navigation.push('AppStack', {
            component: {
                name:'SelectLanguage',
                options: {
                    topBar:{
                        visible: false,
                        drawBehind: true
                    },
                        backButton:{
                            visible: false
                        },
                        //height:hp(7)
                    },
                
                }
               
            }
   )
        }
    }

    checkToken= async (token)=> {
        let t = await AsyncStorage.getItem('@userToken')

        if(t) {
            this.props.userToken(token)
            console.log('Token is already exist')
           
        } else {
          AsyncStorage.setItem('@userToken', token)
           console.log('creating new Token')
            this.props.userToken(token)
            console.log('creating new Token'+ token)

        }
    }
     


    render() {
        return(
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center'}}>
                <StatusBar hidden/>
                <Image source={require('../assets/imgs/chat.png')} style={{width:wp(40), height: hp(20), alignSelf:'center'}}/>
                <AppText text='Start Chatting' fontSize={wp(6)} fontWeight='400' textAlign='center' marginTop={hp(2)} textDecorationLine='underline' color='orange'/>
                <Spinner size= 'large' color='orange' style={{marginTop: hp(7)}}/>
                
            </View>
        )
    }
}

const mapStateToProps= state=>({
    isRtl: state.lang.isRtl,
    msg: state.messages.msg,
    status: state.auth.status
})

const mapDispatchToProps={
    userToken,
    currentUser,
    changeLanguage,
    startFetchMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)

/*
<Button rounded transparent onPress={()=>{this.localNotification()}}>
                   <Text>Click To Push local Notification</Text>
                </Button>*/



/*
    componentDidMount() {
        PushNotification.configure({
 
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log( 'TOKEN:', token.token );
            },
        
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification.message );
                alert('Work')
        
            },
        
            // ANDROID ONLY: (optional) GCM Sender ID.
            senderID: "286726938135",
        
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
        
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
            /**
              * IOS ONLY: (optional) default: true
              * - Specified if permissions will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
    //        requestPermissions: true,
  //      });
    //}

     /*localNotification = () => {
        PushNotification.localNotification({
          autoCancel: true,
          largeIcon: "ic_launcher",
          smallIcon: "ic_notification",
          bigText: "My big text that will be shown when notification is expanded",
          subText: "This is a subText",
          color: "green",
          vibrate: true,
          vibration: 300,
          title: "Notification Title",
          message: "Notification Message",
          playSound: true,
          soundName: 'default',
          actions: '["Accept", "Reject"]',
          
        });
       };*/                