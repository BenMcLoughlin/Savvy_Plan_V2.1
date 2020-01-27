
const initialState = {
    id: "",
    displayName: "",
    email: "",
    firstName: "",
    province: "",
    spouse: false,
    birthYear: 1978,
    rrifWithdrawalAge: 65,
    retirementPensionIncome: 0,
    hasChildren: false,
    numberOfChildren: 0,
    retirementAge: {
        name: "retirementAge",
        label: "Target Retirement Age",
        rangeBarValue: 65, 
        min: 30,
        max: 80,
        step: 1,
        numberType: "age",
    },
    lifeSpan: {
        name: "lifeSpan",
        label: "Estimated Life Span",
        rangeBarValue: 95, 
        min: 75,
        max: 110,
        step: 1,
        numberType: "age",
    },
    priorities: {
        gettingOutOfDebt: false,
        buildingASavingsPlan: false,
        CalculatingRetirementIncome: false,
        purchasingAHome: false,
        savingOnTaxes: false,
        managingSpending: false,
    },
    retirementIncome: {
        financialValue: 0, 
        label: "Desired Retirement Income",
        name: "retirementIncome",
        rangeBarValue: 0, 
    },
        
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
        case "user_reducer/SET_NESTED_USER_DETAIL": 
        return {...state, [action.identifier]: {
            ...state[action.identifier], [action.name]: action.value
        }
         }

        default: return state
    }
}

export default user_reducer

