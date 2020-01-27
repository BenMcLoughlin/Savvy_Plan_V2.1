import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import CheckBox from "UI/forms/CheckBox"
import {connect} from "react-redux"
import styled from "styled-components"
import {Title, Dialogue} from "pages/onboarding/components/FirstName"

const FirstName = ({user_reducer, setUserDetail_action}) => {

    const handleChange = value => {
        setUserDetail_action("spouse", value)
      };

return (
    <React.Fragment>
        <Title>Do you have a spouse?</Title>
        <CheckBoxWrapper>
            <CheckBox label="First Name" handleChange={handleChange} type="text" value={user_reducer.spouse} required/>
        </CheckBoxWrapper>
        <Dialogue>Initially we'll build your plan using only your details and later they can be combined with your spouses details.</Dialogue>
    </React.Fragment>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setUserDetail_action})(FirstName)

//-----------------------------------------------style-----------------------------------------------//

const CheckBoxWrapper = styled.div`
    height: 10rem;
`