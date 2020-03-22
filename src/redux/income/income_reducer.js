import _ from "lodash"

const initialState = {

    TFSAwithdrawal: {
        color:  "#8CB8B7",
        fromAge: 65,
        reg: "TFSA",
        stream: "TFSA Income",
        toAge: 95,
        id: "TFSAwithdrawal",
        transaction: "withdrawal",
        value: 0,
    },
    RRSPwithdrawal: {
        color: '#D8BABB',
        fromAge: 65,
        reg: "RRSP",
        stream: "RRSP Income",
        toAge: 95,
        id: "RRSPwithdrawal",
        value: 0,
}
}

 const income_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "income_reducer/DELETE": return  _.omit(state, [action.id])                  
        case "income_reducer/SET_NESTED_KEY_VALUE": return {...state, [action.parentKey]: {                           //make a copy of state, enter object, here parentKey is the id
                                                    ...state[action.parentKey], [action.childKey]: action.value       //make a copy of object, change the key
          }}
        case "income_reducer/SET_KEY_VALUE": return {...state, [action.key]: action.value}                            //sets a simple key value pair within the reducer object


        default: return state
    }
}




export default income_reducer



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 

Initial State

   The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
   individuals life can have its different types of income set.

*/