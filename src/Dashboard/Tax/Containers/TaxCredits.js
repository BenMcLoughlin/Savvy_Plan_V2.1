import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import {calculateFutureValue, calculateRRIFPaymentTable} from "../../../services/financialFunctions"
import MiniRangeBar from "../../../UI/MiniRangeBar/MiniRangeBar"



export default class TaxCredits extends Component {



     miniRenderRangeBars = (miniRangeBarPropsArray) => {
         return miniRangeBarPropsArray.map(propsObject => <MiniRangeBar id={propsObject.name}
                                                                   key={propsObject.name}
                                                                   handleSetParentRangeBarAndFinancialValue={this.handleSetParentRRSPRangeBarAndFinancialValue}
                                                                   rangeBarProps={propsObject}
                                                                   />
                                                                  
          )
      }

    render() {

        return (

            <Wrapper>
            {this.miniRenderRangeBars(this.props.creditsRangeBarValues)}
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

