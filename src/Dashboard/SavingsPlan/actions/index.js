

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
export const calculateSavings_action = (age, name) =>  ({
    type: "savingsPerYear/CALCULATE_SAVINGS",
        age, 
        name
}) 

export const calculateRrifWithdrawal_action = (age) => ({
    type: "savingsPerYear/CALCULATE_RRIF_WITHDRAWAL",
    age
})

