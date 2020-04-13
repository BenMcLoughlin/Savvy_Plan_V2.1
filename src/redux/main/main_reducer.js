import _ from "lodash"

const initialState = {
    TFSAcontribution: {
        color: "#8CB8B7",
        age1: 17,
        reg: "TFSA",
        stream: "TFSA Contributions",
        age2: 64,
        id: "TFSAcontribution",
        transaction: "contribution",
        value: 0,
    },
    TFSAwithdrawal: {
        color: "#8CB8B7",
        age1: 65,
        reg: "TFSA",
        stream: "TFSA Withdrawals",
        age2: 95,
        id: "TFSAwithdrawal",
        transaction: "withdrawal",
        incomeType: "retirementIncome", 
        value: 0,
    },
    RRSPcontribution: {
        color: '#D8BABB',
        age1: 25,
        reg: "RRSP",
        stream: "RRSP Contributions",
        age2: 65,
        id: "RRSPcontribution",
        transaction: "contribution",
        taxType: "deduction",
        value: 0,
    },  
    RRSPwithdrawal: {
        color: '#D8BABB',
        age1: 66,
        reg: "RRSP",
        stream: "RRSP Withdrawals",
        age2: 95,
        id: "RRSPwithdrawal",
        transaction: "withdrawal",
        incomeType: "retirementIncome", 
        value: 0,
    },
     21400: { 
         stream: "Child Care Expenses",         
         taxType: "deduction",
         id: 21400,     
         eligible: true,                                                                                                                                                                                                                                                        
         age1: 18,
         age2: 64,
         value: 0
      },
     30000: { 
         stream: "Basic personal amount",         
         id: 30000,                                                                                                          
         creditType: "fixed",   
         taxType: "credit",   
         eligible: true,                                                                                                                        
         age1: 18,
         age2: 96,
         value: 12069
      },
     30400: { 
         stream: "Eligible dependant",         
         id: 30400,      
         creditType: "fixed",  
         taxType: "credit",                                                                                                      
         eligible: false,                                                                                                                                                  
         age1: 22,
         age2: 45,
         value: 0
      },
     30800: { 
         stream: "CPP & EI contributions",         
         id: 30800,          
         creditType: "fixed", 
         taxType: "credit",                                                                                                   
         eligible: true,                                                                                                                                                  
         age1: 18,
         age2: 65,
         value: 3000
      },
  31240: { 
         stream: "Volunteer firefighters' amount",         
         id: 31240,          
         creditType: "fixed",  
         taxType: "credit",                                                                                                  
         eligible: false ,                                                                                                                                                 
         age1: 18,
         age2: 95,
         value: 0
      },
  31240: { 
         stream: "Employment amount",         
         id: 31240,                                                                                                    
         creditType: "fixed", 
         taxType: "credit",       
         eligible: true,                                                                                                                
         age1: 18,
         age2: 65,
         value: 1222
      },
  31900: { 
         stream: "Interest on student loans",         
         id: 31900,                                                                                                  
         creditType: "variable", 
         taxType: "credit",              
         eligible: true,                                                                                                           
         age1: 24,
         age2: 30,
         value: 0
      },
  32300: { 
         stream: "Tuition and textbook costs",         
         id: 32300,                                                                                                     
         creditType: "variable", 
         taxType: "credit",               
         eligible: true,                                                                                                                                       
         age1: 20,
         age2: 25,
         value: 0
      },
  33099: { 
         stream: "Medical expenses",         
         id: 33099,                                                                                               
         creditType: "variable",  
         taxType: "credit",           
         eligible: true,                                                                                                                                   
         age1: 30,
         age2: 35,
         value: 0
      },
  34900: { 
         stream: "Donations and gifts",       
         id: 34900,                                                                                               
         creditType: "variable",   
         taxType: "credit",        
         eligible: true,                                                                                                                         
         age1: 18,
         age2: 44,
         value: 0,
      },
}

 const main_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "main_reducer/DELETE": return  _.omit(state, [action.id])                  
        case "main_reducer/SET_NESTED_KEY_VALUE": return {...state, [action.parentKey]: {                           //make a copy of state, enter object, here parentKey is the id
                                                    ...state[action.parentKey], [action.childKey]: action.value       //make a copy of object, change the key
          }}
        case "main_reducer/SET_KEY_VALUE": return {...state, [action.key]: action.value}                            //sets a simple key value pair within the reducer object


        default: return state
    }
}




export default main_reducer



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 

Initial State

   The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
   individuals life can have its different types of income set.

*/