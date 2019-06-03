import {combineReducers} from "redux"
import {timelineRanges, financialsRanges, investingStrategyRanges} from "./infoRanges"

const age = (age = 60, action) => {
    switch (action.type) {
        case  "SET_AGE": return action.payload
        break;
        default: return age
    }
}





export default combineReducers({
    age: age,
    timelineRanges: timelineRanges,
    financialsRanges: financialsRanges,
    investingStrategyRanges: investingStrategyRanges
})


