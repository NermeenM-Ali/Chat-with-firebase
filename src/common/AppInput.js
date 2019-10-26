import React, { Component } from 'react';
import { Item, Input, Icon, Text,Label } from 'native-base';
import { Platform, View, TextInput } from 'react-native';
import CustomIcon from "react-native-vector-icons/Foundation";
import AppText from './AppText';
//import * as Colors from '../assets/colors';
import { moderateScale } from '../utils/responsiveDimensions';
import { widthPercentageToDP  as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = {
  label: {
    fontSize: 15,
    color: '#73231F20',
    //fontWeight: 'bold',
    writingDirection: 'ltr',
    textAlign: 'left',
    marginTop: 8,
  },
  input: {
    fontFamily: Platform.OS == 'ios' ? 'Droid Arabic Kufi' : 'droidkufi',
    //writingDirection: 'rtl',
    fontSize: 17,
    textAlign: 'right',
    borderColor: 'black',
  },
};

class AppInput extends Component {

  constructor(props) {
    super(props);
    this.inputRef = null;
  }

  focus = () => {
    if (this.inputRef._root) {
      this.inputRef._root.focus();
    }
  };
  render() {
    const {
      inputRef,
      autoFocus,
      onBlur,
      onSubmit,
      input,
      label,
      type,
      marginBottom,
      marginTop,
      password,
      error,
      hasError,
      icon,
      iconType,
      numeric,
      email,
      textColor,
      borderColor,
      iconColor,
      editable,
      blurOnSubmit,
      isRequired,
      returnKeyType,
      multiline,
      numberOfLines,
      isRTL,
      //add
      onChangeText,
      hiddenUnderLine,
      noFloating,
      labelColor,
    } = this.props;
    console.log('is require' + isRTL)
    return (
      <View style={{alignSelf: 'stretch', marginBottom: marginBottom || 0, marginTop: marginTop || 0, }}>
         
          <Item
           //add noFloating
           floatingLabel={noFloating?false:true}
           style={{ flexDirection: isRTL ?'row-reverse':'row' , borderBottomColor: hiddenUnderLine? 'transparent': borderColor || 'gray' ,borderWidth:1, paddingBottom: 4}} icon
           error={hasError}  
          >
       {/* {isRequired && <CustomIcon name="asterisk" size={12} color={hasError ? "red" : "black"} />} */}
    
              <Label  style={[styles.label,{writingDirection: isRTL? 'rtl' : 'ltr',textAlign:isRTL? 'right' : 'left',color:labelColor || 'black', fontSize:wp(4),fontWeight:'400' }]}  >{label}</Label>
              <Input        
            ref={ref => this.inputRef = ref}
            returnKeyType={returnKeyType}
            blurOnSubmit={blurOnSubmit}
            onEndEditing={onBlur}
            onBlur={onBlur}
            multiline={multiline}
            onChangeText={onChangeText}
            numberOfLines={numberOfLines}
            {...input}
            style={{ ...styles.input, textAlign: isRTL ? 'right' : 'left', color:'black', marginHorizontal: 5, marginVertical:hp(1) }}
            // placeholder={label}
            editable={editable}
            placeholderTextColor={textColor || 'black'}
            secureTextEntry={password}
            keyboardType={numeric ? 'phone-pad' : email ? 'email-address' : 'default'}
            onSubmitEditing={onSubmit}
          />
            </Item>
          
        {hasError ? (
          <AppText  text={error} color="red" textAlign={isRTL ?'left': 'right'} fontSize={12} />
          ) : (<AppText text="" />)}
      </View>
    );
  }
}




export default AppInput;
