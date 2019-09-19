import _ from "lodash"



const initialState = {
    netWorthTotal(){return this.assets.assetsTotal() - this.liabilities.liabilitiesTotal()},

    assets: {
        cashAssetsTotal(){return Object.values(this.cashAssets).map(a => a.financialValue).reduce((acc, num) => acc + num)},
        retirementAssetsTotal(){return Object.values(this.retirementAssets).map(a => a.financialValue).reduce((acc, num) => acc + num)},
        propertyAssetsTotal(){return Object.values(this.propertyAssets).map(a => a.financialValue).reduce((acc, num) => acc + num)},
        assetsTotal() {return this.cashAssetsTotal() + this.retirementAssetsTotal() + this.propertyAssetsTotal()},

        cashAssets: {
            
            title: {
                catagory: "assets",
                section: "cashAssets", 
                name: "cashAssetsTitle",
                label: "Cash and Liquid Assets",
                financialValue: 0,
                explanation: "Easily accessible assets such as cash and savings accounts.",
                total: "cashAssetsTotal",
                        
            },
            examples: {
                financialValue: 0,
                1: "Ex. Checking Account - TD Bank",
                2: "Ex. Savings Account - TD Bank",
                3: "Ex. Gauranteed Investment Certificates",
                4: "Ex. Registered Education Savings Plan",
                5: "Ex. Emergency Cash",
            },
            id1000000: {
                id: "id1000000", 
                catagory: "assets",
                section: "cashAssets", 
                name: "checkingAccount",
                label: "Checking Account", 
                rangeBarValue: 0,
                financialValue: 0,
            },
           
        }, 
        retirementAssets: {
            title: {
                catagory: "assets",
                section: "retirementAssets", 
                name: "retirementAssetsTitle",
                label: "Retirement Assets",
                financialValue: 0,
                explanation: "Long term investment accounts for retirement.",
                total: "cashAssetsTotal",
            },
            examples: {
                financialValue: 0,
                1: "Ex. Tax Free Savings Account - TFSA",
                2: "Ex. Registed Retirement Savings Plan - RRSP",
                3: "Ex. Non-registed Investments",
                4: "Ex. Locked-In Retirement Account - LIRA",
                5: "Ex. Employee Pension Plan",
            },
            id2000000: {
                id: "id2000000", 
                catagory: "assets",
                section: "retirementAssets", 
                name: "tfsa",
                label: "Tax Free Savings Account", 
                rangeBarValue: 0,
                financialValue: 0,
            }
        },
        propertyAssets: {
            title: {
                catagory: "assets",
                section: "propertyAssets", 
                name: "propertyAssetsTitle",
                label: "Property Assets",
                financialValue: 0,
                explanation: "Primary residence, rental properties and vehicles.",
                total: "cashAssetsTotal",
            },
            examples: {
                financialValue: 0,
                1: "Ex. Personal Primary Residence",
                2: "Ex. Personal Vehicle Make/Model",
                3: "Ex. Vacation Property",
                4: "Ex. Rental Property",
                5: "Ex. Collectables",
            },
            id3000000: {
                id: "id3000000", 
                catagory: "assets",
                section: "propertyAssets", 
                name: "vehicle",
                label: "Personal Vehicle", 
                rangeBarValue: 0,
                financialValue: 0,
            }
        },
    },
    liabilities: {

        unsecuredDebtTotal(){return Object.values(this.unsecuredDebt).map(a => a.financialValue).reduce((acc, num) => acc + num)},
        securedDebtTotal(){return Object.values(this.securedDebt).map(a => a.financialValue).reduce((acc, num) => acc + num)},
        otherDebtTotal(){return Object.values(this.otherDebt).map(a => a.financialValue).reduce((acc, num) => acc + num)},
        liabilitiesTotal() {return this.unsecuredDebtTotal() + this.securedDebtTotal() + this.otherDebtTotal()},

        unsecuredDebt: {
            title: {
                catagory: "liabilities",
                section: "unsecuredDebt", 
                name: "unsecuredDebtTitle",
                label: "Unsecured Debt",
                financialValue: 0,
                explanation: "Higher interest unsecured debt such as credit cards",
            },
            examples: {
                financialValue: 0,
                1: "Ex. Credit Card Balance",
                2: "Ex. Line Of Credit",
                3: "Ex. Furniture Purchase Loan",
                4: "Ex. Registered Education Savings Plan",
                5: "Ex. Emergency Cash",
            },
            id4000000: {
                id: "id4000000", 
                catagory: "liabilities",
                section: "unsecuredDebt", 
                name: "creditCard",
                label: "Credit Card", 
                rangeBarValue: 0,
                financialValue: 0,
            }

        }, 
        securedDebt: {
            title: {
                catagory: "liabilities",
                section: "securedDebt", 
                name: "securedDebtitle",
                label: "Secured Debt",
                financialValue: 0,
                explanation: "lower interest secured debt such as mortgages or car loans."
            },
            examples: {
                financialValue: 0,
                1: "Ex. Mortgage Primary Residence",
                2: "Ex. Vehicle Loan",
                3: "Ex. Mortage Rental Property",
                4: "Ex. Secured Line of Credit",
                5: "",
            },
            id5000000: {
                id: "id5000000", 
                catagory: "liabilities",
                section: "securedDebt", 
                name: "vehicleLoan",
                label: "Vehicle Loan", 
                rangeBarValue: 0,
                financialValue: 0,
            }
        },
        otherDebt: {
            title: {
                catagory: "liabilities",
                section: "otherDebt", 
                name: "otherDebttitle",
                label: "Other Debt",
                financialValue: 0,
                explanation: "Any other type of debt such as taxes payable or personal loans."
            },
            examples: {
                financialValue: 0,
                1: "Ex. Family Loan",
                2: "Ex. Student Loan",
                3: "",
                4: "",
                5: "",
            },
            id6000000: {
                id: "id6000000", 
                catagory: "liabilities",
                section: "otherDebt", 
                name: "studentLoan",
                label: "Student Loan", 
                rangeBarValue: 0,
                financialValue: 0,
            }
        },
    },

}

export const netWorthState = (state = initialState, action)=> {

switch(action.type) {
    case "ADD_ITEM": return { ...state, 
                            [action.payload.catagory]:{
                                    ...state[action.payload.catagory],
                                    [action.payload.section]: {
                                        ...state[action.payload.catagory][action.payload.section],
                                             [action.payload.id]: action.payload }
                                    }
                                }
    //takes the information provided in the object payload to add a new item. Object nesting makes this difficult.
    //Each time it moves one layer deep into the object it has to create a copy. 
    // https://stackoverflow.com/questions/40096036/how-to-update-a-value-of-a-nested-object-in-a-reducer

    case "CHANGE_LABEL": return {...state, 
                                    [action.payload.catagory]:{
                                    ...state[action.payload.catagory], 
                                    [action.payload.section]: {
                                        ...state[action.payload.catagory][action.payload.section],
                                            [action.payload.event.id]: {
                                                ...state[action.payload.catagory][action.payload.section][action.payload.event.id],
                                                    label: action.payload.event.value
                                            }
                                    }
                                }             
       }
                                    
    case "REMOVE_ITEM": return  { ...state, 
                                    [action.payload.catagory]:{
                                        ...state[action.payload.catagory],
                                        [action.payload.section]: _.omit(state[action.payload.catagory][action.payload.section], action.payload.id)
                                    }
                            }
  
    case "SET_VARIABLE": return {...state, 
                                     [action.payload.catagory]:{
                                        ...state[action.payload.catagory], 
                                        [action.payload.section]: {
                                            ...state[action.payload.catagory][action.payload.section],
                                                [action.payload.event.id]: {
                                                    ...state[action.payload.catagory][action.payload.section][action.payload.event.id],
                                                        financialValue: action.payload.financialValue,
                                                        rangeBarValue: action.payload.rangeBarValue
                                                }
                                        }
                                    }   
                                    }
    case "SET_RANGEBAR_VALUE": return {...state, 
                                     [action.payload.catagory]:{
                                        ...state[action.payload.catagory], 
                                        [action.payload.section]: {
                                            ...state[action.payload.catagory][action.payload.section],
                                                [action.payload.event.id]: {
                                                    ...state[action.payload.catagory][action.payload.section][action.payload.event.id],
                                                        financialValue: action.payload.financialValue,
                                                        rangeBarValue: action.payload.rangeBarValue
                                                }
                                        }
                                    }   
                                    }
                                                         
    default: return state
}
}

 //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
 // holds the state of the Net Worth App. State is an object and it is changed using the spread operator
 // to create a new object and then key interpolation to input the specific name and position of the 
 // object being changed. 