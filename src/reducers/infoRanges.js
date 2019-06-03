export const timelineRanges = () => {
    return [
        {className: "timeline", action: "SET_AGE", type: "number", name: "currentAge", min: 20, max: 80, label: "Age", explanation: "Your current age is used to calculate how long you have until you retire. The longer your savings timeline the less you will have to save each month.  "},
        {className: "timeline", action: "SET_RETIREMENT_AGE", type: "number", name: "retirementAge", min: 40, max: 80, label: "Retirement Age", explanation: "Your Retirement age is used to calculate both how long you have to save and how long you will need to fund your retirement." },
        {className: "timeline", action: "LIFE_SPAN", type: "number", name: "lifespan", min: 70, max: 120, label: "Estimated Life Span", explanation: "As morbid as it sounds this is essential in calculating how long you will be retired. According to our math your retirement savings will make its last payment on the day you die. " },
           ]
}

export const financialsRanges = [
    {className: "financials", action: "", type: "currency", name: "currentIncome", min: 0, max: 200000,  step: 1000, label: "Current Income", explanation: "Your current age is used to calculate how long you have until you retire. The longer your savings timeline the less you will have to save each month.  "},
    {className: "financials", action: "", type: "currency", name: "retirementIncome", min: 15000, max: 200000, step: 1000, label: "Desired Retirement Income", explanation: "Your Retirement age is used to calculate both how long you have to save and how long you will need to fund your retirement." },
    {className: "financials", action: "", type: "currency", name: "currentSavings", min: 0, max: 200000, step: 1000, label: "Current Savings", explanation: "As morbid as it sounds this is essential in calculating how long you will be retired. According to our math your retirement savings will make its last payment on the day you die. " },
  ]
export const investingStrategyRanges = [
    {className: "investing", action: "", type: "percentage", name: "growthInvestmentReturn", min: 0.00, max: 0.12, step: 0.001, label: "High-Risk Investment Return", explanation: "Your current age is used to calculate how long you have until you retire. The longer your savings timeline the less you will have to save each month.  "},
    {className: "investing", action: "", type: "percentage", name: "conservativeInvestmentReturn", min: 0.00, max: 0.12, step: 0.001, label: "Low-Risk Investment Return", explanation: "Your current age is used to calculate how long you have until you retire. The longer your savings timeline the less you will have to save each month.  "},
    {className: "investing", action: "", type: "percentage", name: "inflationRate", min: 0.00, max: 0.06, step: 0.001, label: "Inflation Rate", explanation: "Your current age is used to calculate how long you have until you retire. The longer your savings timeline the less you will have to save each month.  "},
    {className: "investing", action: "", type: "percentage", name: "managementFee", min: 0.00, max: 0.04, step: 0.001, label: "Management Fee", explanation: "Your current age is used to calculate how long you have until you retire. The longer your savings timeline the less you will have to save each month.  "},
  
  ]