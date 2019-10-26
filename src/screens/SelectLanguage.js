import React, {Component} from 'react'
import {View, StatusBar, Image, StyleSheet, AsyncStorage, NetInfo} from 'react-native'
import {connect} from 'react-redux'
import { Navigation } from 'react-native-navigation';
import {changeLanguage} from '../actions/SelectLanguageAction'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Button} from 'native-base'
import Header from '../common/Header'
import AppText from '../common/AppText'
import Strings from '../assets/Strings'

class SelectLanguage extends Component {

    constructor(props) {
        super(props)
        this.state={
            active: false
        }
    }
    componentDidMount() {
     //   this.checkConnection()
    }

   // checkConnection() {
        /* NetInfo.isConnected.fetch().then(isConnected => {
             if (isConnected) {
                 try {
                     RNToasty.Success({title: 'active now'})
                     //this.setState({active: true})
                     this.props.checkConnection(true)
                     console.log('status'+ this.props.status)
                 } catch (e) {
                    RNToasty.Warn({title:'inactive check connection'})
                    this.props.checkConnection(false)
                    console.log('status'+ this.props.status)
                 }
             }else{
                 RNToasty.Warn({title:'inactive check connection'})
                 this.props.checkConnection(false)
                 console.log('status'+ this.props.status)
             }
         });*/
 /*
         NetInfo.isConnected.fetch().then(isConnected => {
             console.log('First, is ' + (isConnected ? 'online' : 'offline'));
             if(isConnected ) {
                 this.setState({active: true})
                    AsyncStorage.setItem('@userStatus', this.state.active)
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
       }*/
 
    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden />
                <Header headerText={Strings.selectLanguage} height={hp(9)} LangIcon leftComponent />
                <View style={{alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                
                <Image source={require('../assets/imgs/chat.png')} style={styles.img}/>
                <Button style={styles.Ebtn}
                    onPress={()=> {
                        this.props.changeLanguage(false)
                        console.log('lang: ' + this.props.isRtl)
                        Strings.setLanguage('en')
                        AsyncStorage.setItem('@lang', 'en')
                        Navigation.push('AppStack', {
                            component: {
                                name:'Login',
                                options: {
                                    topBar:{
                                        visible: false,
                                        drawBehind: true
                                    }
                                },
                               
                               
                            }
                        })
                    }}
                >
                    <AppText text='English' color='white' fontSize={wp(4)} marginHorizontal={wp(19.5)} marginVertical={hp(0.5)}/>
                </Button>

                <Button style={styles.Abtn}
                      onPress={()=> {
                        this.props.changeLanguage(true)
                        console.log('lang: ' + this.props.isRtl)
                        Strings.setLanguage('ar')
                        AsyncStorage.setItem('@lang', 'ar')
                        Navigation.push('AppStack', {
                            component: {
                                name:'Login',
                                options: {
                                    topBar:{
                                        visible: false,
                                        drawBehind: true
                                    }
                                },
                                passProps: {
                                    status: this.state.active
                                }
                               
                            }
                        })

                    }}   
                >
                    <AppText text='العربية' color='white' fontSize={wp(5)} marginHorizontal={wp(20)} marginVertical={hp(0.5)}/>
                </Button>
                </View>
            </View>    
        )
    }
}


const mapStateToProps = state=> ({
    isRtl: state.lang.isRtl
})
const mapDispatchToProps = {
    changeLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage)


const styles= StyleSheet.create({
    container: {
        flex:1,
       // justifyContent:'center',
       // alignItems:'center',
        backgroundColor:'white'
    },
    Ebtn: {
        backgroundColor: 'orange',
        width: wp(55),
        height: hp(8),
        borderRadius:wp(40),
        elevation:2,
        
    },
    Abtn: {
        backgroundColor: 'lightgray',
        width: wp(55),
        height: hp(8),
        borderRadius:wp(40),
        marginTop:hp(5),
        elevation:2
    },
    img: {
        width:wp(40),
        height:hp(20),
        marginVertical:hp(10)
    }
   
})