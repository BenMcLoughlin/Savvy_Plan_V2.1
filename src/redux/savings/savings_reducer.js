
import _ from "lodash"

  const initialState = {
    123: { 
    registration: "tfsa",
    label: "contribution",    
    id: 123,                                                                             //the label is editable by the user and is what is displayed 
    transaction: "contribution",                                                                                        //examples include "employment", "business", "pension"
    color: "#8CB8B7",                                                                                 //Some forms of income might not be taxable such as inheritance
    fromAge: 18,
    toAge: 64,
    value: {                                                                                        //The value of the income being added
        rangeBarValue: 0,
        financialValue: 0,
        name: "value",
        label: "Annual Contribution",
    }   
},
11111: {
    label: "TFSA Withdrawal",
    registration: "tfsa",
    id: 11111,
    transaction: "withdrawal",
    category: "TFSA Income",
    incomeType: "retirementIncome",
    color: "#8CB8B7",
    fromAge: 65,
    toAge: 95,
    value: {
        rangeBarValue: 0,
        financialValue: 0,
        name: "value",
        label: "Annual Withdrawal",
    },
    
},
   }
   
    const savings_reducer = (state = initialState, action) => {
       switch(action.type) {
        case "savings/ADD_INSTANCE": return {...state, [action.payload.id]: action.payload}
        case "savings/CHANGE_AGE": return {...state, [action.id]: {
                                                     ...state[action.id], [action.ageType]: action.value
        }}
        case "savings/DELETE": return  _.omit(state, [action.id])                  
        case "savings/CHANGE_VALUE": return {...state, [action.id]: {
                                                    ...state[action.id], [action.name]: {
                                                        ...state[action.id][action.name], 
                                                                    financialValue: action.financialValue,
                                                                    rangeBarValue: action.rangeBarValue,
                                                    }
        }}
           
           default: return state
       }
   }
   
   
   
   
   export default savings_reducer
   
   
   
   //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
   /*
   the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 
   
   Initial State
   
      The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
      individuals life can have its different types of income set.
   
   */