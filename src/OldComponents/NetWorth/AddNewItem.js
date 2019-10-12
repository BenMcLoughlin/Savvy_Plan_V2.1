import React, { Component } from 'react'
import styled from "styled-components"
import {AddButton, NewButton} from "../Components/Button"
import RangeBarInput from "../Components/RangeBar/RangeBarInput"
import RangeBarValue from "../Components/RangeBar/RangeBarValue"
import {logslider, inverseLogslider, roundNumber} from "../../../services/logorithmicFunctions"
import {addItem} from "../actions/netWorthActions"
import {connect} from "react-redux"
import {CloseIcon} from "../../../Styles/Icons"

class AddNewItem extends Component {

    state = {
        id: "", 
        catagory: (this.props.sectionProps.title.catagory),
        label: "", 
        rangeBarValue: 0,
        financialValue: 0,
        addContainerOpen: false,
        exampleCount: 1,
    }

    //Local state collects the details of the new item to be added. Like a letter being given contents an address to deliver too. 

    handleLocalStateChange= (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
      }
      //sets the local state from inputs within the add container such as financial value and item label.

    setFinancialValueFromRange = (event) => {
        const logValue = roundNumber(logslider(event.target.value))
        this.setState({
            rangeBarValue: event.target.value,
            financialValue: logValue,
        })
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
          console.log(this.props.sectionProps.title.catagory);
        this.props.addItem(
            this.state.label,
            this.state.financialValue,
            this.state.rangeBarValue,
            this.props.sectionProps.title.section,
            this.props.sectionProps.title.catagory)

            // which Add button is clicked the local state is sent off via the action to change the state in the reducer.

        this.setState({
            label: "",
            financialValue: 0,
            rangeBarValue: 0,
            addContainerOpen: false,
            exampleCount: (this.state.exampleCount < 5 ? this.state.exampleCount + 1 : 0)

            //local state is reset to 0 while example count is increased to scroll to a new example.
        })
    }

    render() {
        return (
            <div>
            {this.state.addContainerOpen ?
                <Container>
                <RangeBarWrapper>
                    <TextInputContainer>
                        <TextInput
                            name="label"
                            onChange={(event) => this.handleLocalStateChange(event)}
                            value={this.state.label}
                            placeholder={this.props.netWorthState[this.props.sectionProps.title.catagory][this.props.sectionProps.title.section]["examples"][this.state.exampleCount]}
                        />
                    </TextInputContainer>
                    <RangeBarInput 
                            rangeBarProps={this.state}
                            handleChange={(event) => this.setFinancialValueFromRange(event)}
                    />
                    <RangeBarValue 
                            rangeBarProps={this.state}
                            handleChange={(event) => this.convertToRangeFromGivenFinancialValue(event)}
                    />
                  </RangeBarWrapper>

                   <AddButton1
                        handleClickToAddNewItem={() => this.handleClickToAddNewItem()}
                    />
                    <Delete/>
                </Container>
                :
                <NewButton
                handleClickToAddNewItem={() => this.setState({addContainerOpen: true})}
              />
            }
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        netWorthState: state.netWorthState
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
    width: 90%;
    z-index: 2;
    border-radius: 4px;
`
const Container = styled.div`
    width: 90%;
    height: 11rem;
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
const AddButton1 = styled(AddButton)`
    margin-bottom: -10rem;
    background: blue;
`
const Delete = styled(CloseIcon)`
    position: absolute;
    top: .5rem;
    right: -11.2rem;
    cursor: pointer;
    color: blue;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// A container that allows the user to add a new items to state. It collects the data locally as the user inputs it and 
// then on submit sends all the data to the main state reducer to create a new item.  