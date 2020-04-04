import React from "react"
import {setKeyValue_action, setNestedKeyValue_action} from "redux/actions"
import CheckBox from "UI/forms/CheckBox"
import {connect} from "react-redux"
import styled from "styled-components"
import Input from "UI/forms/Input"
import Select from "UI/forms/Select"
import _ from "lodash"
import {Title, Dialogue} from "pages/onboard/components/FirstName"
import {createIncomeInstance} from "services/income/income_functions"
import {child_data} from "pages/income/data/income_data"

const FirstName = ({user_reducer, setKeyValue_action, setNestedKeyValue_action}) => {

    const {birthYear, child1BirthYear} = user_reducer

    const setHasChildren = value => {
        setKeyValue_action("hasChildren", "user_reducer", value)
        setNestedKeyValue_action("eligible", "21400", "tax_reducer", value)
      }

      const handleChange = event => {
        const { value, name } = event.target;
        setKeyValue_action(name, "user_reducer", value)
        setNestedKeyValue_action("value", "21400", "tax_reducer", (value * 2000))
    
      };

      const setValue = (name, value) => {
        setKeyValue_action(name, "user_reducer", value)
       const birthAge = value - birthYear
       setNestedKeyValue_action("age1", "21400", "tax_reducer", birthAge)
       setNestedKeyValue_action("age2", "21400", "tax_reducer", birthAge + 18)
      };


return (
    <React.Fragment>
        <Title>Do you have children?</Title>
        <CheckBoxWrapper>      
              <CheckBox handleChange={setHasChildren}  value={user_reducer.hasChildren}/>
        </CheckBoxWrapper>
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

export default connect(mapStateToProps, {setKeyValue_action, setNestedKeyValue_action})(FirstName)

//-----------------------------------------------style-----------------------------------------------//


const Div = styled.div`
    height: 40rem;
    width: 45rem;
    overflow: scroll;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CheckBoxWrapper = styled.div`
    height: 5rem;
    margin-top: -6rem;
`