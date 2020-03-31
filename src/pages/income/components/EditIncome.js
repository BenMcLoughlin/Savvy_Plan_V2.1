import React, {useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import InstanceNav from "pages/income/components/InstanceNav"
import FormInput  from "UI/forms/Input"
import DualRangeBar from "UI/dualRangeBar/DualRangeBar"
import RangeBar  from "UI/rangeBar1/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import _ from "lodash"
import {incomeStream_data} from "pages/income/data/income_data"
import { setNestedKeyValue_action, setKeyValue_action, delete_action} from "redux/actions"
import {editStreamName, setAge} from "services/ui/ui_functions"
import {income_selector} from "redux/income/income_selectors"

const EditIncome = ({viewStream, createNewItem, income_selector, viewId, setKeyValue_action, setNestedKeyValue_action}) => {           //this is the box that enables us to edit an income stream and add new instances

    const instance = income_selector[viewId]                                                                        //this grabs the instance details, the instance is an object that is part of a stream like walmart income but only in a certain age range
    const instanceArray =  Object.values(income_selector).filter(d => d.stream === viewStream).sort((a,b) => a.age1 - b.age1)   

    const {age2} = instance
                                            
    const setDualRangeBar = (name, value) => {                                                                                 //sets the age, as well as the surrounding ages in the array of instances
        setAge(viewId, instanceArray, name, setNestedKeyValue_action, "income_reducer", value)
    }                                                                                                                           //grabs the age2 of the next instance in the array, used for if we create a new instance and the age is then automatically set to be higher

    return (
        <Wrapper>
            <Header color={instance.color}>
            <h2>{_.startCase(viewStream)}</h2> 
            </Header>
            <InstanceNav color={instance.color}
                            instanceArray={instanceArray}
                            viewId={viewId}
                            addSection={() => {
                            createNewItem(incomeStream_data(instance.color, age2, instance.reg, instance.stream, (age2 + 5), instance.value))} }
                        />                                                  
            <Container >                                                                      
     
                <Left>                                                                                                         {/* Choose one is used to select the account type */}
                <FormInput
                        label="Income name"
                        value={instance.stream}                                                                                        //because the stream also set if the instance is shown we need this ternary to prevent it from exiting when the text is empty
                        type={"text"}  
                        handleChange={(e) => editStreamName(e, income_selector, viewStream, setNestedKeyValue_action, setKeyValue_action, "income_reducer")}                                                                      //sets the state in the local state
                    />                                    
                        <RangeBar 
                            setNestedKeyValue_action={setNestedKeyValue_action}                                                                             //Every Add instance has a range bar to set its value
                            reducer="income_reducer"
                            label={"Annual Income"}
                            instance={instance}       
                        /> 

                </Left>

                <Right>
                <YearsSelectorWrapper> 
                    <Label>
                    Earning Years Selector
                    </Label>
                    <SelectorTitleWrapper>
                        <div>From Age</div>    
                        <div>To Age</div>    
                    </SelectorTitleWrapper>
                    <DualRangeBar
                        bottom={instance.age1}                                                                                     //age1 sets the from Age, eg. age 18 in 18-45
                        top={instance.age2}                                                                                          //age2 sets the to Age, eg. age 45 in 18-45
                        setValue={setDualRangeBar}                                                                                         //reaches into reducer to set the values
                    />
            </YearsSelectorWrapper> 


                    <ButtonWrapper>
                            <ButtonLight 
                                text={"Add"}
                                onClick={() => { 
                                    setKeyValue_action("viewStream", "ui_reducer", null)
                                    setKeyValue_action("viewId", "ui_reducer", null)
                                }}
                            />
                    </ButtonWrapper>
                    <ButtonLeftWrapper>
                            <ButtonLight 
                                text={"Back"}
                                onClick={() => {
                                    setKeyValue_action("viewStream", "ui_reducer", null)
                                    setKeyValue_action("viewId", "ui_reducer", null)
                                }}
                            />
                    </ButtonLeftWrapper>
                </Right>
            </Container>
        
        </Wrapper>
       
    )

}

const mapStateToProps = (state) => ({
    income_selector: income_selector(state)
})

export default connect(mapStateToProps, {setNestedKeyValue_action, setKeyValue_action,  delete_action})(EditIncome )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 90rem;
    height: 33rem;
    margin-left: 13rem;
    border-radius: 5px;
    overflow: hdden;
    border: ${props => props.theme.border.primary};
    gridd-area: cid
`

const Left = styled.div`  
    width:  50%;
    height: 100%;
    padding: 2rem;
    margin-left: 2rem;
`
const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 2rem;
`
const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    left: 2rem;
`
const Right = styled.div`
    width:  50%;
    padding: 2rem;
`
const Label = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    color: ${props => props.theme.color.darkGrey};
    width: 25rem;
    height: 4rem;
    padding: 1rem;
    font-weight: 700;
    text-align: left;
`

const Container = styled.div`
    width: 90rem;
    height: 25rem;
    border-radius: 5px;
    overflow: hi
    dden;
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.color.ice};
`