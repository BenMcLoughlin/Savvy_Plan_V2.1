import React, {useState} from "react"
import styled from "styled-components"
import ControlPanel from "pages/newNetWorth/components/ControlPanel"
import Header from "pages/newNetWorth/components/Header"
import ButtonDark from "UI/buttons/ButtonDark"
import { NavLink} from "react-router-dom"
import SunBurstChart from "charts/netWorth/SunBurstChart"
import ProjectionChart from "charts/netWorth/ProjectionChart"
import {property_selector, cash_selector, investments_selector, longTerm_selector, shortTerm_selector, other_selector, chartProjection_selector} from "redux/netWorth/netWorth_selectors"
import {connect} from "react-redux"
import {setItemValue_action, changeLabel_action, removeItem_action} from "redux/netWorth/netWorth_actions"


const NetWorthApp = ({property_selector, cash_selector, investments_selector, longTerm_selector, shortTerm_selector, other_selector, chartProjection_selector}) => {    

    const [display, setDisplay] = useState(true)                                                              // toggles display between asset and liability, true shows asset, false shows liability
     console.log(chartProjection_selector);
    return (
        <Page> 
            <Header display={display} setDisplay={setDisplay}/>
            <Charts>
                <ChartPlaceHolder>
                    <SunBurstChart chartType={"asset"}/>
                </ChartPlaceHolder>
                <ChartPlaceHolder>
                    <SunBurstChart chartType={"liability"}/>
                </ChartPlaceHolder>
            </Charts>
            <ProjectionChartPlaceHolder>
                <ProjectionChart/>
            </ProjectionChartPlaceHolder>

            {
                display ? 
                   <ControlPanel
                        category={"asset"}
                        subCategory1 = {cash_selector}
                        subCategory2 = {investments_selector}
                        subCategory3 = {property_selector}
                   />
                : 
                    <ControlPanel
                            category={"liability"}
                            subCategory1 = {shortTerm_selector}
                            subCategory2 = {other_selector} 
                            subCategory3 = {longTerm_selector}
                    />
            }
            
            <ButtonWrapper to="/SavingsPlan">
                            <ButtonDark text={'Next'}/>
           </ButtonWrapper>   
        </Page>
       
    )

}

const mapStateToProps = (state) => ({
    savings_reducer: state.savings_reducer,
    property_selector: property_selector(state),
    cash_selector: cash_selector(state),
    longTerm_selector: longTerm_selector(state), 
    shortTerm_selector: shortTerm_selector(state), 
    other_selector: other_selector(state),
    investments_selector: investments_selector(state),
    chartProjection_selector: chartProjection_selector(state),
})

export default connect(mapStateToProps, {setItemValue_action, changeLabel_action, removeItem_action})(NetWorthApp )


//-----------------------------------------------STYLES-----------------------------------------------//


const Page = styled.div`
    ${props => props.theme.pageBaseStyles}
    grid-template-rows: minmax(20rem, 22rem)  minmax(14rem, 16rem) minmax(24rem, 28rem);
    width: 100%;
    grid-template-areas:
    'a b b b b b b b b b b b'
    'c c c c c c c c c c c c'
    'd d d d d d d d d d d d'
`
const Charts = styled.div`
    grid-area: b;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`
const ChartPlaceHolder = styled.div`
    width: 50%;
    height: 100%;
`
const ProjectionChartPlaceHolder = styled.div`
    grid-area: c;
    height: 100%;

`

const ButtonWrapper = styled(NavLink)`
    position: absolute;
    right: 20rem;
    bottom: 2rem;
`



 