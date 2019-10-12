import React, { Component } from 'react'
import styled from "styled-components"
import Button from "../Buttons/Button"
import RangeBarSlider from "../RangeBar/RangeBarSlider"
import RangeBarValue from "../RangeBar/RangeBarValue"
import _ from "lodash"
import {CloseIcon} from "../../Styles/Icons"

class AddItemBox extends Component {

    state = {
        name: "name", 
        label: "", 
        rangeBarValue: 0,
        financialValue: 0,
        addContainerOpen: false,
    }

  
    handleSetParentRangeBarAndFinancialValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
        this.setState({
            name: name, 
            rangeBarValue: rangeBarValue,
            financialValue: financialValue,
        })
    }

    handleLabelChange= (event) => {
        const {name, value} = event.target
        this.setState({
            label: value,
            name: _.camelCase(value)
        })
      }

    handleRemoveItem = (rangeBarProps) => {

          for (let age = this.state.fromAge; age < this.state.toAge; age++ ) {
            this.props.removeItem(age, rangeBarProps.name)
          }
    }

      handleClickToAddNewItem = () => {
        
        this.props.addItemToList(this.state, this.props.listNewItemWillBeAddedToo)

        this.setState({
            label: "",
            financialValue: 0,
            rangeBarValue: 0,
            addContainerOpen: false,
        })
  
      }

    toggleAddContainerOpen = () => {
        const opposite = !this.state.addContainerOpen
        this.setState({addContainerOpen: !this.state.addContainerOpen})
    }

    render() {
        console.log(this.props.listNewItemWillBeAddedToo);
        return (
            <div>
            {this.state.addContainerOpen ?
                <Container>
                <RangeBarWrapper>
                    <TextInputContainer>
                        <TextInput
                            name="labelInput"
                            onChange={(event) => this.handleLabelChange(event)}
                            value={this.state.label}
                         
                        />
                    </TextInputContainer>
                    <RangeBarSlider
                        rangeBarProps={this.state}
                         handleSetParentRangeBarAndFinancialValue={this.handleSetParentRangeBarAndFinancialValue}
                    />
                    <RangeBarValue
                        rangeBarProps={this.state}
                        handleSetParentRangeBarAndFinancialValue={this.handleSetParentRangeBarAndFinancialValue}
                    />
                    <Delete  onClick={() => this.toggleAddContainerOpen}/>
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
                    text={this.props.firstButtonText}
                    handleClick={this.toggleAddContainerOpen}
                    color="blue"
                />
                </ButtonWrapper>
            }
            </div>

        )
    }
}



export default AddItemBox


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
    height: 14rem;
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
`
const Delete = styled(CloseIcon)`
    position: absolute;
    top: -.3rem;
    left: 127%;
    cursor: pointer;
    z-index: 300;
    width: 1.4rem;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// A container that allows the user to add a new items to state. It collects the data locally as the user inputs it and 
// then on submit sends all the data to the main state reducer to create a new item.  