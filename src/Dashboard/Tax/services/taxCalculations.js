const fTR = { // Federal Tax Rates and Factors
    factors: {
        basicPersonal: 12069,
        employmentAmount: 1222,
        eligibleDividendGrossUp: 1.38, 
        eligibleDividendTaxCredit: 0.1502, 
        nonEligibleDividendGrossUp: 1.15, 
        nonEligibleDividendTaxCredit: 0.1052

    },
    1:{
        top: 47630,
        rate: .15,
        constant: 0,
    },
    2: {
        top: 95259,
        rate: .205,
        constant: 2620,
    },
    3: {
        top: 147667,
        rate: .26,
        constant: 7859,
    },
    4: {
        top: 210371,
        rate: .29,
        constant: 12289
    },
    5: {
        top: 1000000000,
        rate: .33,
        constant: 20704,
    }
}

const pTR = { // Provincial Tax Rates and factors
    factors: {
        basicPersonal: 10682,
        eligibleDividendGrossUp: 1.38, 
        eligibleDividendTaxCredit: 0.10, 
        nonEligibleDividendGrossUp: 1.16, 
        nonEligibleDividendTaxCredit: 0.0196, 
    },
    1:{
        top: 40707,
        rate: .0506,
        constant: 0,
    },
    2:{
        top: 81416,
        rate: .077,
        constant: 1075,
    },
    3: {
        top: 93476,
        rate: .105,
        constant: 3354,
    },
    4: {
        top: 113506,
        rate: .1229,
        constant: 5028,
    },
    5: {
        top: 153900,
        rate: .147,
        constant: 7763,
    },
    6: {
        top: 100000000,
        rate: .168,
        constant: 10995,
    },
}

const factors = {
    ympe: 57400, //maximum pensionable Earnings
    cppSelfTotalContributionRate: 0.102, 
    cppMaximumPremium: 5497.80,
    ymie: 53100, //years maximum insurable earnings,
    eiContributionRate: 0.0162, 
    eiMaximumPremium: 860.22,
}


export const calculateCPPandEI = (EI, SEI) => {
    const totalIncome = EI + SEI
    const employedPercentage = EI / totalIncome
    const selfEmployedPercentage = SEI / totalIncome

    const CPPContribution = totalIncome > (factors.ympe - 3500) ? factors.cppMaximumPremium : 
    (totalIncome - 3500) * factors.cppSelfTotalContributionRate

    const EIContribution = EI > factors.ymie ? factors.eiMaximumPremium : 
    EI  * factors.eiContributionRate

    const employedCPPContribution = (CPPContribution * employedPercentage) / 2
    const selfEmployedCPPContribution = CPPContribution * selfEmployedPercentage
    const total = employedCPPContribution + selfEmployedCPPContribution +  EIContribution 
    return total > 0 ? total : 0
}


 export const calculateFederalTaxes = (income) => {

    const taxes = income <= fTR[1].top ? income * fTR[1].rate : 
                     income > fTR[1].top && income <= fTR[2].top ? (income * fTR[2].rate) - fTR[2].constant : 
                     income > fTR[2].top && income <= fTR[3].top ? (income * fTR[3].rate) - fTR[3].constant : 
                     income > fTR[3].top && income <= fTR[4].top ? (income * fTR[4].rate) - fTR[4].constant :
                     income * fTR[5].rate - fTR[5].constant

    return taxes > 0 ? taxes : 0

    }

 export const calculateProvincialTaxes = (income) => {

    const taxes = income <= pTR[1].top ? income * pTR[1].rate : 
                     income > pTR[1].top && income <= pTR[2].top ? (income * pTR[2].rate) - pTR[2].constant : 
                     income > pTR[2].top && income <= pTR[3].top ? (income * pTR[3].rate) - pTR[3].constant : 
                     income > pTR[3].top && income <= pTR[4].top ? (income * pTR[4].rate) - pTR[4].constant :
                     income > pTR[4].top && income <= pTR[5].top ? (income * pTR[5].rate) - pTR[5].constant :
                     income * pTR[6].rate -pTR[6].constant

    return taxes > 0 ? taxes : 0
    }



const calculateFederalCredits = (income, CppAndEI, EDI, NEDI, age, child, pension, disability, dependant, tuition, ) => {
  const totalValue = fTR.factors.basicPersonal + fTR.factors.employmentAmount + CppAndEI + age + child + pension + disability + dependant + tuition
  const nonRefundableCredits = income < 5000 ? 0 : totalValue * fTR[1].rate
  const eligibleDividendCredit = (EDI * fTR.factors.eligibleDividendGrossUp) * fTR.factors.eligibleDividendTaxCredit
  const nonEligibleDividendCredit = (NEDI * fTR.factors.eligibleDividendGrossUp) * fTR.factors.nonEligibleDividendTaxCredit

  return nonRefundableCredits + eligibleDividendCredit + nonEligibleDividendCredit
 
}
const calculateProvincialCredits = (income, CppAndEI, EDI, NEDI, age, child, pension, disability, dependant, tuition, ) => {
  const totalValue = pTR.factors.basicPersonal + CppAndEI + age + child + pension + disability + dependant + tuition
  const nonRefundableCredits = income < 5000 ? 0 : totalValue * pTR[1].rate
  const eligibleDividendCredit = (EDI * pTR.factors.eligibleDividendGrossUp) * pTR.factors.eligibleDividendTaxCredit
  const nonEligibleDividendCredit = (NEDI * pTR.factors.eligibleDividendGrossUp) * pTR.factors.nonEligibleDividendTaxCredit

  return nonRefundableCredits + eligibleDividendCredit + nonEligibleDividendCredit
}


export const calculateTaxesByBracket = (EI, SEI, CG, EDI, NEDI) => {
    const actualIncome = EI + SEI + CG + EDI + NEDI
    const taxableIncome =  EI + SEI + (CG/2) + (EDI * fTR.factors.eligibleDividendGrossUp) + (NEDI * fTR.factors.nonEligibleDividendGrossUp)
    const EIPercentage = EI/(EI + SEI) 
    const SEIPercentage = SEI / (EI + SEI) 

    const data = []
    for(let i = 1; i <= 5; i++) {
        const income = taxableIncome > fTR[i].top ? fTR[i].top : taxableIncome
        const marginalIncome =  i > 1 ? income - data[i-2].income : income
        const totalCppAndEI = calculateCPPandEI((EIPercentage * income),( SEIPercentage * income))
        const cppAndEI = i > 1 ? totalCppAndEI - data[i-2].totalCppAndEI : totalCppAndEI
        const totalFederalTax = calculateFederalTaxes(income)
        const marginalFederalTax =  i > 1 ? totalFederalTax - data[i-2].totalFederalTax : totalFederalTax    
        const totalFederalTaxCredits = calculateFederalCredits(taxableIncome, totalCppAndEI, EDI, NEDI, 0,0,0,0,0,0 )
        const federalTaxCredits = totalFederalTaxCredits >= totalFederalTax ? totalFederalTax : totalFederalTaxCredits 
        const marginalFederalTaxCredits = i > 1 ? federalTaxCredits - data[i-2].federalTaxCredits : federalTaxCredits 
        const federalTax = marginalFederalTax - marginalFederalTaxCredits
        const totalProvincialTax = calculateProvincialTaxes(income)
        const marginalProvincialTax = i > 1 ? totalProvincialTax - data[i-2].totalProvincialTax : totalProvincialTax
        const totalProvincialTaxCredits = calculateProvincialCredits(taxableIncome, totalCppAndEI, EDI, NEDI, 0,0,0,0,0,0  )
        const provincialTaxCredits = totalProvincialTaxCredits >= totalProvincialTax ? totalProvincialTax : totalProvincialTaxCredits 
        const marginalProvincialTaxCredits = i > 1 ? provincialTaxCredits - data[i-2].provincialTaxCredits : provincialTaxCredits 
        const provincialTax = marginalProvincialTax - marginalProvincialTaxCredits
        const marginalFederalTaxRate = federalTax / marginalIncome
        const marginalProvincialTaxRate = provincialTax / marginalIncome
        const cppAndEITaxRate = cppAndEI / marginalIncome
        const totalMarginalRate = marginalFederalTaxRate + marginalProvincialTaxRate + cppAndEITaxRate
        const marginalAfterTaxAndCreditIncome = marginalIncome - marginalFederalTax - marginalProvincialTax - cppAndEI


      data.push({
        bracket: i,
        income,
        marginalIncome,
        totalCppAndEI,
        cppAndEI,
        totalFederalTax,
        marginalFederalTax,
        federalTaxCredits, 
        marginalFederalTaxCredits, 
        federalTax,
        totalProvincialTax,
        marginalProvincialTax,
        marginalFederalTaxCredits,
        provincialTaxCredits, 
        marginalProvincialTaxCredits,
        provincialTax,
        taxCredits: marginalFederalTaxCredits + marginalProvincialTaxCredits,
        incomeAfterTax: i > 1 ? marginalAfterTaxAndCreditIncome : marginalAfterTaxAndCreditIncome + (CG/2)

      })
    }
    return data
}





