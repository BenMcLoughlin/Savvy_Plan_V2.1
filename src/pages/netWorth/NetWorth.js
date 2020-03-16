import React, {useState} from "react"
import styled from "styled-components"
import ControlPanel from "pages/netWorth/components/ControlPanel"
import {connect} from "react-redux"
import SunBurstChart from "charts/netWorth/SunBurstChart"
import ProjectionChart from "charts/netWorth/ProjectionChart"
import ButtonLight from "UI/buttons/ButtonLight"
import ButtonDark from "UI/buttons/ButtonDark"
import AddForm from "pages/netWorth/components/AddForm"
import {netWorthWizard_data} from "pages/netWorth/data/netWorth_data"
import Header from "pages/netWorth/components/Header"
import WelcomePage from "pages/netWorth/components/WelcomePage"
import DisplayBox from "pages/netWorth/components/DisplayBox"
import {setKeyValue_action} from "redux/actions"
import { NavLink} from "react-router-dom"

const NetWorth = ({progress_reducer, setKeyValue_action}) => {    
    const [count, setCount] = useState(progress_reducer.netWorth)                                       // Controls Count for wizard display
    const [display, setDisplay] = useState("assets")                                                    // toggles display between asset and liability  

    const setCountAndProgress = (section, number) => {
        setKeyValue_action(section, "progress_reducer", number)
        setCount(number)
    }

    const renderAddForm = data => {                                                                     // Takes data from netWorth_data and renders a different input 
      return data.map(d =>                                                                              // based on the count, such as Cash Assets or Unsecured Debt
        d.count === count ? 
        <AddPage key={d.subCategory}>
            <DisplayWrapper >                                                                           {/* shows the items the user has assed such as "Cash 100K"*/}  
                <DisplayBox                
                category={d.category}
                subCategory={d.subCategory}
                setItemId={() => null}
            />
         </DisplayWrapper>
        <AddFormWrapper>                                                                                 {/* form that enables users to add new items*/}  
            <AddForm                                                                                  
                category={d.category}
                subCategory={d.subCategory}
                bookValueLabel={d.bookValueLabel}
                currentValueLabel={d.currentValueLabel}
                interestRateLabel={d.interestRateLabel}
                accountTypeArray = {d.accountTypeArray}  
                setAddFormSubCategory={() => null}                                                        //This is set to null here because Add form is also used on the final page
        />                                                                                                {/* which needs to use this function*/}  
        </AddFormWrapper>
      </AddPage>
      : null
      )
    }

    return (

        <Page> 
          {count === 0 ? 
          <>
          <WelcomePage/>                                                              
          <Buttons>                                                                             {/* Fixed plan buttons enabling the toggling back and forth*/}
                                < ButtonLight backward onClick={() => setCountAndProgress("netWorth", (count > 0 ? count - 1 : 0))}/>
                                < ButtonLight forward onClick={() => setCountAndProgress("netWorth", ( count < 6 ? count + 1 : 6))}/>                   

           </Buttons>
         </>
          :
          count < 6 ? 

          <>
                {renderAddForm(netWorthWizard_data)}                                                      {/*This is the walk through wizard getting them to input their details*/}  
                <Buttons>                                                                             {/* Fixed plan buttons enabling the toggling back and forth*/}
                                < ButtonLight backward onClick={() => setCountAndProgress("netWorth", (count > 0 ? count - 1 : 0))}/>
                                < ButtonLight forward onClick={() => setCountAndProgress("netWorth", ( count < 6 ? count + 1 : 6))}/>                   

                </Buttons>
          </>
          : 
                <>                                                                                        {/*Final Display Page showing charts and different assets and liabilities*/} 
                <Header 
                    display={display}
                    setDisplay={setDisplay}
                />
                <Charts>                                                                                 {/*Displays two chartss*/}
                    <SunBurstChartPlaceHolder>
                            <SunBurstChart/>
                    </SunBurstChartPlaceHolder>
                    <ProjectionChartPlaceHolder>
                            <ProjectionChart/>
                    </ProjectionChartPlaceHolder>
                </Charts>
                <ControlPanel 
                    setCount={setCount}
                    display={display}
                />
                <ButtonsFinal>                                                                             {/* Fixed plan buttons enabling the toggling back and forth*/}
                    < ButtonLight text={"reset progress"} onClick={() => setCountAndProgress("netWorth", 0)}/>
                    <ButtonWrapper to="/">
                                     <ButtonDark text={'Next'} onClick={() =>  setCountAndProgress("dashboard", 3)}/>
                    </ButtonWrapper>            
                </ButtonsFinal>
                 </>
          }


                                
        </Page>


       
    )

}

const mapStateToProps = (state) => ({
    progress_reducer: state.progress_reducer
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
    margin-left: -2rem;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    height: 35rem;
`


const ButtonWrapper = styled(NavLink)`

`