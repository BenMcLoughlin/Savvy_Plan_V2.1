import {combineReducers} from "redux"
import {tilePaneReducer} from "./tilePaneReducers"
//import authReducer from "./authReducer"
import {netWorthState} from "../Dashboard/NetWorth/reducers/netWorthReducers"
import lifetimeIncomeYearList from "../Dashboard/LifetimeIncome/reducers/lifetimeIncomeYearList"
import lifetimeIncomeVariables from "../Dashboard/LifetimeIncome/reducers/lifetimeIncomeVariables"
import taxVariables from "../Dashboard/Tax/reducers/taxVariables"

export default combineReducers({

    tilePaneData: tilePaneReducer,
 //   auth: authReducer,
    netWorthState,
    lifetimeIncomeYearList,
    lifetimeIncomeVariables,
    taxVariables,
   
})


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// combines all reducers to create a global reducer which is then passed in the main index into the createStore function
