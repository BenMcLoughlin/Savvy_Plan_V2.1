import React from "react"
import styled from "styled-components"
import Header from "pages/spending/components/Header"
import ControlPanel from "pages/spending/components/ControlPanel"


const Spending = () => {
    return (
        <Page>
            <Header/>
            <ChartWrapper>

            </ChartWrapper>
            <ControlPanel/>


        </Page>
    )
}

export default Spending


//-----------------------------------------------STYLES-----------------------------------------------//

const Page = styled.div`
    ${props => props.theme.pageBaseStyles}
    grid-template-rows: minmax(12rem, 14rem)  minmax(24rem, 28rem);
    grid-template-areas: 
    "a a a a "
    "b b b b "
    "c c c c "
`

const ChartWrapper = styled.div`
    grid-area: b;
    background: green;

`
