const initialState = {
    startAge: 18, 
    endAge: 65, 
}



const lifeTimeIncomeVariableState = (state = initialState, action) => {
    switch(action.type) {
        case "SET_AGE_RANGE": return {...state, startAge: action.payload.startAge, endAge: action.payload.endAge}
        case "SET_INCOME": return {...state, [action.payload.incomeName]: action.payload.incomeValue}

        default: return state
    }
}

export default lifeTimeIncomeVariableState