import React, {useState} from "react"
import Input from "UI/forms/Input"
import  ButtonLight from "UI/buttons/ButtonLight"
import {connect} from "react-redux"
import styled from "styled-components"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"

const NewEvent = ({user_reducer,}) => {

    const [name, setName] = useState("")
    const [age, setAge] = useState(25)
    const [cost, setCost] = useState(2500)
    const [position, setPosition] = useState(true)

    const ageRangeBarProps = {
        name: "age",
        label: "Estimated Age",
        rangeBarValue: age, 
        min: 18,
        max: 90,
        step: 1,
        numberType: "age",
    }
    const costRangeBarProps = {
        name: "cost",
        label: "Estimated Cost",
        rangeBarValue: cost, 
        min: 100,
        max: 100000,
        step: 1,
        numberType: "financial",
    }

    const handleChange = (rangeBarValue, financialValue, props) => {
        const { name } = props
        name === "cost" ? setCost(financialValue) : setAge(rangeBarValue)
      };

    const handleSubmit = (event) => {
        event.preventDefault()
        setPosition(!position)
          console.log('handlesubmit');

        setName("")
      }


return (

        <Wrapper>
            <Section>
                <Input label="Event Title" handleChange={(e) => setName(e.target.value)} type="text" value={name} name="firstName" required/>
                <RangeBarWrapper>
                    < MiniRangeBar
                    setValue={handleChange}                                                        //Function Defined Above, sets the age in the reducer
                    rangeBarProps={ageRangeBarProps}       
                    />
                    < MiniRangeBar
                    setValue={handleChange}                                                        //Function Defined Above, sets the age in the reducer
                    rangeBarProps={costRangeBarProps}       
                    />
                </RangeBarWrapper>
            </Section>
            <ButtonWrapper>
               <ButtonLight text="Add" onClick={(event) => handleSubmit(event)}/>
            </ButtonWrapper>

        </Wrapper>
)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
})

export default connect(mapStateToProps, {})(NewEvent)

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`   
    width: 65rem;
    height: 18rem;
    padding: 2rem;
    text-align: center;
    color: ${props => props.theme.color.slate}
    border: .7px solid ${props => props.theme.color.lightGrey};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: relative;
`

const Section = styled.div`
    width: 100%;
    height: 10rem;
    display: flex;


`
const ButtonWrapper = styled.div`
    position: absolute;
    top: 10rem;
    left: 3rem;
`
const RangeBarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 30rem;
`