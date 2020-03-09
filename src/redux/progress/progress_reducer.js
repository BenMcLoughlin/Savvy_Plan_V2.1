
const initialState = {
    onboarding: 0,
    netWorth: 0,
    spending: 0,
    income: 0,
    saving: 0,
    taxes: 0,
    dashboard: 0,
    incomeColor: 0,
}

 const progress_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "progress/SET_POSITION": return {...state, [action.section]: action.value}
        default: return state
    }
}




export default progress_reducer



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 

Initial State

   The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
   individuals life can have its different types of income set.

*/