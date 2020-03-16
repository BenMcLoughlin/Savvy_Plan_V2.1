import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {cpp_selector} from "redux/income/income_selectors"
import { delete_action, add_action} from "redux/actions"
import ButtonLight from "UI/buttons/ButtonLight"
import EditSavings from "pages/savings1/components/EditSavings"
import SavingsAreaChart from "charts/savings1/SavingsAreaChart"
import SavingsBarChart from "charts/savings1/SavingsBarChart"
import Header from "pages/savings1/components/Header"
import AccountBox  from "pages/savings1/components/AccountBox"
import InvestmentFactor  from "pages/savings1/components/InvestmentFactors"


const Savings = ({add_action, delete_action, category, savings_reducer, setCategory}) => {    

    const registration = category.split("").slice(0,4).join("")                                                                       //creates a value called registration that is either "TFSA", "RRSP", or "NReg"
    const [contributionId, setContributionId] = useState(`${registration}contribution`)                                               //contributions and withdrawals are hard coded in the reducer, this enables the starting state to be set according to which page we're on, RRSP or TFSA 
    const [withdrawalId, setWithdrawalId] =  useState(`${registration}withdrawal`)                                                    // the ids for the hard coded contributions and withdrawals look like "TFSAcontribution", and "TFSAwithdrawal"

    const createNewItem = (state) => {                                                                                               //This creates a new Income Instance, such as from ages 18-22
        const newId = (Math.random() * 10000000000).toFixed()                                                                        //creates the random ID that is the key to the object
                add_action(newId, {...state}, "savings_reducer")                                                                     //This action fires and sets a savings instance in the reducer, this could be a contribution or withdrawal
              if(state.transaction === "contribution")  { setContributionId(newId)     }                                                                                        // determines which income instance to show within the edit box
              if(state.transaction === "withdrawal")  { 
                add_action(newId, {...state}, "savings_reducer")  
                setWithdrawalId(newId)   
                  }                                                                                        // determines which income instance to show within the edit box
    }

    const deleteInstance = ({id}) => {                                                                                                   //deletes the instance
                delete_action(id, "savings_reducer")                                                                                     //removes the instance
                setContributionId(`${registration}contribution`)                                                                         //sets the object being viewed to the first one
                setWithdrawalId(`${registration}withdrawal`)                                                                              //sets the object being viewed to the first one
    }


    return (
        <Wrapper>
             <Header 
                registration={registration}>
            </Header>
                <Charts>
                    <ChartPlaceHolder>
                        <SavingsAreaChart
                        registration={registration}
                        />
                    </ChartPlaceHolder>
                    <BarChartPlaceHolder>
                        <SavingsBarChart
                        registration={registration}
                        />
                    </BarChartPlaceHolder>
                </Charts>
                <ControlPanel>
                <AccountBox 
                    display={"assets"}
                    subCategory={"investmentAssets"}
                    registration={registration}
                />
                <EditSavings createNewItem = {createNewItem} 
                            transaction={"contribution"}                                                               
                            id={contributionId} 
                            registration={registration}
                            setId={setContributionId}
                            deleteInstance={deleteInstance}
                />
                <EditSavings createNewItem = {createNewItem} 
                            transaction={"withdrawal"}   
                            registration={registration}                                                            
                            id={withdrawalId} 
                            setId={setWithdrawalId}
                            deleteInstance={deleteInstance}
                />
                </ControlPanel>
                <Bottom>
                    <InvestmentFactor/>
                    <ButtonLeftWrapper>
                    <ButtonLight 
                                onClick={() =>  setCategory(false)}
                                text={"Back"}
                            />
                    </ButtonLeftWrapper>

        </Bottom>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    pensionStartAges_reducer: state.pensionStartAges_reducer,
    user_reducer: state.user_reducer,
    cpp_selector: cpp_selector(state),
    savings_reducer: state.savings_reducer
})

export default connect(mapStateToProps, {add_action, add_action,  delete_action})(Savings )


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

