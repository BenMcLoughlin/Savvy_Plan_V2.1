import {combineReducers} from "redux"
//import authReducer from "./authReducer"
import {netWorthState} from "../Dashboard/NetWorth/reducers/netWorthReducers"
import incomePerYear_reducer from "../Dashboard/LifetimeIncome/reducers/incomePerYear_reducer"
import savings_reducer from "../Dashboard/LifetimeIncome/reducers/savings_reducer"
import keyVariables_reducer from "../Dashboard/LifetimeIncome/reducers/keyVariables_reducer"
import pensionStartAges_reducer from "../Dashboard/LifetimeIncome/reducers/pensionStartAges_reducer"


import taxVariables from "../Dashboard/Tax/reducers/taxVariables"

export default combineReducers({

 //   auth: authReducer,
    netWorthState,
    taxVariables,
    incomePerYear_reducer,
    keyVariables_reducer,
    pensionStartAges_reducer,
    savings_reducer

   
})


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// combines all reducers to create a global reducer which is then passed in the main index into the createStore function