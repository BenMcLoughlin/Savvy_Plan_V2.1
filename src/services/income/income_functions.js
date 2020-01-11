import {payment}from "services/general/financial_functions"

const historicRRSP = {
    1990: 63889,
    1991: 69444,
    1992: 69444,
    1993: 75000,
    1994: 80556,
    1995: 86111,
    1996: 75000,
    1997: 75000,
    1998: 75000,
    1999: 75000,
    2000: 75000,
    2001: 75000,
    2002: 75000,
    2003: 86111,
    2004: 91667,
    2005: 100000,
    2006: 105556,
    2007: 111111,
    2008: 116667,
    2009: 122222,
    2010: 124722,
    2011: 127611,
    2012: 132333,
    2013: 134833,
    2014: 138500,
    2015: 140944,
    2016: 144500,
    2017: 145722,
    2018: 147222,
    2019: 151278,
    2020: 154611,
};




export const calculateStartValue = (age, account, state) => {
    return state[age-1][account].endValue

}
export const calculateEndValue = (startValue, age, account,state) => {
    const {contribution, percentageReturn, withdrawal} = state[age][account]
    return  startValue * (1 + percentageReturn) + contribution - withdrawal

}

export const calculateOptimumIncomeStreams = (retirementIncome, pensionIncome, maxRrspPayment, maxTfsaPayment, highestIncomes) => {

        if (highestIncomes < 47000) {
            const incomeLessPension = retirementIncome - pensionIncome > 0 ? retirementIncome - pensionIncome : 0                                                              //this is the difference between the income they would like and what they are recieving from pensions
            const tfsaIncome = incomeLessPension > maxTfsaPayment ? maxTfsaPayment : incomeLessPension * .7                              //Their first goal should be to draw income from TFSA because of their lower tax bracket
            const taxAdvantagedDifferentialLessTfsa = incomeLessPension - tfsaIncome
            const rrspIncome = taxAdvantagedDifferentialLessTfsa > maxRrspPayment ? maxRrspPayment : taxAdvantagedDifferentialLessTfsa 
    
            const nonRegistered = taxAdvantagedDifferentialLessTfsa - rrspIncome
            return  {
                rrsp: rrspIncome > 0 ? rrspIncome : 0,
                tfsa: tfsaIncome > 0 ? tfsaIncome : 0, 
                nonRegistered,
            }
        }
        else if (highestIncomes > 47000 && highestIncomes < 96000) {
            const taxAdvantagedDifferential = 40000 - pensionIncome
            const incomeLessPension = retirementIncome - pensionIncome > 0 ? retirementIncome - pensionIncome : 0 
            const rrspIncomeBelowTaxTop = taxAdvantagedDifferential > maxRrspPayment ? maxRrspPayment : taxAdvantagedDifferential
            const rrspIncome = incomeLessPension > rrspIncomeBelowTaxTop ? rrspIncomeBelowTaxTop : incomeLessPension 
            const taxAdvantagedDifferentialLessRrsp = retirementIncome - rrspIncome - pensionIncome
            const tfsaIncome = taxAdvantagedDifferentialLessRrsp > maxTfsaPayment ? maxTfsaPayment : taxAdvantagedDifferentialLessRrsp
            const nonRegistered = taxAdvantagedDifferentialLessRrsp - tfsaIncome 
       
            return  {
                rrsp: rrspIncome > 0 ? rrspIncome : 0,
                tfsa: tfsaIncome > 0 ? tfsaIncome : 0, 
                nonRegistered,
            }
        }
        else {
            const taxAdvantagedDifferential = 77000 - pensionIncome
            const rrspIncome = taxAdvantagedDifferential > maxRrspPayment ? maxRrspPayment : taxAdvantagedDifferential
            const taxAdvantagedDifferentialLessRrsp = retirementIncome - rrspIncome - pensionIncome
            const tfsaIncome = taxAdvantagedDifferentialLessRrsp > maxTfsaPayment ? maxTfsaPayment : taxAdvantagedDifferentialLessRrsp
            const nonRegistered = taxAdvantagedDifferentialLessRrsp - tfsaIncome 
       
            return  {
                rrsp: rrspIncome > 0 ? rrspIncome : 0,
                tfsa: tfsaIncome > 0 ? tfsaIncome : 0, 
                nonRegistered,
            }
        }
    
    }

//SET MAXIMUM CONTRIBUTIONS IN SAVINGS REDUCER


    export const setMaxContributions = ( birthYear, income_reducer, rrspStartAge, setMaxContribution_action, tfsaStartAge) => {

       for (let age = 18; age < rrspStartAge; age ++) {
            const year = age + birthYear                                                                                                                                                      //year is used to determine the contribution room avaibale from the government
            const contributionLimit = historicRRSP[year] ? historicRRSP[year]  : 154611
            const totalRrspContEligibleIncome = Object.values(income_reducer[age])                                                                                              //We're looking up their income for that year so we can sum it all
                                                                    .filter(d => d.contributeToCpp)                                                                                    //We only want to sum income on which RRSP is eligible so we remove income on which CPP contributions aren't made
                                                                    .map(d => d.financialValue).reduce((acc, num) => acc + num)                                                        //Sum the value of all income streams

            const rrspMaxContribution = totalRrspContEligibleIncome > contributionLimit ? (contributionLimit * .18) : (totalRrspContEligibleIncome * .18)
            console.log(`
            totalRrspContEligibleIncome: ${totalRrspContEligibleIncome}
            contributionLimit: ${contributionLimit}
            rrspMaxContribution: ${rrspMaxContribution}
            `
                )
                ;
           setMaxContribution_action(age, "rrsp", rrspMaxContribution)
         }
        
        for (let age = 18; age < tfsaStartAge; age ++) {

           if (birthYear + age < 2009 && birthYear + age < 2013) {                                                                                                      //The government increased TFSA contributions each year, this is checking the years and inputting the correct contribution max
            setMaxContribution_action(age, "tfsa", 5000)
           }
           if (birthYear + age > 2012 && birthYear + age < 2015) {
            setMaxContribution_action(age, "tfsa", 5500)
           }
           if (birthYear + age === 2015) {
            setMaxContribution_action(age, "tfsa", 10000)
           }
           if (birthYear + age > 2015 && birthYear + age < 2019) {
            setMaxContribution_action(age, "tfsa", 5500)
           }
           if (birthYear + age > 2018) {
            setMaxContribution_action(age, "tfsa", 6000)
           }
        }
        
        }


//SET MAXIMUM CONTRIBUTIONS IN SAVINGS REDUCER
 export const determineMaxRegisteredPayments = (income_reducer, rrspStartAge, savings_reducer, tfsaStartAge, rate1, rate2) => {

            const rrspContributionArray = Object.values(savings_reducer).slice(0,(rrspStartAge - 18)).map(d => d.rrsp.maxContribution)
            const maxRrspValue = rrspContributionArray.reduce((acc, num) => (acc * (1 + rate1)) + num)
            const maxRrspPayment = payment(rate2, (95-rrspStartAge), maxRrspValue, 0)
            
            const tfsaContributionArray = Object.values(savings_reducer).slice(0-(tfsaStartAge - 18)).map(d => d.tfsa.maxContribution)
            const maxTfsaValue = tfsaContributionArray.reduce((acc, num) => (acc * (1 + rate1)) + num)
            const maxTfsaPayment = payment(rate2, (95-tfsaStartAge), maxTfsaValue, 0)
            
            
            const incomeArray = Object.values(income_reducer).map(d => Object.values(d).map(a => a.financialValue).reduce((acc, num) => acc + num)).slice(0,47)
            
            const highestIncomes = incomeArray.sort((a, b)=> b-a).slice(0,10).reduce((acc, num) => acc + num) /10
            return {
                maxTfsaPayment: -maxTfsaPayment,
                maxRrspPayment: -maxRrspPayment,
                highestIncomes
            }
        }