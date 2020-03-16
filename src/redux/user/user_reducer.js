
const initialState = {
    id: "",
    displayName: "",
    email: "",
    firstName: "",
    province: "",
    spouse: false,
    taxAge: false,
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
        case "user_reducer/SET_KEY_VALUE": return {...state, [action.key]: action.value}        
        case "user_reducer/SET_NESTED_KEY_VALUE": return {...state, [action.parentKey]: {
                                                                            ...state[action.parentKey], 
                                                                            [action.childKey]: action.value
        }}        
        default: return state
    }
}

export default user_reducer

