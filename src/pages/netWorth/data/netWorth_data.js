export const netWorthWizard_data = [                                                                                 //This array is mapped through to render data in the add form
    {
        count: 1,                                                                                                    //The count determines which category is being shown
        category: "assets",
        subCategory: "cashAssets",                                                                                    //Each group is divided by a "subCategory" type
        bookValueLabel: "none",
        currentValueLabel: "Cash Value",
        interestRateLabel: "Interest Rate",
        accountTypeArray: ["checking Account", "savings account", "GIC"]                                               //this is passed to the "Choose one" selector button
    },
    {
        count: 2,
        category: "assets",
        subCategory: "investmentAssets",
        bookValueLabel: "none",
        currentValueLabel: "Current Value",
        interestRateLabel: "Rate of Return",
        accountTypeArray: ["TFSA", "RRSP", "RESP","Non-Registered Savings", "LIRA" ]
    },
    {
        count: 3,
        category: "assets",
        subCategory: "propertyAssets",
        currentValueLabel: "Market Value",
        bookValueLabel: "Purchase Price",
        interestRateLabel: "Appreciation Rate",
        accountTypeArray: ["Primary Residence", "Rental Property", "Vacation Home","Vehicle", "Other" ]
    },
    {
        count: 4,
        category: "liabilities",
        subCategory: "unsecuredDebt",
        currentValueLabel: "Current Balance",
        bookValueLabel: "Monthly Payment",
        interestRateLabel: "Interest Rate",
        accountTypeArray: ["Credit Cards", "Line of Credit", "Student Loan","Other"]
    },
    {
        count: 5,
        category: "liabilities",
        subCategory: "securedDebt",
        currentValueLabel: "Current Mortgage Balance",
        bookValueLabel: "Mortgage Starting Balance",
        interestRateLabel: "Interest Rate",

    },
]


export const individualItem_data = (category, subCategory, bookValueLabel, currentValueLabel, interestRateLabel ) => ({
    category: category,                                                                                                   //this is the initial state of an item being stored to the reducer. 
    label: "",                                                                                                            //the label is editable by the user and is what is displayed 
    subCategory: subCategory,   
    registration: "",  
    color: "blue",                                                                                                   //his referes to if the account is a TFSA or RRSP or property
    interestRate: {                                                                                                       //these are the details passed to the range bar as range bar props
        rangeBarValue: 0,
        name: "interestRate",
        max: 0.25,
        min: 0,
        step: 0.001,
        label: interestRateLabel,                                                                                           //The label is different for different types of categories
        numberType: "percentage"
    },
    currentValue: {                                                                                                         //The current value of the assets
        rangeBarValue: 0,
        financialValue: 0,
        name: "currentValue",
        label: currentValueLabel,
    },
    bookValue: {                                                                                                             //The purchse price of the asset or starting debt value of a debt
        rangeBarValue: 0,
        financialValue: 0,
        name: "bookValue",
        label: bookValueLabel,
    },
    amortization: {                                                                                                            //length of term of the loan
        rangeBarValue: 0,
        name: "amortization",
        label: "Amortization",
        max: 40,
        min: 0,
        step: 1,
    },
    startDate: {
        rangeBarValue: 0,
        name: "startDate",
        label: "Start Date",
        date: "",
    },
    payment: {
        rangeBarValue: 0,
        financialValue: 0,
        name: "payment",
        label: "Monthly Payment",
    },
})
