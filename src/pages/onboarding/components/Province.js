import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import Select from "UI/forms/Select"
import {connect} from "react-redux"
import styled from "styled-components"
import {Title, Dialogue} from "pages/onboarding/components/FirstName"

const FirstName = ({user_reducer, setUserDetail_action}) => {

    const handleChange = event => {
        const { value, name } = event.target;
        setUserDetail_action(name, value)
      };
    const setValue = (name, value) => {
        setUserDetail_action(name, value)
      };

return (
    <React.Fragment>
        <Title>What is your province of residence?</Title>
        <Select label="Province" handleChange={handleChange} type="text" value={user_reducer.province} name="province" required setValue={setValue}/>
        <Dialogue> Your province plays a role in how much you have to pay in taxes as each province has different rates.</Dialogue> 
    </React.Fragment>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setUserDetail_action})(FirstName)

//-----------------------------------------------style-----------------------------------------------//


