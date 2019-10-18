import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import SectionHeader from "../../../../UI/Headers/SectionHeader"
import MiniRangeBar from "../../../../UI/MiniRangeBar/MiniRangeBar"

export default class PensionIncomeStartAges extends Component {

    state = {
        cppAge: 65,
        sectionOpen: true,
    }

    toggleOpenAndClosed = ()=> {
        const show = this.state.sectionOpen
        this.setState({
            sectionOpen: !show
        })
        
    }
    
    handleSetParentRangeBarAndFinancialValue = (name, financialValue, rangeBarValue) => {
      
        const cppStartAge = name === "cppStartAge" ? rangeBarValue : this.props.lifetimeIncomeVariableState.pensionAges.cppStartAge.rangeBarValue
        const oasStartAge = name === "oasStartAge" ? rangeBarValue : this.props.lifetimeIncomeVariableState.pensionAges.oasStartAge.rangeBarValue
        this.props.setPensionStartAge(name, rangeBarValue)
   
        this.props.calculateCPP(cppStartAge, oasStartAge)        
    }

    miniRenderRangeBars = (pensionStartAgeMiniRangeBarArray) => {
        return pensionStartAgeMiniRangeBarArray.map(propsObject => <MiniRangeBar id={propsObject.name}
                                                                  className="oasStartAge"
                                                                  key={propsObject.name}
                                                                  handleSetParentRangeBarAndFinancialValue={this.handleSetParentRangeBarAndFinancialValue}
                                                                  rangeBarProps={propsObject}
                                                                  />
                                                                 
         )
         
     }

    render() {
        const pensionStartAgeMiniRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.pensionAges)
      
        return (
            <div>
            
                <SectionHeader
                    text="Pension Start Age"
                    toggleOpenAndClosed={this.toggleOpenAndClosed}
                    sectionOpen={this.state.sectionOpen}
                    total={0}
                />
            <Expanded open={this.state.sectionOpen}>
                <MiniRangeBarWrapper>
                {this.miniRenderRangeBars(pensionStartAgeMiniRangeBarArray)}
              
                </MiniRangeBarWrapper>
             
            </Expanded>
            </div>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

const MiniRangeBarWrapper = styled.div`
    display: flex;
    flex-direction: row;
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
  background-color: ${props => props.theme.color.background1};
  border: 1px solid  ${props => props.theme.color.background3};
  border-radius: 3px;
  overflow: scroll;
  position: relative;
  text-align: left;
  height: 15rem;

  ${ props => !props.open && css`
     animation: ${animationClose} 0.4s 0s both;
  `};
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 

