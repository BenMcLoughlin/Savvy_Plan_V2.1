import React, {useState} from "react"
import styled from "styled-components"
import ControlPanel from "pages/netWorth/components/ControlPanel"
import {connect} from "react-redux"
import SunBurstChart from "charts/netWorth/SunBurstChart"
import ProjectionChart from "charts/netWorth/ProjectionChart"
import EditNetWorth from "pages/netWorth1/components/EditNetWorth"
import {netWorthWizard_data} from "pages/netWorth1/data/netWorth_data"
import Header from "pages/netWorth1/components/Header"
import WelcomePage from "pages/netWorth/components/WelcomePage"
import DisplayBox from "pages/netWorth1/components/DisplayBox"
import {setKeyValue_action} from "redux/actions"
import { NavLink} from "react-router-dom"
import {ArrowRight, ArrowLeft} from "style/Icons"

const NetWorth = ({ui_reducer, setKeyValue_action}) => {    

    const {count} = ui_reducer
    console.log(count);
    return (

        <Page> 
          {count === 0 ? 
          <>
          <WelcomePage/>                                                              
         </>
          :
          count < 6 ? 
          <>
          {netWorthWizard_data.map(d => d.count === count ? 
                  <AddPage key={d.subCategory}>
                  <DisplayWrapper >                                                                           {/* shows the items the user has assed such as "Cash 100K"*/}  
                      <DisplayBox                
                             category={d.category}
                             subCategory={d.subCategory}
                         />
                     </DisplayWrapper>
                     <AddFormWrapper>                                                                                 {/* form that enables users to add new items*/}                                                                                                 {/* which needs to use this function*/}  
                     </AddFormWrapper>
                   </AddPage>
                  : null
                                )
                 }    
          </>                                
          : 
                <>                                                                                        {/*Final Display Page showing charts and different assets and liabilities*/} 
                <Header/>

                 </>
          }
                        <ArrowR onClick={() => setKeyValue_action("count", "ui_reducer", ( count < 6 ? count + 1 : 6))} />
                        <ArrowL onClick={() => setKeyValue_action("count", "ui_reducer", ( count > 0 ? count - 1 : 0))} />
        </Page>
    )

}

const mapStateToProps = (state) => ({
    ui_reducer: state.ui_reducer
})

export default connect(mapStateToProps, {setKeyValue_action})(NetWorth )


//-----------------------------------------------STYLES-----------------------------------------------//


const Page = styled.div`
    ${props => props.theme.pageBaseStyles}
    grid-template-rows: minmax(7rem, 10rem) minmax(21rem, 22rem) minmax(28rem, 40rem);
    width: 100%;
    grid-template-areas:
    'a a a a a a a a a a a a'
    'b b b b b b b b b b b b'
    'c c c c c c c c c c c c'
`
const AddPage = styled(Page)``

const Charts = styled.div`
    grid-area: b;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`
const SunBurstChartPlaceHolder = styled.div`
    width: 30%;
    height: 90%;
`
const ProjectionChartPlaceHolder = styled.div`
    width: 70%;
    height: 100%;
`

const Buttons = styled.div`
    position: absolute;
    width: 123rem;
    top: 30rem;
    left: 14rem;
    z-index: 100;
    display: flex;
    justify-content: space-between;
`
const ButtonsFinal = styled(Buttons)`
    top: 90%;
    left: 10%;
`


const DisplayWrapper = styled.div`
    grid-area: a;
    width: 80%;
    margin-left: 10%;
    height: 20rem;
`

const AddFormWrapper = styled.div`
    grid-area: c;
    width: 90%;
    margin-left: 0.5rem;
    margin-top: -4rem;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    height: 35rem;
`


const ButtonWrapper = styled(NavLink)`

`
const ArrowR = styled(ArrowRight)`
    position: absolute;
    top: 20rem;
    right: 10rem;
    width: 6rem;
    height: 6rem;
    color: ${props => props.theme.color.lightGrey};
    cursor: pointer
`
const ArrowL = styled(ArrowLeft)`
    position: absolute;
    top: 20rem;
    left: 10rem;
    width: 6rem;
    height: 6rem;
    color: ${props => props.theme.color.lightGrey};
    cursor: pointer
`