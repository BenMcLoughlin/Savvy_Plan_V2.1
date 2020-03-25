import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import ButtonLight from "UI/buttons/ButtonLight"
import  Header from "pages/tax/components/Header"
import TaxBracketsBar from "charts/tax/TaxBracketsBar"
import EditCredit from "pages/tax/components/EditCredit"
import DisplayBox from "pages/tax/components/DisplayBox"
import {creditTypes_data} from "pages/tax/data/tax_data"
import {tax_selector, taxBrackets_selector} from "redux/tax/tax_selectors"
import * as selector from "redux/tax/tax_selectors1"
import {add_action, setKeyValue_action} from "redux/actions"
import SavingsBarChart from "charts/savings/SavingsBarChart"

const Tax = ({setKeyValue_action, tax_selector,  add_action, totalIncome_selector}) => {    

    console.log(totalIncome_selector);
    const [stream, setStream] = useState()                                                                                           //This refers to the tax Credit, such as medical Expense, and is used to open the edit box
    const [id, setId] = useState()                                                                                                   // Id refers to the income object, such as "Wal Mart Employment" from age 22-27, we will call this and instance
    const [type, setCreditType] = useState("regularCredit")                                                                          // We're using three types, "regularCredit", "deduction", and "ageCredit"
 
    const createNewItem = (state) => {                                                                                               //This creates a new Income Instance, such as from ages 18-22
        const newId = (Math.random() * 10000000000).toFixed()                                                                        //creates the random ID that is the key to the object
                add_action(newId, {...state}, "tax_reducer")                                                                         //This action fires and sets the state in the reducer, 
                setStream(state.stream)                                                                                          // Sets item above in local state enabling the edit box to be shown                                                           
                setId(newId)                                                                                                         // determines which income instance to show within the edit box
    }

    const instanceArray =  tax_selector.filter(d => d.stream === stream).sort((a, b) => a.fromAge - b.fromAge) 

    return (
        <Wrapper>
            <Header/>
            <Chart>
                <ChartTitle>Lifetime Taxes By Year</ChartTitle>
                <ChartPlaceHolder>
                    <SavingsBarChart
                                reg={"RRSP"}
                            />
                </ChartPlaceHolder>
            </Chart>
                          {
                                stream ? 
                            
                                       <EditCredit  
                                                type={type}                                                                          //eg. "regularCredit", "deduction", and "ageCredit" 
                                                id={id}                                                                              //eg. "123987" set in state above, or false
                                                setStream={setStream}                                                            //eg. set "medicalExpense" function to set stream, which is the name of the credit 
                                                stream={stream}                                                                  //eg. "medicalExpense"
                                                setId={setId}                                                                        //eg. set "123987"
                                                instanceArray={instanceArray}                                                        //eg. [{stream: "medicalExpense" etc. }, {stream: "medicalExpense" etc. }]
                                                createNewItem={createNewItem}/>                                                      //function to add a new item to the reducer
                                : 
                            
                                    <ControlPanel>
                                        {creditTypes_data.map(d => <DisplayBox setStream={setStream}                                              //This is the box showing the names of all the tax credits
                                                                                setId={setId}                                                       //this enables the user to set the id of the income instance they want to see
                                                                                id={id}
                                                                                type={d.type}
                                                                                stream={stream}                                                 //this is the income stream, such as Wal Mart Income, and contains many income instances
                                                                                createNewItem={createNewItem} 
                                                                                instanceArray={instanceArray}
                                                                                />
                                        )}
                                    </ControlPanel>
                                
            
                                  
                            }
                            <Bottom>
                                <ButtonLeftWrapper>
                                <ButtonLight 
                                            onClick={() =>  setKeyValue_action("taxAge", "user_reducer", false)}
                                            text={"Back"}
                                        />
                                </ButtonLeftWrapper>
                            </Bottom>

        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    tax_selector: tax_selector(state),
    tax_reducer: state.tax_reducer,
    taxBrackets_selector: taxBrackets_selector(state),
    totalIncome_selector: selector.totalIncome_selector(state)
})

export default connect(mapStateToProps, {add_action, setKeyValue_action})(Tax )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width:  115rem;
    height: 80rem;
    padding: 1rem;
    margin: 0 auto;
    position: absolute;
    background: white;
    top: 6.5rem;
    left: 20rem;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    display: grid;
    grid-template-rows: 22rem 13rem 26rem 4rem;
    grid-template-areas:
    'a a a a a a'
    'b b b b b b'
    'c c c c c c'
    'd d d d d d'
`
    //background: white;
    const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 5rem;
    left: 2rem;
`

const ControlPanel = styled.div`
    width:  100%;
    border-radius: 5px;
    height: 100%;                 
    padding: 1rem;                                
    display: flex;
    justify-content: space-around;
    grid-area: c;
`
const Bottom = styled.div`
    width: 100%;
`

// const Charts = styled.div`
//     grid-area: b;
//     height: 100%;
//     width:  75rem;
//     display: flex;
//`

const Chart = styled.div`
    grid-area: b;
    margin-top: 1rem;
    text-align:center;
    position: relative;

`
const ChartTitle = styled.div`
  font-size: ${props => props.theme.fontSize.small};
  font-weight: 200;
  position: absolute;
  top: 3rem;
  left: 17rem;
`
const ChartPlaceHolder = styled.div`
    margin-top: 1rem;
    height: 11rem;
    width: 106rem;
    margin-left: 4rem;
`


