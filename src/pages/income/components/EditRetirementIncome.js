import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"
import {cpp_selector} from "redux/income/income_selectors"
import ButtonLight from "UI/buttons/ButtonLight"
import {setNestedKeyValue_action} from "redux/actions"


const EditRetirementIncome = ({setStream, cpp_selector, pensionStartAges_reducer, user_reducer, setNestedKeyValue_action}) => {    

    const {lifeSpan} = user_reducer

    const handleChange = (value, nothing, {name}) => {
        console.log(name); 
        setNestedKeyValue_action("rangeBarValue", name, "user_reducer", value)
      };

    const setPensionAge = (value1, value2, rangeBarProps) => {
       const {name} = rangeBarProps
        setNestedKeyValue_action("rangeBarValue", name, "pensionStartAges_reducer", value1)
    }
    const totalCPP = (lifeSpan.rangeBarValue - pensionStartAges_reducer.cppStartAge.rangeBarValue)  * cpp_selector.value.financialValue
 
    return (
        <Wrapper>
            <Header>
            </Header>
            <Container >                                                                      
     
                <Left>                                                                                                         {/* Choose one is used to select the account type */}
                < MiniRangeBar 
                    rangeBarProps={pensionStartAges_reducer.cppStartAge}
                    setValue={setPensionAge}
                />
              < MiniRangeBar 
                    rangeBarProps={lifeSpan}
                    setValue={handleChange}
                />
                </Left>
                <Right>
                    <TextWrapper>
                    <LargValue>{cpp_selector.value.financialValue/1000}K</LargValue>
                    <h4>Annual CPP Payment</h4>
                    </TextWrapper>
                    <TextWrapper>
                    <LargValue>{totalCPP/1000}K</LargValue>
                    <h4>Total CPP Received</h4>
                    </TextWrapper>

              
                    <ButtonWrapper>
                            <ButtonLight 
                                text={"Add"}
                                onClick={() => null}
                            />
                    </ButtonWrapper>
                    <ButtonLeftWrapper>
                            <ButtonLight 
                                text={"Back"}
                                onClick={() => setStream(false)}
                            />
                    </ButtonLeftWrapper>
                </Right>
            </Container>
        
        </Wrapper>
       
    )

}

const mapStateToProps = (state) => ({
    pensionStartAges_reducer: state.pensionStartAges_reducer,
    user_reducer: state.user_reducer,
    cpp_selector: cpp_selector(state),
})

export default connect(mapStateToProps, {setNestedKeyValue_action, setNestedKeyValue_action})(EditRetirementIncome )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 110rem;
    height: 40rem;
    border-radius: 5px;
    overflow: hidden;
    border: ${props => props.theme.border.primary};
    grid-area: c;
`

const Left = styled.div`  
    width:  50%;
    height: 100%;
    padding: 2rem;
    margin-left: 2rem;
    display: flex;
`
const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 0rem;
    right: 2rem;
`
const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 0rem;
    left: 2rem;
`
const LargValue = styled.div`
   font-size: 5rem;
`
const Right = styled.div`
    width:  50%;
    padding: 2rem;
    display: flex;
`
const TextWrapper = styled.label`
    width: 15rem;
    height: 4rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    text-align: left;
`

const Container = styled.div`
    width: 110rem;
    border-radius: 5px;
    overflow: hidden;
    height: ${props => props.subCategory === "securedDebt" ? "33rem" : "30rem"};                                                    //mortgage requires more height because there are more inputs
    position: relative;
    display: flex;
    background: ${props => props.theme.color.ice};
`


const Header = styled.div`
    width: 100%;
    background: ${props => props.color};
    height: 4rem;
    color: ${props => props.theme.color.ice};
`