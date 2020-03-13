
export const savingsInstance_data = (transaction, fromAge, toAge, incomeFinancial, incomeRangeBar, color, type) => ({                                              //this is the initial state of income being stored to the reducer. 
    label: transaction,                                                                                 //the label is editable by the user and is what is displayed 
    type: "retirementIncome",
    category: "TFSA Income",
    registration: "tfsa",    
    transaction,                                                                                        //examples include "employment", "business", "pension"
    color: '#8CB8B7',                                                                                           //Some forms of income might not be taxable such as inheritance
    type: "tsfaIncome",
    fromAge,
    toAge,
    value: {                                                                                        //The value of the income being added
        rangeBarValue: incomeRangeBar,
        financialValue: incomeFinancial,
        name: "value",
        label: `Annual ${transaction}`,
    },
})

