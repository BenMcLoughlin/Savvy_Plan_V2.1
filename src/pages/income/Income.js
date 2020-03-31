import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {setKeyValue_action} from "redux/actions"
import Header from "pages/income/components/Header"
import IncomeBarChart from "charts/income/IncomeBarChart"
import EditIncome from "pages/income/components/EditIncome"
import Tax from "pages/tax/Tax"
import Savings from "pages/savings/Savings"
import EditRetirementIncome from "pages/income/components/EditRetirementIncome"
import DisplayBox from "pages/income/components/DisplayBox"
import {add_action} from "redux/actions"
import {income_selector, tfsa_selector} from "redux/income/income_selectors"
import {displayBox_data} from "pages/income/data/income_data"

const Income = ({progress_reducer, setKeyValue_action, income_selector, ui_reducer, income_reducer}) => {
  
    const {viewStream, viewId} = ui_reducer
                                                                                                                          // Id refers to the income object, such as "Wal Mart Employment" from age 22-27, we will call this and instance
    const createNewItem = (state) => {                                                                                               //This creates a new Income Instance, such as from ages 18-22
        const id = (Math.random() * 10000000000).toFixed()                                                                           //creates the random ID that is the key to the object
                setKeyValue_action(id, "income_reducer",  {...state, id})                                                            //This action fires and sets the state in the reducer,        
                setKeyValue_action("viewStream", "ui_reducer", state.stream)  
                setKeyValue_action("viewId", "ui_reducer", id)                                                                                                           // determines which income instance to show within the edit box
                setKeyValue_action("streamArray", "ui_reducer", Object.values(income_selector).filter(d => d.stream === viewStream).sort((a, b) => a.age1 - b.age1))                                                                                                           // determines which income instance to show within the edit box
    }

        return (
            <Page>
                <Header
                     income_reducer={income_reducer}
                />
                <ChartPlaceHolder>
                    <IncomeBarChart/>
                </ChartPlaceHolder>    
                {
                   viewStream == "CPP Income" || viewStream === "OAS Income" ?                                                             //stream is the income stream, if its clicked and set the edit box will pop up

                 <EditRetirementIncome viewId={viewId} 
                                       viewStream={viewStream} 
                                       createNewItem={createNewItem}/>
                          : 
                   viewStream == "TFSA Income" || viewStream === "RRSP Income"  ?                                                               //stream is the income stream, if its clicked and set the edit box will pop up
                 <Savings/>
                 :
                 ui_reducer.taxAge  ?                                                                                                      //stream is the income stream, if its clicked and set the edit box will pop up
                 <Tax/>
                          : 
                 viewStream ?                                                                                                      //stream is the income stream, if its clicked and set the edit box will pop up

                    <EditIncome  viewId={viewId} 
                                 viewStream={viewStream} 
                                 createNewItem={createNewItem}/>
                    : 
              
                    <>
                    {
                        displayBox_data.map(d => <DisplayBox viewId={viewId} 
                                                                viewStream={viewStream}                                                         //This mapping will provide 3 boxes, one for employment income, one for business income and one for retirement income
                                                                reg={d.reg}                                                     //the income types are seperated according to if they make contributions to CPP
                                                                createNewItem={createNewItem}                                                         
                                                                />
                        )
                    }

                     </>           
                }

            </Page>
        )
}

const mapStateToProps = (state) => {
    return {
        progress_reducer: state.progress_reducer,
        income_reducer: state.income_reducer,
        income_selector: income_selector(state),
        tfsa_selector: tfsa_selector(state),
        ui_reducer: state.ui_reducer,
    }
}

export default connect(mapStateToProps, {add_action, setKeyValue_action})(Income)

//-----------------------------------------------style-----------------------------------------------//

const Page = styled.div`
    ${props => props.theme.pageBaseStyles}
    grid-template-rows: 10rem 26rem 26rem 4rem;
    grid-template-areas:
    'a a a'
    'b b b'
    'c c c'
    'd d d'
`
const ChartPlaceHolder = styled.div`
    grid-area: b;
    width: 90%;
    margin-left: 5%;
    height: 100%;

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

The main functions for this app are written here in the app. 

*/