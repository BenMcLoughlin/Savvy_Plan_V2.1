import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import CheckBox from "UI/forms/CheckBox"
import {connect} from "react-redux"
import styled from "styled-components"
import Input from "UI/forms/Input"
import Select from "UI/forms/Select"
import _ from "lodash"
import {Title, Dialogue} from "pages/onboarding/components/FirstName"

const FirstName = ({user_reducer, setUserDetail_action}) => {

    const setHasChildren = value => {
        setUserDetail_action("hasChildren", value)
      };

      const handleChange = event => {
        const { value, name } = event.target;
        setUserDetail_action(name, value)
      };

      const setValue = (name, value) => {
        setUserDetail_action(name, value)
      };


return (
    <React.Fragment>
        <Title>Do you have children?</Title>
        <CheckBoxWrapper>      
              <CheckBox handleChange={setHasChildren}  value={user_reducer.hasChildren}/>
        </CheckBoxWrapper>
        <Dialogue> Knowing if you have children helps us by knowing if we should incorporate education savings or tax strategies into our plan.</Dialogue>

        {
            user_reducer.hasChildren ?
            <Div>
                <Input label="Number of Children" handleChange={handleChange} type="number" value={user_reducer.numberOfChildren} name="numberOfChildren" required/>
                {
                    user_reducer.numberOfChildren > 0 ? 
                    _.range(user_reducer.numberOfChildren).map(child => 
                        <Select selectType='year' label={`Child #${child + 1} BirthYear`} handleChange={handleChange} type="text" value={user_reducer[`child${child + 1}BirthYear`]} name={`child${child + 1}BirthYear`} required setValue={setValue}/>
                        )
                
                    : ""
                }
            </Div> 
            : ""
        }

    </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setUserDetail_action})(FirstName)

//-----------------------------------------------style-----------------------------------------------//


const Div = styled.div`
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`
const CheckBoxWrapper = styled.div`
    height: 10rem;
`