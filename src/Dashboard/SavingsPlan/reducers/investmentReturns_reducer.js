
const initialState = {
        beforeRetirementReturn: {
            name: "beforeRetirementReturn",
            label: "Before Retirement Return",
            rangeBarValue: .065, 
            min: 0,
            max: .11,
            step: .0001,
            numberType: "percentage",
        },
            afterRetirementReturn: {
            name: "afterRetirementReturn",
            label: "After Retirement Return ",
            rangeBarValue: .05, 
            min: 0,
            max: .1,
            step: .0001,
            numberType: "percentage",
        },
        managementFee: {
            name: "managementFee",
            label: "Management Fee",
            rangeBarValue: .02, 
            min: 0,
            max: .035,
            step: .0001,
            numberType: "percentage",
        },
        inflationRate: {
            name: "inflationRate",
            label: "Inflation Rate",
            rangeBarValue:.02, 
            min: 0,
            max: .1,
            step: .0001,
            numberType: "percentage",
        },
}

const investmentReturns_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "investmentReturns/SET_VALUE": return {...state, [action.name]: {
                                                ...state[action.name],  rangeBarValue: action.value,
                                            }
        } 
        default: return state
    }     
    }


export default investmentReturns_reducer

