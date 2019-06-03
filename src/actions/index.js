export const setAge = (value) => {
    return {
        type: "SET_AGE",
        payload: value
    }
}
export const setRetirementAge = (value) => {
    return {
        type: "SET_RETIREMENT_AGE",
        payload: value
    }
}
export const setPensionStartAge = (value) => {
    return {
        type: "PENSION_START_AGE",
        payload: value
    }
}
export const lifeSpan = (value) => {
    return {
        type: "LIFE_SPAN",
        payload: value
    }
}
export const current_income = (value) => {
    return {
        type: "CURRENT_INCOME",
        payload: value
    }
}