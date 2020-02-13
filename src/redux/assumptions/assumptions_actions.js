export const setInvestmentFactor_action = (name, value) => {
    return {
        type: "assumptions/SET_VALUE", 
            name, 
            value 
    }
    }