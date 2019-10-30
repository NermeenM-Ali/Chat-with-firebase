import React from 'react'
import {Text, View, StatusBar, Platform, KeyboardAvoidingView,PushNotificationIOS} from 'react-native'
import { GiftedChat, Bubble, Send ,InputToolbar,Composer,MessageImage , Day, Time} from 'react-native-gifted-chat'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { Button, Icon } from 'native-base'
//import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker';
//import ImagePicker from 'react-native-image-picker'
//import RNFetchBlob from 'rn-fetch-blob'
import PushNotification from 'react-native-push-notification'
import moment from 'moment'
import { Navigation } from 'react-native-navigation'
import {saveMessages} from '../actions/MessagesAction'
import { TypingAnimation }  from 'react-native-typing-animation'
import { connect } from 'react-redux'
import { isTyping } from '../actions/TypingAction'
import Header from '../common/Header'
import firebase from 'react-native-firebase'
import { RNToasty } from 'react-native-toasty'
import Strings from '../assets/Strings'


class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        messages: [],
        pickImage:null,
        typing: false,
        fetchChat: false,
        active: false,
        data:'',
        avatar:null,
        text: '',
        uploadURL:'',
        isLoadingEarlier: false,
        currentChatter: null
      }

   
  }


  

  pickImageToSend= ()=> {
    ImagePicker.openPicker({
      width: wp(30),
      height: hp(18),
      cropping: true
    }).then(image => {
     // alert(image.path)
      this.setState({
        uploadURL: image.path
      })
      RNToasty.Success({title:'Image picked please type and word and press send '})
    });
 }


 componentDidMount() {


  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
      //alert("TOKEN:", token);
    },
   
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      alert("NOTIFICATION:", notification);
   
      // process the notification
   
      // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
   
    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
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
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
   requestPermissions: true
  });

  firebase.database().ref(`messages`).limitToLast(100).on('value', (msgs)=> {
    const messages = msgs.val() || []
        const FullData=[]
       Object.values(messages).forEach(msg=>{ 
         //alert(msg[0].user.image)
        const details= JSON.stringify(msg[0])
        console.log(msg[0])
         FullData.push ({
           _id: Math.round(Math.random() * 1000000),
           text:  msg[0].text,
           image:this.state.uploadURL !==null ? this.state.uploadURL : this.state.uploadURL,
           createdAt: Date(msg[0].createdAt),
           user: {
             _id: msg[0].user._id,
            // name: this.props.user,s
            name: msg[0].user.name,
             avatar: this.props.image,
            // avatar: msg[0].user.avatar // lw 3awza kol avatar yb2a bta3 el user 7roof ya3nii 
           }
         })
         console.log('Data is:')
         //alert(FullData)
        

         this.setState({
          messages: FullData,
         //  avatar: FullData.user.avatar,
           text: FullData.text,
           uploadURL: null,
           userId: FullData._id,

         })
       })
   })
  
  }


  
 
  onSend(messages = []) {

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)

    }))
   console.log('From on send')
    console.log( this.state.messages)
    
    this.props.saveMessages(messages, this.props.userToken)

   


    
    /*var userTyping = firebase.functions().httpsCallable('isTyping')
    userTyping({check:'status'}).then((res)=> alert("Status is:" + JSON.stringify(res.data))).catch((err)=> alert("error:"+err.message))
    
    alert(userTyping)*/

   // var msg= firebase.functions().httpsCallable('helloWorld') 
  //msg({data: 'requested data'}).then((res)=> alert("Data is:" + JSON.stringify(res.data))).catch((err)=> alert(err.message))

    
  }
/*
  renderChatFooter=(props)=> {
    firebase.database().ref('/tokens').on('value', (tokens)=>{
        const userTokens = tokens.val() || []
      //  alert(JSON.stringify(userTokens))
        let i;
        Object.values(userTokens).forEach(token=>{
          if(token === this.props.userToken) {
           // alert(true)
          }else {
            //alert(false)
          }
        })
       
    })
  }*/
   
   renderChatFooter =(props)=> {
      if(this.props.typing&& this.state.typing ) {
        return(
         <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
            <View {...props} style={{marginTop: hp(2),width:wp(15), height:hp(4), flexDirection:'row'}}>
             <Text style={{marginLeft:wp(2), marginRight:wp(2)}}>Typing</Text>
             <TypingAnimation 
                dotColor="gray"
                dotMargin={5} // el msafa been kol dot wl tanya
                dotAmplitude={3}
                dotSpeed={0.20}  //sor3thom
                dotRadius={2.5} // btkbr 7gm el dots
                dotX={17}
                dotY={10}
                
                
              />
      
          </View>
         </KeyboardAvoidingView>
     )}else {
       return null
     }
 }
 

  renderBubble = props => {
  
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#F2F3F4",
            width:wp(60),
            height:hp(7),
           
          },
         right: {
             backgroundColor:"#F8C471",
             width:wp(60),
             height:hp(7)
         } 
        }}

        textStyle={{
            left: {
                color:'black',
                marginHorizontal:wp(2),
                marginBottom:hp(1),
                marginTop:hp(1)
            },
            right: {
                color:'black',
                marginHorizontal:wp(2),
                marginBottom:hp(1),
                marginTop:hp(1)
            }
        }}

       /* renderMessageImage={()=>{
          alert( this.state.uploadURL)
          this.state.uploadURL !== null ? <MessageImage containerStyle={{width:wp(60),
          height:hp(7), flex:1,marginVertical:hp(3)}} source={{uri: this.state.uploadURL}}/> : this.renderBubble}
        }*/

        //renderMessageText={()=> this.state.data !==null? <Text>Typing..</Text>: this.renderBubble}
        /> 
            
    );
  };

  renderActions=(props)=> {
      return(
        <View  style={{alignSelf:'center'}}>
             <Send

                {...props}>
                   <Icon name='md-send' type='Ionicons' 
                          style={{marginHorizontal:wp(2),color:'orange',transform: [{ rotate: '180deg'}], fontSize:wp(8)}}/>
                </Send>

        </View>
      )
     
  }

  renderInputToolbar= (props)=> {
    //Add the extra styles via containerStyle
   return(
    <InputToolbar {...props} containerStyle={{height:hp(9), elevation:2,borderTopColor:'lightgray'}}/>
   )
 }

 renderSend=()=> {
     return null
 }



 renderComposer=(props)=> {
    return(
        // el props eli d5lalha hya aii 7aga leha 3lakaa bl input el styling wl placeholder ...
        <View style={{width:wp(85), height:hp(7),flexDirection:'row-reverse', 
                      backgroundColor:"#F2F3F4",
                      borderRadius:wp(2), marginHorizontal:wp(1), marginVertical:hp(1)
                      }}>
            <Composer {...props} />

            <Button rounded transparent style={{alignSelf:'center'}}
                    onPress={()=> {
                      this.pickImageToSend()
                     
                    }}
            >
               <Icon name='image' type='FontAwesome' style={{fontSize:wp(6), color:'gray'}}/>
            </Button>
        </View>
    )
 }

  render() {
    return (
     <View style={{flex:1, backgroundColor:'white'}}>  
      <StatusBar hidden={false}/>
        <Header headerText={this.props.user}  headerImage={this.props.image} 
                backAction  showImage leftComponent centerComponent
                headerStatus={this.props.status}
                color='black'
                />
        <GiftedChat
            messages={this.state.messages}
            onSend={(messages) =>{ this.onSend(messages)
                                this.props.isTyping(false)
                                this.setState({typing: false})
                                }}
            
            textInputProps={{multiline: true, numberOfLines:5}}  
            ref={(chat) => this.chat = chat }              
            placeholder={Strings.placeholder }
            placeholderTextColor="gray" 
            isCustomViewBottom
            textInputStyle={{ paddingHorizontal:wp(3) }}
            timeTextStyle={{
                            right: { 
                                    color:'gray',
                                    position:'absolute',
                                    marginHorizontal:wp(-70),
                                    marginTop:hp(-4)
                        
                                    },
                            left: { 
                                  color:'gray',
                                  position:'absolute',
                                  marginHorizontal:wp(60),
                                  marginTop:hp(-4)  

                                  }
                }}
            scrollToBottom    
           // inverted={false}
            showUserAvatar
            isAnimated
            isLoadingEarlier   
            user={{
              _id: this.props.userToken,
              name: this.props.user,
              avatar: this.props.image,
             //avatar:this.props.userImage
            }}

            alwaysShowSend
            bottomOffset={hp(5)}
           
            onInputTextChanged={(text)=>{
              if(text === '') {
                  return null
                  
              }else {
              this.props.isTyping(true)
              // alert(this.props.typing)
               console.log(text)
               this.setState({typing: true, data: text})
              }
            }}
            renderDay={()=> {return null}}
            renderBubble={this.renderBubble}
            renderSend={this.renderSend}
            renderActions={this.renderActions}
            renderInputToolbar={this.renderInputToolbar}
            renderComposer={this.renderComposer}
            renderChatFooter={this.renderChatFooter}
            alignTop
             listViewProps={{
            marginBottom: hp(3),
            marginTop:hp(2),
            flexDirection: 'column-reverse'
           }}
            />
             {/*
              Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
             */}
      </View>
    )
  }
}

const mapStateToProps = state=> ({
  typing: state.typing.isTyping,
  loading: state.typing.loading,
  allMsgs: state.messages.msg.text,
  isRtl: state.lang.isRtl,
  userToken: state.auth.userToken,
  userImage: state.auth.userImage
})

const mapDispatchToProps = {
  isTyping,
 saveMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(App)




  /*_pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchImageLibrary({}, response  => {
      uploadImage(response.uri)
        .then(url =>{ 
          this.setState({ uploadURL: url })
          RNToasty.Success({title: 'Sucess wait for uploading'})
       })
        .catch(error => RNToasty.Error({title: error.message}))
      
    })
  }

  /*getSelectedImages = (currentImage) => {
    
    const image = currentImage.uri
 
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
 
   
    let uploadBlob = null
    const imageRef = firebase.storage().ref('Images').child("test.jpg")
    let mime = 'image/jpg'
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
    })
    .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        RNToasty.Warn({title: url})
        // URL of the image uploaded on Firebase storage
        console.log(url);
        this.setState({
          pickImage: url
      })
        RNToasty.Success({title:'Uploaded Successfully'})
        
      })
      .catch((error) => {
        RNToasty.Error({title: error.message})
 
      })  
 
  }*/


  /*
 pickImageToSend=()=> {
   const options={
     noData: true
   }
   ImagePicker.launchImageLibrary(options,(response)=> {
      this.setState({
        uploadURL: response.uri
      })
     console.log(response)
   })
 }

/*
 uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const imagePath = uri;

    const imageRef = firebase
      .storage()
      .ref('images')
      .child('dp.jpg');
    let mime = 'image/jpg';
    alert('!!!!!!!!!!')
    imageRef
      .put(imagePath, { contentType: mime })
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then(resolve)
      .catch(reject);
  });
};*/


/*


  pushLocalNotification=(notiMsg)=>{
    PushNotification.localNotification({
      /* Android Only Properties */
    /*  id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    //  bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      //subText: "This is a subText", // (optional) default: none
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      importance: "high", // (optional) set notification importance, default: high
      /* iOS and Android properties */
  /*    title: " Notification", // (optional)
      message: notiMsg, // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
  });
  }*/