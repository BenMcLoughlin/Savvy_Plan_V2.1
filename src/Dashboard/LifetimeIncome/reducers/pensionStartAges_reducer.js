import {calculateFutureValue} from "../../../services/financialFunctions"
const initialState = {
        cppStartAge: {
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
            name: "rrspReturn",
            label: "Estimated RRSP Return",
            rangeBarValue: 0.055, 
            min: 0,
            max: .1,
            step: .005,
            numberType: "percentage",
        },
        rrifStartAge: {
            name: "rrifStartAge",
            label: "Convert RRSP to RRIF",
            rangeBarValue: 65, 
            min: 50,
            max: 72,
            step: 1,
            numberType: "age",
            valueThisRangeBarChanges: "rrifIncome"
        }
}


const pensionStartAges_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_PENSION_START_AGE": return {...state, [action.name]: {
                                                ...state[action.name],  rangeBarValue: action.value,
                                            }
        } 
        default: return state
    }     
    }


export default pensionStartAges_reducer

