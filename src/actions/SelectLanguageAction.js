import * as types from './ActionTypes'

export const changeLanguage = (change)=> {
    return (dispatch)=> {
        dispatch({
            type: types.CHANGE_LANGUAGE,
            payload: change
        })
    }
}