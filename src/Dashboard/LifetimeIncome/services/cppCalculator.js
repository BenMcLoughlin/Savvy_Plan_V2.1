
const calculateCPP = function (
    incomeAge18_24,
    incomeAge25_30,
    incomeAge31_44,
    incomeAge45_49,
    incomeAge50_54,
    incomeAge55_59,
    incomeAge60_64,
    incomeAge65_69,
) {
    currentAge = 30
    averageYMPE = 54500
    
    /*Step 1 calculate number of contributory Years. They begin at age 18 and end at 70
    This section uses the persons birth year and adds 18 to get the year they will
    start contributing to CPP at age 18. */
    
    let birthDate = new Date(07-05-1988)
    let birthYear = birthDate.getFullYear()
    let cppStartYear = birthDate.getFullYear()+ 18
    
    
    /*Step 2 match the years the person worked with the corrosponding Years Maximum Pensionable
    earnings. The income from each year has to be matched to the YMPE to get the contributory
    percentage */
    
    let historicYmpe = {
        1971: 5400,
        1972: 5500,
        1973: 5600,
        1974: 6600,
        1975: 7400,
        1976: 8300,
        1977: 9300,
        1978: 10400,
        1979: 11700,
        1980: 13100,
        1981: 14700,
        1982: 16500,
        1983: 18500,
        1984: 20800,
        1985: 23400,
        1986: 25800,
        1987: 25900,
        1988: 16500,
        1989: 27700,
        1990: 28900,
        1991: 30500,
        1992: 32200,
        1993: 33400,
        1994: 34400,
        1995: 34900,
        1996: 35400,
        1997: 35800,
        1998: 36900,
        1999: 37400,
        2000: 37600,
        2001: 38300,
        2002: 39100,
        2003: 39900,
        2004: 40500,
        2005: 41100,
        2006: 42100,
        2007: 43700,
        2008: 44900,
        2009: 46300,
        2010: 47200,
        2011: 48300,
        2012: 50100,
        2013: 51100,
        2014: 52500,
        2015: 53600,
        2016: 54900,
        2017: 55300,
        2018: 55900,
        2019: 57400,
    };
    
    /*Step 2 continued, above is the list of years and YMPEs. Below the ympe is matched to
    each of the years the person worked. const ympe is then the ympe of each year. If it is
    in the future we just use the current years ympe*/
    
    const ympe = function (age) {
        if (age >= currentAge)return 57400
         else (age < currentAge)
            year = birthYear + age
            return historicYmpe[year]
    }
    
    /*Step 3: now we need an array with all the ages that the person will be working*/
    const cppContributionAges = []
    for (let i = 18; i <= 65; i++) {
      cppContributionAges.push(i)
    }
    
    /*Step 4: These are the inputs. They are currently set to match the government of Canada
    pension estimator. Each year of income can be changed to calculate the cpp.
    */
    
    
    /*Step 5: now we need to match the income of each age with the corrosponding ympe.
    we loop through the ages to get the income. The income is then divided by that years
    ympe to get a percentage. That percentage is multiplied by the current average ympe (54000)
    to bring it to todays dollars. */
    
    let apeArray= []
    
    cppContributionAges.forEach(function (age) {
          if (age > 17 && age <= 24) {
            income = incomeAge18_24
          }
          else if (age > 24 && age <= 30) {
            income = incomeAge25_30
          }
          else if (age > 30 && age <= 44) {
                   income = incomeAge31_44
          }
          else if (age > 44 && age <= 49) {
                   income = incomeAge45_49
          }
          else if (age > 49 && age <= 54) {
                   income = incomeAge50_54
          }
          else if (age > 54 && age <= 59) {
                   income = incomeAge55_59
          }
          else if (age > 59 && age <= 64) {
                   income = incomeAge60_64
          }
          else if (age > 64 && age <= 69) {
                   income = incomeAge65_69
          } else {
            return 0
        }   let thatYear = ympe (age)
                let ympePercentage = income/thatYear
              if (ympePercentage > 1) {
                    ympePercentage = 1
                } else {
                    ympePercentage = income/thatYear
                }
                apeArray.push(ympePercentage*averageYMPE);
    })
    
    /*Step 5: now we have to remove the drop out periods which are the 8 lowest years. This is done below.
    */
    var multisplice = function (array) {
    array.sort((a, b) => a - b);
    array.splice(0,8)
    return array}
    
    apeArray = multisplice(apeArray);
    
    /*
    Step 6: Here we sum up all the income in todays dollars that has been earned and divide it by
    the number of years after the dropout period. In this case it is divided by 40.
    */
    
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    
    /*
    Step 6: the AMPE is average monthly pensionable earnings. In this case I didn't use contributory
    months, instead I used years.
    */
    
    const ampe = average(apeArray)
    
    
    /*
    Step 7: now that I have the pensionable earnings I multiply it by 25% and divide it by 12 to
    get the monthly amount.
    */
    monthlyCppPayment = ampe * 0.25
    console.log(apeArray);

   return monthlyCppPayment
    
    }
    
    console.log(calculateCPP(
        30000, 
        30000, 
        30000, 
        30000, 
        30000, 
        30000, 
        30000, 
        30000, 
    ));