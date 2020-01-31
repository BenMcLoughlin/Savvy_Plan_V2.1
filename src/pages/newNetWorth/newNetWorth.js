import React, {useState} from "react"
import styled from "styled-components"
import AssetsInput from "pages/newNetWorth/components/AssetsInput"
import LiabilitiesInput from "pages/newNetWorth/components/LiabilitiesInput"
import Header from "pages/newNetWorth/components/Header"
import ButtonDark from "UI/buttons/ButtonDark"
import ButtonLight from "UI/buttons/ButtonLight"
import { NavLink} from "react-router-dom"
import SunBurstChart from "charts/netWorth/SunBurstChart"


const NetWorthApp = () => {    

    const [display, setDisplay] = useState(true)                                                              // toggles display between assets and liabilities, true shows assets, false shows liabilities
     
    return (
        <Page> 
            <Header display={display} setDisplay={setDisplay}/>
            <Charts>
                <ChartPlaceHolder>
                    <SunBurstChart chartType={"assets"}/>
                </ChartPlaceHolder>
                <ChartPlaceHolder>
                    <SunBurstChart chartType={"liabilities"}/>
                </ChartPlaceHolder>
            </Charts>

            {
                display ? 
                <AssetsInput/>
                : 
                <LiabilitiesInput/>
            }
            
            <ButtonWrapper to="/SavingsPlan">
                            <ButtonDark text={'Next'}/>
           </ButtonWrapper>   
        </Page>
       
    )

}

const Page = styled.div`
    ${props => props.theme.pageBaseStyles}
    grid-template-rows: minmax(23rem, 25rem)  minmax(24rem, 28rem);
    width: 100%;
    grid-template-areas:
    'a b b b b b b b b b b b'
    'c c c c c c c c c c c c'
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

const ButtonWrapper = styled(NavLink)`
    position: absolute;
    right: 20rem;
    bottom: 2rem;
`

export default  NetWorthApp

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    // This is the app pages of the Net Worth App that brings everything together and compiles it into one simple component. 
    // it currently has its own theme but that will have to change. 