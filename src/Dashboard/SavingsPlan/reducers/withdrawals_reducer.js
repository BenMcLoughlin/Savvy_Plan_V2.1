
const initialState = {
    rrsp: {
        financialValue: 0, 
        label: "RRSP Withdrawals",
        name: "rrsp",
        rangeBarValue: 0, 
    },
    tfsa: {
        financialValue: 0, 
        label: "TFSA Withdrawals",
        name: "tfsa",
        rangeBarValue: 0, 

        },
    nonRegistered: {
        financialValue: 0, 
        label: "Non-Registered Withdrawals",
        name: "nonRegistered",
        rangeBarValue: 0, 
    }
}

const withdrawals_reducer = (state = initialState, action) => {
switch(action.type) {
    case "withdrawals/SET_VALUE": return {...state, [action.payload.name]:  action.payload}
    default: return state
}     
}


export default withdrawals_reducer

