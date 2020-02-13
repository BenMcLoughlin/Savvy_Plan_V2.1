

function getAdditionalPayment(regularPayment, lastAdditionalPayment, addPay, addPaymentType) {
    if (addPay === undefined || addPay <= 0) return null;
    
    var nextAdditionalDate = getNextDate(lastAdditionalPayment.date, addPaymentType),
        nextRegularDate = getNextDate(regularPayment.date, regularPayment.frequency);
    if (regularPayment.date.getTime() <= nextAdditionalDate.date.getTime() && nextAdditionalDate.date.getTime() < nextRegularDate.date.getTime()) {
        var principalPay = Math.min(regularPayment.closingBalance, addPay);
        return { idx: regularPayment.idx + 1, 
                days: diffDays(lastAdditionalPayment.date, regularPayment.date), 
                totalDays: regularPayment.totalDays, 
                date: regularPayment.date, 
                year: regularPayment.year,
                openingBalance: regularPayment.closingBalance, 
                closingBalance: regularPayment.closingBalance - principalPay, 
                interestPay: 0, 
                totalInterestPay: regularPayment.totalInterestPay,
                principalPay: principalPay, 
                totalPrincipalPay: regularPayment.totalPrincipalPay + principalPay,
                totalPay: principalPay, 
                type: "additional", 
                frequency: addPaymentType
                };
    }
    
    return null;
}

function getNextDate(fromDate, paymentType) {
    if (paymentType === "weekly") return {days:7, date:addDays(fromDate, 7)};
    if (paymentType === "r-weekly") return {days:7, date:addDays(fromDate, 7)};
    if (paymentType === "bi-weekly") return {days:14, date:addDays(fromDate, 14)};
    if (paymentType === "r-bi-weekly") return {days:14, date:addDays(fromDate, 14)};
    if (paymentType === "monthly") {
        var nextDate = addMonths(fromDate, 1);
        return {days:diffDays(fromDate, nextDate), date:nextDate};
    };
    if (paymentType === "annually") {
        var nextDate = addYears(fromDate, 1);
        return {days:diffDays(fromDate, nextDate), date:nextDate};
    };		
    return {days:0,date:fromDate};
}


function getScheduledPayment(lastPayment, scheduledPay, dayRate, paymentType, yearDays) {
    if (lastPayment === undefined) return undefined;
    
    var nextDate = getNextDate(lastPayment.date, paymentType);
    if (nextDate.days === 0) return undefined;
    
    var interestPay = Math.round(100 * lastPayment.closingBalance * dayRate * nextDate.days) / 100;
    var principalPay = Math.min(lastPayment.closingBalance, scheduledPay - interestPay);
    var totalPay = principalPay + interestPay;
    var totalDays = lastPayment.totalDays + nextDate.days;

    // calculate year of payment
    var year = lastPayment.year;
    if (totalDays > yearDays[year]) year++;
    
    return { idx:lastPayment.idx + 1, 
            days:nextDate.days, totalDays:totalDays, date:nextDate.date, year:year,
            openingBalance: lastPayment.closingBalance, 
            closingBalance: Math.max(lastPayment.closingBalance - principalPay, 0), 
            interestPay: interestPay, totalInterestPay: lastPayment.totalInterestPay + interestPay,
            principalPay: principalPay, totalPrincipalPay: lastPayment.totalPrincipalPay + principalPay,
            totalPay: totalPay, type: "regular", frequency:paymentType
            };
};


function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

function addMonths(date, months) {
    var result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};

function addYears(date, years) {
    var result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
};


function diffDays(date1, date2) {
    var dayms= 24*60*60*1000; 
    return Math.round(Math.abs((date1.getTime() - date2.getTime())/(dayms)));
};

function getStartDate(paymentType) {
    var result = new Date();
    result.setDate(1);
    if (paymentType === "annually") {
        result.setMonth(0);
        //result.setFullYear(d.getFullYear() + 1);
    } else {
        result.setMonth(result.getMonth() + 1);
    }
    return result;
};



function getAnnualPaymentNumber(paymentType) {
    if (paymentType === "weekly") return 52.14;
    if (paymentType === "r-weekly") return 52.14;
    if (paymentType === "bi-weekly") return 26.07;
    if (paymentType === "r-bi-weekly") return 26.07;
    if (paymentType === "monthly") return 12;
    return 0;
};

function getPaymentEffectiveRate(rate, paymentType) {
    var payments = getAnnualPaymentNumber(paymentType);
    if 	(rate === undefined || rate <= 0 ||
         rate === payments || payments <= 0) return 0;

         return Math.pow( (1+(0.01*rate/2)), 2/payments) - 1;
};


export const mortgagePayment = (mortgageAmount, rate, amortization, paymentType)  => {
	
    // 'rapid' payments are monthly payments divided by 2 (bi-weekly) or for ((weekly)
    var rateFactor = 1,
        payType = paymentType;
    if (paymentType === "r-weekly") {
        rateFactor = 0.25;
        payType = "monthly";
    } else if (paymentType === "r-bi-weekly") {
        rateFactor = 0.5;
        payType = "monthly";
    } 

    var effectiveRate = getPaymentEffectiveRate(rate, payType),
        payments = Math.round(amortization*getAnnualPaymentNumber(payType));
    if (mortgageAmount === 0 || amortization === 0 || effectiveRate === 0 || payments === 0) return 0;
    
    return Math.round(100 * rateFactor * mortgageAmount*effectiveRate/(1-Math.pow(1+effectiveRate,-payments))) / 100;
};



const payment = mortgagePayment(100000, 3.2, 30, "monthly")


export const getPaymentSchedules = function(scheduledPay, mortgageAmount, rate, term, amortization, paymentType, additionalPay, additionalPaymentType) {
    var termSchedule = [],
       amortizationSchedule = [],
       annualSchedule = [];
   var startDate = getStartDate(),
       termDays = term < 1 ? diffDays(startDate, addMonths(startDate, term*12)): diffDays(startDate, addYears(startDate, term)),
       amortizationDays = diffDays(startDate, addYears(startDate, amortization));

   // calculate cumulative days for each 'mortgage' year (some years will have 366 days)
   var yearDays = [];
   for (var i = 0; i <= amortization; i++) {
       yearDays.push(diffDays(startDate,addYears(startDate, i)));
   };
   
   // daily interest pay
   var dayRate = getPaymentEffectiveRate(rate, paymentType) * getAnnualPaymentNumber(paymentType) * term / termDays;
               
   // seed scheduled pay
   var payment = { idx:0, days:0, totalDays:0, date:startDate, year:0,
                   openingBalance: mortgageAmount, closingBalance: mortgageAmount, 
                   interestPay: 0, totalInterestPay: 0,
                   principalPay: 0, totalPrincipalPay: 0,
                   totalPay: scheduledPay, type:"regular", frequency:paymentType
                   };
   annualSchedule[0] = payment;
   
   // seed additionalPayment
   var addPay = additionalPay?additionalPay:0,
       addPaymentType = additionalPaymentType?additionalPaymentType:"annually";		
   var additionalPayment = { idx:0, days:0, totalDays:0, date:getStartDate(addPaymentType), year:0,
                   openingBalance: mortgageAmount, closingBalance: mortgageAmount, 
                   interestPay: 0, totalInterestPay: 0,
                   principalPay: 0, totalPrincipalPay: 0,
                   totalPay: addPay, type:"additional", frequency:addPaymentType
                   };		
   
   while (payment.totalDays <= amortizationDays || payment.closingBalance > 0) {
       var nextPayment = getScheduledPayment(payment, scheduledPay, dayRate, paymentType, yearDays);
       if (nextPayment === undefined) break;
       
       // add to term schedule if within term days
       if (nextPayment.totalDays <= termDays) termSchedule.push(nextPayment);
       
       // get additional payment, if any
       var nextAdditionalPayment = getAdditionalPayment(nextPayment, additionalPayment, addPay, addPaymentType);
       if (nextAdditionalPayment !== null) {		
           nextPayment = nextAdditionalPayment;
           if (nextPayment.totalDays <= termDays) termSchedule.push(nextPayment);					
           additionalPayment = nextAdditionalPayment;			
       }
       
       // add to amortization schedule based on year
       if (nextPayment.openingBalance > 0 && nextPayment.year > 0) {
           var year = nextPayment.year;
           amortizationSchedule[year - 1] = nextPayment;
   
           var lastYearPayment = annualSchedule[year - 1];
           var annualPayment = {};
               annualPayment.idx = nextPayment.idx;
               annualPayment.days = nextPayment.totalDays - year*lastYearPayment.days;
               annualPayment.totalDays = nextPayment.totalDays;
               annualPayment.date = nextPayment.date;
               annualPayment.year = year;
               annualPayment.openingBalance = lastYearPayment.closingBalance > 0 ? lastYearPayment.closingBalance : 0;
               annualPayment.closingBalance = nextPayment.closingBalance;
               annualPayment.interestPay = nextPayment.totalInterestPay - lastYearPayment.interestPay;
               annualPayment.totalInterestPay = nextPayment.totalInterestPay;
               annualPayment.principalPay = nextPayment.totalPrincipalPay - lastYearPayment.principalPay;
               annualPayment.totalPrincipalPay = nextPayment.totalPrincipalPay;
               annualPayment.totalPay = annualPayment.totalInterestPay + annualPayment.totalPrincipalPay;
               annualPayment.type = "total";
               annualPayment.frequency = "annual";
           
           annualSchedule[year] = annualPayment;	
       }
       
       payment = nextPayment;
   };

   annualSchedule.shift();
   return annualSchedule
}



// function getPaymentEffectiveRate(rate) {
//     var payments =12 
//          return Math.pow( (1+(0.01*rate/2)), 2/payments) - 1;
// };


export const calculatMortgageBalance = (startingBalance, rate, payment, years, startDate, birthYear) => {
   const mortgageStartAge =  startDate.getFullYear() - birthYear 
    const number = years * 12
    const array = [{
        userAge: mortgageStartAge,
        endingBalance: startingBalance,
        mortgageYear: 0,
        actualYear: startDate.getFullYear()
    }]
    const effectiveRate = getPaymentEffectiveRate(rate, "monthly") 
    for (let i = 1; i < number + 1 ; i++) {
        const lastValue = array[i-1]
        const totalInterest = lastValue.endingBalance * effectiveRate
        const principlePayment = payment - totalInterest
        const balance = lastValue.endingBalance - principlePayment > 0 ? lastValue.endingBalance - principlePayment  : 0
        array.push({
            userAge: lastValue.userAge + 1/12,
            endingBalance: balance ,
            totalInterest: totalInterest,
            principlePayment: principlePayment,
            mortgageYear: i/12,
            actualYear: lastValue.actualYear + 1/12,

        })
    }
    return array.filter(d => d.mortgageYear % 1 === 0).map(d => ({
        userAge: +d.userAge.toFixed(),
        endingBalance: +d.endingBalance,
        totalInterest: d.totalInterest,
        principlePayment: d.principlePayment,
        mortgageYear: +d.mortgageYear.toFixed(),
        actualYear: +d.actualYear.toFixed()
    }))
}


export const calculateCreditCardBalance =  (startingBalance, rate, payment) => {
    const thisYear = new Date().getFullYear()
    const array = [{
        endingBalance: startingBalance,
        mortgageYear: 0,
        actualYear: thisYear
    }]

    for(let i = 1; i < 500; i++) {
        const lastValue = array[i-1]
        const totalInterest = (lastValue.endingBalance * (rate/100))/12
        const principlePayment = payment - totalInterest
        const balance = lastValue.endingBalance - principlePayment > 0 ? lastValue.endingBalance - principlePayment  : 0

        array.push({
            endingBalance: balance,
            totalInterest: totalInterest,
            principlePayment: principlePayment,
            mortgageYear: i/12,
            actualYear: lastValue.actualYear + 1/12,

        })
    }
    return array.filter(d => d.mortgageYear % 1 === 0).map(d => ({
        endingBalance: +d.endingBalance,
        totalInterest: d.totalInterest,
        principlePayment: d.principlePayment,
        mortgageYear: +d.mortgageYear.toFixed(),
        actualYear: +d.actualYear.toFixed()
    }))
}