
export const incomeStream_data = (category, fromAge, toAge, incomeFinancial, incomeRangeBar, color, contributeToCPP) => ({                                              //this is the initial state of income being stored to the reducer. 
    label: category,                                                                                 //the label is editable by the user and is what is displayed 
    contributeToCPP, 
    category,                                                                                        //examples include "employment", "business", "pension"
    color, 
    taxable: true,                                                                                   //Some forms of income might not be taxable such as inheritance
    fromAge,
    toAge,
    income: {                                                                                        //The value of the income being added
        rangeBarValue: incomeRangeBar,
        financialValue: incomeFinancial,
        name: "income",
        label: "Income Amount",
    },
})

export const displayBox_data = [
    {
        title: "Employment Income",
        incomeType: "employment",
        contributeToCPP: true,
    },
    {
        title: "Business / Investment Income",
        incomeType: "business",
        contributeToCPP: false,
    },
    {
        title: "Retirment Income",
        incomeType: "retirement",
        contributeToCPP: "retirement",
    }
]

export const colorArray_data = ["#4BB9D0",'#72929B',  "#B0CFE3", '#FEDE76', '#81CCAF',  '#78b7bb','#D4D4D4','#72929B', "#F29278", '#FEDE76', "#a4d7e1", "#81CCAF", '#F7CDAB', '#D8BABB']