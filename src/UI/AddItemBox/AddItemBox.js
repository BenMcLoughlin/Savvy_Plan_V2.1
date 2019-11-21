import React, { Component } from 'react'
import styled from "styled-components"
import Button from "../Buttons/Button"
import RangeBarSlider from "../RangeBar/Components/RangeBarSlider"
import RangeBarValue from "../RangeBar/Components/RangeBarValue"
import _ from "lodash"
import {CloseIcon} from "../../Styles/Icons"
import Checkbox from "../Buttons/Checkbox"

class AddItemBox extends Component {

    state = {
        addContainerOpen: false,
        isChecked: false,
        name: "name", 
        label: "", 
        financialValue: 0,
        rangeBarValue: 0,
    }

    setLocalValues = (financialValue, rangeBarValue) => {
        this.setState({
            financialValue,
            rangeBarValue,
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
        
        this.props.addItemToList(this.state.financialValue, this.state.rangeBarValue, this.state) 

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
                     <TextInput
                            name="labelInput"
                            onChange={(event) => this.handleLabelChange(event)}
                            value={this.state.label}
    
                        />

                    <RangeBarSlider
                        rangeBarProps={this.state}
                         setValue={this.setLocalValues}
                    />
                    <RangeBarValue
                        rangeBarProps={this.state}
                        setValue={this.setLocalValues}
                        style={{marginTop: "2rem"}}

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


const TextInput = styled.input`
        font-size: ${props =>props.theme.fontSize.small};
        color: ${props => props.theme.color.background3};
        position: absolute;
        width: 85%;
        top: -1.5rem;
        left: 1rem;
        border-radius: 3px;
        padding: 0.3rem;
        text-transform: capitalize;
        background: white;
        border: 1px solid ${props => props.theme.color.contrastBackground1};
        cursor: pointer;
        &:focus,
        &:active {
            outline: 0  !important;
            border: 1px solid ${props => props.theme.color.contrastBackground1};
        }
`


const Container = styled.div`
    width: 95%;
    height: 17rem;
    position: relative;
    border: 1px solid ${props => props.theme.color.contrastBackground1};
    border-radius: 3px;
    margin: 1rem;
    padding-top: 1rem;
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
    top: 7rem;
    left: 4rem;

`



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// A container that allows the user to add a new items to state. It collects the data locally as the user inputs it and 
// then on submit sends all the data to the main state reducer to create a new item.  