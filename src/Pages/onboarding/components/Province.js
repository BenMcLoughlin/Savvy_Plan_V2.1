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
    const setProvince = year => {
        setUserDetail_action("province", year)
      };

return (
    <React.Fragment>
        <Title>What is your province of residence?</Title>
        <Select type={'province'} label="Province" handleChange={handleChange} type="text" value={user_reducer.province} name="province" required setYear={setProvince}/>
        
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
    color: ${props => props.theme.color.blue}
`
