

export const setSavingsValue_action = (age, financialValue, label, name, rangeBarValue) => {
return {
    type: "savingsPerYear/SET_VALUE", 
       payload: {
            age,
            endValue: 0,
            financialValue,
            label,
            name, 
            startValue: 0, 
            rangeBarValue
       } 
}
}
export const calculateSavings_action = (age, name) =>  {
    return {
    type: "savingsPerYear/CALCULATE_SAVINGS",
        age, 
        name
}} 



