import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import {combineReducers} from "redux"
import main_reducer from "redux/main/main_reducer"
import user_reducer from "./user/user_reducer"
import netWorth_reducer from "./netWorth/netWorth_reducer"
import assumptions_reducer from "./assumptions/assumptions_reducer"
import ui_reducer from "./ui/ui_reducer"
import auth_reducer from "./auth/auth_reducer"
import progress_reducer from "./progress/progress_reducer"

import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const persistConfig = {
    key: "root",
    storage, 
    whitelist: [
    "main_reducer",
    "user_reducer",
    "assumptions_reducer",
    "ui_reducer",
    "progress_reducer",
    "netWorth_reducer",
]
}

const rootReducer = combineReducers({
       auth: auth_reducer,
       assumptions_reducer, 
       ui_reducer, 
       main_reducer,
       user_reducer,    
       progress_reducer,
       netWorth_reducer,
       firebase: firebaseReducer, 
       firestore: firestoreReducer
   })

export default persistReducer(persistConfig, rootReducer)


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// combines all reducers to create a global reducer which is then passed in the main index into the createStore function