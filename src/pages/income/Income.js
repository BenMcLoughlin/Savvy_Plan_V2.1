import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {setProgress_action} from "redux/progress/progress_actions"
import Header from "pages/income/components/Header"
import LifetimeIncomeBarChart from "charts/income/LifetimeIncomeBarChart"
import EditIncome from "pages/income/components/EditIncome"
import Savings from "pages/savings/Savings"
import RRSP from "pages/rrsp/RRSP"
import EditRetirementIncome from "pages/income/components/EditRetirementIncome"
import DisplayBox from "pages/income/components/DisplayBox"
import {addIncome_action} from "redux/income/income_actions"
import {income_selector, tfsa_selector} from "redux/income/income_selectors"
import {displayBox_data} from "pages/income/data/income_data"

const Income = ({progress_reducer, setProgress_action, income_selector, addIncome_action, income_reducer}) => {
  
    const exists = Object.values(income_selector).length > 0                                                                    //Checks if the array has objects in it
    const [category, setCategory] = useState("RRSP Income")                                                                                       //This refers to the income stream, such as Wal Mart Income, and is used to open the edit box
   
    const [count, setCount] = useState(progress_reducer.netWorth)                                                                    // Controls Count for wizard display
                                                     
    const [id, setId] = useState(123)                                                                                                   // Id refers to the income object, such as "Wal Mart Employment" from age 22-27, we will call this and instance
    const [taxAge, setTaxAge] = useState(123)                                                                                                   // Id refers to the income object, such as "Wal Mart Employment" from age 22-27, we will call this and instance
    
    const setCountAndProgress = (section, number) => {                                                                               //Moves the count forward locally and also stores it in the reducer
        setProgress_action(section, number)                                                                                          //this action enables us to show a progress bar throughout the entire application
        setCount(number)                                                                                                             //sets the count locally
    }

    const createNewItem = (state) => {                                                                                               //This creates a new Income Instance, such as from ages 18-22
        const newId = (Math.random() * 10000000000).toFixed()                                                                        //creates the random ID that is the key to the object
                addIncome_action(newId, {...state})                                                                                  //This action fires and sets the state in the reducer, 
                setCategory(state.category)                                                                                          // Sets item above in local state enabling the edit box to be shown                                                           
                setId(newId)                                                                                                         // determines which income instance to show within the edit box
    }


    const instanceArray = exists ?  Object.values(income_selector).filter(d => d.category === category).sort((a, b) => a.fromAge - b.fromAge) : ["1"]//here we take the category, eg Wal Mart Income, and make an array of all the instances of that incoem

        return (
            <Page>
                <Header
                     income_reducer={income_reducer}
                />
                <ChartPlaceHolder>
                   <LifetimeIncomeBarChart/>
                </ChartPlaceHolder>    
                {
                   category == "CPP Income" || category === "OAS Income" ?                                                                                                      //category is the income stream, if its clicked and set the edit box will pop up

                 <EditRetirementIncome  id={id} 
                                       setCategory={setCategory}
                                       category={category} 
                                       setId={setId} 
                                       instanceArray={instanceArray}
                                       createNewItem={createNewItem}/>
                          : 
                   category == "TFSA Income"  ?                                                                                                      //category is the income stream, if its clicked and set the edit box will pop up

                 <Savings
                      setCategory={setCategory}
                 />
                 :
                   category == "RRSP Income"  ?                                                                                                      //category is the income stream, if its clicked and set the edit box will pop up

                 <RRSP
                      setCategory={setCategory}
                 />
                          : 
                    category ?                                                                                                      //category is the income stream, if its clicked and set the edit box will pop up

                    <EditIncome  id={id} 
                                 setCategory={setCategory}
                                 category={category} 
                                 setId={setId} 
                                 instanceArray={instanceArray}
                                 createNewItem={createNewItem}/>
                    : 
              
                    <>
                    {
                        displayBox_data.map(d => <DisplayBox setCategory={setCategory}                                              //This is the box showing the names of all the streams
                                                                id={id}                                                             //This mapping will provide 3 boxes, one for employment income, one for business income and one for retirement income
                                                                incomeType={d.incomeType}                                           //the income types are seperated according to if they make contributions to CPP
                                                                setId={setId}                                                       //this enables the user to set the id of the income instance they want to see
                                                                category={category}                                                 //this is the income stream, such as Wal Mart Income, and contains many income instances
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
        income_reducer2: state.income_reducer2,
        income_reducer: state.income_reducer,
        income_selector: income_selector(state),
        tfsa_selector: tfsa_selector(state),
    }
}

export default connect(mapStateToProps, {addIncome_action})(Income)

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