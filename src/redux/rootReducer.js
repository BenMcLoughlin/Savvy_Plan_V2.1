import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import {combineReducers} from "redux"

import incomePerYear_reducer from "./incomePerYear/incomePerYear_reducer"
import pensionStartAges_reducer from "./pensionStartAges/pensionStartAges_reducer"
import user_reducer from "./user/user_reducer"
import netWorth_reducer from "./netWorth/netWorth_reducer"
import tax_reducer from "./tax/tax_reducer"
import savings_reducer from "./savings/savings_reducer"


const persistConfig = {
    key: "root",
    storage, 
    whitelist: ["netWorth_reducer", 
    "tax_reducer",
    "incomePerYear_reducer",
    "user_reducer",
    "pensionStartAges_reducer",
    "savings_reducer",
]
}

const rootReducer = combineReducers({

       netWorth_reducer,
       tax_reducer,
       incomePerYear_reducer,
       user_reducer,
       pensionStartAges_reducer,
       savings_reducer,      
   })

export default persistReducer(persistConfig, rootReducer)


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// combines all reducers to create a global reducer which is then passed in the main index into the createStore function