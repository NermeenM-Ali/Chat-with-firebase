import * as types from '../actions/ActionTypes'

const initialState = {
    isLoading: false,
    msg:[]
}



const MessagesReducer = (state=initialState, action)=> {
    switch(action.type) {
        case types.START_FETCH_MESSAGES:
           // console.log(state.msg)
            return {...state, isLoading: true}
        case types.RECIEVE_MESSAGE: 
            return {...state, isLoading: false}   
        case types.RETREVE_MESSAGES:
            return {...state, msg: [...state.msg, action.payload]}    
        default:
            return state     
    }
}

export default MessagesReducer