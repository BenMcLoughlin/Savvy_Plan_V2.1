import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import InstanceNav from "pages/savings/components/InstanceNav"
import DualRangeBar from "UI/dualRangeBar/DualRangeBar"
import RangeBar  from "UI/rangeBar1/RangeBar"
import _ from "lodash"
import {setNestedKeyValue_action} from "redux/actions"
import {instanceArray_function} from "services/savings/savings_functions"
import {setAge} from "services/ui/ui_functions"

const EditSavings = ({transaction, setNestedKeyValue_action, main_reducer, ui_reducer,  reg}) => {    

    const instanceArray = instanceArray_function(main_reducer, transaction, reg)                                                            //creates an array of instances for the specific stream
    const id = transaction === "withdrawal" ? ui_reducer.id : ui_reducer.id2                                                                   // we're working with two ids at the same time to display the two boxes, this checks which one we want and jist makes it "id"
    const {[id]: instance} = main_reducer                                                                                            //we use id to grab the entire object from the income_selector
    const {age1, age2} = instance 

    const setDualRangeBar = (name, value) => {                                                                                          //sets the age, as well as the surrounding ages in the array of instances
        setAge(id, instanceArray, name, setNestedKeyValue_action, "main_reducer", value)
}
     console.log(id);
     return (
        <Wrapper>
             <Header transaction={transaction}>
            <h2>{_.startCase(transaction)}s</h2> 
            </Header>
            <InstanceNav 
                     instanceArray={instanceArray}
                     instance={instance}
             />
            <Container >  
                < RangeBarWrapper>
                <RangeBar 
                      setNestedKeyValue_action={setNestedKeyValue_action}                                                                             //Every Add instance has a range bar to set its value                                                                                     //Every Add instance has a range bar to set its value
                      reducer="main_reducer"                                                            
                      label={`Annual ${transaction}`}
                      instance={instance}       
                /> 
                </RangeBarWrapper> 
                <DualRangeBarWrapper>
                    <DualRangeBar
                        style={{marginTop: "-7rem"}}
                        title={""}
                        bottom={age1}                                                                                                      //age1 sets the from Age, eg. age 18 in 18-45
                        top={age2}                                                                                                         //age2 sets the to Age, eg. age 45 in 18-45
                        setValue={setDualRangeBar}                                                                                         //reaches into reducer to set the values
                        />
                </DualRangeBarWrapper>                                  
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    main_reducer: state.main_reducer,
    ui_reducer: state.ui_reducer,
})

export default connect(mapStateToProps, {setNestedKeyValue_action})(EditSavings )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 35rem;
    margin: 1rem;
    min-height: 28rem;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    overflow: hidden;
    margin-bottom: 1rem;
    background: ${props => props.theme.color.ice};
`



const Container = styled.div`
    position: relative;
    display: flex;
    height: 20rem;
    flex-direction: column;
    justify-content: space-around;
`

const RangeBarWrapper = styled.div`
    margin-left: 5rem;
    margin-top: 2rem;
`
const DualRangeBarWrapper = styled.div`
    margin-left: 1rem;
    margin-top: -3rem;
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

