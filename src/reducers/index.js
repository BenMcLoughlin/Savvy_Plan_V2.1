import {combineReducers} from "redux"
import {timelineRanges} from "./infoRanges"
import {tilePaneReducer} from "./tilePaneReducers"
import { INITIAL_STATE } from "./initialState"
import authReducer from "./authReducer"

const variablesReducer = (state = INITIAL_STATE, action) => {
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
    tilePaneData: tilePaneReducer,
    auth: authReducer,
})


