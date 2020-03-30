
export const incomeStream_data = (color, age1, reg, stream, age2, value) => ({                                              //this is the initial state of value being stored to the reducer. 
    color, 
    age1, 
    reg, 
    stream, 
    taxable: true, 
    age2, 
    value,
})

export const displayBox_data = [
    {
        reg: "employmentIncome",
    },
    {
        reg: "businessIncome",
    },
    {
        reg: "retirementIncome",
    }
]
export const retirementIncome_data = [
    {
        reg: "employmentIncome",
    },
    {
        reg: "businessIncome",
    },
    {
        reg: "retirementIncome",
    }
]

export const colorArray_data = ["#4BB9D0",'#72929B',  "#B0CFE3", '#FEDE76', '#81CCAF',  '#78b7bb','#D4D4D4','#72929B', "#F29278", '#FEDE76', "#a4d7e1", "#81CCAF", '#F7CDAB', '#D8BABB']