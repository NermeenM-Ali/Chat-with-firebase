import React, {Component} from 'react'
import {PushNotificationIOS} from 'react-native'
import { Navigation } from 'react-native-navigation'
import PushNotification from 'react-native-push-notification'
import { Provider } from "react-redux"
import firebase from 'react-native-firebase'
import store from '../store'
import Login from './Login'
import App from './App'
import SelectLanguage from './SelectLanguage'
import Splash from './Splash'




var firebaseConfig = {
    apiKey: "AIzaSyCg6U6QLCZxWr41GtEG7t2DgiVE0Lk-fOU",
    authDomain: "rnchat-ac6bd.firebaseapp.com",
    databaseURL: "https://rnchat-ac6bd.firebaseio.com",
    projectId: "rnchat-ac6bd",
    storageBucket: "rnchat-ac6bd.appspot.com",
    messagingSenderId: "286726938135",
    appId: "1:286726938135:web:cb63b9a272628429bac652",
    measurementId: "G-FDNEG1TBBJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  

// HOC 
function reduxStoreWrapper (MyComponent, store) {
        return (props)=> {
            return (
                <Provider store={store}>
                    <MyComponent {...props} />
                </Provider>
            );
        }
}

export function registerScreens(){
    Navigation.registerComponent('Splash', ()=> reduxStoreWrapper(Splash, store))
    Navigation.registerComponent('App', ()=> reduxStoreWrapper(App, store))
    Navigation.registerComponent('Login', ()=> reduxStoreWrapper(Login, store))
    Navigation.registerComponent('SelectLanguage', ()=> reduxStoreWrapper(SelectLanguage, store))
 
}

