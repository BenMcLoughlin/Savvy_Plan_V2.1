import _ from "lodash"

// 30000: {
//     label: "Basic Personal Amount",
//     type: "credit",
//     line: 30000,
//     maxClaimable: 12069,
//     maxIncome: 10000,
// },
// 30100: {
//     label: "Age Amount",
//     type: "ageCredit",
//     line: 30100,
//     maxClaimable: 7494,
//     maxIncome: 87750,
// },
// 31260: {
//     label: "Employment Amount",
//     type: "credit",
//     line: 31260,
//     maxClaimable: 1222,
//     maxIncome: 87750,
// },

// 34900: {
//     label: "Donations",
//     type: "credit",
//     line: 34900,
//     maxClaimable: 10000,
//     maxIncome: 100000,
// },

const initialState = { 
    30000: {
            label: "Basic Personal Amount",
            type: "credit",
            id: 30000,
            maxClaimable: 12069,
            maxIncome: 10000,
            category: "basicPersonalAmount",    
            type: "credit",
            color: '#D8BABB',                                                                                 //Some forms of income might not be taxable such as inheritance
            fromAge: 18,
            toAge: 64,
            value: {                                                                                        //The value of the income being added
                rangeBarValue: 0,
                financialValue: 0,
                name: "value",
                label: "Annual Contribution",
            } 
    },
    20800: { 
        registration: "rrsp",
        label: "RRSP Contribution",    
        category: "rrsp",    
        type: "deduction",
        id: 20800,                                                                             //the label is editable by the user and is what is displayed 
        transaction: "contribution",                                                                                        //examples include "employment", "business", "pension"
        color: '#D8BABB',                                                                                 //Some forms of income might not be taxable such as inheritance
        fromAge: 18,
        toAge: 64,
        value: {                                                                                        //The value of the income being added
            rangeBarValue: 0,
            financialValue: 0,
            name: "value",
            label: "Annual Contribution",
        } 
     },
     34900: { 
        label: "Charitable Contribution",    
        category: "charitableContribution",    
        type: "credit",
        id: 34900,      
        color: '#D8BABB',                                                                                                                                                      
        fromAge: 18,
        toAge: 64,
        value: {                                                                                    
            rangeBarValue: 0,
            financialValue: 0,
            name: "value",
            label: "Charitable Contribution",
        } 
     },
     30100: { 
        label: "Age Amount",    
        category: "ageAmount",    
        type: "ageCredit",
        id: 30100,      
        color: '#D8BABB',                                                                                                                                                      
        fromAge: 18,
        toAge: 64,
        value: {                                                                                    
            rangeBarValue: 0,
            financialValue: 0,
            name: "value",
            label: "Age Amount",
        } 
     },
     33099: { 
        label: "Medical Expense",    
        category: "medicalexpense",    
        type: "credit",
        id: 33099,      
        color: '#D8BABB',                                                                                                                                                      
        fromAge: 18,
        toAge: 64,
        value: {                                                                                    
            rangeBarValue: 0,
            financialValue: 0,
            name: "value",
            label: "Medical Expense Amount",
        } 
     },
}

 const taxCredits_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "tax_reducer/ADD": return {...state, [action.payload.id]: action.payload}
        case "tax_reducer/DELETE": return _.omit(state, [action.id])
        case "tax_reducer/SET_VALUE": return {...state, [action.id]: {                                                  //creates a copy of state and enters the object with the correct id
                                                            ...state[action.id], value: {                               //creates a copy of the object with that id and enters the value object
                                                                    ...state[action.id].value,                          //creates a copy of the value object
                                                                    financialValue: action.financialValue,              //sets the financialValue with the new value
                                                                    rangeBarValue: action.rangeBarValue,                //sets the rangeBar value             
                                                            }
        }}
        case "tax_reducer/SET_AGE": return {...state, [action.id]: {
                                                           ...state[action.id], [action.ageType]: action.value
}}
        default: return state
    }
}

export default taxCredits_reducer