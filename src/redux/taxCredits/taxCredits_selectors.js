
import {createSelector} from "reselect"
import {incomeBreakdown, calculateTaxesByBracket, convertTaxesToSunburstChart_function} from "services/tax/tax_functions"
import {income_selector} from "redux/income/income_selectors"

export const taxCredits_selector = state => Object.values(state.taxCredits_reducer)

const taxAge = state => state.user_reducer.taxAge   


const credits = () => [
   {
        name: "charitableDonations",
        label: "Charitable Donations",
        financialValue: 0, 
        rangeBarValue: 0,
        section: "credits",
        min: 0, 
        max: 20000, 
    },
   {
        name: "tuition",
        label: "Tuition, Education and Textbook",
        financialValue: 0, 
        rangeBarValue: 0,
        section: "credits",
        min: 0,
        max: 20000,
    },
     {
        name: "medicalExpense",
        label: "Medical Expense",
        financialValue: 0, 
        rangeBarValue: 0,
        section: "credits", 
        min: 0,
        max: 40000,
    },
  {
        name: "homeBuyers",
        label: "Home Buyers",
        financialValue: 0, 
        rangeBarValue: 0,
        section: "credits",
        min: 0, 
        max: 5000, 
    },
    {
        name: "volunteerFirefighter",
        label: "Volunteer Firefighter",
        financialValue: 0, 
        rangeBarValue: 0,
        section: "credits",
        min: 0,
        max: 5000,
    },
    {
        name: "interestOnStudentLoans",
        label: "Interest on Student Loans",
        financialValue: 0, 
        rangeBarValue: 0,
        section: "credits", 
        min: 0,
        max: 5000,
    },
]

export const deduction_selector = createSelector(
    taxCredits_selector,
    (taxCredits_selector) => taxCredits_selector.filter(d => d.category === "deduction")
)
export const credit_selector = createSelector(
    taxCredits_selector,
    (taxCredits_selector) => taxCredits_selector.filter(d => d.category === "credit")
)

export const incomeBySource_selector = createSelector(
    income_selector,
    taxAge,
    (income_selector,  taxAge) => incomeBreakdown(income_selector, taxAge)
) 

export const taxBrackets_selector = createSelector(
    incomeBySource_selector,
    credits,
    (incomeBySource_selector, credits) => calculateTaxesByBracket(incomeBySource_selector, credits)
)

export const finalTaxPosition_selector = createSelector(
    taxBrackets_selector,
    (taxBrackets_selector) => taxBrackets_selector[4]
)

export const taxBracketsSunburstData_selector = createSelector(
    taxBrackets_selector,
    (taxBrackets_selector) => convertTaxesToSunburstChart_function(taxBrackets_selector[4])
)


