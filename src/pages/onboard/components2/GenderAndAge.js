import React from "react"
import {setKeyValue_action, setNestedKeyValue_action} from "redux/actions"
import {connect} from "react-redux"
import styled from "styled-components"
import MiniRangeBar from "UI/miniRangeBar1/MiniRangeBar.js"
import Input from "UI/forms/Input"

const GenderAndAge = ({user_reducer, setKeyValue_action, setNestedKeyValue_action}) => {

    const handleChange = event => {
        const { value, name } = event.target;
        setKeyValue_action(name, "user_reducer", value)
      };

      const setValue = (name, value) => {
       const today = new Date().getFullYear()
       const currentAge = today - value
        setKeyValue_action(name, "user_reducer", value)
        setKeyValue_action("currentAge", "user_reducer", currentAge)
        setNestedKeyValue_action("age1", "TFSAcontribution", "savings_reducer", currentAge) 
        setNestedKeyValue_action("age1", "RRSPcontribution", "savings_reducer", currentAge) 
      };

      const {gender, currentAge, maritalStatus, maritalStatusId, genderId} = user_reducer
      const genders = ["Male", "Female", "Other"]
      const status = ["Married", "Single", "Other"]

return (
   <Wrapper className="GENDER AND AGE">
       <Title> <h1>About you</h1> </Title>
       <Box>
           <Column>
                <Select>
                <h2>I am..</h2>
                        {genders.map(d => <Circle selected={gender === d} onClick={() => setKeyValue_action("gender", "user_reducer", d)}>{d}</Circle>)  }
 
                </Select>
                {
                            gender === "Other" ? 
                            <Select>
                                <Input label="I identify as"
                                       handleChange={(e) => setKeyValue_action("genderId", "user_reducer", e.target.value)} 
                                       value={genderId}/>
                            </Select>
                            : null
                        }
                <Select>
                <h2>{currentAge} years old</h2>
                       <MiniRangeBar
                           name={"currentAge"}
                           reducer={"user_reducer"}
                           setKeyValue_action={setKeyValue_action}
                           value={currentAge}
                           min={0}
                           max={90}
                           step={1}
                       />
                </Select>
                <Select>
                <h2>I am..</h2>
                        {status.map(d => <Circle selected={maritalStatus === d} onClick={() => setKeyValue_action("maritalStatus", "user_reducer", d)}>{d}</Circle>)  }
                </Select>
                {
                            maritalStatus === "Other" ? 
                            <Select>
                                <Input label="My Relationship"
                                       handleChange={(e) => setKeyValue_action("gmaritalStatusId", "user_reducer", e.target.value)} 
                                       value={maritalStatusId}/>
                            </Select>
                            : null
                        }
           </Column> 
      </Box>
   </Wrapper> 
)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setKeyValue_action, setNestedKeyValue_action})(GenderAndAge)

const Wrapper = styled.div`
    width: 60rem;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
`
const Title = styled.h1`
    width: 40rem;
    height: auto;
    padding: 1rem;
    margin-top: 2rem;
    font-weight: bold

`

const Box = styled.div`
    height: auto;
    width: 50rem;
    border-radius: 3rem;
    display: flex;

    
`

const Column = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`
const Select = styled.div`
    width: 40rem;
    min-height: 12rem;
    height: auto;
    display: flex; 
    border-radius: 5px;
    justify-content: space-around;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    border: ${props => props.theme.border.primary};
    background: ${[props => props.theme.color.ice]};
`
const  Circle = styled.div`
    width: ${props => props.selected ? "7.9rem" : "7.5rem;"};
    height: ${props => props.selected ? "7.9rem" : "7.5rem;"};
   border-radius: 50%;
   background: ${props => props.selected ? props.theme.color.steelBlue: props.theme.color.green};
   transition: all .2s ease-in;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 1.6rem;
   color: white;
   cursor: pointer;
`


//-----------------------------------------------style-----------------------------------------------//

