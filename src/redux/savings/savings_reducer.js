
import _ from "lodash"

  const initialState = {
    TFSAcontribution: { 
    registration: "TFSA",
    label: "contribution",    
    id: "TFSAcontribution",                                                                             //the label is editable by the user and is what is displayed 
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
TFSAwithdrawal: {
    label: "TFSA Withdrawal",
    registration: "TFSA",
    id: "TFSAwithdrawal",
    transaction: "withdrawal",
    category: "TFSA Income",
    type: "retirementIncome",
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
    RRSPcontribution: { 
    registration: "RRSP",
    label: "contribution",    
    id: "RRSPcontribution",                                                                             //the label is editable by the user and is what is displayed 
    transaction: "contribution",                                                                                        //examples include "employment", "business", "pension"
    color: '#D8BABB',                                                                                 //Some forms of income might not be taxable such as inheritance
    fromAge: 18,
    toAge: 64,
    value: {                                                                                        //The value of the income being added
        rangeBarValue: 0,
        financialValue: 0,
        name: "value",
        label: "Annual Contribution",
    }   
},
    RRSPwithdrawal: {
        label: "RRSP Withdrawal",
        registration: "RRSP",
        id: "RRSPwithdrawal",
        transaction: "withdrawal",
        category: "RRSP Income",
        type: "retirementIncome",
        color: '#D8BABB',
        fromAge: 65,
        toAge: 95,
        value: {
            rangeBarValue: 0,
            financialValue: 0,
            name: "value",
            label: "Additional Annual Withdrawal",
        },
    
},
   }
   
    const savings_reducer = (state = initialState, action) => {
       switch(action.type) {
        case "savings_reducer/ADD": return {...state, [action.payload.id]: action.payload}
        case "savings_reducer/DELETE": return  _.omit(state, [action.id])                  
        case "savings_reducer/SET_VALUE": return {...state, [action.id]: {                                              //creates a copy of state and enters the object with the correct id
                                                            ...state[action.id], value: {                               //creates a copy of the object with that id and enters the value object
                                                                    ...state[action.id].value,                          //creates a copy of the value object
                                                                    financialValue: action.financialValue,              //sets the financialValue with the new value
                                                                    rangeBarValue: action.rangeBarValue,                //sets the rangeBar value             
            }
}}
        case "savings_reducer/SET_NESTED_KEY_VALUE": return {...state, [action.parentKey]: {
                                                             ...state[action.parentKey], [action.childKey]: action.value
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