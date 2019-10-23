import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import calculateMarginalTaxRate from "../../../services/taxCalculationServices/taxCalculator"

const Tile = (props) => (
    <StyledTile>
        <Title>
          {props.value}
        </Title>
        <SubTitle>
          {props.subText}
        </SubTitle>
    </StyledTile>
)
const HighlightTile = (props) => (
    <StyledTile style={{backgroundColor: "#536D7A"}}>
        <Title style={{color: "#F29278"}}>
          {props.value}
        </Title>
        <SubTitle style={{color: "#F29278"}}>
          {props.subText}
        </SubTitle>
    </StyledTile>
)

class TileDisplay extends Component {

    render() {


        const cppIncome = this.props.lifetimeIncomeYearListState[75].incomeType.cppIncome.financialValue
        const oasIncome = this.props.lifetimeIncomeYearListState[75].incomeType.oasIncome.financialValue
        const rrifIncome = this.props.lifetimeIncomeYearListState[75].incomeType.rrifIncome.financialValue
        const totalPensionIncome = `${(cppIncome + oasIncome)/1000}k`
        const totalRrifIncome = `${(rrifIncome)/1000}k`
        const totalRetirementIncome = Object.values(this.props.lifetimeIncomeYearListState[75].incomeType).map(d => d.financialValue).reduce((acc, num) => acc + num)
        const retirementTaxRate = totalRetirementIncome > 72000 && totalRetirementIncome < 122000 ? calculateMarginalTaxRate(totalRetirementIncome) + 15 : calculateMarginalTaxRate(totalRetirementIncome) || 0

        //Calculate AVERAGE Earnings
        const pensionableEarningsArray = Object.values(this.props.lifetimeIncomeYearListState).map(d => d.adjustedPensionableEarningsMethod())
        const totalAdustedPensionableEarnings = pensionableEarningsArray.reduce((acc, num) => acc + num)
        const averagePensionableEarnings = Number(totalAdustedPensionableEarnings / 47)
        const roundedAveragePensionableEarnings = Math.round(averagePensionableEarnings/1000)*1000


        const shortFall = `${(roundedAveragePensionableEarnings - totalRetirementIncome)/1000}k`

        return (
            <TileDisplayWrapper>
                <Tile
                    value={`${retirementTaxRate}%`}
                    gridArea="a"
                    subText={"Tax Rate in Retirement"}
                />
                <Tile
                    value={totalPensionIncome}
                    gridArea="b"
                    subText={"Government Pension Income"}
                />
                <Tile
                    value={totalRrifIncome}
                    gridArea="c"
                    subText={"Minimum RRIF Withdrawal"}
                />
                <HighlightTile
                    value={shortFall}
                    gridArea="d"
                    subText={"Retirement Income ShortFall"}
                />
            </TileDisplayWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        lifetimeIncomeYearListState: state.lifetimeIncomeYearListState
    }
}

export default connect(mapStateToProps)(TileDisplay)

//-----------------------------------------------STYLES-----------------------------------------------//

const TileDisplayWrapper = styled.div`
    grid-area: t;
    justify-content: space-around;
    display: grid;
    grid-gap: 1rem;
    grid-template-areas: '
              a b c d
    '
`

//-----TITLE

const Title = styled.div`
    font-weight: 400;
    font-size: ${props => props.theme.fontSize.mediumLarge};
    text-align: center;
    letter-spacing: .2rem;
    color: ${props => props.theme.color.contrastText1};
    height: 100%;
    display: flex;
`

const SubTitle = styled(Title)`
    font-size: ${props => props.theme.fontSize.small};

`

//-----STYLEDTILE

const StyledTile = styled.div`
    grid-area: ${props => props.gridArea};;
    background-color: ${props => props.theme.color.background2};
    color: ${props => props.theme.color.contrastText1};
    height: 100%;
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    /* box-shadow: ${props => props.theme.boxShadow.small}; */
    transition: all .2s ease-in-out;
    position: relative;
    opacity: 0.9;
    font-weight: 300;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
     align-items: center;
     padding: 2rem;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 