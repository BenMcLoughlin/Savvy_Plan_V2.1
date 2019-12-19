
const initialState = {
    birthYear: 1988,
    rrifWithdrawalAge: 65,
    retirementPensionIncome: 0,
    retirementIncome: {
        financialValue: 0, 
        label: "Desired Retirement Income",
        name: "retirementIncome",
        rangeBarValue: 0, 
    }
}

const keyVariables_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_KEY_VARIABLE": 
        return {...state, [action.name]: action.value}        
        case "keyVariables_reducer/SET_RETIREMENT_INCOME": 
        return {...state, retirementIncome: {
            ...state.retirementIncome, 
                                        financialValue: action.financialValue, 
                                        rangeBarValue: action.rangeBarValue

        }  }
        default: return state
    }
}

export default keyVariables_reducer

