import React from "react"
import {setKeyValue_action} from "redux/actions"
import CheckBox from "UI/forms/CheckBox"
import {connect} from "react-redux"
import styled from "styled-components"
import {Title, Dialogue} from "pages/onboard/components/FirstName"

const FirstName = ({user_reducer, setKeyValue_action}) => {

    const handleChange = value => {
        setKeyValue_action("spouse", "user_reducer", value)
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

export default connect(mapStateToProps, {setKeyValue_action})(FirstName)

//-----------------------------------------------style-----------------------------------------------//

const CheckBoxWrapper = styled.div`
    height: 10rem;
`