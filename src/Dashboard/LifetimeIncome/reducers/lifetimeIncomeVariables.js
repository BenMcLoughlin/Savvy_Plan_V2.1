import {calculateFutureValue} from "../../../services/financialFunctions"
const initialState = {
    birthYear: 1988,
    fromAge: 18, 
    toAge: 65, 
    rrspDetails: {
        rrspValue: {
            name: "rrspValue",
            label: "Current RRSP Value",
            financialValue: 0, 
            rangeBarValue: 0, 
        },
        rrspContributions: {
            name: "rrspContributions",
            label: "RRSP Contribution",
            financialValue: 0, 
            rangeBarValue: 0,
        }, 

        estimatedReturn: {
            name: "estimatedReturn",
            label: "Estimated Return",
            rangeBarValue: 0.055, 
            min: 0,
            max: .1,
            step: .005,
            numberType: "percentage",

        },
        withdrawalStartAge: {
            name: "withdrawalStartAge",
            label: "Convert RRSP to RRIF",
            rangeBarValue: 65, 
            min: 55,
            max: 72,
            step: 1,
            numberType: "age",
        },
       
    },
    pensionAges: {
        cppStartAge: {
            name: "cppStartAge",
            label: "CPP Start Age",
            rangeBarValue: 65, 
            min: 60,
            max: 70,
            step: 1,
            numberType: "age",
        },
        oasStartAge: {
            name: "oasStartAge",
            label: "OAS Start Age",
            rangeBarValue: 65, 
            min: 65,
            max: 70,
            step: 1,
            numberType: "age",
        },
    },
    futureRRSPValue: 0,


}


const lifeTimeIncomeVariableState = (state = initialState, action) => {
    switch(action.type) {
        case "SET_AGE_RANGE": return {...state, fromAge: action.payload.fromAge, toAge: action.payload.toAge}
        case "SET_FUTURE_RRSP_VALUE": {
            const rrspReturn = state.rrspDetails.estimatedReturn.rangeBarValue
            const rrspPresentValue = state.rrspDetails.rrspValue.financialValue
            const rrspNumberOfPeriods = state.rrspDetails.withdrawalStartAge.rangeBarValue - 30
            const rrspPayment = state.rrspDetails.rrspContributions.financialValue
        
            const futureRRSPValue = calculateFutureValue(rrspReturn, rrspNumberOfPeriods ,rrspPayment,rrspPresentValue)

            return {...state, futureRRSPValue: futureRRSPValue
        }}
        case "SET_LIFETIME_INCOME_VARIABLE": return {...state, [action.payload.name]: action.payload.value
        }
        case "SET_RRSP_DETAILS": return {...state, rrspDetails: {
                                            ...state.rrspDetails, [action.payload.name]: {
                                                ...state.rrspDetails[action.payload.name], 
                                                    financialValue: action.payload.financialValue,
                                                    rangeBarValue: action.payload.rangeBarValue,
                                            }
                                            
        }}
        case "SET_PENSION_AGE": return {...state, pensionAges: {
                                            ...state.pensionAges, [action.payload.name]: {
                                                ...state.pensionAges[action.payload.name], rangeBarValue: action.payload.rangeBarValue
                                            }
        } }

        default: return state
    }
}

export default lifeTimeIncomeVariableState