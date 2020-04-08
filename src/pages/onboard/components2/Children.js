import React from "react"
import {setKeyValue_action, setNestedKeyValue_action} from "redux/actions"
import {connect} from "react-redux"
import styled from "styled-components"
import FormSelect from "UI/forms/Select"
import _ from "lodash"

const Children = ({user_reducer, setKeyValue_action, setNestedKeyValue_action}) => {
  
    const {hasChildren, childCount, birthYear} = user_reducer

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


      const childOptions = ["Yes", "No", "One Day"]
      const childCounter = [1,2,3,4,5,6]
      const status = ["Married", "Single", "Other"]
return (

       <Wrapper>
       <Title> <h1>Do you have children ?</h1> </Title>
       <Box>
           <Column>
                <Select>
                        {childOptions.map(d => <Circle selected={hasChildren === d} onClick={() => setKeyValue_action("hasChildren", "user_reducer", d)}>{d}</Circle>)  }
                </Select>
                {
                    hasChildren !== "No" ? 
                    <>
                    <Select>
                      <h2>How Many?</h2> {childCounter.map(d => <Number count={d} childCount={childCount} onClick={() => setKeyValue_action("childCount", "user_reducer", d)}>{d}</Number>)  }
                    </Select>
                    <Select  childCount={childCount}>
                        < Column>
                                 {
                                    _.range(user_reducer.childCount).map(child => 
                                        <FormSelect selectType='year' label={`Child #${child + 1} BirthYear`} handleChange={handleChange} type="text" value={user_reducer[`child${child + 1}BirthYear`]} name={`child${child + 1}BirthYear`} required setValue={setValue}/>
                                        )
                                 }
                        </Column>
                    </Select>
                    </>
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

export default connect(mapStateToProps, {setKeyValue_action, setNestedKeyValue_action})(Children)

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
    transition: all 3s ease-in;

    
`

const Column = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`
const Select = styled.div`
    width: 40rem;
    height: auto;
    display: flex; 
    border-radius: 5px;
    justify-content: space-around;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    min-height: 12rem;
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
const  Number = styled.div`
   width: 3rem;
   height: 3rem;
   border-radius: 50%;
   background: ${props => props.count <= props.childCount ? props.theme.color.sandy : props.theme.color.green};
   transition: all .2s ease-in;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 1.6rem;
   color: white;
   cursor: pointer;
`

//-----------------------------------------------style-----------------------------------------------//

