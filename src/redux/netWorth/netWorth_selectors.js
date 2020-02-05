import {createSelector} from "reselect"
import {calculatMortgageBalance} from "services/general/mortgage_functions"

//HELPER FUNCTIONS

const subCategoryArray = (category, subCategory) => {
   return Object.values(category).length > 0 ?
           Object.values(category).filter(d => d.subCategory === subCategory) 
    : null
}
const netWorth_reducer = state => state.netWorth_reducer

//ASSET SELECTORS
export const property_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => subCategoryArray('netWorth_reducer.assets', "propertyAssets")                                                               
)

export const cash_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => subCategoryArray('netWorth_reducer.assets', "cashAssets")  
                                                                                                                 
)

export const investments_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => subCategoryArray('netWorth_reducer.assets', "investmentAssets")                                                            
)

export const totalAssets_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  {
        const array =  Object.values(netWorth_reducer.assets) 
        return array.length > 0 ? array.filter(d => d.subCategory === "investmentAssets") : ["null"]
           }                                                               
)

export const propertyNames_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  Object.values(netWorth_reducer.assets).filter(d => d.subCategory === "propertyAssets").map(d => d.label)                                                                                                      //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)


//LIABILITY SELECTORS
export const mortgage_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory === "secured")                                                             //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const shortTerm_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory === "unSecured")                                                                   //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const other_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory === "other")                                                                   //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

export const totalLiabilities_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liabilities).length > 1 ? Math.round(Object.values(netWorth_reducer.liabilities).map(d => d.financialValue).reduce((acc, num) => acc + num)/1000)*1000   : null                                                                                                //creates a an array of each of the income subCategory names, which is used in the stacked Income chart
)

//MORTGAGE SCHEDULE SELECTOR

export const mortgageSchedule_selector = createSelector(
    [mortgage_selector],
    (mortgage_selector) =>  mortgage_selector.map(secured => {
       const balance = secured.financialValue 
       const interestRate = secured.interestRate.rangeBarValue 
       const remainingYears = secured.remainingYears.rangeBarValue
       const payment = secured.payment.rangeBarValue
      return calculatMortgageBalance(balance, interestRate, payment,remainingYears)
    }) 
                                                                 
)


//CHART SELECTORS

export const chartAssets_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => {
        const linkMortgageToPropery = (propertyAssets, mortgages) => {
            return propertyAssets.map(propertyAssets => {
                const secured = mortgages.find(d => d.registration === propertyAssets.label)
                    return ({
                        name: propertyAssets.label,
                        value: propertyAssets.financialValue - (secured ? secured.financialValue : 0)
                    })
            })
        }
       return  ({
        "name": "Assets", "children": [{
            "name": "cashAssets",
            "children": Object.values(netWorth_reducer.assets).filter(d => d.subCategory === "cashAssets").map(d => ({name: d.label, value: d.currentValue.financialValue}))
        }, {
            "name": "investmentAssets",
            "children": Object.values(netWorth_reducer.assets).filter(d => d.subCategory === "investmentAssets").map(d => ({name: d.label, value: d.currentValue.financialValue}))
        }, {
            "name": "propertyAssets",
            "children": linkMortgageToPropery(Object.values(netWorth_reducer.assets).filter(d => d.subCategory === "propertyAssets"), Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory === "secured"))
        }]
    })}
                                                                               
)

export const chartLiabilities_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => {
       return  ({
        "name": "Assets", "children": [{
            "name": "cashAssets",
            "children": Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory === "unSecured").map(d => ({name: d.label, value: d.financialValue}))
        }, {
            "name": "investmentAssets",
            "children": Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory === "secured").map(d => ({name: d.label, value: d.financialValue}))
        }, {
            "name": "propertyAssets",
            "children": Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory === "other").map(d => ({name: d.label, value: d.financialValue}))
        }]
    })}
                                                                               
)

export const chartProjection_selector = createSelector(
    netWorth_reducer,
    mortgageSchedule_selector,
    (netWorth_reducer, mortgageSchedule_selector) => {

        const array = [{
            age: 18,
            totalCash: Object.values(netWorth_reducer.assets).filter(d => d.subCategory == "cashAssets").map(d => d.financialValue).reduce((acc, num) => acc + num),
            totalInvestments: Object.values(netWorth_reducer.assets).filter(d => d.subCategory == "investmentAssets").map(d => d.financialValue).reduce((acc, num) => acc + num),
            totalProperty: Object.values(netWorth_reducer.assets).filter(d => d.subCategory == "propertyAssets").map(d => d.financialValue).reduce((acc, num) => acc + num),
            totalLongTerm: -Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory == "secured").map(d => d.financialValue).reduce((acc, num) => acc + num),
            ///totalShortTerm: Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory == "unSecured").map(d => d.financialValue).reduce((acc, num) => acc + num),
            totalOther: -Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory == "other").map(d => d.financialValue).reduce((acc, num) => acc + num),
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
                // ///totalShortTerm: Object.values(netWorth_reducer.liabilities).filter(d => d.subCategory == "unSecured").map(d => d.financialValue).reduce((acc, num) => acc + num),
               totalOther: lastValue.totalOther + 500,
            })
           
   }
   //console.log(array);
     return array
})

 