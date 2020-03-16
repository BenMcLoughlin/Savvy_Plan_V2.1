import _ from "lodash"


const initialState = { 

}

 const netWorth_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "netWorth_reducer/ADD": return {...state, [action.payload.id]: action.payload}
        case "netWorth_reducer/DELETE": return _.omit(state, [action.id])
        case "netWorth_reducer/SET_KEY_VALUE": return {...state, [action.key]: action.value}                            //sets a simple key value pair within the reducer object
        case "netWorth_reducer/SET_VALUE": return {...state, [action.id]: {                                             //creates a copy of state and enters the object with the correct id
                                                            ...state[action.id], value: {                               //creates a copy of the object with that id and enters the value object
                                                                    ...state[action.id].value,                          //creates a copy of the value object
                                                                    financialValue: action.financialValue,              //sets the financialValue with the new value
                                                                    rangeBarValue: action.rangeBarValue,                //sets the rangeBar value             
                                                            }
        }}
        case "netWorth_reducer/SET_NESTED_KEY_VALUE": return {...state, [action.parentKey]: {
                                                                        ...state[action.parentKey], 
                                                                        [action.childKey]: action.value
}}    
        default: return state
    }
}

export default netWorth_reducer