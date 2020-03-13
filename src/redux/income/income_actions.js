export const addIncome_action = (id, state) => {
   return ({
    type: "income/ADD_INCOME",
    payload: {
        id,
        ...state,
    }
})}

export const incomeValue_action = (id, financialValue, rangeBarValue, {name}) => ({
    type: "income/CHANGE_INCOME",
    id, 
    name,
    financialValue,
    rangeBarValue
})
export const changeLabel_action = (id, key, event) => ({
    type: "income/CHANGE_LABEL",
    id, 
    key,
    event
})



export const incomeAge_action = (id, ageType, value) => {

    return ({
    type: "income/CHANGE_AGE",
    id, 
    ageType,
    value
})}

export const deleteIncome_action = (id) => ({
    type: "income/DELETE",
    id,
})



