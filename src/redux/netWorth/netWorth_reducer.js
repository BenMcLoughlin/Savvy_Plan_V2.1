import _ from "lodash"



const initialState = {
    asset: {

    },
    liability: {
    }
}

const netWorth_reducer = (state = initialState, action)=> {

switch(action.type) {
    case "netWorth_reducer/SET_ITEM_VALUE": return {...state, [action.category]:{
                                                            ...state[action.category], [action.id]: {
                                                                ...state[action.category][action.id], 
                                                                        financialValue: action.financialValue,
                                                                        rangeBarValue: action.rangeBarValue,
                                                            }                        
    }
 
       }
    case "netWorth_reducer/CHANGE_LABEL": return {...state, [action.category]:{
                                                            ...state[action.category], [action.id]: {
                                                                ...state[action.category][action.id], 
                                                                        label: action.label,
                                                            }                        
    }
 
       }

    case "netWorth_reducer/ADD_ITEM": {
        return { ...state, [action.payload.category]:{
            ...state[action.payload.category], [action.payload.id]: action.payload }
}
    }

                                    
    case "netWorth_reducer/REMOVE_ITEM": return  { ...state, [action.category]:  _.omit(state[action.category], action.id)
                                    }
                                                                       
    default: return state
}
}

export default netWorth_reducer
 //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
 // holds the state of the Net Worth App. State is an object and it is changed using the spread operator
 // to create a new object and then key interpolation to input the specific name and position of the 
 // object being changed. 