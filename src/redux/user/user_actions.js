export const setRetirementIncome_action = (financialValue, rangeBarValue) => {
    return {
        type: "user_reducer/SET_RETIREMENT_INCOME", 
            financialValue, 
            rangeBarValue
    }
    }
    
    
export const setUserDetails_action = (userId, userDetails) => {
    console.log(userDetails);
    return {
        type: "user_reducer/SET_USER_DETAILS", 
        userId, 
        displayName: userDetails.displayName, 
        email: userDetails.email, 
    }
    }
    
    
export const setUserDetail_action = (name, value) => ({
    type: "user_reducer/SET_USER_DETAIL", 
       name,
       value
    })
    
    