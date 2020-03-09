
import styled from "styled-components"
import React, {useState} from 'react'
import {connect} from "react-redux"
import Header from "pages/assumptions/components/Header"
import StackedBarChart from "charts/assumptions/StackedBarChart"
import InvestmentFactors from "pages/savings/components/InvestmentFactors"
import NewEvent from "pages/onboarding/components/NewEvent"
import LinkButton from "UI/buttons/LinkButton"


const Savings = () => {
        return (
            <Page>
                 <Header
                 landingPage
                 />
                <BarChartPlaceHolder>   
                    <StackedBarChart  />
                </BarChartPlaceHolder>  
                <SectionWrapper>
                    <Section>
                        <InvestmentFactors count={3} />
                    </Section>
                </SectionWrapper>
                <NewEventWrapper >
                      <NewEvent></NewEvent>
                </NewEventWrapper>
                <LinkButtonWrapper>
                    <LinkButton to="/networth">
                        Next
                    </LinkButton>
                </LinkButtonWrapper>


        </Page>
        )
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, {})(Savings)


//-----------------------------------------------style-----------------------------------------------//

const Page = styled.div`
    ${props => props.theme.pageBaseStyles}
    grid-template-rows: minmax(5rem, 8rem) minmax(18rem, 20rem) minmax(10rem, 12rem) minmax(22rem, 24rem);
    grid-template-areas:
    'a a a a a a a a a a a a'
    'b b b b c c c c c c c c'
    'b b b b e e e e e e e e'
    'd d d d e e e e e e e e'
    'd d d d e e e e e e e e'
`

const BarChartPlaceHolder = styled.div`
    grid-area: b;
    width: 40rem;
    margin-left: 5%;
    height: 30rem;
    position: relative;
    z-index: 500;
    background: white;
    border-radius: 20px;
`
const SectionWrapper = styled.div`
    flex: 1;
    grid-area: d;
    display: flex;
    width: 100%
    margin-left: 5%;
    height: 30rem;
` 
const Section = styled.div`
    flex: 1;
    width: 30rem;
    margin-left: 5%;
    height: 30rem;
` 
const ChartWrapper = styled.div`
    height: 40rem;
    width: 90rem;
    margin-top: 4rem;
    display: flex;
    grid-area: c;
`
const NewEventWrapper = styled.div`
    display: flex;
    grid-area: e;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top: 12rem;
`
const LinkButtonWrapper = styled.div`
    position: absolute;
    top: 75rem;
    right: 20rem;
`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

The main functions for this app are written here in the app. 

*/