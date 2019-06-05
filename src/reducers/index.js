import {combineReducers} from "redux"
import {timelineRanges, financialsRanges, investingStrategyRanges} from "./infoRanges"
import {IncomeRangesReducer} from "./TaxReducers"

const age = (age = 20, action) => {
    switch (action.type) {
        case  "SET_AGE": return action.payload
        break;
        default: return age
    }
}





export default combineReducers({
    age: age,
    IncomeRanges: IncomeRangesReducer,
    timelineRanges: timelineRanges,
    financialsRanges: financialsRanges,
    investingStrategyRanges: investingStrategyRanges
})


