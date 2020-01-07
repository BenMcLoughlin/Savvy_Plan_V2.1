import React from 'react'
import styled from "styled-components"
import logoLight from "../assets/svgs/SavvyPlan_logo_final_justlogo.svg"
import SavingsStackedChart from "../Dashboard/SavingsPlan/Charts/SavingsStackedChart"
import SavingsAreaChart from "../Dashboard/SavingsPlan/Charts/SavingsAreaChart"
import Button from "../UI/Buttons/ButtonLight"
import RangeBar from "../UI/RangeBar/RangeBar"
import LifetimeIncomeBarChart from "../Dashboard/LifetimeIncome/Charts/LifetimeIncomeBarChart"

export default function LandingPage() {
    const rangeBarProps = {
        age: 20, 
        contribute: 0,
        financialValue: 0,
        label: "Contributions",
        maxContribution: 0,
        name: "nonRegistered",
        optimizedContribution: 0, 
        optimizedWithdrawal: 0, 
        rangeBarValue: 0, 
        totalContributions: 0, 
        totalInterest: 0, 
        totalValue: 0, 
        withdraw: 0,
    }

    return (
        <div>
            <Section1>
                <Header>
                    <Logo>
                        <img src={logoLight} height="100%" width="100%" fontSize="20rem" alt="logo"/>
                    </Logo>
                    <Title>
                         Savvy Plan  
                    </Title>
                </Header>
                <Charts>
                    <AreaChartPlaceHolder>   
                        <SavingsAreaChart  />
                    </AreaChartPlaceHolder>  
                    <BarChartPlaceHolder>   
                        <SavingsStackedChart/>
                    </BarChartPlaceHolder>   
                </Charts>
                < RangeBarWrapper>
                    <RangeBar rangeBarProps={rangeBarProps}/>   
                    <RangeBar rangeBarProps={rangeBarProps}/>
                </RangeBarWrapper>

            </Section1>

        </div>
    )
}
