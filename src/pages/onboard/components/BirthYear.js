import React from "react"
import {setKeyValue_action, setNestedKeyValue_action} from "redux/actions"
import Select from "UI/forms/Select"
import {connect} from "react-redux"
import styled from "styled-components"
import {Title, Dialogue} from "pages/onboard/components/FirstName"

const BirthYear = ({user_reducer, setKeyValue_action, setNestedKeyValue_action}) => {

    const handleChange = event => {
        const { value, name } = event.target;
        setKeyValue_action(name, "user_reducer", value)
      };

      const setValue = (name, value) => {
       const today = new Date().getFullYear()
       const currentAge = today - value
        setKeyValue_action(name, "user_reducer", value)
        setKeyValue_action("currentAge", "user_reducer", currentAge)
        setNestedKeyValue_action("fromAge", "TFSAcontribution", "savings_reducer", currentAge) 
        setNestedKeyValue_action("fromAge", "RRSPcontribution", "savings_reducer", currentAge) 
      };

return (
    <React.Fragment>
        <Title>What year were you born?</Title>
        <Select selectType='year' label="Birth Year" handleChange={handleChange} type="text" value={user_reducer.birthYear} name="birthYear" required setValue={setValue}/>
        <Dialogue> Knowing your birth year helps us estimate your estimated Canada Pension Plan income.</Dialogue>
    </React.Fragment>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setKeyValue_action, setNestedKeyValue_action})(BirthYear)

//-----------------------------------------------style-----------------------------------------------//

