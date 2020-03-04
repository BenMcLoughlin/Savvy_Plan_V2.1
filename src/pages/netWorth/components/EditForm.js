import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import FormInput  from "UI/forms/Input"
import DateInput from "UI/forms/DateInput"
import RangeBar  from "UI/rangeBar/RangeBar"
import MiniRangeBar  from "UI/miniRangeBar/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {setItemValue_action, changeLabel_action} from "redux/netWorth/netWorth_actions"
import {propertyNames_selector} from "redux/netWorth/netWorth_selectors"
import _ from "lodash"
import {setInvestmentFactor_action} from "redux/assumptions/assumptions_actions"


const EditForm = ({category, subCategory, setId, id, netWorth_reducer, setItemValue_action, setInvestmentFactor_action, assumptions_reducer, changeLabel_action }) => {    

    const item = netWorth_reducer[category][id]                                             //uses the item id provided to go into the reducer and gahter all the users details

    const setValue = (logValue, rangeBarValue, rangeBarProps) => {                              //sets the value in the reducer
        setItemValue_action(logValue, rangeBarValue, category, rangeBarProps, id)
    }

    const changeLabel = (e) => {                                                                //changes the label in the reducer
        changeLabel_action(e, item, id)
    }

    const setAssumptionValue = (value, value1, rangeBarProps) => {                              //Sets values such as assumed interest return or property appreciation rate
        const {name} = rangeBarProps
        setInvestmentFactor_action(name, value) 
    }

    return (
        <>
        <Wrapper>
            <Header subCategory={subCategory}>
            <h2>{_.startCase(subCategory)}</h2> 
            </Header>
        <Container subCategory={subCategory}> 
                <Left>                                                                            {/*This div is empty and is used to push out the other divs to the same locations as the add form */} 
                </Left>
                <Center>                                                                          {/*Very Similar to the add form */} 
                    <FormInput
                        label="asset name"
                        value={item.label}
                        type={"text"}
                        handleChange={changeLabel}
                    />
                    {subCategory === "securedDebt" ? 
                            <DateInput 
                            label={"Mortgage Start Date"}
                            value={"hi"}
                            handleChange={() => "hi"}
                        />
                        : null
                    }
                    {
                        subCategory === "propertyAssets" || subCategory === "securedDebt" || subCategory === "unsecuredDebt" ?
                <RangeBar 
                        rangeBarProps={item.bookValue}
                        setValue={setValue}                 
                    /> : null
                    }
                <RangeBar 
                        rangeBarProps={item.currentValue}
                        setValue={setValue}                 
                    /> 

                </Center>
                <Right>
                    <MiniRangeBarWrapper>
                        {
                            category === "liabilities" ? 
                            <MiniRangeBar 
                            rangeBarProps={item.interestRate}
                            setValue={setValue}
                        /> 
                        : 
                        subCategory === "propertyAssets"  ?
                            <MiniRangeBar 
                            rangeBarProps={assumptions_reducer.propertyAppreciation}
                            setValue={setAssumptionValue}
                         />
                         :
                         subCategory === "investmentAssets"  ?
                         <MiniRangeBar 
                         rangeBarProps={assumptions_reducer.beforeRetirementReturn}
                         setValue={setAssumptionValue}
                      />

                  
                       : null
                        }
                    </MiniRangeBarWrapper>
                    <ButtonWrapper>
                            <ButtonLight 
                                text={"back"}
                                onClick={() => setId(false)}
                            />
                    </ButtonWrapper>
                </Right>
            </Container>
      
        </Wrapper>
        </>
       
    )

}

const mapStateToProps = (state) => ({
    netWorth_reducer: state.netWorth_reducer,
    propertyNames_selector: propertyNames_selector(state),
    assumptions_reducer: state.assumptions_reducer
})

export default connect(mapStateToProps, {setItemValue_action, changeLabel_action, setInvestmentFactor_action})(EditForm )


//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper = styled.div`
    width: 100rem;
    border-radius: 5px;
    position: absolute;
    top: 1rem;
    left: 1rem;
    height: 20rem;
    width: 94rem;
    border-radius: 5px;
    height: 30rem;                                                    
    border: ${props => props.theme.border.primary};
    position: absolute;
    top: 2rem;
    left: 2rem;
    display: flex;
    flex-direction: column;
    z-index: 100;
    background: ${props => props.theme.color.ice}
`
const Header = styled.div`
    width: 100%;
    background: ${props => props.subCategory === "cashAssets" ? props.theme.color.blue : 
                  props => props.subCategory === "investmentAssets" ? props.theme.color.steelBlue : 
                  props => props.subCategory === "propertyAssets" ? props.theme.color.green : 
                  props => props.subCategory === "unsecuredDebt" ? props.theme.color.salmon : 
                  props => props.subCategory === "securedDebt" ? props.theme.color.darkSalmon : 
    null};
    height: 4rem;
    color: ${props => props.theme.color.ice};

`
const Left = styled.div`
    width: 30rem;
    height: 100%;
    padding: 2rem;
`
const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 2rem;
`
const MiniRangeBarWrapper = styled.div`
    position: absolute;
    right: 3rem;
    top: 1rem;
`
const Right = styled.div`
    width: 30rem;
    padding: 2rem;
`
const Center = styled.div`
    width: 45rem;
    padding: 2rem;
`
const Container = styled.div`
height: ${props => props.subCategory === "securedDebt" ? "33rem" : "30rem"};                                                    //mortgage requires more height because there are more inputs
    display: flex;
    position: relative;
`
