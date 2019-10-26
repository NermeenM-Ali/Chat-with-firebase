import * as types from '../actions/ActionTypes'

const initialState={
    isTyping: false,
    loading: false

}

const TypingReducer = (state= initialState, action)=> {
 //   console.log (state.isTyping)
    switch(action.type) {
        case types.IS_TYPING:
             console.log (state.isTyping)
            return {...state, isTyping: action.payload}
        default:
            return state    
    }
}

export default TypingReducer