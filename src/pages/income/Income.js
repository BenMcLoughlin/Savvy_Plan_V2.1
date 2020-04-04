import React from "react"
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
import {displayBox_data} from "pages/income/data/income_data"
import {HAPPYPIE_selector} from "redux/income/income_selectors"

const Income = ({setKeyValue_action, ui_reducer, HAPPYPIE_selector}) => {
  
    const {stream, id} = ui_reducer                                                                                                  //stream and id represent the selected values which are stored in the ui_reducer and tell the app what edit box to display
                                                                                                                                     // Id refers to the income object, such as "Wal Mart Employment" from age 22-27, we will call this an instance
    const createNewItem = (state) => {                                                                                               //This creates a new Income Instance, such as from ages 18-22
        const id = (Math.random() * 10000000000).toFixed()                                                                           //creates the random ID that is the key to the object
                setKeyValue_action(id, "income_reducer",  {...state, id})                                                            //This action fires and sets the state in the income reducer creating a new item there,        
                setKeyValue_action("stream", "ui_reducer", state.stream)                                                             //we then set the stream in the ui reducer telling which values should be given to the edit box
                setKeyValue_action("id", "ui_reducer", id)                                                                           // determines which income instance to show within the edit box                                                                                                          // determines which income instance to show within the edit box
    }

    console.log(HAPPYPIE_selector);

        return (
            <Page>
              <Header/>                                                                                                               
                 <ChartPlaceHolder>
                    <IncomeBarChart/>
                </ChartPlaceHolder>    
                 {stream == "CPP Income" || stream === "OAS Income"     ?                                                            //if it is CPP or OAS income we want to show the edit retirement box
                 <EditRetirementIncome createNewItem={createNewItem}/>  : 
                   stream == "TFSA Withdrawals" || stream === "RRSP Withdrawals"  ?                                                            //if it is TFSA or RRSP we want to show their respective savings section
                 <Savings/>                                             :
                 ui_reducer.taxAge                                      ?                                                            //if the tax age is set, by clicking on a bar in the chart, then it shows the tax page
                 <Tax/>                                                 : 
                 stream                                                 ?                                                            //stream is the income stream, if its clicked and set the edit box will pop up
                    <EditIncome  createNewItem={createNewItem}/>        : 
                    <>
                   {displayBox_data.map(d => <DisplayBox  
                                     type={d.type}                                                                                          //the income types are seperated according to if they make contributions to CPP                                                    
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
        ui_reducer: state.ui_reducer,
        HAPPYPIE_selector: HAPPYPIE_selector(state)
    }
}

export default connect(mapStateToProps, {setKeyValue_action})(Income)

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