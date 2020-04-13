import React, {useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {cpp_selector} from "redux/main/income_selectors"
import { delete_action, setKeyValue_action} from "redux/actions"
import ButtonLight from "UI/buttons/ButtonLight"
import EditSavings from "pages/savings/components/EditSavings"
import SavingsAreaChart from "charts/savings/SavingsAreaChart"
import SavingsBarChart from "charts/savings/SavingsBarChart"
import Header from "pages/savings/components/Header"
import AccountBox  from "pages/savings/components/AccountBox"
import InvestmentFactor  from "pages/savings/components/InvestmentFactors"
import {ArrowLeft} from "style/Icons"

const Savings = ({setKeyValue_action, ui_reducer}) => {    

    const {stream} = ui_reducer                                                                                                  //the stream name was set in the ui reducer forcing this section to be shown, we grab it from there
    const reg = stream.split("").slice(0,4).join("")                                                                             //creates a value called reg that is either "TFSA", "RRSP", or "NReg"

    useEffect(() => {
        setKeyValue_action("id2", "ui_reducer", `${reg}contribution` )                                                           // because we're showing two edit boxes at the same time we need two ids, onw for withdrawals one for contributions                                                                        
    }, [])

    return (
        <Wrapper>
             <Header reg={reg}/>
                <Charts>
                    <ChartPlaceHolder>
                        <SavingsAreaChart reg={reg} />
                    </ChartPlaceHolder>
                    <BarChartPlaceHolder >
                        <SavingsBarChart reg={reg}/>
                    </BarChartPlaceHolder>
                </Charts>
                <ControlPanel>
                    <AccountBox  
                        display={"assets"}                                                                                            //this allows the user to change the starting value of the investment
                        subCategory={"investmentAssets"}
                        reg={reg} 
                    />
                    <EditSavings  
                        transaction={"contribution"}                                                               
                        reg={reg} 
                    />
                    <EditSavings 
                        transaction={"withdrawal"}   
                        reg={reg}   
                    />
                </ControlPanel>
                <Bottom>
                    <InvestmentFactor/>
                    <BackArrow onClick={() => setKeyValue_action("stream", "ui_reducer", null)}   />
 
        </Bottom>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
    ui_reducer: state.ui_reducer,
    cpp_selector: cpp_selector(state),
})

export default connect(mapStateToProps, {setKeyValue_action, setKeyValue_action,  delete_action})(Savings )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width:  108rem;
    height: 65rem;
    padding: 1rem;
    margin: 0 auto;
    position: absolute;
    background: white;
    top: 6.2rem;
    left: 15rem;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    display: grid;
    grid-template-rows: 8rem 23rem 26rem;
    grid-template-areas:
    'a a a'
    'b b b'
    'c c c'
`

const ControlPanel = styled.div`
    width:  108rem;
    border-radius: 5px;
    height: 100%;                 
    padding: 1rem;                                
    display: flex;
    justify-content: space-around;
    grid-area: c;
`
const Bottom = styled.div`
    width: 100%;
    grid-area: d;
`

const Charts = styled.div`
    grid-area: b;
    width: 105rem;
    margin-left: -0.2rem;
    height: 100%;
`
const ChartPlaceHolder = styled.div`
    margin-left: 4%;
    height: 60%;
`
const BarChartPlaceHolder = styled.div`
    margin-left: 4%;
    height: 40%;
`

const BackArrow = styled(ArrowLeft)`
    width: 7rem;
    height: 7rem;
    position: absolute;
    top: 10rem;
    left: -7rem;
    cursor: pointer;
    color: ${props => props.theme.color.lightGrey};

`