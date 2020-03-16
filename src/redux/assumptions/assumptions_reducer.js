
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
    propertyAppreciation: {
        name: "propertyAppreciation",
        label: "Property Appreciation",
        rangeBarValue:.03, 
        min: 0,
        max: .1,
        step: .0001,
        numberType: "percentage",
    },
}

const assumptions_reducer = (state = initialState, action) => {
switch(action.type) {
    case "assumptions_reducer/SET_NESTED_KEY_VALUE": return {...state, [action.parentKey]: {                           //make a copy of state, enter object, here parentKey is the id
                                             ...state[action.parentKey], [action.childKey]: action.value       //make a copy of object, change the key
}}
    default: return state
}     
}


export default assumptions_reducer

