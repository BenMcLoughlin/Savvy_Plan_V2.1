import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import CheckBox from "UI/Forms/CheckBox"
import {connect} from "react-redux"
import styled from "styled-components"

const FirstName = ({user_reducer, setUserDetail_action}) => {

    const handleChange = value => {
        setUserDetail_action("spouse", value)
      };

return (
    <React.Fragment>
        <Title>Do you have a spouse?</Title>
        <CheckBox label="First Name" handleChange={handleChange} type="text" value={user_reducer.spouse} required/>
    </React.Fragment>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setUserDetail_action})(FirstName)

//-----------------------------------------------STYLES-----------------------------------------------//

const Title = styled.div`   
    font-size: 3rem;
    width: 100%;
    height: 40%;
    text-align: center;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
`
