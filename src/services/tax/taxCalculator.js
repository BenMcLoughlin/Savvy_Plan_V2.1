let federalTaxRates = [
    {
        bracket: 1,
        bottom: 0,
        top: 47630,
        taxRate: .15,
        constant: 0,
        basicPersonal: 12069,
        eligibleDividendGrossUp: 0.38, 
        eligibleDividendTaxCredit: 0.1502, 
        nonEligibleDividendGrossUp: 0.15, 
        nonEligibleDividendTaxCredit: 0.0903, 
    },
    {
        bracket: 2,
        bottom: 47630,
        top: 95259,
        taxRate: .205,
        constant: 2620,
    },
    {
        bracket: 3,
        bottom: 95259,
        top: 147667,
        taxRate: .26,
        constant: 7859,
    },
    {
        bracket: 4,
        bottom: 147667,
        top: 210371,
        taxRate: .29,
        constant: 12289,
    },
    {
        bracket: 5,
        bottom: 210371,
        top: 100000000,
        taxRate: .33,
        constant: 20704,
    }
]

const bcTaxRates = [{
    bracket: 1,
    bottom: 0,
    top: 40707,
    taxRate: .0506,
    constant: 0,
    basicPersonal: 10682,
    eligibleDividendGrossUp: 0.38, 
    eligibleDividendTaxCredit: 0.12, 
    nonEligibleDividendGrossUp: 0.16, 
    nonEligibleDividendTaxCredit: 0.0196, 
},
{
    bracket: 2,
    bottom: 40707,
    top: 81416,
    taxRate: .077,
    constant: 1075,
},
{
    bracket: 3,
    bottom: 81416,
    top: 93476,
    taxRate: .105,
    constant: 3354,
},
{
    bracket: 4,
    bottom: 93476.01,
    top: 113506,
    taxRate: .1229,
    constant: 5028,
},
{
    bracket: 5,
    bottom: 113506,
    top: 153900,
    taxRate: .147,
    constant: 7763,
},
{
    bracket: 6,
    bottom: 153900,
    top: 1000000,
    taxRate: .168,
    constant: 10995,
}]

const calculateMarginalTaxRate = (beforeTaxIncome) => {

    const federalMarginalRate = federalTaxRates
    .map(a => beforeTaxIncome > a.bottom && beforeTaxIncome < a.top ? 
    a.taxRate : null).filter(a => a != null)[0];

    const provincialMarginalRate = bcTaxRates
    .map(a => beforeTaxIncome > a.bottom && beforeTaxIncome < a.top ? 
      a.taxRate : null).filter(a => a != null)[0];
    
    return Number(((provincialMarginalRate + federalMarginalRate) *100).toFixed())
}


export default calculateMarginalTaxRate