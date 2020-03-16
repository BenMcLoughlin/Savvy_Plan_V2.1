
export const incomeStream_data = (category, fromAge, toAge,  financialValue, rangeBarValue,color, type) => ({                                              //this is the initial state of value being stored to the reducer. 
    label: category,                                                                                 //the label is editable by the user and is what is displayed 
    type, 
    category,                                                                                        //examples include "employment", "business", "pension"
    color, 
    taxable: true,                                                                                  //Some forms of value might not be taxable such as inheritance
    fromAge,
    toAge,
    value: {                                                                                        //The value of the value being added
        rangeBarValue,
        financialValue,
        name: "value",
        label: "Income Amount",
    },
})

export const displayBox_data = [
    {
        type: "employmentIncome",
    },
    {
        type: "businessIncome",
    },
    {
        type: "retirementIncome",
    }
]
export const retirementIncome_data = [
    {
        type: "employmentIncome",
    },
    {
        type: "businessIncome",
    },
    {
        type: "retirementIncome",
    }
]

export const colorArray_data = ["#4BB9D0",'#72929B',  "#B0CFE3", '#FEDE76', '#81CCAF',  '#78b7bb','#D4D4D4','#72929B', "#F29278", '#FEDE76', "#a4d7e1", "#81CCAF", '#F7CDAB', '#D8BABB']