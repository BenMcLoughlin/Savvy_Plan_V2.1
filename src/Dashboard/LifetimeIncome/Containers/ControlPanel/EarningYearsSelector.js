import React, { Component } from 'react'
import DualRangeBar from "../../../../UI/DualRangeBar"
import styled from "styled-components"


export default class EarningYearsSelector extends Component {
    render() {
       const lower= this.props.lower
       const higher= this.props.higher

        return (
            <EarningYearsSelectorWrapper>
            <Title>Input Income By Year</Title>
            <SelectorTitleWrapper>
                <SelectorTitle>From Age</SelectorTitle>      
                <SelectorTitle>To Age</SelectorTitle>
            </SelectorTitleWrapper>
                <DualRangeBar
                    lower={lower}
                    higher={higher}
                    setParentDualRangeValues={this.props.setParentDualRangeValues}
                />
         
            </EarningYearsSelectorWrapper>
        )
    }
}



//-----------------------------------------------STYLES-----------------------------------------------//


const EarningYearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    align-items: center;
`

const Title = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    font-weight: 300;
    padding-bottom: 1rem;
   
` 

const SelectorTitleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: .5rem;
    font-size: ${props =>props.theme.fontSize.small};
    color: ${props => props.theme.color.contrastText1};
`
const SelectorTitle = styled.div`

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 