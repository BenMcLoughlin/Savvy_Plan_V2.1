import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {cpp_selector} from "redux/income/income_selectors"
import {addInstance_action,  delete_action,} from "redux/savings/savings_actions"
import ButtonLight from "UI/buttons/ButtonLight"
import EditForm from "pages/savings/components/EditForm"
import TFSAAreaChart from "charts/savings/tfsaAreaChart"
import TFSABarChart from "charts/savings/TfsaBarChart"
import  Header from "pages/savings/components/Header"
import AccountBox  from "pages/savings/components/AccountBox"
import InvestmentFactor  from "pages/savings/components/InvestmentFactors"

const Savings = ({savings_reducer, setCategory, addInstance_action,  delete_action,}) => {    

    const exists = Object.values(savings_reducer).length > 0     
  
    const [contributionId, setContributionId] = useState(123)                                                                       // toggles display between asset and liability  
    const [withdrawalId, setWithdrawaltId] = useState(133)                                                                           // toggles display between asset and liability  

    const createNewItem = (state) => {                                                                                               //This creates a new Income Instance, such as from ages 18-22
        const newId = (Math.random() * 10000000000).toFixed()                                                                        //creates the random ID that is the key to the object
                addInstance_action(newId, {...state})                                                                                //This action fires and sets a savings instance in the reducer, this could be a contribution or withdrawal
                setContributionId(newId)                                                                                             // determines which income instance to show within the edit box
    }

    const deleteInstance = (instance, instanceArray) => {                                                                                          //deletes the instance
        if (instance.id === contributionId) {                                                                                       //checks if the instance being deleted and the one currently being displayed are the same
            if (instanceArray.length > 0) {                                                                                          // if the array is greater then one it wil delete the instance and change the id of the instance being displayed
                setContributionId(instanceArray[0].contributionId)                                                                                     // sets the id to the first id in the instance array, this prevents errors, otherwise it wants to display an instance that no longer exists
                delete_action(instance.contributionId)                                                                                     //removes the instance
            }
            setContributionId(123)
        }
        else {
            delete_action(instance.id)                                                                                         //if they click to delete an instance that isn't the one being display it won't cause an issue and can just be deleted
        }
    }
    const contributionsArray = exists ?  Object.values(savings_reducer).filter(d => d.transaction === "contribution").sort((a, b) => a.fromAge - b.fromAge) : ["1"] //here we take the transaction, eg Wal Mart Income, and make an array of all the instances of that incoem
    const withdrawalsArray = exists ?  Object.values(savings_reducer).filter(d => d.transaction === "withdrawal").sort((a, b) => a.fromAge - b.fromAge) : ["1"] //here we take the transaction, eg Wal Mart Income, and make an array of all the instances of that incoem

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
                <EditForm createNewItem = {createNewItem} 
                            transaction={"contribution"}                                                               
                            id={contributionId} 
                            setId={setContributionId}
                            instanceArray={contributionsArray}
                            deleteInstance={deleteInstance}
                />
                <EditForm createNewItem = {createNewItem} 
                            transaction={"withdrawal"}                                                               
                            id={withdrawalId} 
                            setId={setWithdrawaltId}
                            instanceArray={withdrawalsArray}
                            deleteInstance={deleteInstance}
                />
                </ControlPanel>
                <Bottom>
                    <InvestmentFactor/>
        <ButtonLight 
                                onClick={() =>  setCategory(false)}
                                text={"Back"}
                            />
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

export default connect(mapStateToProps, {addInstance_action,  delete_action})(Savings )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width:  120rem;
    height: 80rem;
    padding: 1rem;
    margin: 0 auto;
    background: white;
    position: absolute;
    top: 7rem;
    left: 13.2rem;
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

const ControlPanel = styled.div`
    width:  100%;
    border-radius: 5px;
    height: 100%;                 
    padding: 1rem;                                
    position: relative;
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

