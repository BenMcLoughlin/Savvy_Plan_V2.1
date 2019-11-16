import _ from "lodash"
import {adjustCPP, adjustOAS} from "../../../services/financialFunctions"

const initialState = () => {
    const incomePerYear = {}
    for (let i = 18; i <= 95; i++) {
        incomePerYear[Number(i)] = {

            employmentIncome: {
                    name: "employmentIncome",
                    label: "Employment Income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: true,
                    age: i, 
                },
                selfEmploymentIncome: {
                    name: "selfEmploymentIncome",
                    label: "Self Employment Income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: false,
                    age: i, 
                },
                cppIncome: {
                    name: "cppIncome",
                    label: "cpp income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: false,
                    age: i, 
                },
                oasIncome: {
                    name: "oasIncome",
                    label: "oas income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: false,
                    age: i, 
                },
                rrifIncome: {
                    name: "rrifIncome",
                    label: "RRIF Income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: false,
                    age: i, 
                },

        }}
return incomePerYear
}


 const incomePerYear = (state = initialState(), action) => {
    switch(action.type) {
        case "SET_INCOME_REFACTOR": return {...state, [action.payload.age]: {
                                        ...state[action.payload.age], [action.payload.name]:{
                                            ...state[action.payload.age][action.payload.id], financialValue: action.payload.financialValue
                                        }
        }}
        case "REMOVE_INCOME_TYPE_REFACTOR": return {...state, [action.payload.age]:  _.omit(state[action.payload.age], action.payload.name)
            }

    

        default: return state
    }
}




export default incomePerYear



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 

Initial State

   The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
   individuals life can have its different types of income set and might look like this, say at age 23

   {
        age: 23, 
        employmentIncome: 23000, 
        selfEmploymentIncome: 14000, 
        rentalIncome: 0, 
        cppIncome: 0, 
        oasIncome: 0, 
        pensionIncome: 0,
        birthYear: 1988,
        ympe: 54000,
        adjustedPensionableEarningsMethod: 34322

   }

   EXPLANATION: adjustedPensionableEarningsMethod() 
   The objective of this function is to calculate the adjusted pensionable earnings for each year. 

   in order to calculate an individuals Canada Pension Plan Payment the income earned for every year that person worked has to be converted
   to a comparable number to remove the impacts of inflation. 

   see calculation explanation: https://retirehappy.ca/how-to-calculate-your-cpp-retirement-pension/
*/