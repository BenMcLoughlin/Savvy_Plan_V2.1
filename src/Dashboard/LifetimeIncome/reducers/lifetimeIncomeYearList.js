import historicYMPE from "../services/historicYMPEdata"
import _ from "lodash"
import {adjustCPP, adjustOAS} from "../../../services/financialFunctions"

const initialState = () => {
    const incomePerYear = {}
    for (let i = 18; i <= 95; i++) {
        incomePerYear[Number(i)] = {
        age: i,
        incomeType: {
            employmentIncome: {
                    name: "employmentIncome",
                    label: "Employment Income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: true,
                },
                selfEmploymentIncome: {
                    name: "selfEmploymentIncome",
                    label: "Self Employment Income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: false,
                },
                cppIncome: {
                    name: "cppIncome",
                    label: "cpp income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: false,
                },
                oasIncome: {
                    name: "oasIncome",
                    label: "oas income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: false,
                },
                rrifIncome: {
                    name: "rrifIncome",
                    label: "RRIF Income",
                    financialValue: 0, 
                    rangeBarValue: 0, 
                    contributeToCpp: false,
                },
            },
        birthYear: 1988,
        ympe: 54000,
        adjustedPensionableEarningsMethod: function() {
            const pensionableIncome = Object.values(this.incomeType).filter(d => d.contributeToCpp)
                                                                    .map(d => d.financialValue)
                                                                    .reduce((acc, num) => acc + num)
            const currentYear = this.birthYear + this.age
            const lastCPPYear = this.birthYear + 70

            if (currentYear < 2019 && this.age <= 70) {
                const percentage = pensionableIncome / historicYMPE[this.birthYear + this.age] 
                return percentage < 1 ? percentage * this.ympe : this.ympe
            } else if (currentYear >= 2019 && currentYear <= lastCPPYear) {
                const percentage = pensionableIncome / this.ympe
                return percentage < 1 ? percentage * this.ympe : this.ympe
            } else {return null}
        }, 
        }
    };

        return incomePerYear
}



 const incomePerYear = (state = initialState(), action) => {
    switch(action.type) {
        case "SET_INCOME": return {...state, [action.payload.selectedAge]: {
           ...state[action.payload.selectedAge], incomeType: {
               ...state[action.payload.selectedAge].incomeType, [action.payload.name]: {
                ...state[action.payload.selectedAge]["incomeType"][action.payload.name],
                        name: action.payload.name,
                        financialValue: Number(action.payload.financialValue), 
                        rangeBarValue: Number(action.payload.rangeBarValue), 
                        contributeToCPP: action.payload.contributeToCPP
               }
           }
        }}
        case "ADD_INCOME_TYPE": return {...state, [action.payload.selectedAge]: {
           ...state[action.payload.selectedAge], incomeType: {
               ...state[action.payload.selectedAge].incomeType, [action.payload.name]: {
                        name: action.payload.name,
                        label: action.payload.label,
                        financialValue: Number(action.payload.financialValue), 
                        rangeBarValue: Number(action.payload.rangeBarValue), 
                        contributeToCpp: action.payload.contributeToCpp
               }
           }
        }}
        case "CHANGE_INCOME_LABEL": return {...state, [action.payload.selectedAge]: {
            ...state[action.payload.selectedAge], incomeType: {
                ...state[action.payload.selectedAge].incomeType, [action.payload.name]: {
                    ...state[action.payload.selectedAge]["incomeType"][action.payload.name],
                    label: action.payload.label,
                    name: action.payload.name
                }

            }
        }

        }
        case "REMOVE_INCOME_TYPE": return {...state, [action.payload.selectedAge]: {
            ...state[action.payload.selectedAge], incomeType: _.omit(state[action.payload.selectedAge].incomeType, action.payload.name)
            }
        }
        case "CALCULATE_CPP": {
            const pensionableEarningsArray = Object.values(state).map(d => d.adjustedPensionableEarningsMethod())
            const pensionableEarningsArrayAfterDropout = pensionableEarningsArray.sort().slice(8,47)
            const totalAdustedPensionableEarnings = pensionableEarningsArrayAfterDropout.reduce((acc, num) => acc + num)
            const averagePensionableEarnings = totalAdustedPensionableEarnings / 39
            const annualCPPPayment = averagePensionableEarnings * .25
            const adjustedCPPPayment = Math.round(adjustCPP(annualCPPPayment, action.payload.cppStartAge)/100)*100
   
            return {...state, [action.payload.selectedAge]: {
                ...state[action.payload.selectedAge], incomeType: {
                    ...state[action.payload.selectedAge].incomeType, cppIncome: {
                     ...state[action.payload.selectedAge].incomeType.cppIncome,
                             financialValue: adjustedCPPPayment, 
                    }
                }
             }}
        
        }
        case "CLEAR_CPP_INCOME": {
        console.log(action.payload.selectedAge);
            return {...state, [action.payload.selectedAge]: {
                ...state[action.payload.selectedAge], incomeType: {
                    ...state[action.payload.selectedAge].incomeType, cppIncome: {
                     ...state[action.payload.selectedAge].incomeType.cppIncome,
                             financialValue: 0, 
                    }
                }
             }}
        
        }
        case "CALCULATE_OAS": {
            const adjustedOASPayment = Math.round(adjustOAS(7000, action.payload.oasStartAge)/100)*100
  
            return {...state, [action.payload.selectedAge]: {
                ...state[action.payload.selectedAge], incomeType: {
                    ...state[action.payload.selectedAge].incomeType, oasIncome: {
                     ...state[action.payload.selectedAge].incomeType.oasIncome,
                             financialValue: adjustedOASPayment, 
                    }
                }
             }}
        
        }
        case "CLEAR_OAS_INCOME": {

                return {...state, [action.payload.selectedAge]: {
                    ...state[action.payload.selectedAge], incomeType: {
                        ...state[action.payload.selectedAge].incomeType, oasIncome: {
                         ...state[action.payload.selectedAge].incomeType.oasIncome,
                                 financialValue: 0, 
                        }
                    }
                 }}
            
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