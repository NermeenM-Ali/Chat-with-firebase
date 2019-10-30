import * as types from './ActionTypes'
import {AsyncStorage, NetInfo} from 'react-native'
import firebase from 'react-native-firebase'
import { RNToasty } from 'react-native-toasty'
import { Navigation } from 'react-native-navigation';
import Strings from '../assets/Strings';




export const userToken = (token)=> {
    return (dispatch)=>{
        dispatch({ type: types.USER_TOKEN, payload: token})
       // firebase.database().ref('tokens').push(token).once('value')
        //.then((res)=>{/*alert('token saved successfully')*/})
        //.catch((err)=> {alert("err:" + err.message)})
    }
}


export const currentUser = (user)=> {
    return (dispatch)=>{
        dispatch({ type: types.CURRENT_USER, payload: user})
    }
}


export const nameChanged = (name)=> {
    return (dispatch)=> {
        dispatch({ type: types.NAME_CHANGED, payload: name})
        
    }
}


export const genderChanged = ({gender})=> {
    return (dispatch)=> {
        dispatch({ type: types.GENDER_CHANGED, payload: {gender}})
    }
}


export const imageChanged = (image)=> {
    return (dispatch)=> {
        dispatch({ type: types.IMAGE_CHANGED, payload: image})
        
    }
}

export const completed = (name, image, token, status)=> {
     AsyncStorage.setItem('@userName', name)
     AsyncStorage.setItem('@userImage', image)
     AsyncStorage.setItem('@userToken', token)
     AsyncStorage.setItem('@userStatus', status)
    //alert(status)
    return (dispatch)=> {
            dispatch({type: types.COMPLETED, payload: status})
            RNToasty.Success({title:'success'})
            console.log('Data Saved Suucessfully')
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
                        status: status
                    }
                }
            })
        } 
}


export const checkConnection = (change)=> {
    return (dispatch)=> {
       dispatch({type: types.CHECK_CONNECTION, payload: change})
    }
}

export const Reset = ()=> {
    return (dispatch)=> {
        dispatch({type: types.RESET})
    }
}


export const logOut = ()=> {
    return (dispatch)=> {
        dispatch({type: types.LOGOUT})
    }
}

































/*
export const saveData = ({gender, name, image})=> {
  //  const currentUser = firebase.auth()
    return (dispatch)=> {
       
        firebase.database().ref(`/users/chatUser`)
        .push({gender, name})
        .then(()=> {
            dispatch({ type: types.SAVE_DATA, payload: {gender, name, image}})
            
        }).then(()=>{
           // saveSuccess(dispatch)
        })
        .catch((error)=>{
            saveFailed(dispatch)
            RNToasty.Error({title:error.message})
            
        })
    }
}


export const saveSuccess = (dispatch)=> {

        dispatch({type: types.SAVING_SUCCESS})
        RNToasty.Success({title:'Success'})
        Navigation.push('AppStack', {
            component: {
                name:'App',
                
            }
        })
    
}

export const saveFailed = (dispatch)=> {

        dispatch({type: types.SAVING_FAILED})
        RNToasty.Error({title: 'fail'})

}
*/
