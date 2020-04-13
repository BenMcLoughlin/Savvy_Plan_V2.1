import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import Header from "pages/income/components/Header"
import IncomeBarChart from "charts/income/IncomeBarChart"
import EditIncome from "pages/income/components/EditIncome"
import Tax from "pages/tax/Tax"
import Savings from "pages/savings/Savings"
import EditPension from "pages/income/components/EditPension"
import DisplayBox from "pages/income/components/DisplayBox"
import {displayBox_data} from "pages/income/data/income_data"

const Income = ({ui_reducer}) => {
  
    const {stream} = ui_reducer                                                                                                  //stream and id represent the selected values which are stored in the ui_reducer and tell the app what edit box to display
                                                                                                                                 // Id refers to the income object, such as "Wal Mart Employment" from age 22-27, we will call this an instance
        return (
            <Page>
              <Header/>                                                                                                               
                 <ChartPlaceHolder>
                    <IncomeBarChart/>
                </ChartPlaceHolder>    
                 {stream == "CPP Income" || stream === "OAS Income"     ?                                                            //if it is CPP or OAS income we want to show the edit retirement box
                 <EditPension/>  : 
                   stream == "TFSA Withdrawals" || stream === "RRSP Withdrawals"  ?                                                            //if it is TFSA or RRSP we want to show their respective savings section
                 <Savings/>                                             :
                 ui_reducer.taxAge                                      ?                                                            //if the tax age is set, by clicking on a bar in the chart, then it shows the tax page
                 <Tax/>                                                 : 
                 stream                                                 ?                                                            //stream is the income stream, if its clicked and set the edit box will pop up
                    <EditIncome />        :

                    <ControlPanel>
                        {displayBox_data.map(d => <DisplayBox  
                                                        incomeType={d.incomeType}                                                                                          //the income types are seperated according to if they make contributions to CPP                                                    
                                                        />
                                            )
                                        }
                    </ControlPanel>         
                }

            </Page>
        )
}

const mapStateToProps = (state) => {
    return {
        ui_reducer: state.ui_reducer,
    }
}

export default connect(mapStateToProps, {})(Income)

//-----------------------------------------------style-----------------------------------------------//

const Page = styled.div`
    ${props => props.theme.pageBaseStyles}
    grid-template-rows: 8rem 23rem 26rem;
    grid-template-areas:
    'a a a'
    'b b b'
    'c c c'
`
const ChartPlaceHolder = styled.div`
    grid-area: b;
    width: 100rem;
    margin-left: 7rem;
    height: 100%;

`
const ControlPanel = styled.div`
    width:  108rem;
    border-radius: 5px;
    height: 100%;                 
    padding: 1rem;                                
    display: flex;
    justify-content: space-around;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

The main functions for this app are written here in the app. 

*/