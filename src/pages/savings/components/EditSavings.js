import React, {useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import InstanceNav from "pages/savings/components/InstanceNav"
import DualRangeBar from "UI/dualRangeBar/DualRangeBar"
import RangeBar  from "UI/rangeBar1/RangeBar"
import _ from "lodash"
import {savingsInstance_data} from "pages/savings/data/savings_data"
import {tfsaProjection_selector} from "redux/savings/savings_selectors"
import {setNestedKeyValue_action, setKeyValue_action} from "redux/actions"
import {instanceArray_function} from "services/savings/savings_functions"
import {setAge} from "services/ui/ui_functions"

const EditSavings = ({transaction, setNestedKeyValue_action, setKeyValue_action, savings_reducer, deleteInstance, user_reducer, createNewItem, id, reg, setId}) => {    

    const setDualRangeBar = (name, value) => {                                                                                          //sets the age, as well as the surrounding ages in the array of instances
        if (transaction === "withdrawal"){
        setAge(id, instanceArray, name, setNestedKeyValue_action, "income_reducer", value) 
    }
        setAge(id, instanceArray, name, setNestedKeyValue_action, "savings_reducer", value)
}
     const instance = savings_reducer[id]

     const endAge = instance.toAge       
     const newItem = savingsInstance_data((+endAge), id, reg, instance.stream, (+endAge + 5), transaction, instance.value)                                         //grabs the toAge of the next instance in the array, used for if we create a new instance and the age is then automatically set to be higher

     const instanceArray = instanceArray_function(savings_reducer, transaction, reg)
   
     return (
        <Wrapper>
             <Header transaction={transaction}>
            <h2>{_.startCase(transaction)}s</h2> 
            </Header>
            <InstanceNav color={instance.color}
                            instanceArray={instanceArray}
                            setId={setId}
                            id={id}
                            deleteInstance={deleteInstance}
                            addSection={() => createNewItem(newItem)}
                        />
            <Container >  
                < RangeBarWrapper>
                <RangeBar 
                            setNestedKeyValue_action={setNestedKeyValue_action}                                                                             //Every Add instance has a range bar to set its value                                                                                     //Every Add instance has a range bar to set its value
                            reducer="savings_reducer"
                            second_reducer={transaction === "withdrawal" ? "income_reducer" : false}                                                         // if its a withdrawal we also want to make changes in the income_reducer  
                            label={`Annual ${transaction}`}
                            instance={instance}       
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
                        setValue={setDualRangeBar}                                                                                         //reaches into reducer to set the values
                    />
            </YearsSelectorWrapper>                                                                                                        {/* Choose one is used to select the account type */}

            </Container>
        </Wrapper>
       
    )

}

const mapStateToProps = (state) => ({
    savings_reducer: state.savings_reducer,
    user_reducer: state.user_reducer,
    user_reducer: state.user_reducer,
    tfsaProjection_selector: tfsaProjection_selector(state),
})

export default connect(mapStateToProps, {setNestedKeyValue_action, setKeyValue_action})(EditSavings )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 32%;
    height: 30rem;
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
    margin-left: 3rem;
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

