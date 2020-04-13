import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import InstanceNav from "pages/income/components/InstanceNav"
import FormInput  from "UI/forms/Input"
import DualRangeBar from "UI/dualRangeBar/DualRangeBar"
import RangeBar  from "UI/rangeBar1/RangeBar"
import _ from "lodash"
import {setNestedKeyValue_action, setKeyValue_action, delete_action} from "redux/actions"
import {editStreamName, setAge, hideStream} from "services/ui/ui_functions"
import {income_selector} from "redux/main/income_selectors"
import {ArrowLeft} from "style/Icons"

const EditIncome = ({income_selector, ui_reducer, setKeyValue_action, setNestedKeyValue_action}) => {                                           //this is the box that enables us to edit an income stream and add new instances

    const {stream, id} = ui_reducer                                                                                                             //the ui reducer has the stream being shown as well as the selected id for the instance, we pull these out so we have them here
    
    const {[id]: instance} = income_selector                                                                                                   //we use id to grab the entire object from the income_selector
    
    const instanceArray =  Object.values(income_selector).filter(d => d.stream === stream).sort((a,b) => a.age1 - b.age1)                       //We now create an array of all the instances that are linked by being part of the same stream,  
   
    const setDualRangeBar = (name, value) => {                                                                                                  //sets the age, as well as the surrounding ages in the array of instances
        setAge(id, instanceArray, name, setNestedKeyValue_action, "main_reducer", value)
    }                                                                                                                                         
    
    return (
        <Wrapper>
            <Header color={instance.color}>
            <BackArrow  onClick={() => hideStream(setKeyValue_action)}/>
            <h2>{_.startCase(stream)}</h2> 
            </Header>
            <InstanceNav  instanceArray={instanceArray}                                                                                         //this Nav runs alng the top and displays each of the instances
                          instance={instance}
                        />                                                  
            <Container >                                                                      
                <Left>                                                                                                   
                <FormInput
                        label="Income name"                                                                                                     //this allows the user to change the name of the income stream
                        value={instance.stream}                                                                                                 
                        type={"text"}  
                        handleChange={(e) => editStreamName(e, income_selector, stream, setNestedKeyValue_action, setKeyValue_action, "main_reducer")}                                                                      //sets the state in the local state
                    />                                    
                  <RangeBar 
                            setNestedKeyValue_action={setNestedKeyValue_action}                                                                   //this allows the user to change the value of the income stream
                            reducer="main_reducer"
                            label={"Annual Income"}
                            instance={instance}       
                     /> 
                </Left>
                <Right>
                    <DualRangeBar
                        title={"Earning Years Selector"}
                        bottom={instance.age1}                                                                                                       //age1 sets the from Age, eg. age 18 in 18-45
                        top={instance.age2}                                                                                                          //age2 sets the to Age, eg. age 45 in 18-45
                        setValue={setDualRangeBar}                                                                                                   //reaches into reducer to set the values
                    />
                </Right>
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    income_selector: income_selector(state),
    ui_reducer: state.ui_reducer
})

export default connect(mapStateToProps, {setNestedKeyValue_action, setKeyValue_action,  delete_action})(EditIncome )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 90rem;
    height: 28rem;
    margin:1rem auto;
    border-radius: 5px;
    overflow: hidden;
    border: ${props => props.theme.border.primary};
    grid-area: c;
    z-index: 1000;
    grid-area: c
`

const Left = styled.div`  
    width:  50%;
    height: 100%;
    padding: 2rem;
    margin-left: 4rem;
`
const Right = styled.div`
    width:  50%;
    padding: 2rem;
`

const Container = styled.div`
    width: 100%;
    height: 22rem;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    display: flex;
    background: ${props => props.theme.color.ice};
`
const Header = styled.div`
    width: 100%;
    background: ${props => props.color};
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.color.ice};
    position: relative;
`

const BackArrow = styled(ArrowLeft)`
    width: 3.5rem;
    height: 3.5rem;
    position: absolute;
    color: ${props => props.theme.color.ice};
    top: 0rem;
    left: 1rem;
    cursor: pointer;

`