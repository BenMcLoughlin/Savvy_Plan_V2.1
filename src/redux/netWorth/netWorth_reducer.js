import _ from "lodash"


const initialState = { 
    TFSA: {
        color:  "#8CB8B7",
        age1: 65,
        reg: "TFSA",
        taxable: false, 
        stream: "TFSA Current Value",
        age2: 96,
        id: "TFSA",
        type: "asset",
        value: 0,
    },
    RRSP: {
        color:  "#8CB8B7",
        age1: 65,
        reg: "RRSP",
        taxable: false, 
        stream: "RRSP Current Value",
        age2: 96,
        id: "RRSP",
        type: "asset",
        value: 0,
    },
    Other: {
        color:  "#8CB8B7",
        age1: 65,
        reg: "Other",
        taxable: false, 
        stream: "TOtherCurrent Value",
        age2: 96,
        id: "Other",
        type: "asset",
        value: 0,
    },
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