import React, { Component } from 'react'
import styled from "styled-components"
import Button from "../Buttons/Button"
import RangeBarSlider from "../RangeBar/RangeBarSlider"
import RangeBarValue from "../RangeBar/RangeBarValue"
import _ from "lodash"
import {CloseIcon} from "../../Styles/Icons"
import Checkbox from "../Buttons/Checkbox"

class AddItemBox extends Component {

    state = {
        name: "name", 
        label: "", 
        rangeBarValue: 0,
        financialValue: 0,
        addContainerOpen: false,
        isChecked: false,
    }

  
    handleSetParentRangeBarAndFinancialValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
        this.setState({
            name: name, 
            rangeBarValue: rangeBarValue,
            financialValue: financialValue,
        })
    }

    handleLabelChange= (event) => {
        const  value = event.target.value
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
    handleCheckboxChange = (event) => {
        this.setState(({ isChecked }) => (
            {
              isChecked: !isChecked
            }
          ));
          console.log(event.target.checked);
    }

      handleClickToAddNewItem = () => {
        
        this.props.addItemToList(this.state, this.props.listNewItemWillBeAddedToo)

        this.setState({
            label: "",
            financialValue: 0,
            rangeBarValue: 0,
            addContainerOpen: false,
            isChecked: false,
        })
  
      }

    toggleAddContainerOpen = () => {
        const opposite = !this.state.addContainerOpen
        this.setState({addContainerOpen: opposite})
    }

    render() {

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
                   
                  </RangeBarWrapper>


                    <ButtonWrapper style={{marginTop: "2rem"}}>
                        <Button
                        text={"Add"}
                        handleClick={this.handleClickToAddNewItem}
                    />
                    </ButtonWrapper>
                    {
                        this.props.checkboxLabel ? 
                        <CheckboxWrapper>
                            <Checkbox
                            checked={this.state.isChecked}
                            onChange={this.handleCheckboxChange}
                            labelText ={this.props.checkboxLabel}
                            />
                        </CheckboxWrapper>
    
                        : null
                      }
                      <Delete  onClick={() => this.toggleAddContainerOpen}/>
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
    height: 17rem;
    position: relative;
    border: 1px solid ${props => props.theme.color.contrastBackground1};
    border-radius: 3px;
    margin-left: 1rem;
    margin-bottom: 1rem;
    background-color: ${props => props.theme.color.background2}
`
const RangeBarWrapper = styled.div`
    margin-top: 2rem;
    position: relative;
    padding-left: 1rem;
    width: 25rem;
`


const ButtonWrapper = styled.div`
    width: 18rem;
`
const Delete = styled(CloseIcon)`
    position: absolute;
    top: 2%;
    left: 93%;
    cursor: pointer;
    z-index: 300;
    width: 1.8rem;
`

const CheckboxWrapper = styled.div`
    position: absolute;
    top: 8.5rem;
    left: 2rem;

`



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// A container that allows the user to add a new items to state. It collects the data locally as the user inputs it and 
// then on submit sends all the data to the main state reducer to create a new item.  