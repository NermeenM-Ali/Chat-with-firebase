import * as types from '../actions/ActionTypes'

const initialState= {
    gender: '',
    userName: '',
    error: '',
    userImage: null,
    loading: false,
    userToken: null,
    currentUser: null,
    status: false
}

const AuthReducer = (state = initialState, action)=> {
    switch(action.type) {
          case types.USER_TOKEN:
             return {...state, userToken: action.payload}
          case types.CURRENT_USER:
           //   console.log( 'user State' + state.currentUser)
              return {...state, currentUser: action.payload}  
          case types.IMAGE_CHANGED:
              return {...state, userImage: action.payload, loading: true}
          case types.GENDER_CHANGED:
              return {...state, gender: action.payload.gender, loading: true}
          case types.NAME_CHANGED:
              return {...state, userName: action.payload, loading: true}
          case types.CHECK_CONNECTION:
              return {...state, status: action.payload}    
          case types.COMPLETED:
              return {...state, status: action.payload}    
          case types.LOGOUT:
              return {...state, userToken:null, userName:'', userImage: null}    
          default:
              return state              
    }
}

export default AuthReducer