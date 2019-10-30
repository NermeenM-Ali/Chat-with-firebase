import React, {Component} from 'react'
import {View, StatusBar, Picker, TouchableOpacity,Keyboard, NetInfo} from 'react-native'
import {Field, reduxForm} from 'redux-form'
import { Navigation } from 'react-native-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Button, Thumbnail, Icon, Badge} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';
import { RNToasty } from 'react-native-toasty'
import {changeLanguage} from '../actions/SelectLanguageAction'
import {startFetchMessage} from '../actions/MessagesAction'
import {nameChanged, genderChanged, imageChanged, completed, login, checkConnection} from '../actions/AuthAction'
import {connect} from 'react-redux'
import AppText from '../common/AppText'
import AppInput from '../common/AppInput'
import Strings from '../assets/Strings'
import Header from '../common/Header';
import firebase from 'react-native-firebase';


const validate = values => {
    const errors = {};

    const name = values.name

    if (name == null) {
        errors.name = Strings.require;
    }

    return errors;
};



class InputComponent extends Component {
    render() {
        const {
            inputRef,returnKeyType,onSubmit,onChangeText,input,label,borderColor,
            type,password, numeric,textColor,icon,iconType,marginBottom,labelColor,
            isRTL,iconColor,editable,isRequired,meta: { touched, error, warning },
        } = this.props;

        let hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <AppInput
                onEndEditing={() => input.onBlur(input.value)}
                onBlur={() => input.onBlur(input.value)}
                onChangeText={onChangeText}
                ref={inputRef}
                icon={icon}
                iconType={iconType}
                textColor={textColor}
                marginBottom={marginBottom}
                hasError={hasError && touched}
                error={error}
                input={input}
                label={label}
                labelColor= {labelColor}
                type={type}
                isRTL={this.props.isRtl}
                password={password}
                numeric={numeric}
                editable={editable}
                borderColor={borderColor}
                iconColor={iconColor}
                onSubmit={onSubmit}
                blurOnSubmit={false}
                returnKeyType={returnKeyType}
                isRequired={isRequired}
            />
        );
    }

}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state= {
            img:'https://placeimg.com/140/140/any',
            selectedImage: null,
            name: '',
           // gender: '',
            active: false,
            uid: null,
            selecting: false
            
        }
    }

    componentDidMount() {
       this.checkConnection()
    }


    checkConnection() {

        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            if(isConnected ) {
                this.setState({active: true})
               // AsyncStorage.setItem('@userStatus', this.state.active)
                RNToasty.Success({title:'Active'})
            }else {
                this.setState({active: false})
                RNToasty.Warn({title:'Inactive check Connection and login again'})
            }
          });

           handleFirstConnectivityChange=(isConnected)=> {
            console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
            if(!isConnected) {
                RNToasty.Warn({title:'Inactive check Connection and login again'})
            }else{
                this.setState({active: true})
                RNToasty.Success({title:'Active'})
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

    openGallery=()=> {
        ImagePicker.openPicker({
            width: wp(30),
            height: hp(18),
            cropping: true
          }).then(image => {
            this.setState({
                selectedImage: image.path
            })
            this.props.imageChanged(image.path)
            //alert('done')
          });
    }

    renderContent=()=> {
        return(
            
              <View style={{flex:1,  marginTop:hp(7)}}>
                  <View style={{width:wp(80), alignSelf:'center',}}>
                    <Field
                            name='name' label={Strings.Name} component={InputComponent}
                            returnKeyType='done'
                            onSubmit={()=> {Keyboard.dismiss()
                               // alert(this.state.name)
                            }}
                            inputRef={el => this.nameField = el }
                            isRTL={this.props.isRtl}
                            labelColor='gray'
                            borderColor= 'gray'
                            onChangeText={(name)=> {this.props.nameChanged(name)
                                                this.setState({name})
                                                //alert(this.state.name)
                            }}
                        />    
                   
                </View>

            </View>
        )
    }

    onStartChatPressed(values){
       this.props.completed(values.name, this.state.selecting? this.state.selectedImage : this.state.img, this.props.userToken, this.state.active)
       this.props.startFetchMessage(this.props.userToken)

       values.name = ''
       this.setState({
        img: null,
        
    })
       
    }



    renderButton=()=>{
       const { handleSubmit } = this.props
       return(
        <View style={{flex:1,marginTop:hp(-8)}}>
       
            <Button onPress={
                 handleSubmit(this.onStartChatPressed.bind(this))
                
            }
            transparent rounded style={{width:wp(65), height: hp(7), borderWidth:wp(0.3), borderColor: 'orange', alignSelf:'center', }}>
              <AppText text={Strings.startChat} fontSize={wp(3.5)} marginHorizontal={wp(22)} color='orange' />
            </Button>
        
     </View>
       )
    }
    render() {
        return(
             <View style={{flex:1, backgroundColor:'white'}}>
                <StatusBar hidden/>
                <Header headerText={Strings.login} height={hp(9)} userIcon leftComponent/>
                <View style={{width: wp(80), height: hp(25),marginTop:hp(7), backgroundColor:'white' , alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                            
                   <TouchableOpacity onPress={()=> {this.openGallery()
                                                   this.setState({selecting: true})                     
                                                }}
                             style={{height:hp(18), width:wp(30), borderRadius:wp(20), backgroundColor:'white', borderWidth:wp(0.2), borderColor:'orange'}}>
                              
                       {
                           this.state.selecting? 
                           <Thumbnail large style={{height:hp(18), width:wp(30), borderRadius:wp(20)}}
                              source={{uri:this.state.selectedImage}}
                            />
                            : 
                            <Thumbnail large style={{height:hp(18), width:wp(30), borderRadius:wp(20)}}
                                 source={{uri: this.state.img}}
                            />
                       }
                   </TouchableOpacity> 
                   <Badge  style={{marginLeft:hp(28),width:wp(8),backgroundColor:'orange' ,borderRadius:wp(5),height:hp(5), marginTop:hp(-5), alignItems:'center', justifyContent:'center'}}>
                           <Icon name='ios-camera' type='Ionicons' style={{color:'white'}}/>
                    </Badge>  

                   
                               
                </View> 
   
                {this.renderContent()}
                {this.renderButton()}  
             </View>   
        )
    }
}

const form = reduxForm({
    form:'LOGIN',
    validate
})(Login)

const mapStateToProps= state=> ({
    isRtl: state.lang.isRtl,
    userImg: state.auth.userImage,
    userGender: state.auth.gender,
    userName: state.auth.userName,
    loading: state.auth.loading,
    userToken: state.auth.userToken,
  //  status: state.auth.status
})

const mapDispatchToProps ={
    changeLanguage,
    nameChanged,
    genderChanged,
    imageChanged,
    completed,
    login,
    checkConnection,
    startFetchMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(form)


/*
 this.props.completed()
                /* this.setState({
                     img: null,
                     name:'',
                //     gender:''
                 })*/
               /*  Navigation.push('AppStack', {
                    component: {
                        name:'App',
                        passProps:{
                            user: this.props.userName,
                            image: this.props.userImg
                        },
                        options: {
                            topBar: {
                                visible: false,
                                drawBehind: true
                            },
                            statusBar: {
                                visible: true,
                                style: 'light'
                            }
                        }
                       
                    }
                })*/