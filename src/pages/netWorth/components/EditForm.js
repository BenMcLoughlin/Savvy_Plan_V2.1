import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import FormInput  from "UI/forms/Input"
import DateInput from "UI/forms/DateInput"
import RangeBar  from "UI/rangeBar/RangeBar"
import MiniRangeBar  from "UI/miniRangeBar/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {setValue_action, setNestedKeyValue_action} from "redux/actions"
import {propertyNames_selector} from "redux/netWorth/netWorth_selectors"
import _ from "lodash"


const EditForm = ({category, subCategory, setId, id, netWorth_reducer, setValue_action, assumptions_reducer, setNestedKeyValue_action }) => {    

    const item = netWorth_reducer[id]                                                          //uses the item id provided to go into the reducer and gahter all the users details
console.log(item);
    const setValue = (logValue, rangeBarValue, rangeBarProps) => {                              //sets the value in the reducer
        setValue_action(id, logValue, rangeBarValue, rangeBarProps, "netWorth_reducer" )
    }        

    const changeLabel = (e) => {                                                                //changes the label in the reducer
        setNestedKeyValue_action("label", id, "netWorth_reducer", e.target.value)
    }

    const setAssumptionValue = (value, value1, rangeBarProps) => {                              //Sets values such as assumed interest return or property appreciation rate
        const {name} = rangeBarProps
        setNestedKeyValue_action("rangeBarValue", name, value, "assumptions_reducer") 
    }

    return (
        <>
        < WhiteBox/>
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
                            value={item.startDate}
                            handleChange={(e) => setNestedKeyValue_action("startDate", id, "netWorth_reducer", e.target.value)}
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
                        rangeBarProps={item.value}
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
                    <ButtonLeftWrapper>
                            <ButtonLight 
                                text={"back"}
                                onClick={() => setId(false)}
                            />
                    </ButtonLeftWrapper>
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

export default connect(mapStateToProps, {setValue_action, setNestedKeyValue_action})(EditForm )


//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper = styled.div`
    width: 94rem;
    border-radius: 5px;
    overflow: hidden;
    height: 30rem;                                                    
    border: ${props => props.theme.border.primary};
    position: absolute;
    top: 2rem;
    left: 11rem;
    display: flex;
    flex-direction: column;
    z-index: 800;
    background: ${props => props.theme.color.ice}
`
const WhiteBox = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 115rem;
    height: 32rem;
    background: white;
    z-index: 700;
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
const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 3rem;
    left: 2rem;
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
