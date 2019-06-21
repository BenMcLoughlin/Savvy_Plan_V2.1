import {combineReducers} from "redux"
import {timelineRanges} from "./infoRanges"
import {initialState} from "./initialState"

const variablesReducer = (state = initialState, action) => {
    switch (action.type) {
        case  "SET_CURRENT_AGE": return {...state, currentAge: action.payload}
        case  "SET_RETIREMENT_AGE": return {...state, retirementAge: action.payload}
        case  "SET_LIFESPAN": return {...state, lifeSpan: action.payload}
        default: return state
    }

}





export default combineReducers({

    variables: variablesReducer, 
    timelineRanges: timelineRanges,
})


