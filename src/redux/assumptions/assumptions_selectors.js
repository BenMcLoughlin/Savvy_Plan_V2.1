import {createSelector} from "reselect"



const investmentReturns = state => state.assumptions_reducer

export const rrspStartAge = (state) => state.pensionStartAges_reducer.rrspStartAge.rangeBarValue
export const tfsaStartAge = (state) => state.pensionStartAges_reducer.rrspStartAge.rangeBarValue



export const investmentReturnsArray = createSelector(
    [investmentReturns], 
    (investmentReturns) => Object.values(investmentReturns)
)

export const returns = state => state.assumptions_reducer

export const rate1 = createSelector(
    [returns],
    (returns) =>  returns.beforeRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue > 0 ? returns.beforeRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue : 0
)
export const rate2 = createSelector(
    [returns],
    (returns) => returns.afterRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue > 0 ? returns.afterRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue : 0
)

