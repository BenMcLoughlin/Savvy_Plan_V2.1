import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import Input from "UI/Forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"

const FirstName = ({user_reducer, setUserDetail_action}) => {

    const handleChange = event => {
        const { value, name } = event.target;
        setUserDetail_action(name, value)
      };

return (
    <React.Fragment>
        <Title>Whats your first Name?</Title>
        <Input label="First Name" handleChange={handleChange} type="text" value={user_reducer.firstName} name="firstName" required/>
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
    height: 10rem;
    text-align: center;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
`
