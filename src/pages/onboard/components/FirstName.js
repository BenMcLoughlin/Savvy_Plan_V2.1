import React from "react"
import {setKeyValue_action} from "redux/actions"
import Input from "UI/forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"

const FirstName = ({user_reducer, setKeyValue_action}) => {

    const handleChange = event => {
        const { value, name } = event.target;
        setKeyValue_action(name, "user_reducer", value)
      };

return (
    <React.Fragment>
            <Title>Whats your first Name?</Title>
            <Input label="First Name" handleChange={handleChange} type="text" value={user_reducer.firstName} name="firstName" required/>
           <Dialogue/>
    </React.Fragment>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setKeyValue_action})(FirstName)

//-----------------------------------------------style-----------------------------------------------//

export const Title = styled.div`   
    font-size: 3rem;
    width: 100%;
    height: 14rem;
    padding: 2rem;
    text-align: center;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
`
export const Dialogue = styled.div`   
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 60rem;
    height: 10rem;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
    padding: 2rem;
    font-size: 1.6rem;
    font-style: italic;
    & span {
        padding-top: 1rem;
        font-size: 1.2rem;
        font-weight: bold;
    }
`
