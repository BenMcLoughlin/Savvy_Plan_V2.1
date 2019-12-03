
const withdrawalTable = {
    50:	0.025,
    51:	0.026,
    52:	0.026,
    53:	0.027,
    54:	0.028,
    55:	0.029,
    56:	0.029,
    57:	0.030,
    58:	0.031,
    59:	0.032,
    60:	0.033,
    61:	0.034,
    62:	0.036,
    63:	0.037,
    64:	0.038,
    65:	0.04,
    66:	0.0417,
    67:	0.0435,
    68:	0.0455,
    69:	0.0476,
    70:	0.0500,
    71:	0.0528,
    72:	0.0540,
    73:	0.0553,
    74:	0.0567,
    75:	0.0582,
    76:	0.0598,
    77:	0.0617,
    78:	0.0636,
    79:	0.0658,
    80:	0.0682,
    81:	0.0708,
    82:	0.0738,
    83:	0.0771,
    84:	0.0808,
    85:	0.0851,
    86:	0.0899,
    87:	0.0955,
    88:	0.1021,
    89:	0.1099,
    90:	0.1192,
    91:	0.1306,
    92:	0.1449,
    93:	0.1634,
    94:	0.1879,
    95: 0.2,
}


const calculateRrifWithdrawal = (age, state) => {
    const rate = withdrawalTable[age]
    const withdrawal = rate * state[age].rrsp.startValue
    return withdrawal
}

export const calculateStartValue = (age, name, state) => {
    return state[age-1][name].endValue

}
export const calculateEndValue = (startValue, age, name,state) => {
    const {financialValue} = state[age][name]
    return  startValue * (1 + 0.01) + financialValue

}

const initialState = () => {
    const incomePerYear = {}
    for (let i = 18; i <= 95; i++) {
        incomePerYear[Number(i)] = {
                rrsp: {
                    age: i, 
                    endValue: 0,
                    financialValue: 0, 
                    label: "RRSP",
                    name: "rrsp",
                    startValue: 0,
                    rangeBarValue: 0, 
                },
              tfsa: {
                    age: i, 
                    endValue: 0,
                    financialValue: 0,  
                    label: "Tax Free Savings Account",
                    name: "tfsa",
                    startValue: 0,
                    rangeBarValue: 0, 

                },
                nonRegistered: {
                    age: i, 
                    endValue: 0,
                    financialValue: 0, 
                    label: "Non Registered",
                    name: "nonRegistered",
                    startValue: 0,
                    rangeBarValue: 0, 
                }
        }}
return incomePerYear
}

 const savingsPerYear_reducer = (state = initialState(), action) => {
    switch(action.type) {
        case "savingsPerYear/SET_VALUE": return {...state, [action.payload.age]: {
                                        ...state[action.payload.age], [action.payload.name]: action.payload
                                        }}
        case "savingsPerYear/CALCULATE_SAVINGS": 
        const startValue = calculateStartValue(action.age, action.name, state)
        const endValue = calculateEndValue(startValue, action.age, action.name, state)
                                        return {...state, [action.age]: {
                                        ...state[action.age], [action.name]: {
                                            ...state[action.age][action.name], 
                                                                                    startValue, 
                                                                                    endValue
                                } 
            }
        }
        case "savingsPerYear/CALCULATE_RRIF_WITHDRAWAL":
            const withdrawal = calculateRrifWithdrawal(action.age, state)
                                    return {...state, [action.age]: {
                                        ...state[action.age], rrsp: {
                                            ...state[action.age].rrsp, financialValue: -withdrawal
                                        }
                                    }}
      
        default: return state
    }
}




export default savingsPerYear_reducer



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 

Initial State

   The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
   individuals life can have its different types of income set.

*/