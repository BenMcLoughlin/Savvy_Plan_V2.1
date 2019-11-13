import {calculateFutureValue} from "../../../services/financialFunctions"
const initialState = {
    birthYear: 1988,
    fromAge: 18, 
    toAge: 65, 
    rrspDetails: {
        rrspValue: {
            section: "rrspDetails",
            name: "rrspValue",
            label: "Current RRSP Value",
            financialValue: 0, 
            rangeBarValue: 0, 
        },
        rrspContributions: {
            section: "rrspDetails",
            name: "rrspContributions",
            label: "RRSP Contribution",
            financialValue: 0, 
            rangeBarValue: 0,
        }, 

    },
    pensionStartAges: {
        cppStartAge: {
            section: "pensionStartAges",
            name: "cppStartAge",
            label: "CPP Start Age",
            rangeBarValue: 65, 
            min: 60,
            max: 70,
            step: 1,
            numberType: "age",
            valueThisRangeBarChanges: "cppIncome"
        },
        oasStartAge: {
            section: "pensionStartAges",
            name: "oasStartAge",
            label: "OAS Start Age",
            rangeBarValue: 65, 
            min: 65,
            max: 70,
            step: 1,
            numberType: "age",
            valueThisRangeBarChanges: "oasIncome"
            
        },
        rrspReturn: {
            section: "pensionStartAges",
            name: "rrspReturn",
            label: "Estimated RRSP Return",
            rangeBarValue: 0.055, 
            min: 0,
            max: .1,
            step: .005,
            numberType: "percentage",
        },
        rrifStartAge: {
            section: "pensionStartAges",
            name: "rrifStartAge",
            label: "Convert RRSP to RRIF",
            rangeBarValue: 65, 
            min: 50,
            max: 72,
            step: 1,
            numberType: "age",
            valueThisRangeBarChanges: "rrifIncome"
        },

    },
    futureRRSPValue: 0,


}


const lifeTimeIncomeVariableState = (state = initialState, action) => {
    switch(action.type) {
        case "SET_AGE_RANGE": return {...state, fromAge: action.payload.fromAge, toAge: action.payload.toAge}
        case "SET_FUTURE_RRSP_VALUE": {
            const {
                pensionStartAges: {rrspReturn: {rangeBarValue: rrspReturn }},                                                                  //use destructing to pull out variables from the reducer state
                pensionStartAges: {rrifStartAge: {rangeBarValue: rrspNumberOfPeriods}},
                rrspDetails: {rrspValue: {financialValue: rrspPresentValue }},            
                rrspDetails: {rrspContributions: {financialValue: rrspPayment }},    
            } = state
            const futureRRSPValue = calculateFutureValue(rrspReturn, (rrspNumberOfPeriods-30) ,rrspPayment,rrspPresentValue)                    //Determines the future of value of the RRSP with the RRSP details given
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

        case "SET_VALUE_IN_REDUCER": return {...state, [action.payload.section]: {
                                            ...state[action.payload.section], [action.payload.name]: {
                                                ...state[action.payload.section][action.payload.name], 
                                                    rangeBarValue: action.payload.rangeBarValue,
                                                    financialValue: action.payload.financialValue
                                            }
        } }
        

        default: return state
    }
}

export default lifeTimeIncomeVariableState

