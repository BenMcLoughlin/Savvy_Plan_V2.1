import _ from "lodash"



const initialState = {
    asset: {
        Id1000000: {
            subCategory: "property",
            financialValue: 10000, 
            label: "Primary Residence",
            id: "Id1000000",
            rangeBarValue: 0, 
            registration: "none", 
            category: "asset"
        },
        Id10000234: {
            subCategory: "property",
            financialValue: 10000, 
            label: "Playa ",
            id: "Id10000234",
            rangeBarValue: 0, 
            registration: "none", 
            category: "asset",
            mortgageId: 1, 
        },
        Id1000001: {
            subCategory: "cash",
            financialValue: 10000, 
            label: "Checking Account",
            id: "Id1000001",
            rangeBarValue: 0, 
            registration: "none", 
            category: "asset"
        },
        Id1000007: {
            subCategory: "investments",
            financialValue: 10000, 
            label: "Tax Free Savings Account",
            id: "Id1000007",
            rangeBarValue: 0, 
            registration: "tfsa", 
            category: "asset"
        },
        Id1000007: {
            subCategory: "investments",
            financialValue: 10000, 
            label: "RRSP Investments",
            id: "Id1000007",
            rangeBarValue: 0, 
            registration: "rrsp", 
            category: "asset"
        },
    },
    liability: {
        Id1000003: {
            subCategory: "longTerm",
            financialValue: 15000, 
            label: "Primary Residence",
            id: "Id1000003",
            rangeBarValue: 0, 
            debtType: "mortgage",
            category: "liability",
            registration: "", 
            interestRate: {
                rangeBarValue: 0,
                label: "Interest Rate",
            },
            payment: {
                rangeBarValue: 0,
                label: "Payment",
            },
            yearsRemaining: {
                rangeBarValue: 0,
                label: "Years Remaining",
            }
        },
        Id1000004: {
            subCategory: "shortTerm",
            financialValue: 0, 
            label: "Primary Residence",
            id: "Id1000004",
            rangeBarValue: 0, 
            category: "liability",
            registration: "", 
        },
        Id1000004: {
            subCategory: "other",
            financialValue: 0, 
            label: "Primary Residence",
            id: "Id1000004",
            rangeBarValue: 0, 
            category: "liability",
            registration: "", 
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