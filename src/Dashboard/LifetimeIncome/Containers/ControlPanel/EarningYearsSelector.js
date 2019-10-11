import React from 'react'
import DualRangeBarSlider from "../../Components/DualRangeSlider"
import styled from "styled-components"

export default function EarningYearsSelector(props) {
    return (
        <EarningYearsSelectorWrapper>
        <SectionHeader>Select your earning years</SectionHeader>
        <SelectorTitleWrapper>
            <SelectorTitle>From Age</SelectorTitle>
            <SelectorTitle>To Age</SelectorTitle>
        </SelectorTitleWrapper>
            <DualRangeBarSlider/>
        </EarningYearsSelectorWrapper>
    )
}

//-----------------------------------------------STYLES-----------------------------------------------//


const EarningYearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 2rem;
    align-items: center;
`

const SectionHeader = styled.div`
    font-size: ${props =>props.theme.fontSize.smallMedium};
    color: ${props => props.theme.color.contrastText1};
    font-style: italic;
    margin-bottom: 1rem;

`


const SelectorTitleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 1rem;
    font-size: ${props =>props.theme.fontSize.small};
    color: ${props => props.theme.color.contrastText1};
`
const SelectorTitle = styled.div`

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 