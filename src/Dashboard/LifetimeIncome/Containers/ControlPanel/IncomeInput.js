import React, { Component } from 'react'
import AddNewIncome from "./AddNewIncome"
import styled, {keyframes, css} from "styled-components"
import SectionHeader from "../../Components/SectionHeader"
import RangeBar from "../../../../UI/RangeBar/RangeBar"
import AddItemBox from "../../../../UI/AddItemBox/AddItemBox"




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

    handleClickToAddNewItem = () => {

    }

    renderRangeBars = (incomeTypeArrayrray) => {
       return incomeTypeArrayrray.map(incomeType => <RangeBar id={incomeType.name}
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
                    incomeTypeArray={this.props.incomeTypeArray}
                />
                <Expanded open={this.state.sectionOpen}>
                {this.renderRangeBars(this.props.incomeTypeArray)}
  
                    <AddItemBox
                        firstButtonText={"Add New Income"}
                        listNewItemWillBeAddedToo={this.props.incomeTypeArray}
                        addItemToList={this.props.addItemToList}

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
  background-color: ${props => props.theme.color.background1};
  border: 1px solid  ${props => props.theme.color.background3};
  border-radius: 3px;
  overflow: scroll;
  position: relative;
  text-align: left;
  height: 40rem;

  ${ props => !props.open && css`
     animation: ${animationClose} 0.4s 0s both;
  `};
`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 