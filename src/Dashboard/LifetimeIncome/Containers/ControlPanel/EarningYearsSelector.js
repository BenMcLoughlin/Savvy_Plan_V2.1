import React, { Component } from 'react'
import DualRangeBar from "../../../../UI/DualRangeBar"
import styled from "styled-components"


export default class EarningYearsSelector extends Component {

    state = {
        lower: this.props.lower,
        higher: this.props.higher
    }
    componentDidUpdate() {
        return this.state.lower !== this.props.lower ? 
        this.setState({
            lower: this.props.lower,
            higher: this.props.higher
        }) : null
    }
    render() {
       const lower= this.props.lower
       const higher= this.props.higher

        return (
            <EarningYearsSelectorWrapper>
            <SectionHeader>Select your earning years</SectionHeader>
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

const SectionHeader = styled.div`
    font-size: ${props =>props.theme.fontSize.small};
    color: ${props => props.theme.color.contrastText1};
    font-style: italic;

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