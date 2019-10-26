import * as types from './ActionTypes'
import firebase from 'react-native-firebase'


export const saveMessages= (messages,token)=>{
    //alert(JSON.stringify(messages))
    //const currentUser = token
    //console.log(currentUser)

    return (dispatch)=>{

        firebase.database().ref(`messages`)
        .push(messages).then((msg)=> { //kont b push([...messages]) m4 3rfa eh el fr2
            console.log('message Saved Successfully')
           // alert(msg)
           // console.log([...messages])
          // console.log('saved and start to retrieve')
                  }).catch((error)=> {
            console.log(error.message)
        })
        
    }
}



export const startFetchMessage = (token)=> {
    const currentUser = token
       return (dispatch)=> {
        dispatch({ type: types.START_FETCH_MESSAGES})
        console.log('fetching...')
        //console.log(msg)

        firebase.database().ref(`messages`)
       .on('value', (snapShot)=> {
           const messages = snapShot.val() || []
           console.log( messages)
           Object.values(messages).forEach(msg=> {
               const Chatdata = JSON.stringify(msg[0].text)
               console.log(Chatdata)
             //  dispatch(startFetchMessage(data ))
            // dispatch({ type: types.RETREVE_MESSAGES, payload:Chatdata})
           })

       })

       }
       
      /* firebase.database().ref(`messages/${currentUser.uid}/ownMessages`)
       .on('value', (snapShot)=> {
           setTimeout(()=>{
                const messages= snapShot.val() || []
                console.log(messages)
           },0)
       })*/
    
}