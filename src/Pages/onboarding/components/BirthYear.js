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
        <Title>What year were you born?</Title>
        <Select selectType='year' label="Birth Year" handleChange={handleChange} type="text" value={user_reducer.birthYear} name="birthYear" required setValue={setValue}/>
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
