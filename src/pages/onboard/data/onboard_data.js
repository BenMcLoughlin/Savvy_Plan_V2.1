    
   export const rates_data = [
    {
        name: "rate1",
        label: "Before Retirement Return",
        value: .065, 
        min: 0,
        max: .11,
        step: .0001,
        numberType: "percentage",
    },
    {
        name: "rate2",
        label: "After Retirement Return ",
        value: .05, 
        min: 0,
        max: .1,
        step: .0001,
        numberType: "percentage",
    },
    {
        name: "MER",
        label: "Management Fee",
        value: .02, 
        min: 0,
        max: .035,
        step: .0001,
        numberType: "percentage",
    },
    {
        name: "inflationRate",
        label: "Inflation Rate",
        value:.02, 
        min: 0,
        max: .1,
        step: .0001,
        numberType: "percentage",
    },
    {
        name: "propertyAppreciation",
        label: "Property Appreciation",
        value:.02, 
        min: 0,
        max: .1,
        step: .0001,
        numberType: "percentage",
    },
   ] 


   export const child_data = (value) => ({                                           
    type: "child", 
    birthYear: value, 
 })