import React, {useState} from "react"
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
  
    const exists = Object.values(income_selector).length > 0                                                                         //Checks if the array has objects in it
    const [stream, setStream] = useState()                                                                                       //This refers to the income stream, such as Wal Mart Income, and is used to open the edit box
    const [count, setCount] = useState(progress_reducer.netWorth)                                                                    // Controls Count for wizard display
                                                     
    const [id, setId] = useState(123)                                                                                                // Id refers to the income object, such as "Wal Mart Employment" from age 22-27, we will call this and instance
 
    const setCountAndProgress = (section, number) => {                                                                               //Moves the count forward locally and also stores it in the reducer
        setKeyValue_action(section, "progress_reducer", number)                                                                                          //this action enables us to show a progress bar throughout the entire application
        setCount(number)                                                                                                             //sets the count locally
    }

    const createNewItem = (state) => {                                                                                            //This creates a new Income Instance, such as from ages 18-22
        const id = (Math.random() * 10000000000).toFixed()                                                                        //creates the random ID that is the key to the object
                setKeyValue_action(id, "income_reducer",  {...state, id})                                                         //This action fires and sets the state in the reducer,        
                setStream(state.stream)                                                                                           // Sets item above in local state enabling the edit box to be shown                                                           
                setId(id)                                                                                                         // determines which income instance to show within the edit box
    }

    const instanceArray = exists ?  Object.values(income_selector).filter(d => d.stream === stream).sort((a, b) => a.age1 - b.age1) : ["1"]//here we take the stream, eg Wal Mart Income, and make an array of all the instances of that incoem

        return (
            <Page>
                <Header
                     income_reducer={income_reducer}
                />
                <ChartPlaceHolder>
                    <IncomeBarChart/>
                </ChartPlaceHolder>    
                {
                   stream == "CPP Income" || stream === "OAS Income" ?                                                             //stream is the income stream, if its clicked and set the edit box will pop up

                 <EditRetirementIncome  id={id} 
                                       setStream={setStream}
                                       stream={stream} 
                                       setId={setId} 
                                       instanceArray={instanceArray}
                                       createNewItem={createNewItem}/>
                          : 
                   stream == "TFSA Income" || stream === "RRSP Income"  ?                                                               //stream is the income stream, if its clicked and set the edit box will pop up

                 <Savings
                      setStream={setStream}
                      stream={stream} 
                 />
                 :
                 ui_reducer.taxAge  ?                                                                                                      //stream is the income stream, if its clicked and set the edit box will pop up
                 <Tax/>
                          : 
                    stream ?                                                                                                      //stream is the income stream, if its clicked and set the edit box will pop up

                    <EditIncome  id={id} 
                                 setStream={setStream}
                                 stream={stream} 
                                 setId={setId} 
                                 instanceArray={instanceArray}
                                 createNewItem={createNewItem}/>
                    : 
              
                    <>
                    {
                        displayBox_data.map(d => <DisplayBox setStream={setStream}                                              //This is the box showing the names of all the streams
                                                                id={id}                                                             //This mapping will provide 3 boxes, one for employment income, one for business income and one for retirement income
                                                                reg={d.reg}                                                     //the income types are seperated according to if they make contributions to CPP
                                                                setId={setId}                                                       //this enables the user to set the id of the income instance they want to see
                                                                stream={stream}                                                 //this is the income stream, such as Wal Mart Income, and contains many income instances
                                                                createNewItem={createNewItem} 
                                                                instanceArray={instanceArray}
                                                        
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