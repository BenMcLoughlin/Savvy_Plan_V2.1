import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import InstanceNav from "pages/savings/components/InstanceNav"
import DualRangeBar from "UI/dualRangeBar/DualRangeBar"
import RangeBar  from "UI/rangeBar/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import { changeValue_action, changeAge_action} from "redux/savings/savings_actions"
import _ from "lodash"
import {savingsInstance_data} from "pages/savings/data/savings_data"
import {incomeStream_data} from "pages/income/data/income_data"
import {tfsaProjection_selector} from "redux/savings/savings_selectors"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"


const EditIncome = ({transaction, savings_reducer, instanceArray, deleteInstance, changeValue_action, createNewItem, id, setId, assumptions_reducer, changeAge_action}) => {    

    const setValue = (logValue, rangeBarValue, rangeBarProps) => {                                                             //receives numbers from range bar and sets them in state
        changeValue_action(id, logValue, rangeBarValue, rangeBarProps)                                                        //setting the income value in the reducer
    }

    const setAge = (name, value) => {                                                                                          //sets the age, as well as the surrounding ages in the array of instances
        const ageType = name === "bottom" ? "fromAge" : "toAge"                                                                //checks what range bar is being changed in the dual range bar
        changeAge_action(id, ageType, value)
        if (ageType === "fromAge" ) {                                                                                          //if its "from age" we want to change the age and the "to age " of the instance before it
            const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                                //we're finding the index of this instance in the instance array
            if (currentInstanceId !== 0) {                                                                                     //if the position is higher then one we want to change the "to Age" of the instance before
                const lastInstanceId = instanceArray[currentInstanceId - 1].id                                                 //findst the id of the instance before 
                changeAge_action(lastInstanceId, "toAge", value)                                                               //changes the "to Age" of the instance before
            } 
        }
        if (ageType === "toAge" ) {
            const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                               //same as above but changes the "from age" of the instance after
            if (currentInstanceId !== instanceArray.length - 1) {
                const nextInstanceId = instanceArray[currentInstanceId + 1].id
                changeAge_action(nextInstanceId, "fromAge", value)
            } 
        }
    }

    const transactionFunction = () => {
            createNewItem(savingsInstance_data(transaction, (+endAge), (+endAge + 5), instance.value.financialValue , instance.value.rangeBarValue, instance.value))
    }


const instance = savings_reducer[id]
console.log(instance);
    const endAge = 60//instance.toAge                                                                //grabs the toAge of the next instance in the array, used for if we create a new instance and the age is then automatically set to be higher

    return (
        <Wrapper>
             <Header transaction={transaction}>
            <h2>{_.startCase(transaction)}s</h2> 
            </Header>
            <InstanceNav color={instance.color}
                            itemList={instanceArray}
                            setId={setId}
                            id={id}
                            deleteInstance={deleteInstance}
                            addSection={() => transactionFunction()}
                        />
            <Container >  
                < RangeBarWrapper>
                <RangeBar 
                        rangeBarProps={instance.value}                                                                               //Every Add instance has a range bar to set its value
                        setValue={setValue}                 
                    />  
                </RangeBarWrapper>                                   
                <YearsSelectorWrapper> 
                    <SelectorTitleWrapper>
                        <div>From Age</div>    
                        <div>To Age</div>    
                    </SelectorTitleWrapper>
                    <DualRangeBar
                        bottom={instance.fromAge}                                                                                     //fromAge sets the from Age, eg. age 18 in 18-45
                        top={instance.toAge}                                                                                          //toAge sets the to Age, eg. age 45 in 18-45
                        setValue={setAge}                                                                                         //reaches into reducer to set the values
                    />
            </YearsSelectorWrapper>                                                                                                        {/* Choose one is used to select the account type */}

            </Container>
        </Wrapper>
       
    )

}

const mapStateToProps = (state) => ({
    savings_reducer: state.savings_reducer,
    assumptions_reducer: state.assumptions_reducer,
    tfsaProjection_selector: tfsaProjection_selector(state),
})

export default connect(mapStateToProps, {changeValue_action, changeAge_action})(EditIncome )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 32%;
    height: 33rem;
    margin-top: 2rem;
    border-radius: 5px;
    overflow: hidden;
    border: ${props => props.theme.border.primary};
    background: ${props => props.theme.color.ice};
    grid-area: c;
`



const Container = styled.div`
    position: relative;
    display: flex;
    height: 20rem;
    flex-direction: column;
    justify-content: space-around;
`


const YearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
const RangeBarWrapper = styled.div`
    margin-left: 5rem;
    margin-top: 2rem;
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
    background: ${props => props.transaction === "contribution" ? props.theme.color.steelBlue : props.theme.color.green};
    height: 4rem;
    color: ${props => props.theme.color.ice};
    border-bottom:  ${props => props.theme.border.primary};
    display: flex;
    justify-content: space-between;
    padding: .5rem 2rem 0.5rem 2rem;
`

