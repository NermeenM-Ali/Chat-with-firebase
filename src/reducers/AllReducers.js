import {combineReducers } from 'redux'
import { reducer as formReducer} from 'redux-form'
import TypingReducer from './TypingReducer'
import ChangeLanguageReducer from './ChangeLanguageReducer'
import AuthReducer from './AuthReducer'
import MessagesReducer from './MessagesReducer'

const AllReducers = combineReducers({
    form: formReducer,
    typing: TypingReducer,
    lang: ChangeLanguageReducer,
    auth: AuthReducer,
    messages: MessagesReducer
})

export default AllReducers