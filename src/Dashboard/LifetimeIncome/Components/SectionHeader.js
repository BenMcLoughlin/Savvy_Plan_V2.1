import React, { Component } from 'react'
import styled from "styled-components"
import { connect } from 'react-redux'
import {ChevronIcon} from "../../../Styles/Icons"

 export default class SectionHeader extends Component {

    render() 
    {
        const totalAnnualIncome = this.props.incomeTypeArrayForRangeBars.map(d => Number(d.financialValue)).reduce((acc, num) => acc + num)
        return (
            <Header
                onClick={this.props.toggleOpenAndClosed}
            >
            <Chevron open={this.props.sectionOpen}/>
               <MainText>{this.props.text}</MainText>
            <CatagoryTotal>$ {totalAnnualIncome.toLocaleString()}</CatagoryTotal>
            </Header>
        )
    }
}


//-----------------------------------------------STYLES-----------------------------------------------//


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.color.contrastBackground3};
    border-bottom: 1px solid white;
    padding: 1rem;
    font-size: ${props => props.theme.fontSize.medium};
    color: ${props => props.theme.color.text1};
    cursor: pointer;
    &:hover {
        opacity: 0.96;
    }

`

const MainText = styled.div`
    font-size: ${props => props.theme.fontSize.smallMedium};
    width: 40%;
    text-align: center;

`
const CatagoryTotal = styled.div`
    font-size: ${props => props.theme.fontSize.small};
    width: 25%;
    text-align: center;

`

const Chevron = styled(ChevronIcon)`
    transition: all .2s ease-in;
    transform: ${props => props.open ? "rotate(90deg)" : null };
    width: 15%;
`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//

// The section header displays the section title and the total value of the entire section. 
// It is clickable to expand and reveal the section or hide it. 