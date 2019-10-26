import React, {Component} from 'react'
import {Text, View, StatusBar, StyleSheet, Platform, NetInfo} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as color from '../assets/colors'
import {Icon, Button, Badge, Thumbnail} from 'native-base'
import { moderateScale, responsiveWidth, responsiveHeight, responsiveFontSize } from '../utils/responsiveDimensions';
import { connect } from 'react-redux'
import AppText from '../common/AppText'
import { Navigation } from 'react-native-navigation'
import {logOut} from '../actions/AuthAction'
import Strings from '../assets/Strings'

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

class Header extends Component {
    constructor(props) {
        super(props)
        this.state={
       //   active: true
        }
    }

   /* componentDidMount() {
      this.checkConnection()
    }
*/
/*
  checkConnection=()=> {
    NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
              RNToasty.Success({title:'active'})
              this.setState({
                active: true
              })

            }else{
              RNToasty.Error({title:'inactive'})
            
            }
        }
      )
  }*/
  

    render() {
     // alert(this.props.status)
     // this.checkConnection()
   //   alert(this.state.active)
        const {textStyle, viewStyle} = styles
        const {headerText, showMenu, userIcon,LangIcon,backAction,height,marginHorizontal, alignSelf,headerStatus,showImage,centerComponent, leftComponent, rightComponent, showNotifications} = this.props
        return (
            <View style={{ ...styles.header,height: height || hp(14) ,backgroundColor: 'white', flexDirection: this.props.isRtl ? 'row' : 'row-reverse', }}>
               
                <View style={{ marginHorizontal:marginHorizontal || moderateScale(4), justifyContent:'center',alignItems:'center',flexDirection: this.props.isRtl ? 'row' : 'row-reverse' }} >
                    {
                        backAction&& rightComponent ?
                        <Button transparent  onPress={()=> {
                          Navigation.pop('AppStack')
                        }}>
                             <Icon name={this.props.isRtl ? "md-arrow-round-forward" : "md-arrow-round-back"} type='Ionicons' style={styles.icon} />
                        </Button>
                       
                        :
                        <AppText text='' style={{width:0, height:0}}/>
                    }

                    

                    {
                        showNotifications && rightComponent?
                        <Button transparent onPress={()=> alert('holla')}  >
                           <Icon name='ios-notifications' type='Ionicons' style={{...styles.icon, marginRight:wp(-1), marginLeft:wp(-1)}} />
                                <Badge style={{ backgroundColor: 'white' }}>
                                   <Text style={{ color: color.primaryColor }}></Text>
                                    </Badge>
                              </Button>
                        :
                        <AppText text='' style={{width:0, height:0}}/>
                    }

                  {
                   LangIcon && rightComponent?
                   
                      <Icon name='g-translate' type='MaterialIcons' style={styles.icon} />
                  :
                  <AppText text='' style={{width:0, height:0}}/>
                 }


                </View>

 
               
                <View style={{ ...styles.centerContainer, justifyContent: this.props.isRtl ? 'flex-end' : 'flex-start' }}>
                    
                    <View style={{flexDirection: this.props.isRtl? 'row-reverse':'row'}}>
                      {
                        showImage &&centerComponent?
                        <Thumbnail source={{uri: this.props.headerImage}} large style={{alignSelf:'center', marginHorizontal:wp(1)}}/>
                        :
                          <AppText text='' style={{width:0, height:0}}/>
                      }
                    <View style={{alignSelf:'center', matginHorizontal:wp(1)}}>
                      <Text style={styles.textStyle}
                                    >{headerText}</Text>
                      {
                         headerStatus?
                         
                          <View style={{ height:hp(4)}}>
                              {
                                this.props.isRtl?
                                <View style={{alignItems:'center',justifyContent:'center' ,flexDirection:'row', marginLeft:wp(9)}}>
                                  <Text style={{color:'green', alignSelf:'center'}}>{Strings.active}</Text>
                                  <Icon name= 'primitive-dot' type='Octicons'  style={{color:'green', fontWeight:'500', fontSize:wp(4), marginHorizontal:wp(1.5)}}/>
                              
                                </View>
                                
                                : 
                                <View style={{flexDirection:'row'}}>
                                  <Icon name= 'primitive-dot' type='Octicons'  style={{color:'green', fontWeight:'500', fontSize:wp(4), marginHorizontal:wp(2), marginTop:hp(0.5)}}/>
                                  <Text style={{color:'green', alignSelf:'center'}}>{Strings.active}</Text>
                                </View>
                               
                              }
                          </View>
                        :
                        null
                       
                      }
                    </View>
                    </View>
                    
                   
                   
                </View> 

                <View style={{ ...styles.rightContainer, alignItems: 'center', justifyContent: 'center', flexDirection: this.props.isRtl ? 'row' : 'row-reverse'}}>
                    {
                        showMenu ?
                        <Button transparent onPress={()=>{
                                                this.props.logOut()
                                               // Navigation.popToRoot('AppStack')
                                                        }}>
                              <Icon name='ios-menu' type='Ionicons' style={styles.icon} />  
                        </Button>
                        
                        :
                        <AppText text=''/>
                    }
                   
                    {
                        backAction &&leftComponent?
                        <Button transparent onPress={()=> {
                          Navigation.pop('AppStack')
                        
                        }}>
                            <Icon name={this.props.isRtl ? "md-arrow-round-forward" : "md-arrow-round-back"} type='Ionicons' style={styles.icon} />
                        </Button>
                        :
                        <AppText text='' style={{width:0, height:0}}/>
                    }

                 {
                   LangIcon && leftComponent?
                   
                      <Icon name='g-translate' type='MaterialIcons' style={{color: 'orange',
                                                                            fontSize: responsiveFontSize(4)}} />
                  :
                  <AppText text='' style={{width:0, height:0}}/>
                 }

                  {
                   userIcon && leftComponent?
                   
                      <Icon name='user-plus' type='FontAwesome5' style={{color: 'orange',
                                                                            fontSize: responsiveFontSize(3)}} />
                  :
                  <AppText text='' style={{width:0, height:0}}/>
                 }  

                    
                </View>   
            </View>
        )
    }
}

const mapStateToProps  = state=> ({
    isRtl: state.lang.isRtl,
   // countNum: state.count.counter,
   status: state.auth.status
})

const mapDispatchToProps = {
  logOut
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: 'white',
        //justifyContent: 'center',
        //alignItems: 'center',
        height: hp(10),
        padding:hp(2),
        shadowColor:'#000',
        shadowOffset: {width:0, height: 5},
        shadowOpacity: 0.9,
        elevation: 3,
        position: 'relative'
    },
    header: {
        paddingTop: STATUSBAR_HEIGHT,
        height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
          height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
        zIndex: 7000,
      
      },
    textStyle: {
        fontSize: wp(4.5),
        color:'gray',
        marginHorizontal: wp(2)
        
    },
    centerContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: Platform.OS == 'android' ? 'flex-end' : 'center',
        alignItems: 'center',
        marginHorizontal:wp(2.5)
      },
      
      rightContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal:wp(-4)
      },
      button: {
        marginHorizontal: 15,
      },
      icon: {
        color: 'gray',
        fontSize: responsiveFontSize(3.2),
      },
      badge: {
        color: '#fff',
        fontSize: responsiveFontSize(4),
        marginTop:-13,
      },
      icon1: {
        color: 'black',
        fontSize: responsiveFontSize(3.2),
      },
      unseenCountPadge: {
        backgroundColor: '#DCC000',
        position: 'absolute',
        width: responsiveWidth(5),
        height: responsiveWidth(5),
        top: moderateScale(-3),
        right: moderateScale(-3),
        borderRadius: responsiveWidth(2.5),
        alignItems: 'center',
        justifyContent: 'center',
      },
      unseenCountPadgeText: {
        color: '#000',
        fontSize: responsiveFontSize(1.5),
        fontWeight: 'bold',
      },
})
