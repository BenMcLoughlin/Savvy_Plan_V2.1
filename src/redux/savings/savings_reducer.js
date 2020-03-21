
import _ from "lodash"

  const initialState = {
    TFSAcontribution: {
        color: '#D8BABB',
        fromAge: 18,
        reg: "TFSA",
        stream: "TFSA Contributions",
        toAge: 64,
        id: "TFSAcontribution",
        transaction: "contribution",
        value: 0,
    },
    TFSAwithdrawal: {
        color: '#D8BABB',
        fromAge: 65,
        reg: "TFSA",
        stream: "TFSA Withdrawals",
        toAge: 95,
        id: "TFSAwithdrawal",
        transaction: "withdrawal",
        value: 0,
    },
    RRSPcontribution: {
        color: '#D8BABB',
        fromAge: 18,
        reg: "RRSP",
        stream: "RRSP Contributions",
        toAge: 65,
        id: "RRSPcontribution",
        transaction: "contribution",
        value: 0,
    },  
    RRSPwithdrawal: {
        color: '#D8BABB',
        fromAge: 66,
        reg: "RRSP",
        stream: "RRSP Withdrawals",
        toAge: 95,
        id: "RRSPwithdrawal",
        transaction: "withdrawal",
        value: 0,
    },
}
   
   
    const savings_reducer = (state = initialState, action) => {
       switch(action.type) {
        case "savings_reducer/DELETE": return  _.omit(state, [action.id])                  
        case "savings_reducer/SET_KEY_VALUE": return {...state, [action.key]: action.value}                            //sets a simple key value pair within the reducer object
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