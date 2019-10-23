import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import SectionHeader from "../../../../UI/Headers/SectionHeader"
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

    renderRangeBars = (incomeTypeArray) => {
       return incomeTypeArray.map(incomeType => <RangeBar id={incomeType.name}
                                                                 key={incomeType.name}
                                                                 rangeBarProps={incomeType}
                                                                 handleSetParentRangeBarAndFinancialValue={this.props.handleSetParentRangeBarAndFinancialValue}
                                                                 handleChangeLabel = {this.props.handleChangeLabel}
                                                                 handleRemoveItem={this.props.handleRemoveItem}
                                                                 />
                                                                
        )
    }

    render() {

   

        return (
            <React.Fragment>
                <SectionHeader
                    text="Input Income"
                    toggleOpenAndClosed={this.props.toggleOpenAndClosed}
                    sectionOpen={this.props.sectionOpen}
                    total={this.props.totalAnnualIncome}
                    subText={"Total Income"}
                />
                <Expanded open={this.props.sectionOpen}>
                {this.renderRangeBars(this.props.incomeTypeArray)}
  
                    <AddItemBox
                        firstButtonText={"Add New Income"}
                        listNewItemWillBeAddedToo={this.props.incomeTypeArray}
                        addItemToList={this.props.addItemToList}
                        checkboxLabel={"Contribute To Canada Pension Plan?"}

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
  overflow: hidden;
  position: relative;
  text-align: left;

  ${ props => !props.open && css`
     animation: ${animationClose} 0.4s 0s both;
  `};
`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 