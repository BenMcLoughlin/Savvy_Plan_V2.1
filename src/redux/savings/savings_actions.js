

export const transaction_action = (age, name, transaction, rangeBarValue, rate1, rate2, retirementAge, value) => ({
    type: "savings_reducer/TRANSACTION", 
            age,
            name, 
            rangeBarValue, 
            rate1,
            rate2,
            retirementAge,
            value,
            transaction
})


export const setOpitmizedValues_action = (age, name, transaction, value) => {
    return {
        type: "investmentReturns/SET_OPTIMIZED_VALUE", 
            age,
            name, 
            transaction,
            value,
    }
    }

export const setMaxContribution_action = (age, name, value) => ({
        type: "savingsPerYear/SET_MAX_CONTRIBUTION",
            age,
            name,
            value
    })
    
