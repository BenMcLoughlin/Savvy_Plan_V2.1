import {combineReducers} from "redux"
import {tilePaneReducer} from "./tilePaneReducers"
//import authReducer from "./authReducer"
import {netWorthState} from "../Dashboard/NetWorth/reducers/netWorthReducers"
import lifetimeIncomeYearList from "../Dashboard/LifetimeIncome/reducers/lifetimeIncomeYearList"
import incomePerYear from "../Dashboard/Spending/reducers/incomePerYear"
import savings_reducer from "../Dashboard/Spending/reducers/savings_reducer"
import keyVariables from "../Dashboard/Spending/reducers/keyVariables"
import pensionStartAges from "../Dashboard/Spending/reducers/pensionStartAges"

import lifetimeIncomeVariables from "../Dashboard/LifetimeIncome/reducers/lifetimeIncomeVariables"
import taxVariables from "../Dashboard/Tax/reducers/taxVariables"

export default combineReducers({

    tilePaneData: tilePaneReducer,
 //   auth: authReducer,
    netWorthState,
    lifetimeIncomeYearList,
    lifetimeIncomeVariables,
    taxVariables,
    incomePerYear,
    keyVariables,
    pensionStartAges,
    savings_reducer

   
})


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// combines all reducers to create a global reducer which is then passed in the main index into the createStore function