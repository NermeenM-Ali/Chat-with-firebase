import * as types from '../actions/ActionTypes'

const initialState = {
    isRtl: false
}

const ChangeLanguageReducer = (state= initialState, action)=> {
    switch(action.type) {
        case types.CHANGE_LANGUAGE: 
            return {...state, isRtl: action.payload}
        default:
            return state    
    }
}

export default ChangeLanguageReducer