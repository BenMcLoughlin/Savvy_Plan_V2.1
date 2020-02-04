import React, {useState} from "react"
import styled from "styled-components"
import ControlPanel from "pages/netWorth/components/ControlPanel"
import Header from "pages/netWorth/components/Header"
import Wizard from "pages/newNetWorth/wizard/Wizard"
import {connect} from "react-redux"

const NewNetWorthApp = () => {    

    const [wizard, toggleWizard] = useState(true)                                                              // toggles display between asset and liability, true shows asset, false shows liability

    return (
        <>
        {
        wizard ? <Wizard/> :
        <Page> 
        </Page>
        }

        </>
       
    )

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(NewNetWorthApp )


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




 