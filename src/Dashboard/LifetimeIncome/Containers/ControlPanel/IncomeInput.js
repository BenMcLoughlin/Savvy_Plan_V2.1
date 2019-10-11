import React, { Component } from 'react'
import AddNewIncome from "./AddNewIncome"
import styled, {keyframes, css} from "styled-components"
import SectionHeader from "../../Components/SectionHeader"
import RangeBar from "../../../../UI/RangeBar/RangeBar"




export default class IncomeInput extends Component {
    state = {
        sectionOpen: true,
    }

   toggleOpenAndClosed = ()=> {
        const show = this.state.sectionOpen
        this.setState({
            sectionOpen: !show
        })
        console.log(this.state.sectionOpen);
    }

    renderRangeBars = (incomeInputArray) => {
       return incomeInputArray.map(incomeType => <RangeBar id={incomeType.name}
                                                                 rangeBarProps={incomeType}
                                                                 handleSetParentRangeBarAndFinancialValue={this.props.handleSetParentRangeBarAndFinancialValue}
                                                                 handleChangeLabel = {this.props.handleChangeLabel}
                                                                 handleChangeValueFromTextInput={this.props.handleChangeValueFromTextInput}
                                                                 handleRemoveItem={this.props.handleRemoveItem}
                                                                 />
                                                                
        )
    }

    render() {

   

        return (
            <React.Fragment>
                <SectionHeader
                    text="Input Income"
                    toggleOpenAndClosed={this.toggleOpenAndClosed}
                    sectionOpen={this.state.sectionOpen}
                    incomeTypeArrayForRangeBars={this.props.incomeTypeArrayForRangeBars}
                />
                <Expanded open={this.state.sectionOpen}>
                {this.renderRangeBars(this.props.incomeTypeArrayForRangeBars)}
  
                    <AddNewIncome
                        fromAge={this.props.fromAge}
                        toAge={this.props.toAge}
                        setRangeValueFromFinancialInput={this.setRangeValueFromFinancialInput}

                    />

            </Expanded>
            </React.Fragment>
        )
    }
}




//-----------------------------------------------STYLES-----------------------------------------------//

const animationOpen = keyframes`
  0% { max-height: 0rem; }
  100% { max-height: 100rem; }
`
const animationClose = keyframes`
  0% { max-height: 100rem; }
  100% { max-height: 0rem; }
`

const Expanded = styled.div`
  animation: ${animationOpen} 0.9s 0s both;
  overflow: hidden;
  background-color: ${props => props.theme.color.background1};
  border: 1px solid  ${props => props.theme.color.background3};
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  text-align: left;
  height: 40rem;

  ${ props => !props.open && css`
     animation: ${animationClose} 0.4s 0s both;
  `};
`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 