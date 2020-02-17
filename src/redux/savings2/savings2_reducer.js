
   const initialState = () => {
       const savings = {
           tfsa: {
               contributionStartAge: 32,
               contributionEndAge: 54,
               startValue: {
                   financialValue: 45000,
                   rangeBarValue: 0,
                   label: "TFSA Contribution",
                   name: "tfsaContribution"
               },
               contribution: {
                   financialValue: 200,
                   rangeBarValue: 0,
                   label: "TFSA Contribution",
                   name: "tfsaContribution"
               },
               withdrawal: {
                   financialValue: 0,
                   rangeBarValue: 0,
                   label: "TFSA Contribution",
                   name: "tfsaContribution"
               },
           },
            projection: {

            }
       }

   return savings
   }
   
    const savings_reducer2 = (state = initialState(), action) => {
       switch(action.type) {
           case "savings2/SetSavings2": 
           return {...state, projection: action.newState}

           case "savings_reducer2/CONTRIBUTION": return {...state, projection: {
                                                             ...state.projection, [action.age]: {
                                                                ...state.projection[action.age], tfsa: {
                                                                    ...state.projection[action.age].tfsa,  
                                                                        contribution: action.value
                                                                } 
                                                             }
           }
   
           }
           case "savingsPerYear/SET_MAX_CONTRIBUTION": return {...state, [action.age]: {
                                                                        ...state[action.age], [action.name]: {
                                                                           ...state[action.age][action.name],
                                                                                maxContribution: action.value
                                                                        }
           }
   
           }
           
           default: return state
       }
   }
   
   
   
   
   export default savings_reducer2
   
   
   
   //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
   /*
   the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 
   
   Initial State
   
      The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
      individuals life can have its different types of income set.
   
   */