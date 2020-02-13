import {createSelector} from "reselect"



const investmentReturns = state => state.assumptions_reducer

export const rrspStartAge = (state) => state.pensionStartAges_reducer.rrspStartAge.rangeBarValue
export const tfsaStartAge = (state) => state.pensionStartAges_reducer.rrspStartAge.rangeBarValue



export const investmentReturns_selector = createSelector(
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

export const stackedBarData = createSelector(
    [investmentReturns],
    (investmentReturns) =>    {
            const array =  [
                  {
                      bar: 1, 
                      managementFee: investmentReturns.managementFee.rangeBarValue,
                      inflationRate: investmentReturns.inflationRate.rangeBarValue,
                      realReturn: investmentReturns.beforeRetirementReturn.rangeBarValue - investmentReturns.managementFee.rangeBarValue - investmentReturns.inflationRate.rangeBarValue,
                  },
                  {
                      bar: 2, 
                      managementFee: investmentReturns.managementFee.rangeBarValue,
                      inflationRate: investmentReturns.inflationRate.rangeBarValue,
                      realReturn: investmentReturns.afterRetirementReturn.rangeBarValue - investmentReturns.managementFee.rangeBarValue - investmentReturns.inflationRate.rangeBarValue,

                  }
              ]
              return array
          }
)
