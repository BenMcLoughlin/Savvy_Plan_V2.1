export const setIncome_action = (age, contributeToCpp, financialValue, label, name, rangeBarValue, ) => ({
    type: "SET_INCOME_PER_YEAR", 
    payload: {
        age, 
        contributeToCpp, 
        financialValue, 
        label,
        name,
        rangeBarValue,
    }
})

export const removeItem_action = (age, name) => ({
    type: "REMOVE_INCOME_TYPE_REFACTOR", 
        age,
        name
})


export const setKeyVariable_action = (name, value) => ({
type: "SET_KEY_VARIABLE", 
        name, 
        value: value < 19 ? 18 : value

})
export const calculateCpp_action = (age, cppStartAge, cacheKey) => {
return {
    type: "CALCULATE_CPP_REFACTOR", 
        age,   
        cacheKey,
        cppStartAge, 
}
}

export const setPensionStartAge_action = (name, value) => {
return {
    type: "SET_PENSION_START_AGE", 
        name, 
        value 
}
}

