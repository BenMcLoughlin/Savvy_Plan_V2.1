import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import Select from "UI/Forms/Select"
import {connect} from "react-redux"
import styled from "styled-components"

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
        <Dialogue> Your province plays a role in how much you have to pay in taxes as each province has different rates.</Dialogue>
        <Select label="Province" handleChange={handleChange} type="text" value={user_reducer.province} name="province" required setValue={setValue}/>
        
    </React.Fragment>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setUserDetail_action})(FirstName)

//-----------------------------------------------style-----------------------------------------------//

const Title = styled.div`   
    font-size: 3rem;
    width: 100%;
    height: 10rem;
    text-align: center;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
`

const Dialogue = styled.div`   
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 60rem;
    height: 16rem;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
    & span {
        padding: 1rem;
        font-size: 1.4rem;
        font-style: italic;
        text-align: left;
    }
`