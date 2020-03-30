import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {cpp_selector} from "redux/income/income_selectors"
import { delete_action, setKeyValue_action} from "redux/actions"
import ButtonLight from "UI/buttons/ButtonLight"
import EditSavings from "pages/savings/components/EditSavings"
import SavingsAreaChart from "charts/savings/SavingsAreaChart"
import SavingsBarChart from "charts/savings/SavingsBarChart"
import Header from "pages/savings/components/Header"
import AccountBox  from "pages/savings/components/AccountBox"
import InvestmentFactor  from "pages/savings/components/InvestmentFactors"
import {taxCredit_data} from "pages/tax/data/tax_data"

const Savings = ({setKeyValue_action, delete_action, stream, setStream}) => {    

    const reg = stream.split("").slice(0,4).join("")                                                                               //creates a value called reg that is either "TFSA", "RRSP", or "NReg"
    const [contributionId, setContributionId] = useState(`${reg}contribution`)                                                       //contributions and withdrawals are hard coded in the reducer, this enables the starting state to be set according to which page we're on, RRSP or TFSA 
    const [withdrawalId, setWithdrawalId] =  useState(`${reg}withdrawal`)                                                            // the ids for the hard coded contributions and withdrawals look like "TFSAcontribution", and "TFSAwithdrawal"

    const createNewItem = (state) => {                                                                                               //This creates a new Savings Instance, such as from ages 18-22
        const id = (Math.random() * 10000000000).toFixed()                                                                           //creates the random ID that is the key to the object
                setKeyValue_action(id, "savings_reducer",  {...state, id})                                                           //This action fires and sets a savings instance in the reducer, this could be a contribution or withdrawal
              if(state.transaction === "contribution")  { setContributionId(id)     }                                                // determines which income instance to show within the edit box
              if(state.transaction === "contribution" && state.reg === "RRSP")  {                                                    //if a new RRSP contribution instance is created it also has to be stored in the tax section
                  const newSavingsInstance = taxCredit_data(true, state.age1, state.stream, state.age2, "deduction", state.value)                    //create a new tax instance object using the details from the savings instance
                  setKeyValue_action(id, "tax_reducer",  {...newSavingsInstance, id})                                                //add the new tax instance to the tax_reducer
                }                                                                                                                    // determines which income instance to show within the edit box
              if(state.transaction === "withdrawal")  { 
                setKeyValue_action(id, "income_reducer",  {...state, id})  
                setWithdrawalId(id)   
                  }                                                                                                                 // determines which income instance to show within the edit box
    }

    const deleteInstance = ({id}) => {                                                                                                   //deletes the instance
                delete_action(id, "savings_reducer")                                                                                     //removes the instance
                setContributionId(`${reg}contribution`)                                                                         //sets the object being viewed to the first one
                setWithdrawalId(`${reg}withdrawal`)                                                                              //sets the object being viewed to the first one
    }


    return (
        <Wrapper>
             <Header 
                reg={reg}>
            </Header>
                <Charts>
                    <ChartPlaceHolder>
                        <SavingsAreaChart
                        reg={reg}
                        />
                    </ChartPlaceHolder>
                    <BarChartPlaceHolder >
                        <SavingsBarChart
                        reg={reg}
                       />
                    </BarChartPlaceHolder>
                </Charts>
                <ControlPanel>
                <AccountBox 
                    display={"assets"}
                    subCategory={"investmentAssets"}
                    reg={reg}
                />
                <EditSavings createNewItem = {createNewItem} 
                            transaction={"contribution"}                                                               
                            id={contributionId} 
                            reg={reg}
                            setId={setContributionId}
                            deleteInstance={deleteInstance}
                />
                <EditSavings createNewItem = {createNewItem} 
                            transaction={"withdrawal"}   
                            reg={reg}                                                            
                            id={withdrawalId} 
                            setId={setWithdrawalId}
                            deleteInstance={deleteInstance}
                />
                </ControlPanel>
                <Bottom>
                    <InvestmentFactor/>
                    <ButtonLeftWrapper>
                    <ButtonLight 
                                onClick={() =>  setStream(false)}
                                text={"Back"}
                            />
                    </ButtonLeftWrapper>

        </Bottom>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
    cpp_selector: cpp_selector(state),
    savings_reducer: state.savings_reducer
})

export default connect(mapStateToProps, {setKeyValue_action, setKeyValue_action,  delete_action})(Savings )


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
    grid-template-rows: 10rem 22rem 40rem 4rem;
    grid-template-areas:
    'a a a'
    'b b b'
    'c c c'
    'd d d'
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
    grid-area: d;
`

const Charts = styled.div`
    grid-area: b;
    width: 90%;
    margin-left: 4%;
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

