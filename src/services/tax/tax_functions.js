import {cra, FTR, PTR} from "services/tax/tax_rates"


//SHOW INCOME BROKEN DOWN BY BRACKET
export const taxesByBracket = (inc) => {                                                          //"FTR" is Federal Tax rates, "bot" is bottom value of the bracket, "top" is top value
                                                                                                  // "inc" is the total income
    const fedTax = (inc, i) => inc * FTR[i].rate                                                  //since we have the bracket size we can then multiply it by the rate to get the federal taxes                                                                                        

    const provTax = (inc) => {
        const {rate, constant} = Object.values(PTR).find(d => inc >= d.bot && inc < d.top)        //find the object that contains the bracket details the income fits into
        return inc * rate - constant                                                              //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant
    }

    const calcCPPandEI = (inc, i) => {                                                              //Determines the CPP and EI contributions made by the user, if the user is self employed they must also make employer contribution
        if (i === 1) {                                                                              //most contributions are made in the first bracket, check to see if that is this bracket
            const cpp = inc > FTR[1].top  ? 2364 : (inc - 3500) * cra.cppRate                      // is income greater than this brackets top? if so return the maximum cpp payment you'd make, otherwise calculate cpp payment
            const ei = inc > FTR[1].top ? 766 :  inc  * cra.eiRate                                 //same as above but for ei
            const payment = cpp + ei
            return payment > 0 ? payment : 0
        }
        if (i === 2) {
            const cpp = inc > cra.ympe  ? 534 : (inc - 3500 - FTR[1].top) * cra.cppRate            //same as above but for bracket 1
            const ei = inc > cra.ymie  ? 90 : (inc - FTR[1].top) * cra.eiRate 
            const payment = cpp + ei
            return payment > 0 ? payment : 0
        }
        else return 0
    }   

    const bracketSize = (inc, i) => inc > FTR[i].bot && inc < FTR[i].top ?                        //does income fit within this bracket ? 
                                        inc - FTR[i].bot : inc > FTR[i].top ?                     //if it does return the income minus the bottom value of the bracket, otherwise is it greater than the top ? 
                                         FTR[i].top - FTR[i].bot : 0                              //if it is I want the total size of this specific bracket, get bracket 2 is from 48000 - 97000, the size is then 49000
     
  const array =[]                                                                                 //initialize an empty array
    for (let i = 1; i <=5; i++) {                                                                 //we want to have 5 brackets representing the 5 federal brackets
        array.push({                                                                              //push a new object into the array
            bracket: i,                                                                           //give the bracket number
            bracketRange: `${Math.round(FTR[i].bot/1000)}k - ${Math.round(FTR[i].top/1000)}k`, 
            inc: bracketSize(inc, i),                                                             //return the total dollars that fits into this bracket
            totalInc: inc > FTR[i].top ? FTR[i].top : inc,                                        //returns the maximum income earned in this bracket and all below,
            cppAndEI: calcCPPandEI(inc, i),                                                       //return the combined CPP and EI Premiums the user would have paid
            fedTax:  fedTax(bracketSize(inc, i), i),                                              //return the federal taxes to be paid on this bracket
            provTax: inc > FTR[i].top ? provTax(FTR[i].top) - provTax(FTR[i].bot) :               //is income greater than this bracket's top ? if so give me total provincial taxes 
                     inc < FTR[i].top && inc > FTR[i].bot ?                                       //Does income fall within this bracket ? 
                     provTax(inc) - provTax(FTR[i].bot) : 0                                       //calculate provincial tax on the income then subtract provincial taxes on the federal bracket bottom
        })
    }
    return array
}


//BUILD CHART DATA FOR TAX BRACKETS CHART
export const bracketsToChartData = (bracket) => {                                                 //converts the array of tax bracket details into the values needed for the chart
   return bracket.map((d,i,a) => ({
                                 bracket: d.bracket,
                                 bracketRange: d.bracketRange,
                                 bracketIncome: d.inc,
                                 cppAndEI: d.cppAndEI/d.inc,
                                 totalIncome: d.totalInc, 
                                 federalTaxes: d.fedTax/d.inc || 0, 
                                 provincialTaxes: d.provTax/d.inc || 0, 
                                 keep: ((d.inc - d.fedTax-d.provTax - d.cppAndEI)/d.inc) || 0,
                                     }))
                                 }



//CONVERTS REDUCER TO ARRAY FOR CHART SHOWING SPECIFIC CREDIT CLAIMS
export const convertReducerToArray = (stream, lifeSpan, userAge, tax_reducer) => {                 //Converts reducer to an array of objects                                                          

    const creditClaimed = Object.values(tax_reducer).filter(d => d.stream === stream)              //filter through to get the credit we're looking for, eg. "medicalExpense"

          //RETURNS Credit VALUE FOR THE GIVEN Credit INSTANCE    
            const creditValue = (creditClaimed, stream, age) => {                                  //Helper function which will return the Credit value in the chart
              if (creditClaimed.length > 0) {
                  const arrayOfCredit = creditClaimed.map(d => d.stream === stream                 //it is collecing all the credit values of that type reported for that age
                                              && age >= d.age1                                     //Checks if the given age is between the start and end age
                                              && age < d.age2 ?                                         
                                              d.value : 0                                           //If it is it returns the financial value, giving an array of financial values
                  )
                  return Math.max(...arrayOfCredit)                                                 //If the person has inputted more than one Credit amount for the sane age range this will return the max
              }
             return 0
              }
                                            
           const array = []                                                                         //Initialize and empty array to push into
           for (let age = userAge; age <= lifeSpan; age++) {                                        //For loop showing their Credit till age 95
               const itemObject = {age: age}                                                        //The age is used as the x axis
               const details = {...itemObject, credit: creditValue(creditClaimed, stream, age)}
               array.push(details)                                                                  //Pushes the object to the array
           }
           return array
       }

//HELPER FUNCTIONS
export const sum = (age, name, query, reducer) => Object.values(reducer).map(d => d[name] === query 
                                                                            && age >= d.age1
                                                                            && age < d.age2 ?
                                                                            d.value : 0 )
                                                                            .reduce((a, n) => a + n)


export const tax = (inc1, type) => {
    let inc = inc1 > 0 ? inc1 : 0
    const rates = type === "fed" ? FTR : PTR
    const {rate, constant} = Object.values(rates).find(d => inc >= d.bot && inc < d.top)        //find the object that contains the bracket details the income fits into
    const tax = inc * rate - constant 
    return tax                                                                                    //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant
}
                        
export const credits = (age, tax_selector, postDedIncome, tax) => {                                                                         //determines the tax savings from the crdits claimed at that age, either federally or provincially
    const lowestRate = tax === "fed" ? FTR[1].rate : PTR[1].rate                                                                              //Credits are multiplied by the lowest rate, which is either federal or provincial
    const donationRate = tax === "fed" ? 0.33 : 0.168                                                                                         //Credits are multiplied by the lowest rate, which is either federal or provincial
   
    let totalCredits = Object.values(tax_selector).map(d => d.eligible && d.stream !== "Donations and gifts" || "Medical expense"                            // Donations and Med expenses have a different calculation so we remove them from the list                      
                                            && age >= d.age1 && age < d.age2 ? d.value : 0 ).reduce((a, n) => a + n)                         //sum the value of all regular credits

                                         
    const donations = Object.values(tax_selector).map(d => d.eligible && d.stream === "Donations and gifts"                                                  //filter out donations for their seperate calculation
                                           && age >= d.age1 && age < d.age2 ? d.value : 0 ).reduce((a, n) => a + n)                          //sum all donations to get the total value                

    let donationsClaimed = donations > 200 ? donations - 200 : 200                                                                            //donations claimed below $200 only get 15% back, over gets %33
    let totalDonations = donationsClaimed > 200 ? (donationsClaimed * donationRate) + (200 * lowestRate) : donationsClaimed * lowestRate      //calculates the total amount saved on taxes from the donation
 

    let medExpense = Object.values(tax_selector).map(d => d.eligible && d.stream === "Medical expense"                                                       //filters out to get medical expense
                                              && age >= d.age1 && age < d.age2 ? d.value : 0 ).reduce((a, n) => a + n)                       //sums up value
   
                                              let threePercentIncome = postDedIncome * 0.03                                                   //med expense calculation requires 3% of total income in it
    let medReduction = threePercentIncome < 2352 ? threePercentIncome : 2352                                                                  // calculation for med expense
    const medicalExpClaimed = medExpense - medReduction > 0 ? medExpense - medReduction : 0
    let medValue = medicalExpClaimed * lowestRate

const value = (totalCredits * lowestRate) + totalDonations + medValue
return value > 0 ? value  : 0
}


export const calculateTaxes = (age, income_selector, tax_selector) => {
    let taxableIncome = sum(age, "taxable", true, income_selector)
    let nonTaxableIncome = sum(age, "taxable", false, income_selector)
    let preDedFedTaxes = tax(taxableIncome, "fed")
    let preDedProvTaxes = tax(taxableIncome, "prov")
    let preDedTotalTaxes = preDedFedTaxes + preDedProvTaxes
    let otheDeductions = sum(age, "type", "deduction", tax_selector)
    let rrsdDeductions = sum(age, "type", "rrsp", tax_selector)
    let deductions = rrsdDeductions + otheDeductions

    let postRRSPIncome = taxableIncome - rrsdDeductions > 0 ? taxableIncome - rrsdDeductions : 0
    let postRRSPFedTaxes = tax(postRRSPIncome, "fed")
    let postRRSPProvTaxes = tax(postRRSPIncome, "prov")
    let postRRSPTotalTaxes = postRRSPFedTaxes + postRRSPProvTaxes
    let rrspSavings = preDedTotalTaxes - postRRSPTotalTaxes

    let postDedIncome = taxableIncome - deductions > 0 ? taxableIncome - deductions : 0
    let postDedFedTaxes = tax(postDedIncome, "fed")
    let postDedProvTaxes = tax(postDedIncome, "prov")
    let postDedTotalTaxes = postDedFedTaxes + postDedProvTaxes
    let dedTaxSavings = preDedTotalTaxes - postDedTotalTaxes
    let rrspTaxSavings = preDedTotalTaxes - postDedTotalTaxes
    let fixedCredits = sum(age, "type",  "fixed", tax_selector)
    let variableCredits = sum(age, "type",  "variable", tax_selector)
    let totalCredits = fixedCredits + variableCredits
    let credFedTaxSavings = credits(age, tax_selector, postDedIncome, "fed")
    let credProvTaxSavings = credits(age, tax_selector, postDedIncome, "prov")
    let totalCredSavings = credFedTaxSavings + credProvTaxSavings
    let fedTax = postDedFedTaxes - credFedTaxSavings > 0 ? postDedFedTaxes - credFedTaxSavings : 0
    let provTax = postDedProvTaxes - credProvTaxSavings > 0 ? postDedProvTaxes - credProvTaxSavings : 0
    let afterTaxIncome = postDedIncome - fedTax - provTax 
    let averageTaxRate = (taxableIncome - afterTaxIncome)/taxableIncome 

    return ({
        taxableIncome,
        nonTaxableIncome,
        preDedFedTaxes,
        preDedProvTaxes,
        preDedTotalTaxes,
        rrspSavings,
        postDedIncome,
        postDedFedTaxes,
        postDedProvTaxes,
        postDedTotalTaxes,
        dedTaxSavings,
        rrspTaxSavings,
        credFedTaxSavings,
        credProvTaxSavings,
        fixedCredits,
        totalCredits,
        fedTax, 
        provTax, 
        variableCredits,
        totalCredSavings,
        afterTaxIncome,
        averageTaxRate
    })
}

//BUILD CHART DATA FOR LIFETIME CHART

export const lifetimeTaxes = (age1, age2,income_reducer, tax_reducer) => {
const array = []
     for (let age = age1; age<= age2; age++) {

        const bracketDetails  = calculateTaxes(age, income_reducer, tax_reducer)
        const {fedTax, provTax, rrspTaxSavings} = bracketDetails
             array.push({
                 age:  age, 
                 federalTax: fedTax,
                 provincialTax: provTax,
                 rrspTaxSavings,
             })
     }
     console.log(array);
     return array
}   



export const convertTaxDetailsToDisplay = (d) => {
;
    return [
        {
            label1: "Taxable Income",
            value1: d.taxableIncome,
            label2: "Non-Taxable Income",
            value2: d.nonTaxableIncome,
        },
        {
            label1: "Total Deductions",
            value1: d.deductions,
            label2: "Taxes Saved",
            value2: d.dedTaxSavings,
        },
        {
            label1: "Total Credits",
            value1: d.totalCredits,
            label2: "Taxes Saved",
            value2: d.totalCredSavings,
        },
        {
            label1: "After Tax Income",
            value1: d.afterTaxIncome,
            label2: "Average Tax Rate",
            value2: d.averageTaxRate,
        },
    ]
}

