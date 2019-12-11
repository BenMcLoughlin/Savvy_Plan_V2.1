
const initialState = {
        beforeRetirementReturn: {
            name: "beforeRetirementReturn",
            label: "Before Retirementm Return",
            rangeBarValue: .065, 
            min: 0,
            max: .1,
            step: .0025,
            numberType: "percentage",
        },
        afterRetirementReturn: {
            name: "afterRetirementReturn",
            label: "After Retirement Return ",
            rangeBarValue: .05, 
            min: 0,
            max: .1,
            step: .0025,
            numberType: "percentage",
        },
        managementFee: {
            name: "managementFee",
            label: "Management Fee",
            rangeBarValue: .025, 
            min: 0,
            max: .1,
            step: .0025,
            numberType: "percentage",
        },
        inflationRate: {
            name: "inflationRate",
            label: "Inflation Rate",
            rangeBarValue:.02, 
            min: 0,
            max: .1,
            step: .0025,
            numberType: "percentage",
        },
        rate1() {
            const rate = this.beforeRetirementReturn.rangeBarValue - this.managementFee.rangeBarValue - this.inflationRate.rangeBarValue 
            return rate > 0 ? rate : 0
        },
        rate2() {
            const rate = this.afterRetirementReturn.rangeBarValue - this.managementFee.rangeBarValue - this.inflationRate.rangeBarValue 
            return rate > 0 ? rate : 0
        }
}


const investmentReturns_reducer2 = (state = initialState, action) => {
    switch(action.type) {
        case "investmentReturns/SET_VALUE": return {...state, [action.name]: {
                                                ...state[action.name],  rangeBarValue: action.value,
                                            }
        } 
        default: return state
    }     
    }


export default investmentReturns_reducer2

