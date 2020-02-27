import {createSelector} from "reselect"
import {calculateCpp, calculateOAS} from "services/income/cpp_functions"

const income_reducer = state => state.income_reducer                                                             //this is the reducer, in object form, pulled from state
const thisYear = new Date()
const birthYear = state => state.user_reducer.birthYear
const retirementAge = state => state.user_reducer.retirementAge.rangeBarValue
const userAge = state => thisYear.getFullYear() - state.user_reducer.birthYear

const cppStartAge = state => 65 //state.pensionStartAges_reducer.cppStartAge.rangeBarValue
const oasStartAge = state => state.pensionStartAges_reducer.oasStartAge.rangeBarValue

//CONVERTS REDUCER TO ARRAY FOR CHART 
const convertReducerToArray = (reducer) => {                                                                       //takes the reducer, an object of objects, and the userAge
    const incomeStreams = Object.values(reducer)                                                                   //Converts reducer to an array of objects
     
    //RETURNS INCOME VALUE FOR THE GIVEN INCOME INSTANCE    
      const returnIncome = (incomeStreams, category, age) => {                                                     //Helper function which will return the income value in the chart

        if (incomeStreams.length > 0) {
            const arrayOfIncome = incomeStreams.map(d => d.category === category                                   //for each income category it is collecing all the income reported for that age
                                        && age >= d.fromAge                                                        //Checks if the given age is between the start and end age
                                        && age <= d.toAge ?                                         
                                        d.income.financialValue : 0                                                //If it is it returns the financial value, giving an array of financial values
            )
            return Math.max(...arrayOfIncome)                                                                      //If the person has inputted more than one income amount for the sane age range this will return the max

        }
       return 0
        }

     let arrayOfLabels = [...new Set(incomeStreams.map(d => d.category))]                                         //Map through the array returning categories, if theres more then one we only want one category name. Set filters it down to one name each.          
 
     const array = []                                                                                             //Initialize and empty array to push into
     for (let age = 18; age < 95; age++) {                                                                        //For loop showing their income till age 95
         const itemObject = {age: age}                                                                            //The age is used as the x axis
         const details = Object.assign(itemObject,  ...arrayOfLabels.map(category => (                            //We need an object for each income stream, we map and assign the category to the object
                             {[category]: returnIncome(incomeStreams, category, age)}                             //Checks to see if income has been input for this age, if so the financial value is returned
                             )))
         array.push(details)                                                                                      //Pushes the object to the array
     }
     return array
 
 }


export const cpp_selector = createSelector(                                                                      //Determines the CPP payment for the user
    income_reducer,
    birthYear,
    cppStartAge,
    (income_reducer, birthYear, cppStartAge) => calculateCpp(income_reducer, 18, birthYear, "banana", cppStartAge, 57400)                                                  
)

export const oas_selector = createSelector(                                                                      //Determines the OAS payment for the user
    oasStartAge,
    (oasStartAge) => calculateOAS(oasStartAge)                                                  
)

export const income_selector = createSelector(                                                             //Adds the CPP and OAS Income into the reducer
    income_reducer,
    cpp_selector,
    oas_selector,
    (income_reducer, cpp_selector, oas_selector) => {
       return ({...income_reducer, cpp_selector, oas_selector})
    }
)

export const incomeArray_selector = createSelector(                                                          //Final array with CPP and OAS added
    income_selector,
    (income_selector) => convertReducerToArray(income_selector, 18)   
)


export const employment_selector = createSelector(
    [income_selector],
    (income_selector) => [...new Set((Object.values(income_selector)).filter(d => d.contributeToCPP === true).map(d => d.category))]
)
export const business_selector = createSelector(
    [income_selector],
    (income_selector) => [...new Set((Object.values(income_selector)).filter(d => !d.contributeToCPP).map(d => d.category))]
)
export const retirement_selector = createSelector(
    [income_selector],
    (income_selector) => [...new Set((Object.values(income_selector)).filter(d => d.contributeToCPP === "retirement").map(d => d.category))]
)

export const color_selector = createSelector(
    [income_selector],
    (income_selector) => {
        const object = {}
        Object.assign(object, ...(Object.values(income_selector)).map(d => ({[d.category]: d.color})))
        return object
    }
)

 