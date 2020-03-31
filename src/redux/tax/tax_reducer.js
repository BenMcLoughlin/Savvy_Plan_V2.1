import _ from "lodash"

const tax_reducer = { 
   "RRSPcontribution": { 
      id: "RRSPcontribution", 
      age1: 25, 
      stream: "RRSP Contributions",
      reg: "RRSP",
      age2: 65, 
      type: "rrsp", 
      value: 0, 
    },
   21400: { 
       stream: "Child Care Expenses",         
       type: "deduction",
       id: 21400,                                                                                                                                                                                                                                                           
       age1: 18,
       age2: 64,
       value: 0
    },
   30000: { 
       stream: "Basic personal amount",         
       id: 30000,                                                                                                          
       type: "fixed",                                                                                                                          
       age1: 18,
       age2: 95,
       value: 12069
    },
   30001: { 
       stream: "Age amount",         
       id: 30001,                                                                                                          
       type: "fixed",                                                                                                                            
       age1: 65,
       age2: 95,
       value: 0,
    },
   30400: { 
       stream: "Eligible dependant",         
       id: 30400,      
       type: "fixed",                                                                                                     
       eligible: false,                                                                                                                                                  
       age1: 22,
       age2: 45,
       value: 0
    },
   30800: { 
       stream: "CPP & EI contributions",         
       id: 30800,          
       type: "fixed",                                                                                                 
       eligible:  false,                                                                                                                                                  
       age1: 18,
       age2: 95,
       value: 3000
    },
31240: { 
       stream: "Volunteer firefighters' amount",         
       id: 31240,          
       type: "fixed",                                                                                                 
       eligible: false ,                                                                                                                                                 
       age1: 18,
       age2: 95,
       value: 0
    },
31240: { 
       stream: "Employment amount",         
       id: 31240,                                                                                                    
       type: "fixed",                                                                                                                   
       age1: 18,
       age2: 95,
       value: 1222
    },
31900: { 
       stream: "Interest on student loans",         
       id: 31900,                                                                                                  
       type: "variable",                                                                                                                     
       age1: 18,
       age2: 95,
       value: 0
    },
32300: { 
       stream: "Tuition and textbook costs",         
       id: 32300,                                                                                                     
       type: "variable",                                                                                                                                                  
       age1: 18,
       age2: 95,
       value: 0
    },
33099: { 
       stream: "Medical expenses",         
       id: 33099,                                                                                               
       type: "variable",                                                                                                                                           
       age1: 18,
       age2: 95,
       value: 0
    },
34900: { 
       stream: "Donations and gifts",       
       id: 34900,                                                                                               
       type: "variable",                                                                                                                               
       age1: 18,
       age2: 44,
       value: 0,
    },
   }

 const taxCredits_reducer = (state = tax_reducer, action) => {
    switch(action.type) {
        case "tax_reducer/DELETE": return _.omit(state, [action.id])
        case "tax_reducer/SET_KEY_VALUE": return {...state, [action.key]: action.value}                                 //sets a simple key value pair within the reducer object
        case "tax_reducer/SET_NESTED_KEY_VALUE": return {...state, [action.parentKey]: {
                                                                        ...state[action.parentKey], 
                                                                        [action.childKey]: action.value
}}    
        default: return state
    }
}

export default taxCredits_reducer