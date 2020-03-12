import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {cpp_selector} from "redux/income/income_selectors"
import {addInstance_action,  delete_action,} from "redux/savings/savings_actions"
import ButtonLight from "UI/buttons/ButtonLight"
import EditSavings from "pages/savings/components/EditSavings"
import TFSAAreaChart from "charts/savings/tfsaAreaChart"
import TFSABarChart from "charts/savings/TfsaBarChart"
import  Header from "pages/savings/components/Header"
import AccountBox  from "pages/savings/components/AccountBox"
import InvestmentFactor  from "pages/savings/components/InvestmentFactors"
import {addIncome_action} from "redux/income/income_actions"

const Savings = ({savings_reducer, setCategory, addInstance_action, addIncome_action, delete_action,}) => {    

    const exists = Object.values(savings_reducer).length > 0     
  
    const [contributionId, setContributionId] = useState(123)                                                                       // toggles display between asset and liability  
    const [withdrawalId, setWithdrawalId] = useState(11111)                                                                           // toggles display between asset and liability  

    const createNewItem = (state) => {                                                                                               //This creates a new Income Instance, such as from ages 18-22
        const newId = (Math.random() * 10000000000).toFixed()                                                                        //creates the random ID that is the key to the object
                addInstance_action(newId, {...state})                                                                                //This action fires and sets a savings instance in the reducer, this could be a contribution or withdrawal
                  
              if(state.transaction === "contribution")  { setContributionId(newId)     }                                                                                        // determines which income instance to show within the edit box
              if(state.transaction === "withdrawal")  { 
                addIncome_action(newId, {...state})  
                setWithdrawalId(newId)   
                  }                                                                                        // determines which income instance to show within the edit box
    }
    console.log(savings_reducer);
    const deleteInstance = ({id}, instanceArray) => {                                                                                          //deletes the instance
                delete_action(id)                                                                                     //removes the instance
                setContributionId(123)
                setWithdrawalId(133)
    }

    const contributionsArray = exists ?  Object.values(savings_reducer).filter(d => d.transaction === "contribution").filter(d => d.registration === "tfsa").sort((a, b) => a.fromAge - b.fromAge) : ["1"] //here we take the transaction, eg Wal Mart Income, and make an array of all the instances of that incoem
    const withdrawalsArray = exists ?  Object.values(savings_reducer).filter(d => d.transaction === "withdrawal").filter(d => d.registration === "tfsa").sort((a, b) => a.fromAge - b.fromAge) : ["1"] //here we take the transaction, eg Wal Mart Income, and make an array of all the instances of that incoem

    return (
        <Wrapper>
             < Header color={"#3B7B8E"} >
                <h2>TFSA Savings and Withdrawal Plan</h2> 
            </Header>
                <Charts>
                    <ChartPlaceHolder>
                        <TFSAAreaChart/>
                    </ChartPlaceHolder>
                    <BarChartPlaceHolder>
                        <TFSABarChart/>
                    </BarChartPlaceHolder>
                </Charts>
                <ControlPanel>
                <AccountBox 
                    display={"assets"}
                    subCategory={"investmentAssets"}
                    account={"tfsa"}
                />
                <EditSavings createNewItem = {createNewItem} 
                            transaction={"contribution"}                                                               
                            id={contributionId} 
                            setId={setContributionId}
                            instanceArray={contributionsArray}
                            deleteInstance={deleteInstance}
                />
                <EditSavings createNewItem = {createNewItem} 
                            transaction={"withdrawal"}                                                               
                            id={withdrawalId} 
                            setId={setWithdrawalId}
                            instanceArray={withdrawalsArray}
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

export default connect(mapStateToProps, {addInstance_action, addIncome_action,  delete_action})(Savings )


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

