const federalTaxRates = [
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

const provincialTaxRates = [{
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

const CRAFactors = {
    YMPE: 57400,
    CPPContributionRate: 0.051,
    basicExemption: 3500,    
    MaximumInsurableEarnings: 53100,
    EIContributionRate: 0.0162,
    FedBasicPersonal: 12069,
    EmploymentAmount: 1220,
    BCbasicPersonal: 10682,
    LowestTaxBracket: 0.15,
}


const incomeTypes = {
    employmentIncome: 10000,
    selfEmploymentIncome: 10000,
    businessIncome: 200,
    capitalGains: 200,
    eligibleDividends: 200,
    nonEligibleDividends: 200,
    rrspContribution: 200,
}

const calculateTaxes = (incomeTypes) => {
    const EI = incomeTypes.employmentIncome
    const SEI =  incomeTypes.selfEmploymentIncome
    const BI = incomeTypes.businessIncome
    const TCG = incomeTypes.capitalGains / 2
    const ED = incomeTypes.eligibleDividends
    const NED = incomeTypes.nonEligibleDividends
    const RRSP =  incomeTypes.rrspContribution

    const totalIncome = Object.values(incomeTypes).reduce((acc, num) => acc + num)

    //Bracket 1 Calcualtions
    const Bracket1CPPAndEI = totalIncome < 3500 ? 0 : totalIncome < 47630 ? totalIncome * 0.0510 : 2251;
    const Bracket1FederalTaxes = totalIncome < federalTaxRates[0].top ? totalIncome * 0.15 : 2620;
    const Bracket1ProvincialTaxes = totalIncome < 40707 ? totalIncome * 0.0506 : 1075;
    const Bracket1afterTaxIncome = totalIncome -  Bracket1CPPAndEI - Bracket1FederalTaxes - Bracket1ProvincialTaxes

    //Bracket 1 Calcualtions
    const Bracket2CPPAndEI = totalIncome < 3500 ? 0 : totalIncome < 47630 ? totalIncome * 0.0510 : 2251;
    const Bracket2FederalTaxes = totalIncome < federalTaxRates[0].top ? totalIncome * 0.15 : 2620;
    const Bracket2ProvincialTaxes = totalIncome < 40707 ? totalIncome * 0.0506 : 1075;
    const Bracket2afterTaxIncome = totalIncome < 40707 ? totalIncome * 0.0506 : 1075;

    data = [
       { 
            bracket: 1, 
            CPPAndEI: Bracket1CPPAndEI, 
            FederalTaxes: Bracket1FederalTaxes, 
            ProvincialTaxes: Bracket1ProvincialTaxes, 
            afterTaxIncome: Bracket1afterTaxIncome,
            afterTaxIncome: Bracket1afterTaxIncome,
        },




    ]

    return data
}

console.log(calculateTaxes(incomeTypes));