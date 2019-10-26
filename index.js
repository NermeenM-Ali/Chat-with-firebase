import {AppRegistry, YellowBox} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {registerScreens} from './src/screens'

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Warning: ...'])
//AppRegistry.registerComponent("Chat", () => App);

registerScreens()
Navigation.events().registerAppLaunchedListener(()=> {
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