import React, {Component} from 'react'
import styled from "styled-components"
import TodaysValues from "./Components/TodaysValues"
import Contributions from"./Components/Contributions"
import InvestmentFactors from "./Components/InvestmentFactors"
import SelectorButton from "../../../UI/Buttons/SelectorButton"


class ControlPanel extends Component {

    state = {
        tfsa: true,
        rrsp: false,
        nonRegistered: false,

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: true
        })
    }

    render () {

        const {tfsa, rrsp, nonRegistered} = this.state

        return (
            <ControlPanelWrapper>
                <Left>
                <Title>Select Account</Title>
                <SelectorButton name={tfsa} visible= {tfsa} text="TFSA"/>
                <SelectorButton name={rrsp} visible= {rrsp} text="RRSP"/>
                <SelectorButton name={nonRegistered} visible= {nonRegistered} text="Non-Registered"/>
                </Left>
                <Center>
                     <Title>Estimate Future Contributions </Title>
                     <Contributions
                                  fromAge={this.props.fromAge}
                                  toAge={this.props.toAge}
                                  setFromAge={this.props.setFromAge}
                                  setToAge={this.props.setToAge}
                                  rangeBarArray={this.props.rangeBarArray}
                                  setContribution={this.props.setContribution}
                     />
                </Center>
                <Right>
                     <Title>Select Retirement Age</Title>
                     <InvestmentFactors
                            fromAge={this.props.fromAge}
                            toAge={this.props.toAge}
                            setFromAge={this.props.setFromAge}
                            setToAge={this.props.setToAge}
                            rangeBarArray={this.props.rangeBarArray}
                            setContribution={this.props.setContribution}
                     />
                </Right>
            </ControlPanelWrapper>
        )
    }

    }

    export default ControlPanel
//-----------------------------------------------STYLES-----------------------------------------------//

const ControlPanelWrapper = styled.div`
    grid-area: d;
    display: flex;
    color: ${props => props.theme.color.slate};
    border-top: ${props => props.theme.border.primary};
    padding-top: 2rem;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    font-size: 3rem;
    flex-direction: column;
`
const Center = styled.div`
    flex: 1;
`
const Right = styled.div`
    flex: 1;
`
const Title = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    font-weight: 300;
   
` 

