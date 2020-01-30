import {createSelector} from "reselect"


const netWorth_reducer = state => state.netWorth_reducer

//ASSET SELECTORS
export const property_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.assets).filter(d => d.type === "property")                                                                   //creates a an array of each of the income type names, which is used in the stacked Income chart
)

export const cash_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.assets).filter(d => d.type === "cash")                                                                   //creates a an array of each of the income type names, which is used in the stacked Income chart
)

export const investments_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.assets).filter(d => d.type === "investments")                                                                   //creates a an array of each of the income type names, which is used in the stacked Income chart
)

export const totalAssets_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  Math.round(Object.values(netWorth_reducer.assets).map(d => d.financialValue).reduce((acc, num) => acc + num)/1000)*1000                                                                                                      //creates a an array of each of the income type names, which is used in the stacked Income chart
)


//LIABILITY SELECTORS
export const longTerm_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liabilities).filter(d => d.type === "longTerm")                                                                   //creates a an array of each of the income type names, which is used in the stacked Income chart
)

export const shortTerm_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liabilities).filter(d => d.type === "shortTerm")                                                                   //creates a an array of each of the income type names, which is used in the stacked Income chart
)

export const other_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Object.values(netWorth_reducer.liabilities).filter(d => d.type === "other")                                                                   //creates a an array of each of the income type names, which is used in the stacked Income chart
)

export const totalLiabilities_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => Math.round(Object.values(netWorth_reducer.liabilities).map(d => d.financialValue).reduce((acc, num) => acc + num)/1000)*1000                                                                                                     //creates a an array of each of the income type names, which is used in the stacked Income chart
)

//CHART SELECTORS

export const chartAssets_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) => ({
        "name": "Assets", "children": [{
            "name": "cash",
            "children": Object.values(netWorth_reducer.assets).filter(d => d.type === "cash").map(d => ({name: d.label, value: d.financialValue}))
        }, {
            "name": "investments",
            "children": Object.values(netWorth_reducer.assets).filter(d => d.type === "investments").map(d => ({name: d.label, value: d.financialValue}))
        }, {
            "name": "property",
            "children": Object.values(netWorth_reducer.assets).filter(d => d.type === "property").map(d => ({name: d.label, value: d.financialValue}))
        }]
    })
                                                                               
)