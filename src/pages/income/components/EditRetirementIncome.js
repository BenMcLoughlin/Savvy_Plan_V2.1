import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"
import {cpp_selector} from "redux/income/income_selectors"
import {setPensionAge_action} from "redux/pensionStartAges/pensionStartAges_actions"
import ButtonLight from "UI/buttons/ButtonLight"
import {setNestedUserDetail_action} from "redux/user/user_actions"
import _ from "lodash"

const EditRetirementIncome = ({setCategory, cpp_selector, pensionStartAges_reducer, user_reducer, setPensionAge_action, setNestedUserDetail_action}) => {    

    const {lifeSpan} = user_reducer

    const handleChange = (value, nothing, {name}) => {
        console.log(name);
        setNestedUserDetail_action(name, "rangeBarValue", value)
      };

    const setPensionAge = (value1, value2, rangeBarProps) => {
       const {name} = rangeBarProps
        setPensionAge_action(name, value1)
    }
    const totalCPP = (lifeSpan.rangeBarValue - pensionStartAges_reducer.cppStartAge.rangeBarValue)  * cpp_selector.income.financialValue
 
    return (
        <Wrapper>
            <Header>
            <h2></h2> 
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
                    <LargValue>{cpp_selector.income.financialValue/1000}K</LargValue>
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
                                onClick={() => setCategory(false)}
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

export default connect(mapStateToProps, {setPensionAge_action, setNestedUserDetail_action})(EditRetirementIncome )


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


const YearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`


const SelectorTitleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: .5rem;
    font-size: ${props =>props.theme.fontSize.small};
    color: ${props => props.theme.color.slate};
`

const Header = styled.div`
    width: 100%;
    background: ${props => props.color};
    height: 4rem;
    color: ${props => props.theme.color.ice};
`