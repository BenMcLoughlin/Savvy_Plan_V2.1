import {combineReducers} from "redux"
//import authReducer from "./authReducer"
import {netWorthState} from "../Dashboard/NetWorth/reducers/netWorthReducers"
import incomePerYear_reducer from "../Dashboard/LifetimeIncome/reducers/incomePerYear_reducer"
import keyVariables_reducer from "../Dashboard/LifetimeIncome/reducers/keyVariables_reducer"
import pensionStartAges_reducer from "../Dashboard/LifetimeIncome/reducers/pensionStartAges_reducer"
import savingsPerYear_reducer from "../Dashboard/SavingsPlan/reducers/savingsPerYear_reducer"
import taxVariables_reducer from "../Dashboard/Tax/reducers/taxVariables_reducer"
import investmentReturns_reducer from "../Dashboard/SavingsPlan/reducers/investmentReturns_reducer"
import withdrawals_reducer from "../Dashboard/SavingsPlan/reducers/withdrawals_reducer"

export default combineReducers({

 //   auth: authReducer,
    netWorthState,
    taxVariables_reducer,
    incomePerYear_reducer,
    keyVariables_reducer,
    pensionStartAges_reducer,
    savingsPerYear_reducer,
    investmentReturns_reducer,
    withdrawals_reducer
   
})


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// combines all reducers to create a global reducer which is then passed in the main index into the createStore function