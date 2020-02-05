import React, {useState} from "react"
import styled from "styled-components"
import ControlPanel from "pages/netWorth/components/ControlPanel"
import Header from "pages/netWorth/components/Header"
import Wizard from "pages/newNetWorth/wizard/Wizard"
import {connect} from "react-redux"
import SunBurstChart from "charts/netWorth/SunBurstChart"
import ProjectionChart from "charts/netWorth/ProjectionChart"

const NewNetWorthApp = () => {    

    return (

        <Page> 
            <Charts>
            <ChartPlaceHolder>
                    <SunBurstChart chartType={"asset"}/>
                </ChartPlaceHolder>
                < ProjectionChartPlaceHolder>
                </ProjectionChartPlaceHolder>
            </Charts>
                <Wizard/> 
        </Page>


       
    )

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(NewNetWorthApp )


//-----------------------------------------------STYLES-----------------------------------------------//


const Page = styled.div`
    ${props => props.theme.pageBaseStyles}
    grid-template-rows: minmax(20rem, 22rem) minmax(28rem, 40rem);
    width: 100%;
    grid-template-areas:
    'a a a a a a a a a a a a'
    'b b b b b b b b b b b b'
`
const Charts = styled.div`
    grid-area: a;
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




 