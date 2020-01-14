
const initialState = {
    id: "",
    displayName: "",
    email: "",
    firstName: "Poo Brain",
    province: "",
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

const user_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_KEY_VARIABLE": 
        return {...state, [action.name]: action.value}        
        case "user_reducer/SET_RETIREMENT_INCOME": 
        return {...state, retirementIncome: {
            ...state.retirementIncome, 
                                        financialValue: action.financialValue, 
                                        rangeBarValue: action.rangeBarValue

        }  }
        case "user_reducer/SET_USER_DETAILS": 
        return {...state, 
                                       id: action.userId,
                                       email: action.useremail,
                                       displayName: action.displayName,
         }
        case "user_reducer/SET_USER_DETAIL": 
        return {...state, 
                                    [action.name]: action.value
         }
        default: return state
    }
}

export default user_reducer

