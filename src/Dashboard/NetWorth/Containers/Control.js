import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import RangeBar from "../../../UI/RangeBar/RangeBar"
import AddItemBox from "../../../UI/AddItemBox/AddItemBox"
import SectionHeader from "../Components/SectionHeader"
import {setItemValue, changeLabel, addItem, removeItem} from "../actions/netWorthActions"
import _ from "lodash"
import { connect } from 'react-redux'

class Section extends Component {

    state = {
        sectionOpen: true,
    }
   
    //determines if this section is open or closed

    toggleOpenAndClosed = ()=> {
        const show = this.state.sectionOpen
        this.setState({
            sectionOpen: !show
        })
    }

    setIncome = (name, financialValue, rangeBarValue, rangeBarProps) => {
          this.props.setItemValue(name, financialValue, rangeBarValue, rangeBarProps)
 
    }

    handleChangeLabel = (event, rangeBarProps) => {
        const name = _.camelCase(event.target.value)
        this.props.changeLabel( event, name, rangeBarProps.id, rangeBarProps.category, rangeBarProps.section)
    }

    handleRemoveItem = (rangeBarProps) => this.props.removeItem(rangeBarProps.id, rangeBarProps.category, rangeBarProps.section)

    addItemToList = (newItem, listNewItemWillBeAddedToo) => {
    
        this.props.addItem(
            newItem.id,
            newItem.label,
            newItem.financialValue,
            newItem.rangeBarValue,
            listNewItemWillBeAddedToo.title.section,
            listNewItemWillBeAddedToo.title.category)
    }

    renderRangeBars = (item) => {
      return  <SectionWrapper>
            {Object.values(item).slice(2).map(a => 
                <RangeBar 
                    key={a.id}
                    rangeBarProps={a}
                    setIncome={this.setIncome}
                    handleChangeLabel={this.handleChangeLabel}
                    handleRemoveItem={this.handleRemoveItem}
                />
                )}
             </SectionWrapper>
            
    }
    //Objective: map through section props and render a range bar with title and total for each. "Item" could be the users car
    // this renders a range bar enabling them to change the value of their car.

    render() {
   
        return (
            <div>
            <SectionHeader
                allTitleProps={this.props.sectionProps.title}
                category={this.props.sectionProps.category}
                section={this.props.sectionProps.section}
                toggleState={this.toggleOpenAndClosed}
                open={this.state.sectionOpen}
            />

            {/* takes props passed from renderSections in UserInterface to build the header */}

            <Expanded open={this.state.sectionOpen}>
               {this.renderRangeBars(this.props.sectionProps)}

               {/* header is clickable to open and close section */}
               
             <AddItemBox
                firstButtonText={"Add New Item"}
                listNewItemWillBeAddedToo={this.props.sectionProps}
                addItemToList={this.addItemToList}
            />

               {/* a container enabling the user to add a new item */}

            </Expanded>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        netWorthState: state.netWorthState
    }
}

export default connect(mapStateToProps, {setItemValue, addItem, changeLabel, removeItem})(Section)

//-----------------------------------------------STYLES-----------------------------------------------//

const SectionWrapper = styled.div`

`

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
  background-color: ${props => props.theme.color.background2};
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
// Renders and individual section such as cashAssets. It looks the state which is held in the reducer and maps through it
// to render the details each section. Each section contains items, items could be a house or a car which have value or the
// debt on either of those. The client can then use a range bar to change their values and an add container to add new items. 