import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import RangeBar from "./RangeBar"
import SectionHeader from "../NetWorthContainers/Section/SectionHeader"
import AddContainer from "./AddContainer"
import { connect } from 'react-redux'

class Section extends Component {

    state = {
        sectionVisible: true,
    }

    toggleState = ()=> {
        const show = this.state.sectionVisible
        this.setState({
            sectionVisible: !show
        })
    }

    renderRangeBars = (object) => {
      return  <SectionWrapper>
            {Object.values(object).slice(2).map(a => 
                <RangeBar 
                key={a.id}
                rangeBarProps={a}
                />
                )}
             </SectionWrapper>
            
    }

    render() {

        return (
            <div>
            <SectionHeader
                allTitleProps={this.props.sectionProps.title}
                catagory={this.props.sectionProps.catagory}
                section={this.props.sectionProps.section}
                toggleState={this.toggleState}
                open={this.state.sectionVisible}
            />
            <Expanded open={this.state.sectionVisible}>
               {this.renderRangeBars(this.props.sectionProps)}
               
             <AddContainer
                sectionProps={this.props.sectionProps}
            />
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
  background-color: ${props => props.theme.color.background4};
  border: 1px solid  ${props => props.theme.color.background3};
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  text-align: left;

  ${ props => !props.open && css`
     animation: ${animationClose} 0.4s 0s both;
  `};
`

