export const setTaxIncome_action = (name, financialValue, rangeBarValue, section) => ({
        type: "SET_INCOME_FOR_TAX_CALCULATOR", 
             name,
            financialValue: Math.round(financialValue*100)/100, 
            rangeBarValue,
            section
})


