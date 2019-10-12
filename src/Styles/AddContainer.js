import React, { Component } from 'react'
import styled from "styled-components"
import {AddButton, NewButton} from "../NetWorthContainers/AddContainer/Buttons"
import RangeBarInput from "../NetWorthContainers/RangeBar/RangeBarInput"
import RangeBarValue from "../NetWorthContainers/RangeBar/RangeBarValue"
import {logslider, inverseLogslider, roundNumber} from "../services/logorithmicFunctions"
import {addItem} from "../Dashboard/NetWorth/actions/NetWorthActions"
import {connect} from "react-redux"
import {CloseIcon} from "../Styles/icons"

class NetWorthAddContainer extends Component {

    state = {
        id: "", 
        catagory: (this.props.sectionProps.title.catagory),
        label: "", 
        rangeBarValue: 0,
        financialValue: 0,
        addContainerOpen: false,
        exampleCount: 1,
    }
    handleLocalStateChange= (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
      }

    setFinancialValueFromRange = (event) => {
        const logValue = roundNumber(logslider(event.target.value))
        this.setState({
            rangeBarValue: event.target.value,
            financialValue: logValue,
        })
      }

      convertToRangeFromGivenFinancialValue = (event) => {
         const rangeBarValue = inverseLogslider(event.target.value)
         this.setState({
            rangeBarValue: rangeBarValue,
            financialValue: event.target.value,
        })
      }

      handleClickToAddNewItem = () => {
          console.log(this.props.sectionProps.title.catagory);
        this.props.addItem(
            this.state.label,
            this.state.financialValue,
            this.state.rangeBarValue,
            this.props.sectionProps.title.section,
            this.props.sectionProps.title.catagory)

        this.setState({
            label: "",
            financialValue: 0,
            rangeBarValue: 0,
            addContainerOpen: false,
            exampleCount: (this.state.exampleCount < 5 ? this.state.exampleCount + 1 : 0)
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


export default connect(mapStateToProps, {addItem})(NetWorthAddContainer)


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