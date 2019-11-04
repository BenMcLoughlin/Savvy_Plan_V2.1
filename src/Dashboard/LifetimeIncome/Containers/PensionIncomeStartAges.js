import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import {calculateFutureValue, calculateRRIFPaymentTable} from "../../../services/financialFunctions"
import MiniRangeBar from "../../../UI/MiniRangeBar/MiniRangeBar"



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
    
    handleSetParentPensionAgeRangeBarAndFinancialValue = (name, financialValue, rangeBarValue) => {
      
        this.props.setPensionStartAge(name, rangeBarValue) 

        if (name === "cppStartAge")  {
            for (let age = rangeBarValue; age <=95; age ++) {
                this.props.calculateCPP(rangeBarValue, age)
            }
    
            for (let age = 60; age < rangeBarValue; age++) {
                this.props.clearCPPIncomeBeforeStartAge(age)
            }
        }
        else {
        for (let age = rangeBarValue; age <=95; age ++) {
            this.props.calculateOAS(rangeBarValue, age)
        }

        for (let age = 65; age < rangeBarValue; age++) {
            this.props.clearOASIncomeBeforeStartAge(age)
        }
       }
 
     
    }
    handleSetParentRRSPRangeBarAndFinancialValue = (name, financialValue, rangeBarValue) => {
            console.log(name);
        this.props.handleSetRRSPDetails(name, financialValue, rangeBarValue,)
        this.props.setFutureRRSPValue()

        const startAge =  this.props.lifetimeIncomeVariableState.rrspDetails.withdrawalStartAge.rangeBarValue
   
        const RRIFPaymentTable = calculateRRIFPaymentTable(startAge, this.props.lifetimeIncomeVariableState.futureRRSPValue, 0.03)
  
        let position = 0
        for (let i = startAge; i < 95; i++) {
            position++
            this.props.setIncome(i, "rrifIncome", RRIFPaymentTable[position].withdrawal, 0, false)
        }
        for (let i = 50; i < startAge; i++) {
            this.props.setIncome(i, "rrifIncome", 0, 0, false)
        }

    }

  

    miniPensionRenderRangeBars = (pensionStartAgeMiniRangeBarArray) => {
        return pensionStartAgeMiniRangeBarArray.map(propsObject => <MiniRangeBar id={propsObject.name}
                                                                  className="oasStartAge"
                                                                  key={propsObject.name}
                                                                  handleSetParentRangeBarAndFinancialValue={this.handleSetParentPensionAgeRangeBarAndFinancialValue}
                                                                  rangeBarProps={propsObject}
                                                                  />
                                                                 
         )
         
     }
     rrspDetailsMiniRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.rrspDetails).slice(2)

     miniRRSPRenderRangeBars = (miniRangeBarPropsArray) => {
         return miniRangeBarPropsArray.map(propsObject => <MiniRangeBar id={propsObject.name}
                                                                   key={propsObject.name}
                                                                   handleSetParentRangeBarAndFinancialValue={this.handleSetParentRRSPRangeBarAndFinancialValue}
                                                                   rangeBarProps={propsObject}
                                                                   />
                                                                  
          )
      }

    render() {
        const pensionStartAgeMiniRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.pensionAges)
      
        return (

            <Wrapper open={this.state.sectionOpen}>
                <MiniRangeBarWrapper>
                {this.miniPensionRenderRangeBars(pensionStartAgeMiniRangeBarArray)}
                </MiniRangeBarWrapper>
                <MiniRangeBarWrapper>
                {this.miniRRSPRenderRangeBars(this.props.rrspDetailsMiniRangeBarArray)}
                </MiniRangeBarWrapper>
            </Wrapper>

        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

const MiniRangeBarWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const Wrapper= styled.div`
  overflow: scroll;
  position: relative;
  text-align: left;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 

