import React, { Component } from 'react'
import styled from "styled-components"
import Button from "../UI/Buttons/Button"
import RangeBarSlider from "../RangeBar/RangeBarSlider"
import RangeBarValue from "../RangeBar/RangeBarValue"
import {connect} from "react-redux"
import {addItem} from "../../actions"
import {logslider, inverseLogslider, roundNumber} from "../../../../services/logorithmicFunctions"
import _ from "lodash"

class AddNewItem extends Component {

    state = {
        name: "", 
        label: "", 
        rangeBarValue: 0,
        financialValue: 0,
        addContainerOpen: false,
    }

    //Local state collects the details of the new item to be added. Like a letter being given contents an address to deliver too. 

    handleLabelChange= (event) => {
        const {name, value} = event.target
        this.setState({
            label: value,
            name: _.camelCase(value)
        })
      }
      //sets the local state from inputs within the add container such as financial value and item label.

    setFinancialValueFromRange = (name, logValue, rangeBarValue) => {
        this.setState({
            rangeBarValue: rangeBarValue,
            financialValue: logValue,
        })
        console.log(this.state);
      }
         //objective: exponentially increase the slider bar as it moves to the right, given a slider value between 1 and 100 
      // this returns a value between 1 and 1 million at an exponential scale.

      convertToRangeFromGivenFinancialValue = (event) => {
         const rangeBarValue = inverseLogslider(event.target.value)
         this.setState({
            rangeBarValue: rangeBarValue,
            financialValue: event.target.value,
        })
        
      }
      //objective: given a large value from the text input, convert it back to a smaller scale. Given a value between 1 and 1 million 
      // this returns a value between 1 and 100.

      handleClickToAddNewItem = () => {
        
        for (let age = this.props.fromAge; age < this.props.toAge; age++ ) {
        this.props.addItem(
            age,
            this.state.name,
            this.state.label,
            this.state.financialValue,
            this.state.rangeBarValue,
            this.state.contributeToCpp
        )

            // when Add button is clicked the local state is sent off via the action to change the state in the reducer.
            }
        this.setState({
            label: "",
            financialValue: 0,
            rangeBarValue: 0,
            addContainerOpen: false,

            //local state is reset to 0 while example count is increased to scroll to a new example.
        })
  
      }
    handleAddContainerOpen = () => this.setState({addContainerOpen: true})

    render() {
        console.log(this.props.lifetimeIncomeYearListState);
        return (
            <div>
            {this.state.addContainerOpen ?
                <Container>
                <RangeBarWrapper>
                    <TextInputContainer>
                        <TextInput
                            name="label"
                            onChange={(event) => this.handleLabelChange(event)}
                            value={this.state.label}
                         
                        />
                    </TextInputContainer>
                    <RangeBarSlider 
                            rangeBarProps={this.state}
                            handleChange={this.setFinancialValueFromRange}
                            
                    />
                    <RangeBarValue 
                            rangeBarProps={this.state}
                            handleChange={this.props.setRangeValueFromFinancialInput}
                    />
                  </RangeBarWrapper>

                    <ButtonWrapper>
                        <Button
                        text={"Add"}
                        handleClick={this.handleClickToAddNewItem}
                    />
                    </ButtonWrapper>
     
                </Container>
                :
                <ButtonWrapper>
                    <Button
                    text={"New Income Type"}
                    handleClick={this.handleAddContainerOpen}
                    color="blue"
                />
                </ButtonWrapper>
            }
            </div>

        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        lifetimeIncomeYearListState: state.lifetimeIncomeYearListState
    }
}

export default connect(mapStateToProps, {addItem})(AddNewItem)


//-----------------------------------------------STYLES-----------------------------------------------//

const TextInputContainer = styled.div`
    display: inline;
    position: relative;
    top: .7rem;
    left: 1rem;
`
const TextInput = styled.input`
    background-color: white;
    outline: none;
    border: none;
    padding: .7rem;
    width: 85%;
    z-index: 2;
    border-radius: 4px;
`
const Container = styled.div`
    width: 95%;
    height: 12rem;
    position: relative;
    border: 1px solid white;
    border-radius: 3px;
    margin-left: 1rem;
    margin-bottom: 1rem;
    background-color: ${props => props.theme.color.background2}
`
const RangeBarWrapper = styled.div`
    margin-top: 1rem;
    position: relative;
    padding-left: 1rem;
    width: 25rem;
`


const ButtonWrapper = styled.div`
    width: 18rem;
    margin-top: -2rem;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// A container that allows the user to add a new items to state. It collects the data locally as the user inputs it and 
// then on submit sends all the data to the main state reducer to create a new item.  