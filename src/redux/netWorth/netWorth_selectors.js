import {createSelector} from "reselect"
import {calculatMortgageBalance} from "services/general/mortgage_functions"

const netWorth_reducer = state => state.netWorth_reducer

//ASSET SELECTORS
export const property_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.asset).filter(d => d.subCategory === "property")                                                                   //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const cash_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.asset).filter(d => d.subCategory === "cash")                                                                   //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const investments_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.asset).filter(d => d.subCategory === "investments")                                                                   //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const totalAssets_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  Math.round(Object.values(netWorth_reducer.asset).map(d => d.financialValue).reduce((acc, num) => acc + num)/1000)*1000                                                                                                      //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const propertyNames_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  Object.values(netWorth_reducer.asset).filter(d => d.subCategory === "property").map(d => d.label)                                                                                                      //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)


//LIABILITY SELECTORS
export const mortgage_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liability).filter(d => d.subCategory === "mortgage")                                                             //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const shortTerm_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liability).filter(d => d.subCategory === "shortTerm")                                                                   //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const other_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liability).filter(d => d.subCategory === "other")                                                                   //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const totalLiabilities_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Math.round(Object.values(netWorth_reducer.liability).map(d => d.financialValue).reduce((acc, num) => acc + num)/1000)*1000                                                                                                     //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

//MORTGAGE SCHEDULE SELECTOR

export const mortgageSchedule_selector = createSelector(
    [mortgage_selector],
    (mortgage_selector) =>  mortgage_selector.map(mortgage => {
       const balance = mortgage.financialValue 
       const interestRate = mortgage.interestRate.rangeBarValue 
       const remainingYears = mortgage.remainingYears.rangeBarValue
       const payment = mortgage.payment.rangeBarValue
      return calculatMortgageBalance(balance, interestRate, payment,remainingYears)
    }) 
                                                                 
)


//CHART SELECTORS

export const chartAssets_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => {
        const linkMortgageToPropery = (property, mortgages) => {
            return property.map(property => {
                const mortgage = mortgages.find(d => d.registration === property.label)
                    return ({
                        name: property.label,
                        value: property.financialValue - (mortgage ? mortgage.financialValue : 0)
                    })
            })
        }
       return  ({
        "name": "Assets", "children": [{
            "name": "cash",
            "children": Object.values(netWorth_reducer.asset).filter(d => d.subCategory === "cash").map(d => ({name: d.label, value: d.financialValue}))
        }, {
            "name": "investments",
            "children": Object.values(netWorth_reducer.asset).filter(d => d.subCategory === "investments").map(d => ({name: d.label, value: d.financialValue}))
        }, {
            "name": "property",
            "children": linkMortgageToPropery(Object.values(netWorth_reducer.asset).filter(d => d.subCategory === "property"), Object.values(netWorth_reducer.liability).filter(d => d.subCategory === "mortgage"))
        }]
    })}
                                                                               
)

export const chartLiabilities_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => {
       return  ({
        "name": "Assets", "children": [{
            "name": "cash",
            "children": Object.values(netWorth_reducer.liability).filter(d => d.subCategory === "shortTerm").map(d => ({name: d.label, value: d.financialValue}))
        }, {
            "name": "investments",
            "children": Object.values(netWorth_reducer.liability).filter(d => d.subCategory === "mortgage").map(d => ({name: d.label, value: d.financialValue}))
        }, {
            "name": "property",
            "children": Object.values(netWorth_reducer.liability).filter(d => d.subCategory === "other").map(d => ({name: d.label, value: d.financialValue}))
        }]
    })}
                                                                               
)

export const chartProjection_selector = createSelector(
    netWorth_reducer,
    mortgageSchedule_selector,
    (netWorth_reducer, mortgageSchedule_selector) => {

        const array = [{
            age: 18,
            totalCash: Object.values(netWorth_reducer.asset).filter(d => d.subCategory == "cash").map(d => d.financialValue).reduce((acc, num) => acc + num),
            totalInvestments: Object.values(netWorth_reducer.asset).filter(d => d.subCategory == "investments").map(d => d.financialValue).reduce((acc, num) => acc + num),
            totalProperty: Object.values(netWorth_reducer.asset).filter(d => d.subCategory == "property").map(d => d.financialValue).reduce((acc, num) => acc + num),
            totalLongTerm: -Object.values(netWorth_reducer.liability).filter(d => d.subCategory == "mortgage").map(d => d.financialValue).reduce((acc, num) => acc + num),
            ///totalShortTerm: Object.values(netWorth_reducer.liability).filter(d => d.subCategory == "shortTerm").map(d => d.financialValue).reduce((acc, num) => acc + num),
            totalOther: -Object.values(netWorth_reducer.liability).filter(d => d.subCategory == "other").map(d => d.financialValue).reduce((acc, num) => acc + num),
        }]
     
        for (let age = 1; age < 30; age++) {
            const lastValue = array[age-1]
            const totalOutstandingMortgage = mortgageSchedule_selector.map(schedule => schedule[age].endingBalance).reduce((acc, num) => acc + num) 
            array.push({
                age: age + 17,
                totalCash: lastValue.totalCash * 1.02,
                totalInvestments: lastValue.totalInvestments * 1.05,
                totalProperty: lastValue.totalProperty * 1.01,
                totalLongTerm: -totalOutstandingMortgage,
                // ///totalShortTerm: Object.values(netWorth_reducer.liability).filter(d => d.subCategory == "shortTerm").map(d => d.financialValue).reduce((acc, num) => acc + num),
               totalOther: lastValue.totalOther + 500,
            })
           
   }
   //console.log(array);
     return array
})

 