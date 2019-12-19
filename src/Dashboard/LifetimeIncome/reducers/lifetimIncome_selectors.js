import {createSelector} from "reselect"


const incomePerYear_reducer = state => state.incomePerYear_reducer
const keyVariables_reducer = state => state.keyVariables_reducer
const pensionStartAges_reducer = state => state.pensionStartAges_reducer


export const stackedChartData = createSelector(
    [incomePerYear_reducer],
    (incomePerYear_reducer) => Object.values(incomePerYear_reducer).map(d => {                                                                  //the year list needs to be converted to an array so the chart can render the data
        const incomeNamesArray = Object.keys(d)                                                                                                 //Creates an array of all the names eg ["employmentIncome", "cppIncome", etc.]
        const financialValueArray = Object.values(d).map(a => a.financialValue)                                                                 //Creates an array of all the financial Values eg ["22000", "1200", etc.]
        var result = {age: d.cppIncome.age};                                                                                                    //I have to go into one of the objects to access its age which acts like id, I just used cppIncome because it wont be deleted
        incomeNamesArray.forEach((key, i) => result[key] = financialValueArray[i]);                                                             //Merges the two arrays into a set of key value pairs eg ["employmentIncome": 22000]   
        return result
    }))

export const stackedChartKeys = createSelector(
    [incomePerYear_reducer],
    (incomePerYear_reducer) => Object.keys(incomePerYear_reducer[18])                                                                            //creates a an array of each of the income type names, which is used in the stacked Income chart
)

export const legenChartKeys = createSelector(
    [incomePerYear_reducer],
    (incomePerYear_reducer) => Object.keys(incomePerYear_reducer[18])                                                                            //creates a an array of each of the income type names, which is used in the stacked Income chart
)


export const retirementPensionIncome = createSelector(                                                                                           //Sums all sources of retirement income that does not include RRSP, TFSA or NON registered
    [incomePerYear_reducer],
    (incomePerYear_reducer) => Object.values(incomePerYear_reducer[72]).filter(d => d.name !== "rrsp")
                                                .filter(d => d.name !== "tfsa")
                                                .filter(d => d.name !== "nonRegistered")
                                                .map(d => d.financialValue)
                                                .reduce((acc,num) => acc + num)                                                                       
)






//HEADER SELECTORS
