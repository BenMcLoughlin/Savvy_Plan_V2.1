
const initialState = { 

    income: {
        employmentIncome: {
            name: "employmentIncome",
            label: "Employment Income",
            financialValue: 100, 
            rangeBarValue: 0,
            section: "income" 
        },
        selfEmploymentIncome: {
            name: "selfEmploymentIncome",
            label: "Self Employment Income",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "income" 
        },
        interestIncome: {
            name: "interestIncome",
            label: "Business / Rental Income",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "income" 
        },
        capitalGains: {
            name: "capitalGains",
            label: "Capital Gains",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "income",
        },
        eligibleDividends: {
            name: "eligibleDividends",
            label: "Eligible Dividends",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "income" 
        },
        nonEligibleDividends: {
            name: "nonEligibleDividends",
            label: "Non-Eligible Dividends",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "income" 
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
            section: "credits",
            min: 0, 
            max: 20000, 
        },
        charitableGiving: {
            name: "charitableGiving",
            label: "Charitable Giving",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "credits",
            min: 0,
            max: 40000,
        },
        medicalExpense: {
            name: "medicalExpense",
            label: "Medical Expense",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "credits", 
            min: 0,
            max: 40000,
        },
        homeBuyers: {
            name: "homeBuyers",
            label: "Home Buyers",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "credits",
            min: 0, 
            max: 5000, 
        },
        charitableGiving1: {
            name: "charitableGiving1",
            label: "Charitable Giving1",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "credits",
            min: 0,
            max: 40000,
        },
        medicalExpense1: {
            name: "medicalExpense1",
            label: "Medical Expense1",
            financialValue: 0, 
            rangeBarValue: 0,
            section: "credits", 
            min: 0,
            max: 40000,
        },
    },
}


 const taxVariables_reducer= (state = initialState, action) => {
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

export default taxVariables_reducer