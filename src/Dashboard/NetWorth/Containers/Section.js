import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import RangeBar from "./RangeBar"
import SectionHeader from "../Components/SectionHeader"
import AddNewItem from "./AddNewItem"
import { connect } from 'react-redux'

class Section extends Component {

    state = {
        sectionOpen: false,
    }

    //determines if this section is open or closed

    toggleOpenAndClosed = ()=> {
        const show = this.state.sectionOpen
        this.setState({
            sectionOpen: !show
        })
    }

    //enables the user to toggle between open and closed by clicking the header.

    renderRangeBars = (item) => {
      return  <SectionWrapper>
            {Object.values(item).slice(2).map(a => 
                <RangeBar 
                key={a.id}
                rangeBarProps={a}
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
                catagory={this.props.sectionProps.catagory}
                section={this.props.sectionProps.section}
                toggleState={this.toggleOpenAndClosed}
                open={this.state.sectionOpen}
            />

            {/* takes props passed from renderSections in UserInterface to build the header */}

            <Expanded open={this.state.sectionOpen}>
               {this.renderRangeBars(this.props.sectionProps)}

               {/* header is clickable to open and close section */}
               
             <AddNewItem
                sectionProps={this.props.sectionProps}
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

export default connect(mapStateToProps)(Section)

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