import _ from "lodash"



const initialState = {
    assets: {
        Id1000000: {
            type: "property",
            financialValue: 10000, 
            label: "Primary Residence",
            id: "Id1000000",
            rangeBarValue: 0, 
            registration: "none", 
            category: "assets"
        },
        Id10000234: {
            type: "property",
            financialValue: 10000, 
            label: "Playa ",
            id: "Id10000234",
            rangeBarValue: 0, 
            registration: "none", 
            category: "assets"
        },
        Id1000001: {
            type: "cash",
            financialValue: 10000, 
            label: "Checking Account",
            id: "Id1000001",
            rangeBarValue: 0, 
            registration: "none", 
            category: "assets"
        },
        Id1000007: {
            type: "investments",
            financialValue: 10000, 
            label: "Tax Free Savings Account",
            id: "Id1000007",
            rangeBarValue: 0, 
            registration: "tfsa", 
            category: "assets"
        },
        Id1000007: {
            type: "investments",
            financialValue: 10000, 
            label: "RRSP Investments",
            id: "Id1000007",
            rangeBarValue: 0, 
            registration: "rrsp", 
            category: "assets"
        },
    },
    liabilities: {
        Id1000003: {
            type: "longTerm",
            financialValue: 15000, 
            label: "Primary Residence",
            id: "Id1000003",
            rangeBarValue: 0, 
            category: "liabilities"
        },
        Id1000004: {
            type: "shortTerm",
            financialValue: 0, 
            label: "Primary Residence",
            id: "Id1000004",
            rangeBarValue: 0, 
            category: "liabilities"
        },
        Id1000004: {
            type: "other",
            financialValue: 0, 
            label: "Primary Residence",
            id: "Id1000004",
            rangeBarValue: 0, 
            category: "liabilities"
        },

    },

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
        console.log(action.payload);
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