
const initialState = { 
    22222: { 
        registration: "rrsp",
        label: "RRSP Contribution",    
        category: "deduction",    
        id: 22222,                                                                             //the label is editable by the user and is what is displayed 
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
     }
}


 const taxCredits_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_INCOME_FOR_TAX_CALCULATOR": return {...state, [action.section]: {
                                                            ...state[action.section], [action.name]: {
                                                                    ...state[action.section][action.name], 
                                                                    financialValue: action.financialValue, 
                                                                    rangeBarValue: action.rangeBarValue, 
                                                            }
        }}
        default: return state
    }
}

export default taxCredits_reducer