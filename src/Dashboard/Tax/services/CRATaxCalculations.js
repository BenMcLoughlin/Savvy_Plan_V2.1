const fTR = { // Federal Tax Rates and Factors
    factors: {
        basicPersonal: 12069,
        employmentAmount: 1222,
        eligibleDividendGrossUp: 0.38, 
        eligibleDividendTaxCredit: 0.1502, 
        nonEligibleDividendGrossUp: 0.15, 
        nonEligibleDividendTaxCredit: 0.0903
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
        eligibleDividendGrossUp: 0.38, 
        eligibleDividendTaxCredit: 0.12, 
        nonEligibleDividendGrossUp: 0.16, 
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
    cppContributionRate: 0.051, 
    cppMaximumPremium: 2748.90,
    ymie: 53100, //years maximum insurable earnings,
    eiContributionRate: 0.0162, 
    eiMaximumPremium: 860.22,
}

 export const calculateFederalTaxes = (income) => {

    return income <= fTR[1].top ? income * fTR[1].rate : 
                     income > fTR[1].top && income <= fTR[2].top ? (income * fTR[2].rate) - fTR[2].constant : 
                     income > fTR[2].top && income <= fTR[3].top ? (income * fTR[3].rate) - fTR[3].constant : 
                     income > fTR[3].top && income <= fTR[4].top ? (income * fTR[4].rate) - fTR[4].constant :
                     income * fTR[5].rate - fTR[5].constant

    }

 export const calculateProvincialTaxes = (income) => {

    return income <= pTR[1].top ? income * pTR[1].rate : 
                     income > pTR[1].top && income <= pTR[2].top ? (income * pTR[2].rate) - pTR[2].constant : 
                     income > pTR[2].top && income <= pTR[3].top ? (income * pTR[3].rate) - pTR[3].constant : 
                     income > pTR[3].top && income <= pTR[4].top ? (income * pTR[4].rate) - pTR[4].constant :
                     income > pTR[4].top && income <= pTR[5].top ? (income * pTR[5].rate) - pTR[5].constant :
                     income * pTR[6].rate -pTR[6].constant
    }


    const calculateCPPandEI = (income) => {
        const CPPContribution =  income > (factors.ympe - 3500) ? factors.cppMaximumPremium : 
                                 (income - 3500) * factors.cppContributionRate 

        const EIContribution = income> factors.ymie ? factors.eiMaximumPremium : 
                               income * factors.eiContributionRate
    
        const total = CPPContribution + EIContribution
        return income < 3500 ? 0 : total
}

const calculateTotalFederalCredits = (income, CppAndEI, age, child, pension, disability, dependant, tuition, ) => {
const totalValue = fTR.factors.basicPersonal + fTR.factors.employmentAmount + CppAndEI + age + child + pension + disability + dependant + tuition
return income < 15000 ? 0 : totalValue * fTR[1].rate

}
const calculateTotalProvincialCredits = (income, CppAndEI, age, child, pension, disability, dependant, tuition, ) => {
const totalValue = pTR.factors.basicPersonal + CppAndEI + age + child + pension + disability + dependant + tuition
return income < 15000 ? 0 : totalValue * pTR[1].rate
}
export const calculateTaxesByBracket = (EI, SEI, CG) => {

    const income = EI + SEI + (CG/2)

    const  firstBracketIncome =  income > fTR[1].top ? fTR[1].top : income
    const  firstFederalTax = calculateFederalTaxes(firstBracketIncome)
    const  firstProvincialTax = calculateProvincialTaxes(firstBracketIncome)
    const  firstCppAndEI = calculateCPPandEI(firstBracketIncome)
    const  totalFederalCredits = calculateTotalFederalCredits(income, firstCppAndEI, 0, 0,0, 0, 0, 0)
    const  totalProvincialCredits = calculateTotalProvincialCredits(income, firstCppAndEI, 0, 0,0, 0, 0, 0)
    const  payableFederalTax = firstFederalTax - totalFederalCredits
    const  payableProvincialTax = firstProvincialTax - totalProvincialCredits

    const data = [{
        bracket: 1, 
        totalFederalTax: calculateFederalTaxes(firstBracketIncome),
        federalTax:  payableFederalTax > 0 ? payableFederalTax : 0,
        totalProvincialTax: calculateProvincialTaxes(firstBracketIncome),
        provincialTax:  payableProvincialTax > 0 ? payableProvincialTax : 0,
        totalCppAndEI:  calculateCPPandEI(firstBracketIncome),
        cppAndEI: calculateCPPandEI(firstBracketIncome),
        taxCredits: totalFederalCredits + totalProvincialCredits,
        thisBracketIncome: firstBracketIncome,
        incomeAfterTax: firstBracketIncome - firstFederalTax - firstProvincialTax - firstCppAndEI - totalProvincialCredits - totalFederalCredits + (CG / 2)
    }]

    for (let i = 2; i <=5; i++) {

        const thisBracketIncome =  income > fTR[i].top ? fTR[i].top : income
        const totalFederalTax = calculateFederalTaxes(thisBracketIncome)
        const totalProvincialTax = calculateProvincialTaxes(thisBracketIncome)
        const totalCppAndEI = calculateCPPandEI(thisBracketIncome)

       data.push ({
        bracket: i, 
        totalFederalTax,
        federalTax:  totalFederalTax - data[i-2].totalFederalTax,
        totalProvincialTax,
        provincialTax: totalProvincialTax - data[i-2].totalProvincialTax,
        totalCppAndEI,
        cppAndEI: totalCppAndEI - data[i-2].totalCppAndEI,
        taxCredits: 0,
        thisBracketIncome,
        incomeAfterTax: thisBracketIncome - data[i-2].thisBracketIncome
    }) 
}     
return data
}

// const fTR = { // Federal Tax Rates and Factors
//     factors: {
//         basicPersonal: 12069,
//         employmentAmount: 1222,
//         eligibleDividendGrossUp: 0.38, 
//         eligibleDividendTaxCredit: 0.1502, 
//         nonEligibleDividendGrossUp: 0.15, 
//         nonEligibleDividendTaxCredit: 0.0903
//     },
//     bracket1:{
//         top: 47630,
//         rate: .15,
//         constant: 0,
//     },
//     bracket2: {
//         top: 95259,
//         rate: .205,
//         constant: 2620,
//     },
//     bracket3: {
//         top: 147667,
//         rate: .26,
//         constant: 7859,
//     },
//     bracket4: {
//         top: 210371,
//         rate: .29,
//         constant: 12289
//     },
//     bracket5: {
//         top: 1000000000,
//         rate: .33,
//         constant: 20704,
//     }
// }

// const pTR = { // Provincial Tax Rates and factors
//     factors: {
//         basicPersonal: 10682,
//         eligibleDividendGrossUp: 0.38, 
//         eligibleDividendTaxCredit: 0.12, 
//         nonEligibleDividendGrossUp: 0.16, 
//         nonEligibleDividendTaxCredit: 0.0196, 
//     },
//     bracket1:{
//         top: 40707,
//         rate: .0506,
//         constant: 0,
//     },
//     bracket2:{
//         top: 81416,
//         rate: .077,
//         constant: 1075,
//     },
//     bracket3: {
//         top: 93476,
//         rate: .105,
//         constant: 3354,
//     },
//     bracket4: {
//         top: 113506,
//         rate: .1229,
//         constant: 5028,
//     },
//     bracket5: {
//         top: 153900,
//         rate: .147,
//         constant: 7763,
//     },
//     bracket6: {
//         top: 100000000,
//         rate: .168,
//         constant: 10995,
//     },
// }

// const factors = {
//     ympe: 57400, //maximum pensionable Earnings
//     cppContributionRate: 0.051, 
//     cppMaximumPremium: 2748.90,
//     ymie: 53100, //years maximum insurable earnings,
//     eiContributionRate: 0.0162, 
//     eiMaximumPremium: 860.22,
// }

// const calculateTotalFederalTaxes = (income) => {

//     return income <= fTR.bracket1.top ? income * fTR.bracket1.rate : 
//                      income > fTR.bracket1.top && income <= fTR.bracket2.top ? (income * fTR.bracket2.rate) - fTR.bracket2.constant : 
//                      income > fTR.bracket2.top && income <= fTR.bracket3.top ? (income * fTR.bracket3.rate) - fTR.bracket3.constant : 
//                      income > fTR.bracket3.top && income <= fTR.bracket4.top ? (income * fTR.bracket4.rate) - fTR.bracket4.constant :
//                      income * fTR.bracket5.rate - fTR.bracket5.constant

//     }

// const calculateTotalProvincialTaxes = (income) => {

//         return income <= fTR.bracket1.top ? income * fTR.bracket1.rate : 
//                          income > pTR.bracket1.top && income <= pTR.bracket2.top ? (income * pTR.bracket2.rate) - pTR.bracket2.constant : 
//                          income > pTR.bracket2.top && income <= pTR.bracket3.top ? (income * pTR.bracket3.rate) - pTR.bracket3.constant : 
//                          income > pTR.bracket3.top && income <= pTR.bracket4.top ? (income * pTR.bracket4.rate) - pTR.bracket4.constant :
//                          income > pTR.bracket4.top && income <= pTR.bracket5.top ? (income * pTR.bracket5.rate) - pTR.bracket5.constant :
//                          income * pTR.bracket6.rate -pTR.bracket6.constant
//         }
    
// const calculateCPPandEI = (income) => {
//                    const CPPContribution =  income > (factors.ympe - 3500) ? factors.cppMaximumPremium : 
//                                             (income - 3500) * factors.cppContributionRate 
    
//                    const EIContribution = income> factors.ymie ? factors.eiMaximumPremium : 
//                                           income * factors.eiContributionRate
               
//                    const total = CPPContribution + EIContribution
//                    return total < 100 ? 0 : total
//     }
    
//     const calculateTotalFederalCredits = (CppAndEI, age, child, pension, disability, dependant, tuition, ) => {
//         totalCredits = fTR.factors.basicPersonal + fTR.factors.employmentAmount + CppAndEI + age + child + pension + disability + dependant + tuition
//         return totalCredits * fTR.bracket1.rate
//      }
     
//      const calculateTotalProvincialCredits = (income) => {
                   
//      }

// const calculateTaxesByBracket = (income) => {
//     data = []

//     for (let i = 1; i <=5; i++) {
//         bracket: 1, 
//         federalTax: federalTaxBracket1,
//         provincialTax: provincialBracket1,
//         CppAndEI: CppAndEIBracket1,
//         afterTaxIncome: totalIncomeBracket1,
//     }
// }     

// export const calculateTaxesByBracket = (EI, SEI, II, RI, EDI, NEDI, CG) => {

//     const totalIncome = EI + SEI + II + RI + EDI + NEDI + CG

//     //Bracket  1 Variables 0 - 40707
//     const bracket1Income = totalIncome > fTR.bracket1.top ? fTR.bracket1.top : totalIncome
//     const federalTaxBracket1 =  calculateFederalTaxes(bracket1Income, SEI, II, RI, EDI,NEDI, CG)
//     const provincialBracket1 =  calculateProvincialTaxes(bracket1Income, SEI, II, RI, EDI,NEDI, CG)
//     const CppAndEIBracket1 =  calculateCPPandEI(bracket1Income, SEI)
//     const totalIncomeBracket1 =  bracket1Income - federalTaxBracket1 - provincialBracket1 - CppAndEIBracket1
  

//     //Bracket 2 Variables  40707 - 81416
//     const bracket2Income = totalIncome > fTR.bracket2.top ? fTR.bracket2.top : totalIncome
//     const federalTaxBracket2 =  calculateFederalTaxes(bracket2Income, SEI, II, RI, EDI,NEDI, CG)
//     const provincialBracket2 =  calculateProvincialTaxes(bracket2Income, SEI, II, RI, EDI,NEDI, CG) 
//     const CppAndEIBracket2 =  calculateCPPandEI(bracket2Income, SEI)
//     const totalIncomeBracket2 =  bracket2Income - totalIncomeBracket1 - federalTaxBracket2 - provincialBracket2 - CppAndEIBracket2
   
//     //Bracket 3 Variables 81416 - 93476
//     const bracket3Income = totalIncome > fTR.bracket3.top ? fTR.bracket3.top : totalIncome
//     const federalTaxBracket3 =  calculateFederalTaxes(bracket3Income, SEI, II, RI, EDI,NEDI, CG)
//     const provincialBracket3 =  calculateProvincialTaxes(bracket3Income, SEI, II, RI, EDI,NEDI, CG) 
//     const CppAndEIBracket3 =  calculateCPPandEI(bracket3Income, SEI)
//     const totalIncomeBracket3 =  bracket3Income - totalIncomeBracket2 - totalIncomeBracket1 -federalTaxBracket3 - provincialBracket3 - CppAndEIBracket3
 
//     //Bracket 4 Variables 93476 - 113506
//     const bracket4Income = totalIncome > fTR.bracket4.top ? fTR.bracket4.top : totalIncome
//     const federalTaxBracket4 =  calculateFederalTaxes(bracket4Income, SEI, II, RI, EDI, NEDI, CG)
//     const provincialBracket4 =  calculateProvincialTaxes(bracket4Income, SEI, II, RI, EDI, NEDI, CG) 
//     const CppAndEIBracket4 =  calculateCPPandEI(bracket4Income, SEI)
//     const totalIncomeBracket4 =  bracket4Income - totalIncomeBracket3 - totalIncomeBracket2 - totalIncomeBracket1 -federalTaxBracket4 - provincialBracket4 - CppAndEIBracket4
   
//     //Bracket 5 Variables 113506 - 153900
//     const bracket5Income = totalIncome > fTR.bracket5.top ? fTR.bracket5.top : totalIncome
//     const federalTaxBracket5 =  calculateFederalTaxes(bracket5Income, SEI, II, RI, EDI, NEDI, CG)
//     const provincialBracket5 =  calculateProvincialTaxes(bracket5Income, SEI, II, RI, EDI, NEDI, CG) 
//     const CppAndEIBracket5 =  calculateCPPandEI(bracket5Income, SEI)
//     const totalIncomeBracket5 =  bracket5Income - totalIncomeBracket4 - totalIncomeBracket3  - totalIncomeBracket2 - totalIncomeBracket1 -federalTaxBracket5 - provincialBracket5 - CppAndEIBracket5

//     const taxBracketArray = [
//         {
//             bracket: 1, 
//             federalTax: federalTaxBracket1,
//             provincialTax: provincialBracket1,
//             CppAndEI: CppAndEIBracket1,
//             afterTaxIncome: totalIncomeBracket1,
//         },
//         {
//             bracket: 2, 
//             federalTax: federalTaxBracket2 - federalTaxBracket1,
//             provincialTax: provincialBracket2  - provincialBracket1,
//             CppAndEI: CppAndEIBracket2 - CppAndEIBracket1,
//             afterTaxIncome: totalIncomeBracket2,
//         },
//         {
//             bracket: 3, 
//             federalTax: federalTaxBracket3 - federalTaxBracket2,
//             provincialTax: provincialBracket3  - provincialBracket2,
//             CppAndEI: CppAndEIBracket3 - CppAndEIBracket2,
//             afterTaxIncome: totalIncomeBracket3,
//         },
//         {
//             bracket: 4, 
//             federalTax: federalTaxBracket4 - federalTaxBracket3,
//             provincialTax: provincialBracket4 - provincialBracket3,
//             CppAndEI: CppAndEIBracket4 - CppAndEIBracket3,
//             afterTaxIncome: totalIncomeBracket4,
//         },
//         {
//             bracket: 5, 
//             federalTax: federalTaxBracket5 - federalTaxBracket4,
//             provincialTax: provincialBracket5 - provincialBracket4,
//             CppAndEI: CppAndEIBracket5 - CppAndEIBracket4,
//             afterTaxIncome: totalIncomeBracket5,
//         },

//     ]
//         return taxBracketArray
// }
// console.log(calculateTaxesByBracket(0,100000,0,0,0,0,0,0));



// //CALCULATE FEDERAL TAX

// export const calculateFederalTaxes = (employmentIncome, selfEmploymentIncome, interestIncome, eligibleDividends, nonEligibleDividends, capitalGains, rentalIncome ) => {
//     //const calculateFederalTaxes = (pensionableIncome, nonpensionableIncome) => {
//         //Pension and Total Income
//         const PI = employmentIncome + selfEmploymentIncome //pensionable Income
//         const TI = PI + interestIncome + eligibleDividends + nonEligibleDividends + (capitalGains/2) + rentalIncome  //Total Taxable Income
       
//         //Contributions to CPP and EI
//         const C =  PI > (factors.ympe - 3500) ? factors.cppMaximumPremium : (PI - 3500) * factors.cppContributionRate //Canada (or Quebec) Pension Plan contributions
//         const CPPContribution = C > 0 ? C : 0
    
//         const EI = PI > factors.ymie ? factors.eiMaximumPremium : PI * factors.eiContributionRate//Insurable earnings for the pay period including insurable taxable benefits
//         const EIContribution = EI > 0 ? EI : 0
    
//         //Tax Rate According to bracket
//         const R = TI <= fTR.bracket1.top ? fTR.bracket1.rate : 
//                 TI > fTR.bracket1.top &&  TI <= fTR.bracket2.top ? fTR.bracket2.rate  : 
//                 TI > fTR.bracket2.top &&  TI <= fTR.bracket3.top? fTR.bracket3.rate : 
//                 TI > fTR.bracket3.top &&  TI <= fTR.bracket4.top ? fTR.bracket4.rate :  fTR.bracket5.rate  //Federal tax rate that applies to the annual taxable income TI
    
//         //Federal constant. The constant is the tax overcharged when applying the 20.5%, 26%, 29%, and 33% rates to the annual taxable income TI       
//         const K = TI <= fTR.bracket1.top ? 0 : 
//                     TI > fTR.bracket1.top &&  TI <= fTR.bracket2.top ? fTR.bracket2.constant  : 
//                     TI > fTR.bracket2.top &&  TI <= fTR.bracket3.top? fTR.bracket3.constant : 
//                     TI > fTR.bracket3.top &&  TI <= fTR.bracket4.top ? fTR.bracket4.constant :  fTR.bracket5.constant  //Federal tax rate that applies to the annual taxable income TI
    
//         //Credits to be reduced from taxes
//         const K1 = fTR.factors.basicPersonal * fTR.bracket1.rate //Federal non-refundable personal tax credit
//         const basicPersonalCredit = K1 > 0 ? K1 : 0
       
//         const K2 = ((CPPContribution + EIContribution) * fTR.bracket1.rate)//Federal Canada Pension Plan contributions and employment insurance premiums tax credits for the year
//         const cppAndEiCredit = K2 > 0 ? K2 : 0
//         const K3 = 0 //Other federal tax credits (such as medical expenses and charitable donations) authorized by a tax services office or tax centre
        
//         const K4 = fTR.factors.employmentAmount * fTR.bracket1.rate//Canada employment amount
//         const employmentCredit = K4 > 0 ? K4 : 0
    
//         //DETERMINE FEDERAL TAXABLE INCOME ON REGULAR SALARY
//         const federalTax = (R * TI) - K - basicPersonalCredit - cppAndEiCredit - K3 - employmentCredit//Formula to calculate basic federal tax (FederalTax)
    
//         return federalTax < 10 ? 0 : federalTax
    
//     }
    
//     console.log(calculateFederalTaxes(0, 100000, 0,0,0,0,0));
    
//     //CALCULATE PROVINCIAL TAX
    
//     export const calculateProvincialTaxes = (employmentIncome, selfEmploymentIncome, interestIncome, eligibleDividends, nonEligibleDividends, capitalGains, rentalIncome ) => {
//     //const calculateProvincialTaxes = (employmentIncome, selfEmploymentIncome, interestIncome, eligibleDividends, nonEligibleDividends, capitalGains, rentalIncome ) => {
      
//         //Pension and Total Income
//         const PI = employmentIncome + selfEmploymentIncome //pensionable Income
//         const TI = PI + interestIncome + eligibleDividends + nonEligibleDividends + (capitalGains/2) + rentalIncome  //Total Taxable Income
    
//         //Contributions to CPP and EI
//         const C =  PI > (factors.ympe - 3500) ? factors.cppMaximumPremium : (PI - 3500) * factors.cppContributionRate //Canada (or Quebec) Pension Plan contributions
//         const CPPContribution = C > 0 ? C : 0
    
//         const EI = PI > factors.ymie ? factors.eiMaximumPremium : PI * factors.eiContributionRate//Insurable earnings for the pay period including insurable taxable benefits
//         const EIContribution = EI > 0 ? EI : 0
    
//         //Tax Rate According to bracket
//         const R = TI <= pTR.bracket1.top ? pTR.bracket1.rate : 
//             TI > pTR.bracket1.top &&  TI <=pTR.bracket2.top ? pTR.bracket2.rate  : 
//             TI > pTR.bracket2.top &&  TI <= pTR.bracket3.top? pTR.bracket3.rate : 
//             TI > pTR.bracket3.top &&  TI <= pTR.bracket4.top ? pTR.bracket4.rate :  
//             TI > pTR.bracket4.top &&  TI <= pTR.bracket4.top ? pTR.bracket5.rate :  pTR.bracket6.rate  //Provincial tax rate that applies to the annual taxable income TI
    
//         //Provincial constant.
//         const K = TI <= pTR.bracket1.top ? pTR.bracket1.rate : 
//             TI > pTR.bracket1.top &&  TI <=pTR.bracket2.top ? pTR.bracket2.constant  : 
//             TI > pTR.bracket2.top &&  TI <= pTR.bracket3.top? pTR.bracket3.constant : 
//             TI > pTR.bracket3.top &&  TI <= pTR.bracket4.top ? pTR.bracket4.constant :  
//             TI > pTR.bracket4.top &&  TI <= pTR.bracket4.top ? pTR.bracket5.constant :  pTR.bracket6.constant  //Provincial Constant
    
        
//         const K1 = pTR.factors.basicPersonal * pTR.bracket1.rate //Provincial non-refundable personal tax credit
//         const basicPersonalCredit = K1 > 0 ? K1 : 0
       
//         const K2 = ((CPPContribution + EIContribution) * pTR.bracket1.rate)//Provincial Canada Pension Plan contributions and employment insurance premiums tax credits for the year
//         const cppAndEiCredit = K2 > 0 ? K2 : 0
//         const K3 = 0 //Other provincial tax credits (such as medical expenses and charitable donations) authorized by a tax services office or tax centre
        
//         const provincialTax = (R * TI) - K - basicPersonalCredit - cppAndEiCredit - K3
    
//         return provincialTax < 100 ? 0 : provincialTax
//     }
    
    
//     //CALCULATE CPP AND EI
//     export const calculateCPPandEI = (employmentIncome, selfEmploymentIncome) => {
//      //const calculateCPPandEI = (employmentIncome, selfEmploymentIncome) => {
    
//             const PI = employmentIncome + selfEmploymentIncome
//             //Contributions to CPP and EI
//             const C =  PI > (factors.ympe - 3500) ? factors.cppMaximumPremium : (PI - 3500) * factors.cppContributionRate //Canada (or Quebec) Pension Plan contributions
//             const CPPContribution = C > 0 ? C : 0
    
//             const EI = PI > factors.ymie ? factors.eiMaximumPremium : PI * factors.eiContributionRate//Insurable earnings for the pay period including insurable taxable benefits
//             const EIContribution = EI > 0 ? EI : 0
        
//             const total = CPPContribution + EIContribution
//             return total < 100 ? 0 : total
//     }
    
    