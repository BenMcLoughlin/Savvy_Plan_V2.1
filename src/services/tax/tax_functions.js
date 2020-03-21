import {factors, FTR, PTR} from "services/tax/tax_rates"

//DETERMINE INCOME FOR THE YEAR REQUESTED
export const incomeBreakdown = (income_selector, taxAge) => {
    const income = Object.values(income_selector).filter(d => d.fromAge <= taxAge).filter(d => d.toAge >= taxAge)                           //filter out only the income streams earned during the age provided

        const sumIncome = (incomeArray, type) =>  {                                                                                          //sums the income for the requested income stream
            const incomeByType = incomeArray.filter(d => d.type === type) 
            const exists = incomeByType.length > 0
            return exists ? incomeByType.map(d => d.value).reduce((acc, num) => acc + num) : 0
        }

return {
    EI: sumIncome(income, "employmentIncome"),
    SEI: sumIncome(income, "selfEmploymentIncome"),
    CG: sumIncome(income, "capitalGains"),
    NEDI: sumIncome(income, "nonEligibleDividends"),
    EDI: sumIncome(income, "eligibleDividends"),
    RI: sumIncome(income, "rrspIncome"),
    OAS: sumIncome(income, "oasIncome"),
    CPP: sumIncome(income, "cppIncome"),
    TFSA: sumIncome(income, "tfsaIncome"),
    }
}

//DETERMINE CPP AND EI PAYMENT
export const calculateCPPandEI = (EI, SEI) => {                                                                                //Determines the CPP and EI contributions made by the user, if the user is self employed they must also make employer contribution
    const totalIncome = EI + SEI                                                                                               //get total Income
    const employedPercentage = EI / totalIncome                                                                                //determine percentages of employed and self employed income
    const selfEmployedPercentage = SEI / totalIncome

    const CPPContribution = totalIncome > factors.ympe  ? factors.cppMaximumPremium :                                          // compares income to the years maximum pensionable earnings, if its over ympe then gives the max, 
    (totalIncome - 3500) * factors.cppSelfTotalContributionRate                                                                //otherwise it calculates it

    const EIContribution = EI > factors.ymie ? factors.eiMaximumPremium : 
    EI  * factors.eiContributionRate

    const employedCPPContribution = (CPPContribution * employedPercentage) / 2                                                      
    const selfEmployedCPPContribution = CPPContribution * selfEmployedPercentage
    const total = employedCPPContribution + selfEmployedCPPContribution +  EIContribution 
    return total > 0 ? total : 0
}


//DETERMINE FEDERAL TAXES PAYABLE
 export const calculateFederalTaxes = (income) => {

    const taxes = income <= FTR[1].top ? income * FTR[1].rate : 
                     income > FTR[1].top && income <= FTR[2].top ? (income * FTR[2].rate) - FTR[2].constant : 
                     income > FTR[2].top && income <= FTR[3].top ? (income * FTR[3].rate) - FTR[3].constant : 
                     income > FTR[3].top && income <= FTR[4].top ? (income * FTR[4].rate) - FTR[4].constant :
                     income * FTR[5].rate - FTR[5].constant

    return taxes > 0 ? taxes : 0

    }

//DETERMINE PROVINCIAL TAXES PAYABLE
 export const calculateProvincialTaxes = (income) => {

    const taxes = income <= PTR[1].top ? income * PTR[1].rate : 
                     income > PTR[1].top && income <= PTR[2].top ? (income * PTR[2].rate) - PTR[2].constant : 
                     income > PTR[2].top && income <= PTR[3].top ? (income * PTR[3].rate) - PTR[3].constant : 
                     income > PTR[3].top && income <= PTR[4].top ? (income * PTR[4].rate) - PTR[4].constant :
                     income > PTR[4].top && income <= PTR[5].top ? (income * PTR[5].rate) - PTR[5].constant :
                     income * PTR[6].rate -PTR[6].constant

    return taxes > 0 ? taxes : 0
    }

 
//DETERMINE FEDERAL TAX CREDITS
const calculateFederalCredits = (income, CppAndEI, EDI, NEDI, donation, tuition, medical, homeBuyer, firefighter, interest ) => {
  const totalValue = FTR.factors.basicPersonal + FTR.factors.employmentAmount + CppAndEI + tuition + medical + homeBuyer + firefighter + interest
  const nonRefundableBasicCredits = income < 5000 ? 0 : totalValue * FTR[1].rate
  const donationCredit =  donation <= 200 ? donation * .15 : ((donation - 200) * .29) + 30
  const eligibleDividendCredit = (EDI * FTR.factors.eligibleDividendGrossUp) * FTR.factors.eligibleDividendTaxCredit
  const nonEligibleDividendCredit = (NEDI * FTR.factors.eligibleDividendGrossUp) * FTR.factors.nonEligibleDividendTaxCredit

  return nonRefundableBasicCredits + eligibleDividendCredit + nonEligibleDividendCredit + donationCredit 
 
}

//DETERMINE FEDERAL PROVINCIAL CREDITS
const calculateProvincialCredits = (income, CppAndEI, EDI, NEDI, donation, tuition, medical, homeBuyer, firefighter, interest ) => {
  const totalValue = PTR.factors.basicPersonal + CppAndEI + donation + tuition + medical + homeBuyer + firefighter + interest
  const nonRefundableCredits = income < 5000 ? 0 : totalValue * PTR[1].rate
  const eligibleDividendCredit = (EDI * PTR.factors.eligibleDividendGrossUp) * PTR.factors.eligibleDividendTaxCredit
  const nonEligibleDividendCredit = (NEDI * PTR.factors.eligibleDividendGrossUp) * PTR.factors.nonEligibleDividendTaxCredit

  return nonRefundableCredits + eligibleDividendCredit + nonEligibleDividendCredit
}

//DETERMINE TAXES PAYABLE BY BRACKET
export const calculateTaxesByBracket = ({EI, SEI, CG, EDI, NEDI, RI, CPP, OAS, TFSA}, taxCredits_reducer)  => {
console.log(taxCredits_reducer);
    //const [donation, tuition, medical, homeBuyer, firefighter, interest] = credits.map(d => d)

//     const [donation, tuition, medical, homeBuyer, firefighter, interest] = [0,0,0,0,0,0]
// console.log(credits);
    const taxableIncome =  EI + SEI + (CG/2) + (EDI * FTR.factors.eligibleDividendGrossUp) + (NEDI * FTR.factors.nonEligibleDividendGrossUp) + RI + TFSA + OAS + CPP
    const EIPercentage = EI/(EI + SEI) 
    const SEIPercentage = SEI / (EI + SEI) 

    const data = []
    for(let i = 1; i <= 5; i++) {
        const income = taxableIncome > FTR[i].top ? FTR[i].top : taxableIncome
        const marginalIncome =  i > 1 ? income - data[i-2].income : income
        const totalCppAndEI = calculateCPPandEI((EIPercentage * income),( SEIPercentage * income))
        const cppAndEI = i > 1 ? totalCppAndEI - data[i-2].totalCppAndEI : totalCppAndEI
        const totalFederalTax = calculateFederalTaxes(income)
        const marginalFederalTax =  i > 1 ? totalFederalTax - data[i-2].totalFederalTax : totalFederalTax    
        const totalFederalTaxCredits = 1500 //calculateFederalCredits(taxableIncome, totalCppAndEI, EDI, NEDI, donation, tuition, medical, homeBuyer, firefighter, interest)
        const federalTaxCredits = totalFederalTaxCredits >= totalFederalTax ? totalFederalTax : totalFederalTaxCredits 
        const marginalFederalTaxCredits = i > 1 ? federalTaxCredits - data[i-2].federalTaxCredits : federalTaxCredits 
        const federalTax = marginalFederalTax - marginalFederalTaxCredits
        const totalProvincialTax = calculateProvincialTaxes(income)
        const marginalProvincialTax = i > 1 ? totalProvincialTax - data[i-2].totalProvincialTax : totalProvincialTax
        const totalProvincialTaxCredits = 1500 //calculateProvincialCredits(taxableIncome, totalCppAndEI, EDI, NEDI, donation, tuition, medical, homeBuyer, firefighter, interest )
        const provincialTaxCredits = totalProvincialTaxCredits >= totalProvincialTax ? totalProvincialTax : totalProvincialTaxCredits 
        const marginalProvincialTaxCredits = i > 1 ? provincialTaxCredits - data[i-2].provincialTaxCredits : provincialTaxCredits 
        const provincialTax = marginalProvincialTax - marginalProvincialTaxCredits
        //const marginalFederalTaxRate = federalTax / marginalIncome
        //const marginalProvincialTaxRate = provincialTax / marginalIncome
        //const cppAndEITaxRate = cppAndEI / marginalIncome
        //const totalMarginalRate = marginalFederalTaxRate + marginalProvincialTaxRate + cppAndEITaxRate
        const marginalAfterTaxAndCreditIncome = marginalIncome - marginalFederalTax - marginalProvincialTax - cppAndEI


      data.push({
        bracket: i,
        deduction: 5000,
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
        //marginalFederalTaxCredits,
        provincialTaxCredits, 
        marginalProvincialTaxCredits,
        provincialTax,
        marginalTaxBracket: (marginalFederalTax + marginalProvincialTax )/ marginalIncome,
        taxCredits: marginalFederalTaxCredits + marginalProvincialTaxCredits,
        incomeAfterTax: i > 1 ? marginalAfterTaxAndCreditIncome : marginalAfterTaxAndCreditIncome + (CG/2)

      })
    }
    return data
}








export const convertTaxesToSunburstChart_function = (taxData, showCredits) => {

    const federalTaxPayable = showCredits ? (taxData.totalFederalTax - taxData.federalTaxCredits) : taxData.totalFederalTax
    const provincialTaxPayable =  showCredits ? (taxData.totalProvincialTax - taxData.provincialTaxCredits) : taxData.totalProvincialTax
    const totalCppAndEI = taxData.totalCppAndEI
    const totalCredits = showCredits ? taxData.provincialTaxCredits + taxData.federalTaxCredits : 0
    const totalTaxLiability = federalTaxPayable + provincialTaxPayable  + totalCppAndEI 
    const afterTaxIncome = taxData.income - totalTaxLiability - totalCredits
  
       return  ({
        "name": "Taxes", "children": [{
            "name": "tax",
            "children": [
                {
                name: "federalTax", 
                value: federalTaxPayable
                },
                {
                name: "provincialTax", 
                value: provincialTaxPayable
                },
                {
                name: "cppAndEI", 
                value: totalCppAndEI
                },
            ]
        }, {
            "name": "income",
            "children": [
                {
                name: "afterTaxIncome", 
                value: afterTaxIncome
                },
                {
                name: "totalCredits", 
                value: totalCredits
                },
            ]
        }]
    })}  
    

//CONVERTS REDUCER TO ARRAY FOR CHART 
export const convertReducerToArray = (category, lifeSpan, userAge, reducer) => {                                         //Converts reducer to an array of objects                                                          

    const creditClaimed = Object.values(reducer).filter(d => d.category === category)                               //filter through to get the credit we're looking for, eg. "medicalExpense"
      
          //RETURNS Credit VALUE FOR THE GIVEN Credit INSTANCE    
            const creditValue = (creditClaimed, category, age) => {                                                     //Helper function which will return the Credit value in the chart
      
              if (creditClaimed.length > 0) {
                  const arrayOfCredit = creditClaimed.map(d => d.category === category                                   //it is collecing all the credit values of that type reported for that age
                                              && age >= d.fromAge                                                        //Checks if the given age is between the start and end age
                                              && age <= d.toAge ?                                         
                                              d.value : 0                                                //If it is it returns the financial value, giving an array of financial values
                  )
                  return Math.max(...arrayOfCredit)                                                                      //If the person has inputted more than one Credit amount for the sane age range this will return the max
              }
             return 0
              }
                                            
           const array = []                                                                                             //Initialize and empty array to push into
           for (let age = userAge; age <= lifeSpan; age++) {                                                            //For loop showing their Credit till age 95
               const itemObject = {age: age}                                                                            //The age is used as the x axis
               const details = {...itemObject, credit: creditValue(creditClaimed, category, age)}
               array.push(details)                                                                                      //Pushes the object to the array
           }
           return array
       }


  export const convertForBracketsChart = (taxBrackets_selector) => {
         console.log(taxBrackets_selector)
        const bracketDetails = taxBrackets_selector.filter(d => d.marginalIncome > 0)
    
        const array = [
            {
                bracketIncome: taxBrackets_selector[0].taxCredits,
                totalIncome: taxBrackets_selector[0].taxCredits,
                type: "deduction", 
                federalTaxes: taxBrackets_selector[0].marginalFederalTax / taxBrackets_selector[0].marginalIncome,
                provincialTaxes: taxBrackets_selector[0].marginalProvincialTax / taxBrackets_selector[0].marginalIncome,
                cppAndEI: taxBrackets_selector[0].cppAndEI / taxBrackets_selector[0].marginalIncome,
                keep: taxBrackets_selector[0].incomeAfterTax / taxBrackets_selector[0].marginalIncome
            }
        ]
        for (let i = 0; i < bracketDetails.length; i++) {
    
            const details = bracketDetails[i]
            i === 0 ? array.push( {
                bracketIncome: details.marginalIncome - details.taxCredits,
                totalIncome: details.income,
                type: "regular", 
                federalTaxes: details.marginalFederalTax / details.marginalIncome,
                provincialTaxes: details.marginalProvincialTax / details.marginalIncome,
                cppAndEI: details.cppAndEI / details.marginalIncome,
                keep: details.incomeAfterTax / details.marginalIncome
            })
            :
            i === bracketDetails.length - 1? array.push( {
                bracketIncome: details.marginalIncome - details.deduction,
                totalIncome: details.income  - details.deduction,
                type:  "regular", 
                federalTaxes: details.marginalFederalTax / details.marginalIncome,
                provincialTaxes: details.marginalProvincialTax / details.marginalIncome,
                cppAndEI: details.cppAndEI / details.marginalIncome,
                keep: details.incomeAfterTax / details.marginalIncome
            })
            : 
            array.push({
                bracketIncome: details.marginalIncome - details.taxCredits,
                totalIncome: details.income,
                type: "regular", 
                federalTaxes: details.marginalFederalTax / details.marginalIncome,
                provincialTaxes: details.marginalProvincialTax / details.marginalIncome,
                cppAndEI: details.cppAndEI / details.marginalIncome,
                keep: details.incomeAfterTax / details.marginalIncome
            })
        }
        array.push({
            bracketIncome: bracketDetails[bracketDetails.length - 1].deduction,
            totalIncome: bracketDetails[bracketDetails.length - 1].income,
            type: "deduction", 
            federalTaxes: bracketDetails[bracketDetails.length - 1].marginalFederalTax / bracketDetails[bracketDetails.length - 1].marginalIncome,
            provincialTaxes: bracketDetails[bracketDetails.length - 1].marginalProvincialTax / bracketDetails[bracketDetails.length - 1].marginalIncome,
            cppAndEI: bracketDetails[bracketDetails.length - 1].cppAndEI / bracketDetails[bracketDetails.length - 1].marginalIncome,
            keep: bracketDetails[bracketDetails.length - 1].incomeAfterTax / bracketDetails[bracketDetails.length - 1].marginalIncome
        })
        return array
    }
    