import _ from "lodash"


const initialState = { 
    selectedCredit: "medicalExpense",
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
        fromAge: 65,
        toAge: 95,
        value: {                                                                                    
            rangeBarValue: 0,
            financialValue: 7494,
            name: "value",
            label: "Age Amount",
        } 
     },
     33099: { 
        label: "Medical Expense",    
        category: "medicalExpense",    
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
        case "tax_reducer/SET_KEY_VALUE": return {...state, [action.key]: action.value}
        case "tax_reducer/SET_VALUE": return {...state, [action.id]: {                                                  //creates a copy of state and enters the object with the correct id
                                                            ...state[action.id], value: {                               //creates a copy of the object with that id and enters the value object
                                                                    ...state[action.id].value,                          //creates a copy of the value object
                                                                    financialValue: action.financialValue,              //sets the financialValue with the new value
                                                                    rangeBarValue: action.rangeBarValue,                //sets the rangeBar value             
                                                            }
        }}
        case "tax_reducer/SET_NESTED_KEY_VALUE": return {...state, [action.parentKey]: {
                                                                        ...state[action.parentKey], 
                                                                        [action.childKey]: action.value
}}    
        default: return state
    }
}

export default taxCredits_reducer