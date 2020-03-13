import _ from "lodash"

const initialState = () => {
    const income = {}
    for (let i = 18; i <= 95; i++) {
        income[Number(i)] = {
                mortgage: {
                    age: i, 
                    financialValue: 0, 
                    label: "Mortgage",
                    name: "mortgage",
                    rangeBarValue: 0, 
                },
              groceries: {
                    age: i, 
                    type: true,
                    financialValue: 0, 
                    label: "Groceries",
                    name: "groceries",
                    rangeBarValue: 0, 

                },
                vehicle: {
                    age: i, 
                    financialValue: 0, 
                    label: "Vehicle",
                    name: "vehicle",
                    rangeBarValue: 0, 
                },
                travel: {
                    age: i, 

                    financialValue: 0, 
                    label: "Vehicle",
                    name: "vehicle",
                    rangeBarValue: 0, 
                },
        }}
return income
}

 const income_reducer = (state = initialState(), action) => {
    switch(action.type) {
        case "SET_VALUE": 
        return {...state, [action.payload.age]: {
                                        ...state[action.payload.age], [action.payload.name]: action.payload
                                        }}
        case "REMOVE_VALUE": 

        return {...state, [action.age]:  _.omit(state[action.age], action.name)
            }
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