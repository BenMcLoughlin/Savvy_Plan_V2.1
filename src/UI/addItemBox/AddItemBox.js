import React, { Component } from 'react'
import styled from "styled-components"
import Add from "UI/buttons/Add"
import RangeBarSlider from "UI/rangeBar/Components/RangeBarSlider"
import RangeBarValue from "UI/rangeBar/Components/RangeBarValue"
import _ from "lodash"
import {Close} from "style/Icons"
import Checkbox from "UI/buttons/Checkbox"

class AddItemBox extends Component {

    state = {
        addContainerOpen: false,
        isChecked: false,
        name: "name", 
        label: "", 
        financialValue: 0,
        rangeBarValue: 0,
        section: "",
        catagory: "",
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
                        <Add
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
                    <Add
                    handleClick={this.toggleAddContainerOpen}
                />
                </ButtonWrapper>
            }
            </div>

        )
    }
}



export default AddItemBox


//-----------------------------------------------style-----------------------------------------------//


const TextInput = styled.input`
        font-size: ${props =>props.theme.fontSize.small};
        color: ${props => props.theme.color.slate};
        position: absolute;
        width: 85%;
        top: -1.5rem;
        left: 1rem;
        border-radius: 3px;
        padding: 0.3rem;
        text-transform: capitalize;
        background: white;
        border: 1px solid ${props => props.theme.color.lightGrey};
        cursor: pointer;
        &:focus,
        &:active {
            outline: 0  !important;
            border: 1px solid ${props => props.theme.color.drab};
        }
`


const Container = styled.div`
    width: 95%;
    height: 17rem;
    border: 1px solid ${props => props.theme.color.lightGrey};
    border-radius: 3px;
    margin: 1rem;
    padding-top: 1rem;
    background-color: ${props => props.theme.color.ice}
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
const Delete = styled(Close)`
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