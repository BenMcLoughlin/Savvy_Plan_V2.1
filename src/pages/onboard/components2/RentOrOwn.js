import React from "react"
import {setKeyValue_action, setNestedKeyValue_action} from "redux/actions"
import {connect} from "react-redux"
import styled from "styled-components"
import MiniRangeBar from "UI/miniRangeBar1/MiniRangeBar.js"
import Input from "UI/forms/Input"

const GenderAndAge = ({user_reducer, setKeyValue_action}) => {

      const {housing} = user_reducer
      const housingArray = ["Rent", "Own"]

return (
   <Wrapper className="GENDER AND AGE">
       <Title> <h1>Do you rent or own your home? </h1> </Title>
       <Box>
           <Column>
                <Select>
                <h2>I..</h2>
                        {housingArray.map(d => <Circle selected={housing === d} onClick={() => setKeyValue_action("housing", "user_reducer", d)}>{d}</Circle>)  }
                </Select>
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

