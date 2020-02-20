export const setProgress_action = (section, value) => {
    console.log('fired!!');
   return ({
    type: "progress/SET_POSITION",
    section,
    value
})


}