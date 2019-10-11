export const timelineRanges = () => {
    return [
        {classType: "title", 
         type: "range",
         name: "currentAge", 
         min: 20, 
         max: 80, 
         label: "Real estate", 
         explanation: "Your current age is used to calculate how long you have until you retire. The longer your savings timeline the less you will have to save each month.  "},
         
        {classType: "timeline", 
         type: "range",
         name: "primaryResidence", 
         min: 0, 
         max: 800000, 
         label: "Primary Residence", 
         explanation: "Your current age is used to calculate how long you have until you retire. The longer your savings timeline the less you will have to save each month.  "},

        {classType: "timeline", 
         type: "range", 
         name: "retirementAge", 
         min: 40, 
         max: 80, 
         label: "Retirement Age", 
         explanation: "Your Retirement age is used to calculate both how long you have to save and how long you will need to fund your retirement." },

        {classType: "timeline", 
         type: "range", 
         name: "lifeSpan", 
         min: 70, 
         max: 120, 
         label: "Estimated Life Span", 
         explanation: "As morbid as it sounds this is essential in calculating how long you will be retired. According to our math your retirement savings will make its last payment on the day you die. " },
        
         {classType: "timeline", 
         type: "range", 
         name: "propertyValue1", 
         min: 0, 
         max: 1000000, 
         label: "Primary Residence", 
         explanation: "As morbid as it sounds this is essential in calculating how long you will be retired. According to our math your retirement savings will make its last payment on the day you die. " },
           ]
}

