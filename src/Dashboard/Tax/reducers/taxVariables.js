import {calculateFutureValue} from "../../../services/financialFunctions"
const initialState = { 

    regularIncome: {
        employmentIncome: {
            name: "employmentIncome",
            label: "Employment Income",
            financialValue: 100, 
            rangeBarValue: 0,
            section: "regularIncome" 
            
        },
        selfEmploymentIncome: {
            name: "selfEmploymentIncome",
            label: "Self Employment Income",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "regularIncome" 
        },
        interestIncome: {
            name: "interestIncome",
            label: "Business / Rental Income",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "regularIncome" 
        },
    },
    taxAdvantagedIncome: {
        capitalGains: {
            name: "capitalGains",
            label: "Capital Gains",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "taxAdvantagedIncome",
        },
        eligibleDividends: {
            name: "eligibleDividends",
            label: "Eligible Dividends",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "taxAdvantagedIncome" 
        },
        nonEligibleDividends: {
            name: "nonEligibleDividends",
            label: "Non-Eligible Dividends",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "taxAdvantagedIncome" 
        },
    },
    deductions: {
        rrspContributions: {
            name: "rrspContributions",
            label: "RRSP Contributions",
            financialValue: 0, 
            rangeBarValue: 0, 
        }
    },
    credits: {
        educationTuition: {
            name: "educationTuition",
            label: "Education",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "credits" 
        },
        charitableGiving: {
            name: "charitableGiving",
            label: "Charitable Giving",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "credits" 
        },
        medicalExpense: {
            name: "medicalExpense",
            label: "Medical Expense",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "credits" 
        },
    },
}


 const taxVariables = (state = initialState, action) => {
    switch(action.type) {
        case "SET_INCOME_FOR_TAX_CALCULATOR": return {...state, [action.payload.section]: {
                                                            ...state[action.payload.section], [action.payload.name]: {
                                                                    ...state[action.payload.section][action.payload.name], 
                                                                    financialValue: action.payload.financialValue, 
                                                                    rangeBarValue: action.payload.rangeBarValue, 
                                                            }
        }}
  

        default: return state
    }
}

export default taxVariables