export const setPayload = (selectedAge, name, label, financialValue, rangeBarValue, contributeToCPP) => ({
        type: "SET_INCOME_REFACTOR", 
        payload: {
            age: selectedAge, 
            label: label,
            financialValue: Math.round(financialValue*100)/100, 
            rangeBarValue: rangeBarValue,
            contributeToCPP: contributeToCPP
        }
})

export const removeItem = (selectedAge, name) => ({
        type: "REMOVE_INCOME_TYPE", 
        payload: {
            selectedAge: selectedAge, 
            name: name,

}})
