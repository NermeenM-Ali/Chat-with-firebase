import * as types from './ActionTypes'


export const isTyping =(change)=> {
    return (dispatch)=> {
        dispatch({ type: types.IS_TYPING, payload: change})
    }
}