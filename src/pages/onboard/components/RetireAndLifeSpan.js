import React from "react"
import {setKeyValue_action, setNestedKeyValue_action} from "redux/actions"
import {connect} from "react-redux"
import styled from "styled-components"
import MiniRangeBar from "UI/miniRangeBar1/MiniRangeBar.js"
import { slideLeftToRight } from 'style/keyframes'

const RetireAndLifeSpan = ({user_reducer, setKeyValue_action, setNestedKeyValue_action}) => {

    const {retirementAge, lifeSpan} = user_reducer
return (
   <Wrapper>
         <Title> <h1>Your savings will need to fund {lifeSpan - retirementAge} years of retirement.</h1> </Title>
       <Box>
           <Column>
                <Select>
                <Text>I'd like to be financially free by {retirementAge}</Text>
                       <MiniRangeBar
                           name={"retirementAge"}
                           reducer={"user_reducer"}
                           setKeyValue_action={setKeyValue_action}
                           value={retirementAge}
                           min={0}
                           max={90}
                           step={1}
                       />
                </Select>
                <Select>
                <Text>And hope to live to {lifeSpan}</Text>
                       <MiniRangeBar
                           name={"lifeSpan"}
                           reducer={"user_reducer"}
                           setKeyValue_action={setKeyValue_action}
                           value={lifeSpan}
                           min={0}
                           max={120}
                           step={1}
                       />
                </Select>
           </Column> 
      </Box>
   </Wrapper> 

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setKeyValue_action, setNestedKeyValue_action})(RetireAndLifeSpan)

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
const  Text = styled.h3`
 width: 15rem;
`


//-----------------------------------------------style-----------------------------------------------//

