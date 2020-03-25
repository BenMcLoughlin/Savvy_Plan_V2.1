


const calcIncome = (age, reducer) =>  reducer.toArray().map(d => age >= d.age1 && age <= d.age2 ? d.value : 0 ).sum()
const calcTax = (age, reducer, query) =>  reducer.toArray().map(d => d.type === query && d.eligible && age >= d.age1 && age <= d.age2 ? d.value : 0 ).sum()







//SHOW INCOME BROKEN DOWN BY BRACKET
const taxesByBracket = (inc) => {                                                                 //"FTR" is Federal Tax rates, "bot" is bottom value of the bracket, "top" is top value
                                                                                                  // "inc" is the total income
    //HELPER FUNCTIONS 
    const bracketSize = (inc, i) => inc > FTR[i].bot && inc < FTR[i].top ?                        //does income fit within this bracket ? 
                                        inc - FTR[i].bot : inc > FTR[i].top ?                     //if it does return the income minus the bottom value of the bracket, otherwise is it greater than the top ? 
                                         FTR[i].top - FTR[i].bot : 0                              //if it is I want the total size of this specific bracket, get bracket 2 is from 48000 - 97000, the size is then 49000
     
    const fedTax = (inc, i) => inc * FTR[i].rate                                                  //since we have the bracket size we can then multiply it by the rate to get the federal taxes                                                                                        

    const provTax = (inc) => {
        const {rate, constant} = Object.values(PTR).find(d => inc >= d.bot && inc < d.top)        //find the object that contains the bracket details the income fits into
        return inc * rate - constant                                                              //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant
    }
    //BUILD ARRAY USING A FOR LOOP
  const array =[]                                                                                 //initialize an empty array
    for (let i = 1; i <=5; i++) {                                                                 //we want to have 5 brackets representing the 5 federal brackets
        array.push({                                                                              //push a new object into the array
            bracket: i,                                                                           //give the bracket number
            inc: bracketSize(inc, i),                                                             //return the total dollars that fits into this bracket
            fedTax:  fedTax(bracketSize(inc, i), i),                                              //return the federal taxes to be paid on this bracket
            provTax: inc > FTR[i].top ? provTax(FTR[i].top) - provTax(FTR[i].bot) :               //is income greater than this bracket's top ? if so give me total provincial taxes 
                     inc < FTR[i].top && inc > FTR[i].bot ?                                       //Does income fall within this bracket ? 
                     provTax(inc) - provTax(FTR[i].bot) : 0                                       //calculate provincial tax on the income then subtract provincial taxes on the federal bracket bottom
        })
    }
    return array
}

console.log(taxesByBracket(250000));
