import {createSelector} from "reselect"

const savingsPerYear = state => state.savingsPerYear_reducer2
const pensionStartAges = state => state.pensionStartAges_reducer

export const rrspStartAge = (state) => state.pensionStartAges_reducer.rrifStartAge.rangeBarValue
export const tfsaStartAge = (state) => state.pensionStartAges_reducer.rrifStartAge.rangeBarValue


const round = number => {
    return number > 1000000 ?  `${Math.round(number/1000000)*1000000/1000000} M` : `${Math.round(number/1000)*1000/1000} k` 
}

//CHART SELECTORS - change data format to be used in the charts


//HEADER SELECTORS - grab and convert values to be displayed along the header

export const rrspNestEgg = createSelector(
    [savingsPerYear, rrspStartAge],
    (savings, rrspStartAge)=> savings[rrspStartAge].rrsp.totalValue 
)
export const tfsaNestEgg = createSelector(
    [savingsPerYear, rrspStartAge],
    (savings, rrspStartAge)=> savings[rrspStartAge].tfsa.totalValue 
)
export const nonRegisteredNestEgg = createSelector(
    [savingsPerYear, rrspStartAge],
    (savings, rrspStartAge)=> savings[rrspStartAge].nonRegistered.totalValue 
)

export const rrspDisplayValue= createSelector(
    [savingsPerYear, rrspNestEgg],
    (savings, rrspNestEgg)=> round(rrspNestEgg)

)
export const tfsaDisplayValue= createSelector(
    [savingsPerYear, tfsaNestEgg],
    (savings, tfsaNestEgg) => round(tfsaNestEgg)
)
export const nonRegisteredDisplayValue = createSelector(
    [savingsPerYear, nonRegisteredNestEgg],
    (savings, nonRegisteredNestEgg) => round(nonRegisteredNestEgg)

)

export const totalNestEgg = createSelector(
    [rrspNestEgg, tfsaNestEgg, nonRegisteredNestEgg],
    (rrspNestEgg, tfsaNestEgg, nonRegisteredNestEgg) => round(rrspNestEgg + tfsaNestEgg + nonRegisteredNestEgg)
)
